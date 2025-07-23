"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Play, Trash2, Edit, Clock, Upload, ChevronLeft, ChevronRight, X, Pencil, PlayCircle } from "lucide-react"

const categories = ["All", "Budget", "Debt", "Saving"]

const videos = Array.from({ length: 6 }, (_, i) => ({
  id: `${i + 1}`,
  title: "How to create a monthly budget",
  duration: "5min",
  thumbnail: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Dashborad2-oouHFm0oHl1paUZDkYcZbNbyyi3VFw.png",
  category: "Budget",
}))

export default function ContentManagement() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)

  return (
    <DashboardLayout>
      <div className="space-y-6">
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
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <DialogTitle className="sr-only">Upload Video</DialogTitle>
                  <button
                    onClick={() => setIsUploadModalOpen(false)}
                    className="ml-auto p-1 rounded-full hover:bg-muted"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="caption">Video Caption</Label>
                  <Input id="caption" placeholder="Enter video caption..." />
                </div>
                <div>
                  <Label htmlFor="category">Video Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Budget" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="budget">Budget</SelectItem>
                      <SelectItem value="debt">Debt</SelectItem>
                      <SelectItem value="saving">Saving</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="border-2 border-dashed border-muted rounded-lg p-12 text-center">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Upload className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-lg font-medium">Select Video to Upload</p>
                      <Button className="mt-4">
                        <Upload className="w-4 h-4 mr-2" />
                        Select File
                      </Button>
                    </div>
                  </div>
                </div>
                <Button className="w-full">Save</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
      <Card key={video.id} className="shadow-lg rounded-2xl overflow-hidden">
      <img
        src={video.thumbnail}// Replace with actual image path
        alt="Budget Chart"
        className="w-full h-40 object-cover"
      />
      <CardContent className="p-4 space-y-3">
        <h3 className="text-lg font-semibold leading-tight">
          {video.title}
        </h3>
        <div className="flex justify-between items-center">
            <div className="flex items-center text-sm text-muted-foreground gap-2">
          <Clock className="w-4 h-4" />
          <span>{video.duration}</span>
        </div>
            <button  className="h-10 w-10 cursor-pointer hover:bg-accent rounded-full flex items-center justify-center">
            <PlayCircle size={32} />
          </button>
        </div>
      
        <div className="flex items-center justify-between pt-2">
          <div className="flex gap-3">
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
       <div className="flex items-center justify-end gap-2 pt-8">
          <Button variant="outline" size="sm" className="rounded-full h-10 w-10">
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button size="sm">1</Button>
          <Button variant="ghost" size="sm">
            2
          </Button>
          <Button variant="ghost" size="sm">
            3
          </Button>
          <Button variant="ghost" size="sm">
            4
          </Button>
          <span className="px-2">...</span>
          <Button variant="ghost" size="sm">
            30
          </Button>
          <Button variant="outline" size="sm" className="rounded-full h-10 w-10">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </DashboardLayout>
  )
}