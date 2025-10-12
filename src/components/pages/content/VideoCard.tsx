import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Edit, PlayCircle, PauseCircle, Trash2 } from "lucide-react";
import { useState, useRef } from "react";
import { TContentData, TResponse } from "@/global/global.interface";
import { useDeleteContentMutation } from "@/redux/features/content/contentApi";
import { toast } from "sonner";
import { useAppDispatch } from "@/redux/hooks/hooks";
import {
  setIsUpdateModalOpen,
  setUpdateContent,
} from "@/redux/features/content/contentSlice";

interface VideoCardProps {
  video: TContentData;
}

const VideoCard = ({ video }: VideoCardProps) => {
  const dispatch = useAppDispatch();
  const [deleteContent] = useDeleteContentMutation();
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayPause = () => {
    if (!playing) {
      videoRef.current?.play();
      setPlaying(true);
    } else {
      videoRef.current?.pause();
      setPlaying(false);
    }
  };

  const handleDelete = async (videoId: string) => {
    try {
      const res = (await deleteContent(videoId)) as TResponse<TContentData>;

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

  return (
    <Card
      key={video._id}
      className="shadow-lg rounded-2xl overflow-hidden pt-0"
    >
      <video
        ref={videoRef}
        src={video.videoUrl}
        controls={false}
        className="w-full h-full object-cover"
        onEnded={() => setPlaying(false)}
        onPause={() => setPlaying(false)}
        onPlay={() => setPlaying(true)}
      />

      <CardContent className="p-4 space-y-3">
        <h3 className="text-lg font-semibold leading-tight">{video.title}</h3>
        <div className="flex justify-between items-center border-b border-[#BFBFBF] pb-2">
          <div className="flex items-center text-sm text-muted-foreground gap-2">
            <Clock className="w-4 h-4" />
            <span>{video.duration}</span>
          </div>
          <button
            className="h-10 w-10 cursor-pointer hover:bg-accent rounded-full flex items-center justify-center"
            onClick={handlePlayPause}
          >
            {playing ? <PauseCircle size={32} /> : <PlayCircle size={32} />}
          </button>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
              onClick={() => handleDelete(video._id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-blue-500 hover:text-blue-600 hover:bg-blue-50"
              onClick={() => {
                dispatch(setUpdateContent(video));
                dispatch(setIsUpdateModalOpen(true));
              }}
            >
              <Edit className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoCard;
