import { type Session } from "next-auth";
import { type AppType } from "next/app";

import { Toaster } from "@/components/ui/sonner";

import "@/styles/globals.css";
import { Header } from "@/components/header/header";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { ...pageProps },
}) => {
  return (
    <>
      <Header
        navItems={[
          { link: "/", name: "Home" },
          { link: "about", name: "About" },
          { link: "upload", name: "Upload" },
          { link: "status", name: "Status" },
        ]}
      />
      <Component {...pageProps} />
      <Toaster />
    </>
  );
};

export default MyApp;
