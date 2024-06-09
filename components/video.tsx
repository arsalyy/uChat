import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, Button } from "@mui/material";
import Hls from "hls.js";
import { IVideo } from "@/interfaces";
import { useNotification } from "@/hooks/notification";
import { Loader } from "./loader";
import Image from "next/image";
import VideoImage from "@/public/video.jpg";

const Video: React.FC<{ id: string }> = ({ id }) => {
  const [videoData, setVideoData] = useState<IVideo>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fetchInitiated = useRef(false);

  const { showNotification } = useNotification();

  useEffect(() => {
    if (!fetchInitiated.current) {
      fetchInitiated.current = true;
      fetch(`/api/video?video_id=${id}`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => setVideoData(data))
        .catch((err) => {
          console.error(err);
          setError(err);
          showNotification("Failed to fetch the video", "error");
        })
        .finally(() => setLoading(false));
    }
  }, [id, showNotification]);

  useEffect(() => {
    if (videoData && videoRef && videoData.status === "ready") {
      const hls = new Hls();
      hls.loadSource(videoData.stream_url);
      hls.attachMedia((videoRef as any).current);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        (videoRef as any).current.play();
      });
    }
  }, [videoData]);

  if (loading) return <Loader />;

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box display="flex" flexDirection={{ xs: "column", md: "row" }} p={7}>
      <Box flex={1} mr={{ md: 2 }}>
        <Typography variant="h1" fontWeight="bold">
          {videoData?.video_name}
        </Typography>
        <Typography mt={5} variant="h5">
          {videoData?.data?.script}
        </Typography>
      </Box>
      <Box flex={1} mt={{ xs: 2, md: 0 }}>
        {videoData?.status !== "ready" ? (
          <Box
            style={{
              width: "620px",
              height: "480px",
            }}
          >
            <Image
              src={VideoImage}
              alt="Your video is still in progress"
              style={{ width: "100%", height: "100%" }}
            />
          </Box>
        ) : (
          <>
            <video ref={videoRef} controls style={{ width: "100%" }}>
              <source src={videoData?.stream_url} type="video/mp4" />
              Your browser does not support the video.
            </video>
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              mt={3}
            >
              <Button
                variant="contained"
                color="primary"
                href={videoData?.download_url}
                download
              >
                Download Video
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export { Video };
