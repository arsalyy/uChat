import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { IVideoDetailsModal } from "@/interfaces";

const VideoDetailsModal: React.FC<IVideoDetailsModal> = ({
  open,
  handleClose,
  handleGenerateVideo,
}) => {
  const [script, setScript] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  const handleCloseModal = () => {
    setScript("");
    setTitle("");
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleCloseModal}>
      <DialogTitle>Enter Details for Video</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ marginBottom: "10px" }}>
          Please enter the script and title for the video below:
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="Video Title"
          type="text"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
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
        <Button onClick={handleCloseModal} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => handleGenerateVideo(title, script)}
          color="primary"
          disabled={!script || !title}
        >
          Generate Video
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { VideoDetailsModal };
