import React from "react";
import Image from "next/image";
import logo from "@/public/logo.webp";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white text-black dark:bg-black dark:text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <hr className="my-4 border-t-2 border-opacity-30" />
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center">
            <Image src={logo} alt="logo" height={50} />
            <div className="text-center md:text-left px-6">
              <h1 className="text-xl font-bold">UTSC Men's Hockey</h1>
              <p className="text-sm">
                Proudly representing the University of Toronto Scarborough.
              </p>
            </div>
          </div>
          <div className="text-center md:text-right">
            <p className="text-sm px-2">Developed by Chris Yan</p>
          </div>
        </div>

        <hr className="my-3 border-t-0.5 border-opacity-30" />

        <div className="text-center text-sm">
          &copy; {currentYear} UTSC Men's Hockey. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
