import React, { useEffect, useState } from "react";
import { IGeneratedVideo } from "@/interfaces";
import { Video } from "@/components/video";
import { Replicas } from "@/components/replicas";
import { useRouter } from "next/router";

const Page: React.FC = () => {
  const router = useRouter();
  const { user_id } = router.query;

  const [generatedVideo, setGeneratedVideo] = useState<IGeneratedVideo>();

  useEffect(() => {
    window.alert(`Id: ${user_id}`);

    const storedGeneratedVideo = localStorage.getItem("generatedVideo");

    if (storedGeneratedVideo) {
      try {
        const parsedVideo = JSON.parse(storedGeneratedVideo);
        if (
          parsedVideo &&
          typeof parsedVideo === "object" &&
          "video_id" in parsedVideo &&
          "video_name" in parsedVideo &&
          "status" in parsedVideo &&
          "hosted_url" in parsedVideo &&
          "created_at" in parsedVideo
        ) {
          setGeneratedVideo(parsedVideo);
        }
      } catch (error) {
        console.error("Error parsing stored generated video:", error);
      }
    }
  }, [user_id]);

  return <h1>{user_id}</h1>;
};

export default Page;
