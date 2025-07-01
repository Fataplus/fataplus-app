import "../styles/globals.css";
import "frosted-ui/styles.css";

import type { AppProps } from "next/app";
import { Theme } from "frosted-ui";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Theme>
      <Component {...pageProps} />
    </Theme>
  );
}

export default MyApp;
