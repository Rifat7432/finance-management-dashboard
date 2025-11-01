/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Controller, FieldValues, useForm } from "react-hook-form";
import FileUpload from "@/components/shared/UploadFile";
import { useEffect } from "react";
import { toast } from "sonner";
import { TContentData, TResponse } from "@/global/global.interface";
import { useUpdateContentMutation } from "@/redux/features/content/contentApi";
import { getVideoDuration } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { setIsUpdateModalOpen } from "@/redux/features/content/contentSlice";

interface ContentData {
  title: string;
  category: string;
  video?: File | string | null;
}

const UpdateContentModal = () => {
  const { updateContent: defaultValues, isUpdateModalOpen } = useAppSelector(
    (state) => state.content
  );
  const dispatch = useAppDispatch();
  const [updateContent] = useUpdateContentMutation();
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContentData>({
    defaultValues: defaultValues || {
      title: "",
      category: "",
      video: null,
    },
  });

  // Reset form when modal opens with default values
  useEffect(() => {
    if (isUpdateModalOpen && defaultValues) {
      reset(defaultValues);
    }
  }, [isUpdateModalOpen, defaultValues, reset]);

  const handleUpdateContent = async (contentData: FieldValues) => {
    const formData = new FormData();
    let duration = Number(
      typeof defaultValues?.duration.split(" ")[0] === "number"
        ? defaultValues?.duration.split(" ")[0]
        : 0
    ); // Extract number from "XX seconds"

    // Get duration from new video file if uploaded
    if (contentData.video instanceof File) {
      try {
        const durationInSeconds = await getVideoDuration(contentData.video);
        duration = Math.round(durationInSeconds);
        console.log("Extracted video duration:", duration);
        formData.append("video", contentData.video);
      } catch (error) {
        console.error("Failed to get video duration:", error);
        toast.error("Failed to read video duration");
        return false;
      }
    }

    // Create the data object
    const data = {
      category: contentData.category,
      title: contentData.title,
      duration: `${duration} seconds`,
    };

    formData.append("data", JSON.stringify(data));

    try {
      // You'll need to pass the content ID here
      // const res = (await updateContent({ id: selectedContent.id, data: formData })) as TResponse<TContentData>;
      const res = (await updateContent({
        id: defaultValues?._id,
        updateContentData: formData,
      })) as TResponse<TContentData>;

      if (res?.error && !res?.error?.data?.success) {
        toast.error(res.error.data.message);
        return false;
      }
      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setIsUpdateModalOpen(false));
        return true;
      }
      return false;
    } catch (err) {
      toast.error("Content Update Failed");
      return false;
    }
  };

  return (
    <Dialog
      open={isUpdateModalOpen}
      onOpenChange={(value) => dispatch(setIsUpdateModalOpen(value))}
    >
      <DialogContent className="max-w-md">
        <DialogTitle>Update Video</DialogTitle>
        <form
          onSubmit={handleSubmit(handleUpdateContent)}
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
            caption="Upload new video (optional)"
            accept="video/*"
            maxSize={100 * 1024 * 1024}
            error={errors.video?.message as string}
            onFileSelect={(file) => console.log("File selected:", file)}
          />

          <Button type="submit" className="w-full">
            Update Video
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateContentModal;
