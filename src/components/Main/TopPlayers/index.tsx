import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Card,
  CardHeader,
  CardBody,
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
      <div className="flex flex-wrap items-center justify-center lg:flex-nowrap">
        <div className="w-full lg:w-2/3">
          <Table
            aria-label="Top 5 Players"
            classNames={{ table: "min-h-[200px]" }}
          >
            <TableHeader>
              <TableColumn>Rank</TableColumn>
              <TableColumn>Name</TableColumn>
              <TableColumn>Position</TableColumn>
              <TableColumn>Points</TableColumn>
            </TableHeader>
            <TableBody
              items={top5Players.map((player, index) => ({
                ...player,
                rank: index + 1,
              }))}
            >
              {(item: any) => (
                <TableRow key={item.number}>
                  <TableCell>{item.rank}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.position}</TableCell>
                  <TableCell>{item.totalPoints}</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="w-full lg:w-1/3 flex flex-col gap-4 mt-8 lg:mt-0 lg:pl-8">
          <Card>
            <CardHeader>
              <h4 className="text-xl font-bold text-[#640d14] dark:text-[#a24857]">
                Team Game Record
              </h4>
            </CardHeader>
            <CardBody>
              <p className="text-center text-3xl font-bold">{"2 - 1 - 1"}</p>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h4 className="text-xl font-bold text-[#640d14] dark:text-[#a24857]">
                Latest MVP
              </h4>
            </CardHeader>
            <CardBody>
              <p className="text-center text-xl font-bold">
                {"Caleb Respicio-Jun 🏆"}
              </p>
            </CardBody>
          </Card>
        </div>
      </div>
    </section>
  );
}
