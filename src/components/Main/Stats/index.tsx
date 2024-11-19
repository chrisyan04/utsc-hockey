'use client'

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
} from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";
import { getSheetData } from "@/app/api/actions/google-sheets.action";

export default function Roster() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setIsSmallScreen(window.innerWidth < 980);
      };

      handleResize();
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  interface Player {
    name: string;
    position: string;
    number: string;
    gp: string;
    g?: string;
    a?: string;
    p?: string;
    pim?: string;
  }

  const [stats, setStats] = useState<Player[]>([]);
  const [loadingSheetData, setLoadingSheetData] = useState(false);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "name",
    direction: "ascending",
  });

  useEffect(() => {
    const fetchStatsData = async () => {
      setLoadingSheetData(true);
      try {
        const response = await getSheetData();
        if (response && response.data) {
          const headers = response.data[0].map((header: string) =>
            header.toLowerCase()
          );
          const players: Player[] = response.data
            .slice(1)
            .map((item: any[]) => {
              
              const player: Player = {
                name: item[headers.indexOf("name")],
                position: item[headers.indexOf("position")],
                number: item[headers.indexOf("number")],
                gp: item[headers.indexOf("tgp")],
                g: item[headers.indexOf("tg")],
                a: item[headers.indexOf("ta")],
                p: item[headers.indexOf("tp")],
                pim: item[headers.indexOf("tpim")],
              };
              return player;
            });
          setStats(players);
        } else {
          console.error("No data returned from Google Sheets.");
        }
      } catch (error) {
        console.error("Error fetching sheet data:", error);
      }
      setLoadingSheetData(false);
    };
    fetchStatsData();
  }, []);

  const columns = [
    <TableColumn key="name" align="start">
      Name
    </TableColumn>,
    <TableColumn key="gp" align="start">
      GP
    </TableColumn>,
    <TableColumn key="g" align="start">
      G
    </TableColumn>,
    <TableColumn key="a" align="start">
      A
    </TableColumn>,
    <TableColumn key="p" align="start">
      P
    </TableColumn>,
  ];

  if (!isSmallScreen) {
    columns.push(
      <TableColumn key="pim" align="start">
        PIM
      </TableColumn>,
      <TableColumn key="position" align="start">
        Position
      </TableColumn>,
      <TableColumn key="number" align="start">
        Number
      </TableColumn>
    );
  }

  const currentYear = 2024;
  const nextYear = currentYear + 1;

  return (
    <section className="mb-12">
      <div className="">
        <h2 className="text-4xl text-center font-bold pb-4 pt-8 text-[#640d14] dark:text-[#a24857]">
          UTSC Men&apos;s Hockey Stats
        </h2>
        <p className="text-xl text-center pb-4 text-[#640d14] dark:text-[#a24857]">
          {currentYear} - {nextYear}
        </p>
      </div>
      <Table
        aria-label="roster"
        classNames={{
          table: "min-h-[200px]",
        }}
        isHeaderSticky
        selectionMode="single"
        defaultSelectedKeys={["1"]}
        sortDescriptor={{
          column: "name",
          direction: "ascending",
        }}
      >
        <TableHeader>{columns}</TableHeader>
        <TableBody
          items={stats}
          // isLoading={isLoading}
          // loadingContent={<Spinner label="Loading..." color="default" />}
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
    </section>
  );
}
