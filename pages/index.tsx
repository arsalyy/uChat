import React, { useEffect, useState, useRef } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";

const IndexPage: React.FC = () => {
  const [replicas, setReplicas] = useState<any[]>([]);
  const [visibleReplicas, setVisibleReplicas] = useState<number>(3);
  const [selectedReplica, setSelectedReplica] = useState<any>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [script, setScript] = useState<string>("");
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  const [loading, setLoading] = useState<boolean>(false);
  const videoRefs = useRef<any[]>([]);

  useEffect(() => {
    fetch("/api/replicas", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setReplicas(data))
      .catch((err) => {
        console.error(err);
        handleSnackbarOpen("Failed to fetch replicas", "error");
      });
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
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setScript("");
  };

  const handleGenerateVideo = () => {
    if (!selectedReplica || loading) return;
    handleClose();

    const requestBody = {
      id: selectedReplica.replica_id,
      script: script,
      name: selectedReplica.replica_name,
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
        handleSnackbarOpen("Video generated successfully", "success");
      })
      .catch((err) => {
        console.error(err);
        handleSnackbarOpen("Failed to generate video", "error");
      })
      .finally(() => {
        setLoading(false);
        handleClose();
      });
  };

  const handleSnackbarOpen = (
    message: string,
    severity: "success" | "error"
  ) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Grid container spacing={2} padding={2}>
      {loading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 9999,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        />
      )}
      {loading && (
        <Box
          position="fixed"
          top="50%"
          left="50%"
          style={{ transform: "translate(-50%, -50%)", zIndex: 10000 }}
        >
          <CircularProgress />
        </Box>
      )}

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

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Enter Script for Video</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the script for the video below:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Video Script"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={script}
            onChange={(e) => setScript(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleGenerateVideo} color="primary">
            Generate Video
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default IndexPage;
