import { AlertColor } from "@mui/material";

export interface IModal {
  open: boolean;
  handleClose: () => void;
}

export interface IVideoDetailsModal extends IModal {
  handleGenerateVideo: (title: string, script: string) => void;
}

export interface INotificationContextType extends IModal {
  message: string;
  severity: AlertColor;
  showNotification: (message: string, severity: AlertColor) => void;
}

export interface IUserContextProps {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  refetch: () => void;
  loading: boolean;
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
  videos: Array<{
    userId: string;
    videoId: string;
    video: {
      id: string;
      downloadUrl: string;
      hostedUrl: string;
      name: string;
      script: string;
      status: string;
      statusDetails: string;
      streamUrl: string;
      videoId: string;
    };
  }>;
}
