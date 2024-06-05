import React, { useEffect, useState, useRef } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Button,
} from "@mui/material";

const IndexPage: React.FC = () => {
  const [replicas, setReplicas] = useState<any[]>([]);
  const [visibleReplicas, setVisibleReplicas] = useState<number>(3);
  const videoRefs = useRef<any[]>([]);

  useEffect(() => {
    fetch("/api/replicas", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setReplicas(data.data))
      .catch((err) => console.error(err));
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

  return (
    <Grid container spacing={2} padding={2}>
      {replicas.slice(0, visibleReplicas).map((replica, index) => (
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
              <Typography variant="h5" component="div">
                {replica.replica_name}
              </Typography>
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
  );
};

export default IndexPage;
