"use client";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {  FieldValues, useForm } from "react-hook-form";
import UploadFile from "@/components/shared/UploadFile";
import { useEffect } from "react";
import { toast } from "sonner";
import { TAdData, TResponse } from "@/global/global.interface";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { useUpdateAdMutation } from "@/redux/features/ad/adApi";
import { setIsUpdateAdModalOpen } from "@/redux/features/ad/adSlice";

interface AdData {
  name: string;
  startDate: string;
  endDate: string;
  url?: File | string | null;
}


const UpdateAdModal = () => {
  const { updateAd: defaultValues, isUpdateModalOpen } = useAppSelector(
    (state) => state.ad
  );
  const dispatch = useAppDispatch();
  const [updateAd] = useUpdateAdMutation();

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AdData>({
    defaultValues: defaultValues || {
      name: "",
      startDate: "",
      endDate: "",
      url: null,
    },
  });

  // Reset form with default values when modal opens
  useEffect(() => {
    if (isUpdateModalOpen && defaultValues) {
      reset(defaultValues);
    }
  }, [isUpdateModalOpen, defaultValues, reset]);

  const handleUpdateAd = async (adData: FieldValues) => {
    const formData = new FormData();

    // Append video if updated
    if (adData.video instanceof File) {
      formData.append("image", adData.video);
    }

    const data = {
      title: adData.title,
      category: adData.category,
      startDate: adData.startDate,
      endDate: adData.endDate,
    };

    formData.append("data", JSON.stringify(data));

    try {
      const res = (await updateAd({
        id: defaultValues?._id,
        updateAdData: formData,
      })) as TResponse<TAdData>;

      if (res?.error && !res?.error?.data?.success) {
        toast.error(res.error.data.message);
        return false;
      }

      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setIsUpdateAdModalOpen(false));
        return true;
      }

      return false;
    } catch (err) {
      toast.error("Ad Update Failed");
      return false;
    }
  };

  return (
    <Dialog
      open={isUpdateModalOpen}
      onOpenChange={(value) => dispatch(setIsUpdateAdModalOpen(value))}
    >
      <DialogContent className="max-w-md">
        <DialogTitle>Update Ad</DialogTitle>
        <form onSubmit={handleSubmit(handleUpdateAd)} className="space-y-4">
          <div>
            <Label htmlFor="name">Ad Title</Label>
            <Input
              id="name"
              {...register("name", { required: "Name is required" })}
              placeholder="Enter ad name..."
              className="w-full my-2"
            />
            {errors.name && (
              <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                type="date"
                id="startDate"
                {...register("startDate", {
                  required: "Start Date is required",
                })}
                className="w-full my-2"
              />
              {errors.startDate && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.startDate.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="endDate">End Date</Label>
              <Input
                type="date"
                id="endDate"
                {...register("endDate", { required: "End Date is required" })}
                className="w-full my-2"
              />
              {errors.endDate && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.endDate.message}
                </p>
              )}
            </div>
          </div>

          <UploadFile
            name="url"
            control={control}
            caption="Upload new ad video (optional)"
            accept="image/*"
            maxSize={100 * 1024 * 1024}
            error={errors.url?.message as string}
            onFileSelect={(file) => console.log("File selected:", file)}
          />

          <Button type="submit" className="w-full">
            Update Ad
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateAdModal;
