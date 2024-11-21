"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import Landing from "@/components/Main/Landing";
import Navbar from "@/components/Navbar";
import Sponsors from "@/components/Main/Sponsors";
import TopPlayers from "@/components/Main/TopPlayers";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="light">
        <main className="bg-white dark:bg-black">
          <Navbar />
          <Landing />
          <Sponsors />
          <TopPlayers />
          <Footer />
        </main>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
