import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
  Typography,
} from "@material-ui/core";
import FileUpload, { FileUploadProps } from "@/components/fileUpload";
import { CircularProgress } from "@mui/material";
import { useNotification } from "@/hooks/notification";
import { IModal } from "@/interfaces";
import { useUser } from "@/hooks/user";

const useStyles = makeStyles({
  outerBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
  dialogContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  fileUploadContainer: {
    marginTop: "20px",
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
});

const UploadModal: React.FC<IModal> = ({ open, handleClose }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const { showNotification } = useNotification();
  const { user } = useUser();

  const uploadFile = async (file: string | Blob) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/uploadToS3", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("File upload failed - S3");
      }

      const data = await response.json();

      console.log("XXX", user?.name, data.fileName);
      try {
        const response = await fetch("/api/createReplica", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            replica_name: user?.name,
            training_video_url: data.fileName,
          }),
        });

        if (!response.ok) {
          throw new Error("File upload failed - Tavus");
        }

        console.log("File uploaded successfully:", data.fileName);
        showNotification("File uploaded successfully", "success");
        handleClose();
      } catch (err) {}
    } catch (error) {
      console.error("Error uploading file:", error);
      showNotification("Error uploading file", "error");
    } finally {
      setLoading(false);
    }
  };

  const fileUploadProp: FileUploadProps = {
    accept: "video/*",
    onChange: async (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files !== null && event.target.files.length > 0) {
        uploadFile(event.target.files[0]);
      }
    },
    onDrop: (event: React.DragEvent<HTMLElement>) => {
      event.preventDefault();
      if (
        event.dataTransfer.files !== null &&
        event.dataTransfer.files.length > 0
      ) {
        uploadFile(event.dataTransfer.files[0]);
      }
    },
  };

  return (
    <div className={classes.outerBox}>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Upload your video</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <Typography
            style={{
              fontSize: "13px",
              fontWeight: "500",
              textAlign: "start",
              color: "#545464",
            }}
          >
            Replica training will fail without the following consent statement
            being present at the beginning of the video: <br />
            I, [FULL NAME], am currently speaking and consent to create an AI
            clone of me by using the audio and video samples I provide. I
            understand that this AI clone can be used to create videos that look
            and sound like me.
          </Typography>
          <Box className={classes.fileUploadContainer}>
            {loading ? (
              <Box position="fixed" top="50%" left="50%">
                <CircularProgress />
              </Box>
            ) : (
              <FileUpload {...fileUploadProp} />
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UploadModal;
