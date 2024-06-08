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
