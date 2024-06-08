import React from "react";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../styles/theme";
import Head from "next/head";
import { NotificationProvider } from "@/hooks/notification";
import { Notification } from "@/components/notification";

import "styles/globals.css";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>U-Chat Custom Menu</title>
      </Head>

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NotificationProvider>
          <Notification />
          <Component {...pageProps} />
        </NotificationProvider>
      </ThemeProvider>
    </>
  );
};

export default MyApp;
