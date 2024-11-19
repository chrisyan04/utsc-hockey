import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { getSheetData } from "@/app/api/actions/google-sheets.action";

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

export default function TopPlayers() {
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    const fetchStatsData = async () => {
      try {
        const response = await getSheetData();
        if (response && response.data) {
          const headers = response.data[0].map((header: string) =>
            header.toLowerCase()
          );
          const playersList: Player[] = response.data
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
          setPlayers(playersList);
        } else {
          console.error("No data returned from Google Sheets.");
        }
      } catch (error) {
        console.error("Error fetching sheet data:", error);
      }
    };

    fetchStatsData();
  }, []);

  const playersWithPoints = players.map((player) => {
    const totalPoints = parseInt(player.g || "0") + parseInt(player.a || "0");
    return { ...player, totalPoints };
  });

  const top5Players = playersWithPoints
    .sort((a, b) => b.totalPoints - a.totalPoints)
    .slice(0, 5);

  return (
    <section className="mb-12">
      <h2 className="text-4xl text-center font-bold pb-4 pt-8 text-[#640d14] dark:text-[#a24857]">
        Top 5 Performers
      </h2>
      <Table aria-label="Top 5 Players" classNames={{ table: "min-h-[200px]" }}>
        <TableHeader>
          <TableColumn>Name</TableColumn>
          <TableColumn>Position</TableColumn>
          <TableColumn>Points</TableColumn>
        </TableHeader>
        <TableBody items={top5Players}>
          {(item: any) => (
            <TableRow key={item.number}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.position}</TableCell>
              <TableCell>{item.totalPoints}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </section>
  );
}
