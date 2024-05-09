"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Spinner,
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Button,
  Input,
  ModalBody,
  useDisclosure,
} from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";

interface RosterRow {
  name: string;
  position: string;
  number: number;
  dob: string;
  shoots: string;
  hometown: string;
  height: string;
  weight: string;
}

export default function Roster() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedRow, setSelectedRow] = useState<RosterRow | null>(null);
  const [updatedNumber, setUpdatedNumber] = useState<number | null>(null);
  const [updatedPosition, setUpdatedPosition] = useState<string | null>(null);
  const [updatedDob, setUpdatedDob] = useState<string | null>(null);
  const [updatedShoots, setUpdatedShoots] = useState<string | null>(null);
  const [updatedHometown, setUpdatedHometown] = useState<string | null>(null);
  const [updatedHeight, setUpdatedHeight] = useState<string | null>(null);
  const [updatedWeight, setUpdatedWeight] = useState<string | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 980);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  let list = useAsyncList({
    async load({ signal }) {
      let res = await fetch("/api/players", {
        signal,
      });
      let json = await res.json();
      setIsLoading(false);

      if (Array.isArray(json)) {
        return {
          items: json,
        };
      } else {
        console.error("Expected an array for response, got", json);
        return {
          items: [],
        };
      }
    },

    async sort({ items, sortDescriptor }) {
      return {
        items: items.sort((a, b) => {
          //@ts-ignore
          let first = a[sortDescriptor.column];
          //@ts-ignore
          let second = b[sortDescriptor.column];
          let cmp =
            (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;

          if (sortDescriptor.direction === "descending") {
            cmp *= -1;
          }

          return cmp;
        }),
      };
    },
  });

  useEffect(() => {
    if (selectedRow) {
      onOpen();
    }
  }, [selectedRow]);

  const columns = [
    <TableColumn key="name" allowsSorting align="start">
      Name
    </TableColumn>,
    <TableColumn key="position" allowsSorting align="start">
      Position
    </TableColumn>,
    <TableColumn key="number" allowsSorting align="start">
      Number
    </TableColumn>,
    <TableColumn key="dob" allowsSorting align="start">
      DoB
    </TableColumn>,
  ];

  if (!isSmallScreen) {
    columns.push(
      <TableColumn key="shoots" allowsSorting align="start">
        Shoots
      </TableColumn>,
      <TableColumn key="hometown" allowsSorting align="start">
        Hometown
      </TableColumn>,
      <TableColumn key="height" allowsSorting align="start">
        Height
      </TableColumn>,
      <TableColumn key="weight" allowsSorting align="start">
        Weight
      </TableColumn>
    );
  }

  const updatePlayer = async () => {
    if (!selectedRow) return;

    const updatedData = {
      number: updatedNumber,
      position: updatedPosition,
      dob: updatedDob,
      shoots: updatedShoots,
      hometown: updatedHometown,
      height: updatedHeight,
      weight: updatedWeight,
    };

    console.log(updatedData);
    console.log(selectedRow.name)

    const res = await fetch(`/api/players`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    if (!res.ok) {
      console.error("Failed to update player");
      return;
    }
    list.reload();
    onClose();
  }

  return (
    <>
      <Table
        aria-label="roster"
        sortDescriptor={list.sortDescriptor}
        onSortChange={list.sort}
        classNames={{
          table: "min-h-[400px]",
        }}
        isHeaderSticky
        selectionMode="single"
        defaultSelectedKeys={["1"]}
        onRowAction={(number: any) => {
          const parsedNumber = parseInt(number);
          if (isNaN(parsedNumber)) {
            console.error(`Invalid number: ${number}`);
            return;
          }

          const item = list.items.find(
            // @ts-ignore
            (item: RosterRow) => item.number === parsedNumber
          ) as RosterRow;

          if (item) {
            const rosterRow: RosterRow = {
              name: item.name,
              position: item.position,
              number: item.number,
              dob: item.dob,
              shoots: item.shoots,
              hometown: item.hometown,
              height: item.height,
              weight: item.weight,
            };
            setSelectedRow(rosterRow);
            setUpdatedNumber(item.number);
            setUpdatedPosition(item.position);
            setUpdatedDob(item.dob);
            setUpdatedShoots(item.shoots);
            setUpdatedHometown(item.hometown);
            setUpdatedHeight(item.height);
            setUpdatedWeight(item.weight);
          }
        }}
      >
        <TableHeader>{columns}</TableHeader>
        <TableBody
          items={list.items}
          isLoading={isLoading}
          loadingContent={<Spinner label="Loading..." color="default" />}
          emptyContent={"No rows to display."}
        >
          {(item: any) => (
            <TableRow key={item.number}>
              {(columnKey) => (
                <TableCell>{getKeyValue(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex gap-1">
                Info of :
                <span className="text-xl text-transparent bg-gradient-to-tr from-gray-400 to-red-700 bg-clip-text pl-8">
                  {selectedRow?.name}&nbsp;{" #"}{selectedRow?.number}
                </span>
              </ModalHeader>
              <ModalBody>
                {selectedRow ? (
                  <>
                    <Input
                      type="text"
                      label="Position"
                      defaultValue={selectedRow.position}
                      onChange={(e) => setUpdatedPosition(e.target.value)}
                    />
                    <Input
                      type="text"
                      label="Date of Birth"
                      defaultValue={selectedRow.dob}
                      onChange={(e) => setUpdatedDob(e.target.value)}
                    />
                    <Input
                      type="text"
                      label="Shoots"
                      defaultValue={selectedRow.shoots}
                      onChange={(e) => setUpdatedShoots(e.target.value)}
                    />
                    <Input
                      type="text"
                      label="Hometown"
                      defaultValue={selectedRow.hometown}
                      onChange={(e) => setUpdatedHometown(e.target.value)}
                    />
                    <Input
                      type="text"
                      label="Height"
                      defaultValue={selectedRow.height}
                      onChange={(e) => setUpdatedHeight(e.target.value)}
                    />
                    <Input
                      type="text"
                      label="Weight"
                      defaultValue={selectedRow.weight}
                      onChange={(e) => setUpdatedWeight(e.target.value)}
                    />
                  </>
                ) : (
                  <p>No row selected</p>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  {"Delete"}
                </Button>
                <Button color="success" variant="light" onPress={updatePlayer}>
                  {"Update"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
