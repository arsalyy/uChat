import { AlertColor } from "@mui/material";
export interface IVideoDetailsModal {
  open: boolean;
  handleClose: () => void;
  handleGenerateVideo: (title: string, script: string) => void;
}

export interface INotificationContextType {
  open: boolean;
  message: string;
  severity: AlertColor;
  showNotification: (message: string, severity: AlertColor) => void;
  handleClose: () => void;
}

export interface INotificationProviderProps {
  children: React.ReactNode;
}

export interface IGeneratedVideo {
  video_id: string;
  video_name: string;
  status: string;
  hosted_url: string;
  created_at: string;
}

export interface IVideo {
  video_id: string;
  video_name: string;
  status: string;
  data: {
    script: string;
  };
  download_url: string;
  stream_url: string;
  hosted_url: string;
  status_details: string;
  created_at: string;
  updated_at: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  uchatId: string;
}
