import React from "react";
import { Loader } from "@/components/loader";
import { useUser } from "@/hooks/user";
import { Replicas } from "@/components/replicas";
import { Video } from "@/components/video";

const Page: React.FC = () => {
  const { user, loading } = useUser();

  if (!user || loading) return <Loader />;
  else if (user.videos.length > 0)
    return <Video id={user.videos[0].video.videoId} />;
  else return <Replicas />;
};

export default Page;
