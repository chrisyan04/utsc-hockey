import React from "react";
import Image from "next/image";
import champions from "@/public/champions.jpg";
import "./Landing.css";

export default function Landing() {
  return (
    <section className="relative flex flex-col items-center justify-center h-[80vh]">
      {/* Background Image */}
      <div className="absolute inset-0 h-[80vh]">
        <Image
          src={champions}
          alt="Champions"
          layout="fill"
          objectFit="cover"
          className="opacity-70"
          priority
        />
      </div>

      {/* Dark Overlay Behind the Text */}
      <div className="absolute inset-0 bg-black opacity-40 h-[80vh]"></div>

      {/* Overlay Content */}
      <div className="relative text-center z-10 px-4">
        <h1 className="text-6xl text-gray-300 dark:text-white font-bold drop-shadow-[0_0_20px_rgba(0,0,0,0.7)] mb-24 text-shadow-xl">
          UTSC Men's Ice Hockey
        </h1>
        <h2 className="brotherhood text-4xl text-[#a03b4c] dark:text-[#a24857] drop-shadow-[0_0_20px_rgba(0,0,0,0.7)] mt-4 text-shadow-lg">
          {"'Brotherhood of Champions'"}
        </h2>
      </div>
    </section>
  );
}

