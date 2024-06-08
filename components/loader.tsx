import React from "react";
import { Box, CircularProgress } from "@mui/material";

const Loader: React.FC = () => {
  return (
    <>
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
      <Box
        position="fixed"
        top="50%"
        left="50%"
        style={{ transform: "translate(-50%, -50%)", zIndex: 10000 }}
      >
        <CircularProgress />
      </Box>
    </>
  );
};

export { Loader };
