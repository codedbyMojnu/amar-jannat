// pages/\_app.tsx

import { Analytics } from "@vercel/analytics/react";
import type { AppProps } from "next/app";
import ProgressBar from "../components/ProgressBar";
import "../styles/mdx-table.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ProgressBar />
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}

export default MyApp;
