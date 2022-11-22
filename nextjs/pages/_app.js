import Router from "next/router";
import Head from "next/head";
import { useEffect, useState } from "react";
import { CacheProvider } from "@emotion/react";
import {
  ThemeProvider,
  CssBaseline,
  LinearProgress,
  CircularProgress,
  circularProgressClasses,
  Box,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import createEmotionCache from "/src/createEmotionCache";
import theme from "/src/theme";
import Layout from "/src/components/layout/Layout";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

function Loader(props) {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1200,
      }}
    >
      <LinearProgress />
      <Box sx={{ position: "relative", top: 8, left: 8 }}>
        <CircularProgress
          variant="determinate"
          size={40}
          thickness={4}
          value={100}
          {...props}
          sx={{
            color: alpha(theme.palette.common.white, 0.25),
            [theme.breakpoints.up("lg")]: {
              color: alpha(theme.palette.primary.main, 0.25),
            },
          }}
        />
        <CircularProgress
          variant="indeterminate"
          disableShrink
          size={40}
          thickness={4}
          {...props}
          sx={{
            animationDuration: "550ms",
            position: "absolute",
            left: 0,
            [`& .${circularProgressClasses.circle}`]: {
              strokeLinecap: "round",
            },
            color: theme.palette.common.white,
            [theme.breakpoints.up("lg")]: {
              color: theme.palette.primary.main,
            },
          }}
        />
      </Box>
    </Box>
  );
}

function MyApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    Router.events.on("routeChangeStart", () => {
      setIsLoading(true);
    });
    Router.events.on("routeChangeComplete", () => {
      setIsLoading(false);
    });
    Router.events.on("routeChangeError", () => {
      setIsLoading(false);
    });
  }, [Router]);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {isLoading && <Loader />}
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
