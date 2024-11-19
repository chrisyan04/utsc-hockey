import React, { useState } from "react";
import {
  Navbar as NextUiNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import Link from "next/link";
import Image from "next/image";
import downIcon from "@/public/Icons/down-dark.svg";
import logo from "@/public/logo.webp";
import DarkModeToggle from "./DarkMode";
import xIcon from "@/public/Icons/x.svg";
import instaIcon from "@/public/Icons/instagram.svg";
import youtubeIcon from "@/public/Icons/youtube.svg";
import fbIcon from "@/public/Icons/facebook.svg";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: "Home", url: "/" },
    { label: "Roster", url: "/roster" },
    { label: "Stats", url: "/stats" },
    { label: "Awards", url: "/awards" },
    { label: "Schedule", url: "/schedule" },
    { label: "Updates", url: "/news" },
    { label: "Join Us", url: "/contact" },
  ];

  return (
    <div className="py-2">
      <NextUiNavbar
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        className="max-sm:-mx-5"
      >
        <NavbarContent justify="start">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            <Link href="/">
              <Image
                priority
                src={logo}
                alt="logo"
                height={50}
                width={50}
                className="rounded-lg max-sm:hidden"
              />
            </Link>
          </NavbarBrand>
        </NavbarContent>
        <NavbarContent justify="center">
          <NavbarItem className="max-sm:hidden md:hidden sm:hidden">
            <DarkModeToggle />
          </NavbarItem>
          <NavbarItem className="max-sm:hidden md:hidden sm:hidden">
            <Link href="https://www.chrisyan.ca/" target="_blank">
              <Image
                src={xIcon}
                alt="X"
                height={30}
                width={30}
                className="dark:invert"
              />
            </Link>
          </NavbarItem>
          <NavbarItem className="max-sm:hidden md:hidden sm:hidden">
            <Link href="https://www.chrisyan.ca/" target="_blank">
              <Image
                src={instaIcon}
                alt="instagram"
                height={30}
                width={30}
                className="dark:invert"
              />
            </Link>
          </NavbarItem>
          <NavbarItem className="max-sm:hidden md:hidden sm:hidden">
            <Link href="https://www.chrisyan.ca/" target="_blank">
              <Image
                src={fbIcon}
                alt="facebook"
                height={30}
                width={30}
                className="dark:invert"
              />
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link href="/">
              <Button>{"Home"}</Button>
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Dropdown>
              <DropdownTrigger>
                <Button className="flex">
                  {"Team"}
                  <Image
                    src={downIcon}
                    alt="down dark"
                    height={20}
                    width={20}
                    className="dark:invert"
                  />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="team page" disabledKeys={[]}>
                <DropdownItem key="roster" href="/roster">
                  {"Roster"}
                </DropdownItem>
                <DropdownItem key="stats" href="/stats">
                  {"Stats"}
                </DropdownItem>
                <DropdownItem key="awards" href="/awards">
                  {"Awards"}
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
          <NavbarItem>
            <Link href="/schedule">
              <Button>{"Schedule"}</Button>
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/news">
              <Button>{"Updates"}</Button>
            </Link>
          </NavbarItem>
          <NavbarItem>
            <DarkModeToggle />
          </NavbarItem>
          <NavbarItem className="">
            <Link href="/comingsoon" target="_blank">
              <Image
                src={xIcon}
                alt="X"
                height={30}
                width={30}
                className="dark:invert"
              />
            </Link>
          </NavbarItem>
          <NavbarItem className="">
            <Link
              href="https://www.instagram.com/utscmenstchockey/"
              target="_blank"
            >
              <Image
                src={instaIcon}
                alt="instagram"
                height={30}
                width={30}
                className="dark:invert"
              />
            </Link>
          </NavbarItem>
          <NavbarItem className="">
            <Link
              href="https://www.youtube.com/@UTSCMensTCHockey"
              target="_blank"
            >
              <Image
                src={youtubeIcon}
                alt="youtube"
                height={40}
                width={40}
                className="dark:invert"
              />
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end" className="-mr-10">
          <NavbarItem className="">
            <Link href="/contact">
              <Button className="bg-[#640d14] dark:bg-[#a24857] text-white text-sm">
                {"Join Us!"}
              </Button>
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarMenu className="overflow-hidden">
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item.label}-${index}`}>
              <Link className={`w-full`} href={item.url}>
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
          <DarkModeToggle />
        </NavbarMenu>
      </NextUiNavbar>
    </div>
  );
}
