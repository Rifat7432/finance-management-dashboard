/* eslint-disable prefer-const */
"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/shared/Pagination";
import CreateContentModal from "@/components/pages/content/CreateContentModal";
import { FieldValues } from "react-hook-form";
import { useCreateContentMutation } from "@/redux/features/content/contentApi";
import { toast } from "sonner";
import { TContentData, TResponse } from "@/global/global.interface";
import ContentList from "@/components/pages/content/ContentList";

const categories = [
  "All",
  "Budget",
  "Debt",
  "Saving",
  "Investment",
  "Taxation",
];

const videos = Array.from({ length: 6 }, (_, i) => ({
  id: `${i + 1}`,
  title: "How to create a monthly budget",
  duration: "5min",
  category: "Budget",
  videoUrl:
    "https://s3-testing-bucket-two.s3.ap-south-1.amazonaws.com/others/eff49859-19df-46ca-837e-22f9cd24550c.mp4", // replace with real video source
}));

export default function ContentManagement() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [addContent, { isLoading }] = useCreateContentMutation();
  const getVideoDuration = (file: File): Promise<number> => {
    return new Promise((resolve, reject) => {
      const video = document.createElement("video");
      video.preload = "metadata";

      video.onloadedmetadata = () => {
        window.URL.revokeObjectURL(video.src);
        resolve(video.duration); // Duration in seconds
      };

      video.onerror = () => {
        reject(new Error("Failed to load video metadata"));
      };

      video.src = URL.createObjectURL(file);
    });
  };

  const addNewContent = async (contentData: FieldValues) => {
    console.log(contentData);

    // Create FormData object
    const formData = new FormData();

    let duration = contentData.duration;

    // Get duration from video file if it exists
    if (contentData.video instanceof File) {
      try {
        const durationInSeconds = await getVideoDuration(contentData.video);
        duration = Math.round(durationInSeconds); // Duration in seconds
        console.log("Extracted video duration:", duration);
      } catch (error) {
        console.error("Failed to get video duration:", error);
        toast.error("Failed to read video duration");
        return;
      }

      // Append the video file
      formData.append("video", contentData.video);
    }

    // Create the data object (without the video)
    const data = {
      category: contentData.category,
      title: contentData.title,
      duration: `${duration} seconds`,
      // ... add any other fields except the video
    };

    // Append data as JSON string
    formData.append("data", JSON.stringify(data));

    console.log("FormData contents:");
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      const res = (await addContent(formData)) as TResponse<TContentData>;
      if (res?.error && !res?.error?.data?.success) {
        return toast.error(res.error.data.message);
      }
      if (res.data.success) {
        toast.success(res.data.message);
        setIsUploadModalOpen(false);
        return res.data.success;
      }
    } catch (err) {
      toast.error("Content Upload Failed");
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 bg-white p-10 rounded-l">
        {/* Category buttons + Upload */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>

          <CreateContentModal
            isUploadModalOpen={isUploadModalOpen}
            setIsUploadModalOpen={setIsUploadModalOpen}
            onSubmit={addNewContent}
          />
        </div>

        {/* Video cards */}
        <ContentList />

        {/* Pagination */}
        <Pagination />
      </div>
    </DashboardLayout>
  );
}
