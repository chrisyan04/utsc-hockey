"use client";

import { Switch } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { MoonIcon } from "./MoonIcon";
import { SunIcon } from "./SunIcon";
import { useTheme } from "next-themes";

export default function DarkModeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isSelected, setIsSelected] = useState(theme === "dark");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      setIsSelected(theme === "dark");
    }
  }, [theme, mounted]);

  if (!mounted) return null;

  return (
    <Switch
      isSelected={isSelected}
      size="md"
      color="default"
      className="dark"
      thumbIcon={({ isSelected, className }) =>
        isSelected ? (
          <MoonIcon className={className} />
        ) : (
          <SunIcon className={className} />
        )
      }
      onChange={(event) => {
        const isSelected = event.target.checked;
        setIsSelected(isSelected);
        setTheme(isSelected ? "dark" : "light");
      }}
    />
  );
}
