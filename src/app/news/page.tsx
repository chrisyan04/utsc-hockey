"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import Navbar from "@/components/Navbar";
import Updates from "@/components/Main/Updates";
import FAQ from "@/components/Main/FAQ";

export default function Home() {
  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="light">
        <main className="bg-white dark:bg-black">
          <Navbar />
          <Updates />
          <FAQ />
        </main>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
