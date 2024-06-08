import React, { createContext, useContext, useState, useCallback } from "react";
import { AlertColor } from "@mui/material";
import {
  INotificationContextType,
  INotificationProviderProps,
} from "@/interfaces";

const NotificationContext = createContext<INotificationContextType | undefined>(
  undefined
);

export const NotificationProvider: React.FC<INotificationProviderProps> = ({
  children,
}) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<AlertColor>("success");

  const showNotification = useCallback(
    (message: string, severity: AlertColor) => {
      setMessage(message);
      setSeverity(severity);
      setOpen(true);
    },
    []
  );

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <NotificationContext.Provider
      value={{ open, message, severity, showNotification, handleClose }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = (): INotificationContextType => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};
