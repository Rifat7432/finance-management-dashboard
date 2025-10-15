import VideoCard from "./VideoCard";
import { TContentData, TErrorData } from "@/global/global.interface";
import { useAppSelector } from "@/redux/hooks/hooks";
import Spinner from "@/components/shared/Spinner";
import { DefinitionType } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

const ContentList = ({
  videosData,
  isLoading,
  error,
}: {
  videosData: { data: { result: [TContentData] } };
  isLoading: boolean;
  error: DefinitionType  |SerializedError | undefined;
}) => {
  const { contentCategory } = useAppSelector((state) => state.content);
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-28">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-red-500">
          Error loading videos. Please try again.
        </div>
      </div>
    );
  }

  const videos = videosData?.data?.result || [];

  if (!videos.length) {
    return (
      <div className="flex items-center justify-center py-12 h-[60vh]">
        <div className="text-muted-foreground">
          {contentCategory === "All"
            ? "No videos found. Upload your first video!"
            : `No videos found in "${contentCategory}" category.`}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video: TContentData) => (
          <VideoCard key={video._id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default ContentList;
