"use client";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Controller, FieldValues, useForm } from "react-hook-form";
import FileUpload from "@/components/shared/UploadFile";
import { useCreateContentMutation } from "@/redux/features/content/contentApi";
import { getVideoDuration } from "@/lib/utils";
import { toast } from "sonner";
import { TContentData, TResponse } from "@/global/global.interface";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { setIsCreateModalOpen } from "@/redux/features/content/contentSlice";

const CreateContentModal = () => {
  const { isCreateModalOpen } = useAppSelector((state) => state.content);
  const dispatch = useAppDispatch();
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      category: "",
      video: null,
    },
  });
  const [addContent,{isLoading}] = useCreateContentMutation();

  const handleCreateContent = async (contentData: FieldValues) => {
    console.log("Creating content:", contentData);

    // Create FormData object
    const formData = new FormData();


 let duration = contentData.duration;

// Get duration from video file if it exists
if (contentData.video instanceof File) {
  try {
    const durationInSeconds = await getVideoDuration(contentData.video);
    duration = Math.round(durationInSeconds); // Duration in seconds

    // ✅ 3 minutes = 180 seconds validation
    if (duration > 180) {
      toast.error("Video duration must be 3 minutes or less");
      return false;
    }
  } catch (error) {
    toast.error("Failed to read video duration");
    return false;
  }

      // Append the video file
      formData.append("video", contentData.video);
    }

    // Create the data object (without the video)
    const data = {
      category: contentData.category,
      title: contentData.title,
      duration: `${duration} seconds`,
    };

    // Append data as JSON string
    formData.append("data", JSON.stringify(data));

    try {
      const res = (await addContent(formData)) as TResponse<TContentData>;
      if (res?.error && !res?.error?.data?.success) {
        toast.error(res.error.data.message);
        return false;
      }
      if (res.data.success) {
        toast.success(res.data.message);
        reset({ title: "", category: "", video: null });
        dispatch(setIsCreateModalOpen(false));
        return true;
      }
      return false;
    } catch (err) {
      toast.error("Content Upload Failed");
      return false;
    }
  };

  const defaultTrigger = (
    <Button>
      <Plus className="w-4 h-4 mr-2" />
      New Video Upload
    </Button>
  );

  return (
    <Dialog
      open={isCreateModalOpen}
      onOpenChange={(value) => dispatch(setIsCreateModalOpen(value))}
    >
      <DialogTrigger asChild>{defaultTrigger}</DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogTitle>Upload New Video</DialogTitle>
        <form
          onSubmit={handleSubmit(handleCreateContent)}
          className="space-y-4"
        >
          <div>
            <Label htmlFor="title">Video Title</Label>
            <Input
              id="title"
              {...register("title", { required: "Title is required" })}
              placeholder="Enter video title..."
              className="w-full my-2"
            />
            {errors.title && (
              <p className="text-red-400 text-xs mt-1">
                {errors.title.message as string}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="category">Video Category</Label>
            <Controller
              name="category"
              control={control}
              rules={{ required: "Category is required" }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full my-2">
                    <SelectValue placeholder="Select The Content Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Budget">Budget</SelectItem>
                    <SelectItem value="Debt">Debt</SelectItem>
                    <SelectItem value="Saving">Saving</SelectItem>
                    <SelectItem value="Investment">Investment</SelectItem>
                    <SelectItem value="Taxation">Taxation</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.category && (
              <p className="text-red-400 text-xs mt-1">
                {errors.category.message as string}
              </p>
            )}
          </div>

          <FileUpload
            name="video"
            control={control}
            caption="Upload your video"
            accept="video/*"
            maxSize={100 * 1024 * 1024}
            error={errors.video?.message as string}
            onFileSelect={(file) => console.log("File selected:", file)}
            rules={{ required: "Video is required" }}
          />

          <Button type="submit" className="w-full">
            {  isLoading? 'Loading...':'Upload Video'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateContentModal;
