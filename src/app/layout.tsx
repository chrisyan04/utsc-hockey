import type { Metadata } from "next";
import { Bitter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const bitter = Bitter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UTSC Tri-Campus Hockey Team",
  description:
    "The official website of the Univeristy of Toronto Scarborough's men's ice hockey team.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode & { fullWidth?: boolean };
}>) {
  const isFullWidth = (children as any)?.props?.fullWidth ?? false;

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={isFullWidth ? "" : "lg:mx-24 md:mx-12 sm:mx-8 max-sm:mx-4"}
    >
      <body className={bitter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
