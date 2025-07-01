import "../styles/globals.css";
import "@whop/frosted-ui/dist/index.css";

import type { AppProps } from "next/app";
import { TooltipProvider, Toaster } from "@whop/frosted-ui";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <TooltipProvider>
      <Component {...pageProps} />
      <Toaster />
    </TooltipProvider>
  );
}

export default MyApp;
