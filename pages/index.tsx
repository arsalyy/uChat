import React, { useState } from "react";
import { Loader } from "@/components/loader";
import { useUser } from "@/hooks/user";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Box,
  TablePagination,
} from "@mui/material";
import {
  Schedule as QueuedIcon,
  Cached as GeneratingIcon,
  CheckCircleOutline as ReadyIcon,
  DeleteOutline as DeletedIcon,
  ErrorOutline as ErrorIcon,
} from "@mui/icons-material";
import { useRouter } from "next/router";

const Page: React.FC = () => {
  const { user, loading } = useUser();
  const [page, setPage] = useState<number>(0);
  const rowsPerPage = 7;
  const router = useRouter();
  const { query } = router;

  if (!user || loading) return <Loader />;

  const statusStyles: Record<string, { color: string; icon: JSX.Element }> = {
    queued: { color: "#1976d2", icon: <QueuedIcon /> },
    generating: { color: "#fbc02d", icon: <GeneratingIcon /> },
    ready: { color: "#4caf50", icon: <ReadyIcon /> },
    deleted: { color: "#e53935", icon: <DeletedIcon /> },
    error: { color: "#f44336", icon: <ErrorIcon /> },
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  return (
    <div style={{ padding: "10px" }}>
      <h1 style={{ marginBottom: "20px" }}>Hello, {user.name}</h1>
      <div style={{ padding: "10px" }}>
        <Button
          variant="contained"
          color="primary"
          style={{ float: "right", marginBottom: "20px" }}
          onClick={() =>
            router.push({ pathname: "/replicas", query: { ...query } })
          }
        >
          Generate New Video
        </Button>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? user.videos.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : user.videos
              ).map((video, index) => (
                <TableRow key={video.videoId}>
                  <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell>{video.video.name}</TableCell>
                  <TableCell>
                    <Chip
                      label={
                        video.video.status.charAt(0).toUpperCase() +
                        video.video.status.slice(1)
                      }
                      style={{
                        backgroundColor:
                          statusStyles[video.video.status]?.color,
                        color: "white",
                      }}
                      icon={statusStyles[video.video.status]?.icon}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() =>
                        router.push({
                          pathname: `/video`,
                          query: { ...query, videoId: video.video.videoId },
                        })
                      }
                    >
                      View Video
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="end"
          style={{ marginTop: "20px", marginBottom: "20px" }}
        >
          <TablePagination
            rowsPerPageOptions={[]}
            component="div"
            count={user.videos.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
          />
        </Box>
      </div>
    </div>
  );
};

export default Page;
