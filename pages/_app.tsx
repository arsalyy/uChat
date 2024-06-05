import React, { useState, useEffect } from "react";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../styles/theme";
import Head from "next/head";
import { useRouter } from "next/router";
import { userService } from "@/services";

import "styles/globals.css";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [authorized, setAuthorized] = useState(false);

  // useEffect(() => {
  //   // on initial load - run auth check
  //   authCheck(router.asPath);

  //   // on route change start - hide page content by setting authorized to false
  //   const hideContent = () => setAuthorized(false);
  //   router.events.on("routeChangeStart", hideContent);

  //   // on route change complete - run auth check
  //   router.events.on("routeChangeComplete", authCheck);

  //   // unsubscribe from events in useEffect return function
  //   return () => {
  //     router.events.off("routeChangeStart", hideContent);
  //     router.events.off("routeChangeComplete", authCheck);
  //   };
  // }, []);

  const authCheck = (url: string) => {
    // redirect to login page if accessing a private page and not logged in
    setUser(userService.userValue);
    const publicPaths = ["/account/login", "/account/register"];
    const path = url.split("?")[0];
    if (!userService.userValue && !publicPaths.includes(path)) {
      setAuthorized(false);
      router.push({
        pathname: "/account/login",
        query: { returnUrl: router.asPath },
      });
    } else {
      setAuthorized(true);
    }
  };

  return (
    <>
      <Head>
        <title>Next.js 13 - User Registration and Login Example</title>
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
