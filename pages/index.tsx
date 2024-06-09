import React, { useEffect, useState } from "react";
import { IGeneratedVideo } from "@/interfaces";
import { Video } from "@/components/video";
import { Replicas } from "@/components/replicas";

const Page: React.FC = () => {
  const [generatedVideo, setGeneratedVideo] = useState<IGeneratedVideo>();

  useEffect(() => {
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
  }, []);

  if (generatedVideo) return <Video id={generatedVideo.video_id} />;
  else return <Replicas setGeneratedVideo={setGeneratedVideo} />;
};

export default Page;
