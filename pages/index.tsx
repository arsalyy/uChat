import React, { useEffect, useRef, useState } from "react";
import { IUser } from "@/interfaces";
import { Video } from "@/components/video";
import { Replicas } from "@/components/replicas";
import { useRouter } from "next/router";
import { Loader } from "@/components/loader";
import { useNotification } from "@/hooks/notification";

const Page: React.FC = () => {
  const router = useRouter();
  const { user_id, user_name, user_email } = router.query;
  const fetchInitiated = useRef(false);
  const [user, setUser] = useState<IUser>();
  const [loading, setLoading] = useState<boolean>(true);

  const { showNotification } = useNotification();

  useEffect(() => {
    if (!user_id || !user_email || !user_name) return;
    if (!fetchInitiated.current) {
      fetchInitiated.current = true;
      fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uchatId: user_id,
          name: user_name,
          email: user_email,
        }),
      })
        .then((response) => response.json())
        .then((data) => setUser(data))
        .catch((err) => {
          console.error(err);
          showNotification("Failed to get user", "error");
        })
        .finally(() => setLoading(false));
    }
  }, [user_id, user_name, user_email, showNotification]);

  // useEffect(() => {
  //   const storedGeneratedVideo = localStorage.getItem("generatedVideo");

  //   if (storedGeneratedVideo) {
  //     try {
  //       const parsedVideo = JSON.parse(storedGeneratedVideo);
  //       if (
  //         parsedVideo &&
  //         typeof parsedVideo === "object" &&
  //         "video_id" in parsedVideo &&
  //         "video_name" in parsedVideo &&
  //         "status" in parsedVideo &&
  //         "hosted_url" in parsedVideo &&
  //         "created_at" in parsedVideo
  //       ) {
  //         setGeneratedVideo(parsedVideo);
  //       }
  //     } catch (error) {
  //       console.error("Error parsing stored generated video:", error);
  //     }
  //   }
  // }, []);

  if (loading) return <Loader />;
  else return <h1>Hello</h1>;
  // else if (generatedVideo) return <Video id={generatedVideo.video_id} />;
  // else return <Replicas setGeneratedVideo={setGeneratedVideo} />;
};

export default Page;
