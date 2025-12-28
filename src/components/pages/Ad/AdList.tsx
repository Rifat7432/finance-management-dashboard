/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { useAppDispatch } from "@/redux/hooks/hooks";
import {
  setIsUpdateAdModalOpen,
  setUpdateAd,
} from "@/redux/features/ad/adSlice";
import {
  useDeleteAdMutation,
} from "@/redux/features/ad/adApi";
import { TAdData, TResponse } from "@/global/global.interface";
import { toast } from "sonner";
import Image from "next/image";

interface AdListProps {
  adsData?: any;
  isLoading: boolean;
  error?: any;
}

export default function AdList({ adsData }: AdListProps) {
  const dispatch = useAppDispatch();
  const [deleteAd] = useDeleteAdMutation();

  const handleDelete = async (adId: string) => {
    try {
      const res = (await deleteAd(adId)) as TResponse<TAdData>;

      if (res?.error && !res?.error?.data?.success) {
        toast.error(res.error.data.message || "Failed to delete content");
        return;
      }

      if (res.data?.success) {
        toast.success(res.data.message || "Content deleted successfully");
      }
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Failed to delete content");
    }
  };

  const ads = adsData?.data.result || [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {ads.map((ad: any) => (
        <Card key={ad._id} className="shadow-lg rounded-2xl overflow-hidden">
          <Image
            src={ad.url} // Replace with actual image path
            alt="Budget Chart"
            className="w-full h-40 object-cover"
            width={120}
            height={120}
            priority
          />
          <CardContent className="p-4 space-y-3">
            <h3 className="text-2xl font-bold leading-tight">{ad.name}</h3>

            <div className="flex justify-between items-center border-b border-[#BFBFBF] pb-2">
              <div className="flex items-center text-sm gap-2 text-[#000000]">
                <p>Ads Duration:</p>
                <p>
                  <span>{new Date(ad.startDate).toISOString().slice(0, 10)}</span> - <span>{new Date(ad.endDate).toISOString().slice(0, 10)}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex gap-3 text-[#999999]">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleDelete(ad._id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => {
                    dispatch(setUpdateAd(ad));
                    dispatch(setIsUpdateAdModalOpen(true));
                  }}
                >
                  <Edit className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
