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
  Button,
} from "@nextui-org/react";
// import { useAsyncList } from "@react-stately/data";
import { getSheetData } from "@/app/api/actions/google-sheets.action";

export default function Roster() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  interface Player {
    name: string;
    position: string;
    number: string;
    dob: string;
    shoots?: string;
    hometown?: string;
    height?: string;
    weight?: string;
  }

  const [roster, setRoster] = useState<Player[]>([]);
  const [loadingSheetData, setLoadingSheetData] = useState(false);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "name",
    direction: "ascending",
  });

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

  useEffect(() => {
    const fetchRosterData = async () => {
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
              // Reference data by header names instead of array indexes
              const player: Player = {
                name: item[headers.indexOf("name")],
                position: item[headers.indexOf("position")],
                number: item[headers.indexOf("number")],
                dob: item[headers.indexOf("dob")],
                shoots: item[headers.indexOf("shoots")],
                hometown: item[headers.indexOf("hometown")],
                height: item[headers.indexOf("height")],
                weight: item[headers.indexOf("weight")],
              };
              return player;
            });
          setRoster(players);
        } else {
          console.error("No data returned from Google Sheets.");
        }
      } catch (error) {
        console.error("Error fetching sheet data:", error);
      }
      setLoadingSheetData(false);
    };
    fetchRosterData();
  }, []);

  const onSortChange = (newSortDescriptor: {
    column: string;
    direction: string;
  }) => {
    setSortDescriptor(newSortDescriptor);
    const sortedRoster = [...roster].sort((a, b) => {
      //@ts-ignore
      const first = a[newSortDescriptor.column];
      //@ts-ignore
      const second = b[newSortDescriptor.column];
      let cmp =
        (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;

      if (newSortDescriptor.direction === "descending") {
        cmp *= -1;
      }
      return cmp;
    });
    setRoster(sortedRoster);
  };

  const columns = [
    <TableColumn key="name" align="start">
      Name
    </TableColumn>,
    <TableColumn key="position" align="start">
      Position
    </TableColumn>,
    <TableColumn key="number" align="start">
      Number
    </TableColumn>,
    <TableColumn key="dob" align="start">
      DoB
    </TableColumn>,
  ];

  if (!isSmallScreen) {
    columns.push(
      <TableColumn key="shoots" align="start">
        Shoots
      </TableColumn>,
      <TableColumn key="hometown" align="start">
        Hometown
      </TableColumn>,
      <TableColumn key="height" align="start">
        Height
      </TableColumn>,
      <TableColumn key="weight" align="start">
        Weight
      </TableColumn>
    );
  }

  const currentYear = 2024;
  const nextYear = currentYear + 1;

  return (
    <section className="mb-12">
      <div className="">
        <h2 className="text-4xl text-center font-bold pb-4 pt-8 text-[#640d14] dark:text-[#a24857]">
          UTSC Men's Hockey Roster
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
        // sortDescriptor={{ column: "name", direction: "ascending" }}
        // onSortChange={onSortChange}
      >
        <TableHeader>{columns}</TableHeader>
        <TableBody
          items={roster}
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
