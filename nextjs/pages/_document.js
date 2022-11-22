import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";
import * as React from "react";
import theme, { montserrat } from "/src/theme";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" className={montserrat.className}>
        <Head>
          <meta property="og:type" content="website" />
          <meta
            property="og:site_name"
            content="Eva Reynolds Fine Art Gallery"
          />
          <meta name="theme-color" content={theme.palette.primary.main} />
          {/* https://mariestarck.com/add-google-analytics-to-your-next-js-application-in-5-easy-steps/ */}
          {/* <Script
            strategy="lazyOnload"
            src="https://www.googletagmanager.com/gtag/js?id=UA-124805271-1"
          />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'UA-124805271-1', {
              page_path: window.location.pathname,
            });  `,
            }}
          /> */}
          <link rel="shortcut icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" href="/logo180.png" sizes="180x180" />
          <link rel="icon" href="/logo32.png" sizes="32x32" />
          <link rel="icon" href="/logo128.png" sizes="128x128" />
          <link rel="icon" href="/logo192.png" sizes="192x192" />
          <link rel="manifest" href="/manifest.json" />
          <meta name="emotion-insertion-point" content="" />
          {this.props.emotionStyleTags}
        </Head>
        <body>
          {/* <noscript
            dangerouslySetInnerHTML={{
              __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXX"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
            }}
          ></noscript> */}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
