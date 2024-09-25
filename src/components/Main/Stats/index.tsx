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
import { stats } from "@/data/stats";

export default function Roster() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [statistics, setStatistics] = useState(stats);

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

  // let list = useAsyncList({
  //   async load({ signal }) {
  //     let res = await fetch("/api/players", {
  //       signal,
  //     });
  //     let json = await res.json();
  //     setIsLoading(false);

  //     if (Array.isArray(json)) {
  //       return {
  //         items: json,
  //       };
  //     } else {
  //       console.error("Expected an array for response, got", json);
  //       return {
  //         items: [],
  //       };
  //     }
  // },

  // async sort({ items, sortDescriptor }) {
  //   return {
  //     items: items.sort((a, b) => {
  //       //@ts-ignore
  //       let first = a[sortDescriptor.column];
  //       //@ts-ignore
  //       let second = b[sortDescriptor.column];
  //       let cmp =
  //         (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;

  //       if (sortDescriptor.direction === "descending") {
  //         cmp *= -1;
  //       }

  //       return cmp;
  //     }),
  //   };
  // },
  // });

  const sortRoster = (sortDescriptor: {
    column: string;
    direction: string;
  }) => {
    const sortedRoster = [...statistics].sort((a, b) => {
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
    });
    setStatistics(sortedRoster);
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
    <TableColumn key="gp" align="start">
      GP
    </TableColumn>,
  ];

  if (!isSmallScreen) {
    columns.push(
      <TableColumn key="g" align="start">
        G
      </TableColumn>,
      <TableColumn key="a" align="start">
        A
      </TableColumn>,
      <TableColumn key="p" align="start">
        P
      </TableColumn>,
      <TableColumn key="pim" align="start">
        PIM
      </TableColumn>
    );
  }

  const currentYear = 2024;
  const nextYear = currentYear + 1;

  return (
    <section>
      <div className="">
        <h2 className="text-4xl text-center font-bold pb-4 pt-8 text-[#640d14] dark:text-[#a24857]">
          UTSC Men's Hockey Statistics
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
        // onSortChange={sortRoster}
      >
        <TableHeader>{columns}</TableHeader>
        <TableBody
          items={statistics}
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
