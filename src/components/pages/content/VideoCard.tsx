import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Edit, PlayCircle, PauseCircle, Trash2 } from "lucide-react";
import { useState, useRef } from "react";

const VideoCard = ({
  video,
}: {
  video: {
    id: string;
    title: string;
    duration: string;
    category: string;
    videoUrl: string; // replace with real video source
  };
}) => {
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

  return (
    <Card key={video.id} className="shadow-lg rounded-2xl overflow-hidden pt-0">
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
  );
};

export default VideoCard;
