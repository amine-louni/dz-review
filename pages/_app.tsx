import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";

import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import theme from "../src/theme";
import {
  createEmotionCache,
  createEmotionCacheRTL,
} from "../src/createEmotionCache";
import { Theme as MaterialUITheme } from "@mui/material";
import { Provider as ReduxProvider } from "react-redux";
import store from "../redux/store";
import { useEffect, useState } from "react";
import Toast from "../components/common/Toast";

// Re-declare the emotion theme to have the properties of the MaterialUiTheme
declare module "@emotion/react" {
  export interface Theme extends Partial<MaterialUITheme> {}
}
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();
const clientSideEmotionCacheRTL = createEmotionCacheRTL();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const [isRTL, setIsRTL] = useState(props.router.locale === "ar");

  useEffect(() => {
    setIsRTL(props.router.locale === "ar");
    document.documentElement.dir = props.router.locale === "ar" ? "rtl" : "ltr";
  }, [props.router.locale]);
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={isRTL ? clientSideEmotionCacheRTL : emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />

        <title>dz review 🔊</title>
      </Head>
      <ReduxProvider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Toast />
          <Component {...pageProps} />
        </ThemeProvider>
      </ReduxProvider>
    </CacheProvider>
  );
}
