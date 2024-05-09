"use client";

import * as React from "react";
import {
  NextUIProvider,
  Divider,
  Modal,
  Input,
  ModalBody,
  ModalHeader,
  ModalContent,
  ModalFooter,
  Button,
  Spinner,
} from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useState } from "react";
import bcrypt from "bcryptjs";
import Roster from "@/components/AdminSide/Roster";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";

export default function Admin() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handelPasswordSubmit = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admins", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const admins = await res.json();
      for (let admin of admins) {
        const match = await bcrypt.compare(password, admin.password);
        if (match) {
          setIsModalOpen(false);
          return;
        }
      }
    } catch (error) {
      console.error("Error submitting password:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="light">
        <Modal
          backdrop="blur"
          isOpen={isModalOpen}
          onClose={() => {}}
          hideCloseButton
        >
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1">
              Enter Admin Password
            </ModalHeader>
            <ModalBody>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                label="Password"
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                      <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
                type={isVisible ? "text" : "password"}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                color="default"
                onClick={handelPasswordSubmit}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Spinner color="default" className="dark:invert" />
                ) : (
                  "Submit"
                )}
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        {!isModalOpen && (
          <main className="bg-white dark:bg-black">
            <h2 className="text-5xl text-center p-8 text-transparent bg-gradient-to-tr from-gray-400 to-red-700 bg-clip-text">
              {"ADMIN PAGE"}
            </h2>
            <Divider />
            <div className="flex flex-col">
              <h3 className="text-center text-3xl p-4 text-transparent bg-gradient-to-tr from-gray-400 to-red-700 bg-clip-text">
                Modify Roster
              </h3>
              <Roster />
            </div>
          </main>
        )}
      </NextThemesProvider>
    </NextUIProvider>
  );
}
