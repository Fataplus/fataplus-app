import { NextLayout } from "@/types/app-dir";
import { Theme } from "frosted-ui";
import "frosted-ui/styles.css";
import "./globals.css";

export const metadata = {
  title: "Fataplus : Connecter, apprendre, cultiver – ensemble",
  description: "La plateforme pour connecter, apprendre et cultiver vos compétences.",
  icons: {
    icon: [{ url: "/logo.svg" }, new URL("/logo.svg", "https://whop.com")],
  },
};

const RootLayout: NextLayout = ({ children }) => {
  return (
    <html lang="fr">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <Theme>{children}</Theme>
      </body>
    </html>
  );
};

export default RootLayout;
