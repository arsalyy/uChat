import React from "react";
import { Snackbar, Alert } from "@mui/material";
import { useNotification } from "@/hooks/notification";

const Notification: React.FC = () => {
  const { open, message, severity, handleClose } = useNotification();

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export { Notification };
