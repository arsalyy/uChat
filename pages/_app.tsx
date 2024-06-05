import React, { useState, useEffect } from "react";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../styles/theme";
import Head from "next/head";

import "styles/globals.css";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>U-Chat Custom Menu</title>
      </Head>

      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/*Need to change the static true flag with the authorized state*/}
        {true && <Component {...pageProps} />}
      </ThemeProvider>
    </>
  );
};

export default MyApp;
