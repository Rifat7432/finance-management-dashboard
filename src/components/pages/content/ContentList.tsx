import { useGetContentsQuery } from "@/redux/features/content/contentApi";
import VideoCard from "./VideoCard";
import { TContentData } from "@/global/global.interface";

const ContentList = () => {
  const { data: videosData, error, isLoading } = useGetContentsQuery({});
  if (isLoading) return <div>Loading...</div>;
  const videos = videosData?.data || [];
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
