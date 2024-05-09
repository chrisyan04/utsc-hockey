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

export default function Roster() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

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

  return (
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
  );
}
