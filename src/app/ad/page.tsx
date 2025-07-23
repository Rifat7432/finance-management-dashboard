"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
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
import {
  Plus,
  Play,
  Trash2,
  Edit,
  Clock,
  Upload,
  ChevronLeft,
  ChevronRight,
  X,
  Pencil,
  PlayCircle,
} from "lucide-react";
import UploadFile from "@/components/shared/UploadFile";
import Pagination from "@/components/shared/Pagination";

const categories = ["All", "Budget", "Debt", "Saving"];

const videos = Array.from({ length: 6 }, (_, i) => ({
  id: `${i + 1}`,
  title: "How to create a monthly budget",
  startDate: "21 July 2025",
  endDate: "31 July 2025",
  thumbnail:
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Dashborad2-oouHFm0oHl1paUZDkYcZbNbyyi3VFw.png",
  category: "Budget",
}));

export default function AdManagement() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  return (
    <DashboardLayout>
      <div className="space-y-6 bg-white p-10 rounded-l">
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
                  <Label htmlFor="caption">Campaign Name</Label>
                  <Input
                    id="caption"
                    placeholder="Campaign Name"
                    className="w-full my-2"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Ads Duration</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Select>
                        <SelectTrigger className="w-full my-2">
                          <SelectValue placeholder="Start Date" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="budget">Budget</SelectItem>
                          <SelectItem value="debt">Debt</SelectItem>
                          <SelectItem value="saving">Saving</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Select>
                        <SelectTrigger className="w-full my-2">
                          <SelectValue placeholder="End Date" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="budget">Budget</SelectItem>
                          <SelectItem value="debt">Debt</SelectItem>
                          <SelectItem value="saving">Saving</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <UploadFile caption="Drag & Drop to Upload" />
                <Button className="w-full">Save</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <Card
              key={video.id}
              className="shadow-lg rounded-2xl overflow-hidden"
            >
              <img
                src={video.thumbnail} // Replace with actual image path
                alt="Budget Chart"
                className="w-full h-40 object-cover"
              />
              <CardContent className="p-4 space-y-3">
                <h3 className="text-2xl font-bold leading-tight">
                  {video.title}
                </h3>
                <div className="flex justify-between items-center border-b border-[#BFBFBF] pb-2">
                  <div className="flex items-center text-sm gap-2 text-[#000000]">
                    <p>Ads Duration: </p>
                    <p>
                      <span>{video.startDate}</span>-
                      <span>{video.endDate}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex gap-3 text-[#999999]">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <Pagination />
      </div>
    </DashboardLayout>
  );
}
