import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="bn" dir="ltr">
        <Head>
          {/* DNS Prefetch for faster connections */}
          <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
          <link rel="dns-prefetch" href="https://www.google-analytics.com" />
          <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
          
          {/* Preconnect for critical resources */}
          <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          
          {/* Manifest for PWA */}
          <link rel="manifest" href="/manifest.json" />
          
          {/* Theme color */}
          <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
          <meta name="theme-color" content="#1a202c" media="(prefers-color-scheme: dark)" />
          
          {/* Apple Touch Icon */}
          <link rel="apple-touch-icon" sizes="180x180" href="/icons/amar-jannat-icon.png" />
          
          {/* Favicon variations */}
          <link rel="icon" type="image/png" sizes="32x32" href="/icons/amar-jannat-icon.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/icons/amar-jannat-icon.png" />
          
          {/* Microsoft */}
          <meta name="msapplication-TileColor" content="#2d89ef" />
          <meta name="msapplication-config" content="/browserconfig.xml" />
          
          {/* Google Publisher Tag */}
          <meta name="google-adsense-account" content="ca-pub-YOUR_PUBLISHER_ID" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
