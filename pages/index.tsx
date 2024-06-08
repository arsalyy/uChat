import React, { useEffect, useState, useRef } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Button,
  Box,
} from "@mui/material";
import { Loader } from "@/components/loader";
import { VideoDetailsModal } from "@/components/videoDetailsModal";
import { useNotification } from "@/hooks/notification";

const Page: React.FC = () => {
  const [replicas, setReplicas] = useState<any[]>([]);
  const [visibleReplicas, setVisibleReplicas] = useState<number>(3);
  const [selectedReplica, setSelectedReplica] = useState<any>(null);
  const [videoModalOpen, setVideoModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const videoRefs = useRef<any[]>([]);

  const { showNotification } = useNotification();

  useEffect(() => {
    fetch("/api/replicas", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setReplicas(data))
      .catch((err) => {
        console.error(err);
        showNotification("Failed to fetch replicas", "error");
      })
      .finally(() => setLoading(false));
  }, []);

  const loadMore = () => {
    setVisibleReplicas((prevVisible) => prevVisible + 3);
  };

  const handleVideoPlay = (index: number) => {
    videoRefs.current.forEach((video, idx) => {
      if (idx !== index && video) {
        video.pause();
      }
    });
  };

  const handleSelect = (replica: any) => {
    setSelectedReplica(replica);
    setVideoModalOpen(true);
  };

  const handleVideoModalClose = () => setVideoModalOpen(false);

  const handleGenerateVideo = (title: string, script: string) => {
    if (!selectedReplica || loading) return;
    handleVideoModalClose();

    const requestBody = {
      id: selectedReplica.replica_id,
      script: script,
      name: title,
    };

    setLoading(true);

    fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to generate video");
        }
        return response.json();
      })
      .then((response) => {
        showNotification("Video generated successfully", "success");
      })
      .catch((err) => {
        console.error(err);
        showNotification("Failed to generate video", "error");
      })
      .finally(() => {
        setLoading(false);
        handleVideoModalClose();
      });
  };

  if (loading) return <Loader />;
  return (
    <>
      <VideoDetailsModal
        open={videoModalOpen}
        handleClose={handleVideoModalClose}
        handleGenerateVideo={handleGenerateVideo}
      />
      <Grid container spacing={2} padding={2}>
        {replicas?.slice(0, visibleReplicas).map((replica, index) => (
          <Grid item key={replica.replica_id} xs={12} sm={6} md={4}>
            <Card>
              <CardMedia>
                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  src={replica.thumbnail_video_url}
                  controls
                  style={{ width: "100%" }}
                  onPlay={() => handleVideoPlay(index)}
                />
              </CardMedia>
              <CardContent>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="h5" component="div">
                    {replica.replica_name}
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleSelect(replica)}
                  >
                    Select
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
        {visibleReplicas < replicas.length && (
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <Button variant="contained" onClick={loadMore}>
              Load More
            </Button>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default Page;
