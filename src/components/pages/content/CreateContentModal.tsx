/* eslint-disable @typescript-eslint/no-explicit-any */
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
const CreateContentModal = ({
  isUploadModalOpen,
  setIsUploadModalOpen,
  onSubmit,
}: {
  isUploadModalOpen: boolean;
  setIsUploadModalOpen: any;
  onSubmit: any;
}) => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const handleFromSubmit = (contentData: FieldValues) => {
    const res = onSubmit(contentData);
    if (res === true) {
      reset({ title: "", category: "", video: null });
    } else {
    }
  };
  return (
    <div>
      <Dialog open={isUploadModalOpen} onOpenChange={setIsUploadModalOpen}>
        <DialogTrigger asChild>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Video Upload
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogTitle />
          <form onSubmit={handleSubmit(handleFromSubmit)} className="space-y-4">
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
                      <SelectItem value="Saving">Saving</SelectItem>
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
            />
            <Button className="w-full">Save</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateContentModal;
