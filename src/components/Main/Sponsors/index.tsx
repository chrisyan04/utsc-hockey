'use client'

import { secureHeapUsed } from "crypto";
import React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import havenBarbers from "@/public/Sponsors/haven-barbers.svg";
import rosasPasta from "@/public/Sponsors/rosas-pasta.svg";
import swift from "@/public/Sponsors/swift.svg";
import Image from "next/image";

export default function Sponsors() {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => setWindowWidth(window.innerWidth);

    updateWidth();

    window.addEventListener("resize", updateWidth);

    return () => window.removeEventListener("resize", updateWidth);
  }, []);
  const sponsors = [havenBarbers, rosasPasta, swift, havenBarbers, rosasPasta, swift];

  const settings = {
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    // centerMode: true,
    autoplaySpeed: 2500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };

  return (
    <section id="sponsors" className="my-16">
      <div className="mt-2 mb-8">
        <h2 className="text-5xl text-center font-bold pb-4 pt-8 text-[#640d14] dark:text-[#a24857]">
          Sponsored By
        </h2>
        <div className="flex items-center justify-center max-sm:flex-col">
          <p className="mx-2">Interested in sponsoring us? Contact us here:</p>
          <Link href="/contact" className="mx-2 max-sm:pt-2">
            <Button className="bg-[#640d14] dark:bg-[#a24857] text-white text-sm">
              {"Join Us!"}
            </Button>
          </Link>
        </div>
      </div>

      <div className="carousel-container">
        <Slider {...settings}>
          {sponsors.map((logo, index) => (
            <div key={index} className="flex justify-center">
              <Image
                src={logo}
                alt={`Sponsor ${index + 1}`}
                height={windowWidth < 768 ? 100 : 200}
                objectFit="contain"
                className={
                  logo === havenBarbers || logo === swift
                    ? "invert dark:invert-0"
                    : ""
                }
              />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
