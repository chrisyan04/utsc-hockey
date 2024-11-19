"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import Navbar from "@/components/Navbar";
import Awards from "@/components/Main/Awards";
import ComingSoon from "@/components/ComingSoon";

export default function Home() {
  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="light">
        <main className="bg-white dark:bg-black">
          <Navbar />
          <ComingSoon />
          {/* <Awards /> */}
        </main>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
