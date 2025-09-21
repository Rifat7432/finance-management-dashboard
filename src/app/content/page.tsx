"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { Plus, Trash2, Edit, Clock, PlayCircle } from "lucide-react";
import UploadFile from "@/components/shared/UploadFile";
import Pagination from "@/components/shared/Pagination";
import VideoCard from "@/components/pages/content/VideoCard";

const categories = [
  "All",
  "Budget",
  "Debt",
  "Saving",
  "Investment",
  "taxation",
];

const videos = Array.from({ length: 6 }, (_, i) => ({
  id: `${i + 1}`,
  title: "How to create a monthly budget",
  duration: "5min",
  category: "Budget",
  videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", // replace with real video source
}));

export default function ContentManagement() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

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

          <Dialog open={isUploadModalOpen} onOpenChange={setIsUploadModalOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Video Upload
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogTitle />
              <div className="space-y-4">
                <div>
                  <Label htmlFor="caption">Video Caption</Label>
                  <Input
                    id="caption"
                    placeholder="Enter video caption..."
                    className="w-full my-2"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Video Category</Label>
                  <Select>
                    <SelectTrigger className="w-full my-2">
                      <SelectValue placeholder="Budget" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="budget">Budget</SelectItem>
                      <SelectItem value="debt">Debt</SelectItem>
                      <SelectItem value="saving">Saving</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <UploadFile caption="Select Video to Upload" />
                <Button className="w-full">Save</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Video cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>

        {/* Pagination */}
        <Pagination />
      </div>
    </DashboardLayout>
  );
}
