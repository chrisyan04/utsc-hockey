import React, { useState } from "react";
import Image from "next/image";
import plusIcon from "@/public/Icons/plus.svg";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Input,
  ModalBody,
  useDisclosure,
} from "@nextui-org/react";

export default function AddPlayer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [players, setPlayers] = useState([]);
  const [newPlayer, setNewPlayer] = useState({
    name: "",
    number: 0,
    position: "",
    dob: "",
    shoots: "",
    hometown: "",
    height: "",
    weight: "",
    stats: {
      year: 2024,
      gamesPlayed: 0,
      goals: 0,
      assists: 0,
      points: 0,
      pim: 0,
    },
  });
  const [error, setError] = useState("");

  const fetchPlayers = async () => {
    const res = await fetch("/api/players");
    const data = await res.json();
    setPlayers(data);
  }

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    if (name === "number") {
      setNewPlayer((prevState) => ({ ...prevState, [name]: parseInt(value) }));
    } else if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setNewPlayer((prevState) => ({
        ...prevState,
        [parent]: {
          ...(prevState as any)[parent],
          [child]: value,
        },
      }));
    } else {
      setNewPlayer((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    //@ts-ignore
    const existingPlayer = players.find(player => player.name === newPlayer.name || player.number === newPlayer.number);
    if (existingPlayer) {
      setError("Player/Number already exists");
    } else {
      const response = await fetch("/api/players", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPlayer),
      });

      if (response.ok) {
        onClose();
      } else {
        setError("Failed to create player");
      }
    }
  }

  return (
    <div className="flex items-center">
      <Button onClick={onOpen}>
        <Image
          src={plusIcon}
          alt="add player"
          height={50}
          width={50}
          className="dark:invert"
        />
      </Button>
      <h2 className="text-2xl mx-4 text-transparent bg-gradient-to-tr from-gray-400 to-red-700 bg-clip-text">
        Add A New Player
      </h2>
      <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Create a New Player</ModalHeader>
              <ModalBody>
                <Input
                  type="text"
                  label="Name"
                  placeholder="Enter player's name"
                  isRequired
                  isClearable
                  onChange={handleInputChange}
                />
                <Input
                  type="number"
                  label="Number"
                  placeholder="Enter player's number"
                  isRequired
                  isClearable
                  onChange={handleInputChange}
                />
                <Input
                  type="text"
                  label="Position"
                  placeholder="Enter player's position"
                  isRequired
                  isClearable
                  onChange={handleInputChange}
                />
                <Input
                  type="text"
                  label="DOB"
                  placeholder="Enter player's date of birth"
                  isRequired
                  isClearable
                  onChange={handleInputChange}
                />
                <Input
                  type="text"
                  label="Shoots"
                  placeholder="Enter player's shoots"
                  isRequired
                  isClearable
                  onChange={handleInputChange}
                />
                <Input
                  type="text"
                  label="Hometown"
                  placeholder="Enter player's hometown"
                  isRequired
                  isClearable
                  onChange={handleInputChange}
                />
                <Input
                  type="text"
                  label="Height"
                  placeholder="Enter player's height"
                  isRequired
                  isClearable
                  onChange={handleInputChange}
                />
                <Input
                  type="text"
                  label="Weight"
                  placeholder="Enter player's weight"
                  isRequired
                  isClearable
                  onChange={handleInputChange}
                />
              </ModalBody>
              <ModalFooter>
                {error && <p className="text-md text-transparent bg-gradient-to-tr from-gray-400 to-red-700 bg-clip-text">{error}</p>}
                <Button variant="light" color="danger" onPress={onClose}>
                  Cancel
                </Button>
                <Button variant="light" color="success" onPress={handleSubmit}>
                  Create
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
