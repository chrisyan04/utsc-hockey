"use client";

import React from "react";
import { getSheetData } from "@/app/api/actions/google-sheets.action";
import { Button } from "@nextui-org/react";

export default function TestData() {

  const handleOnGetSheetDataClick = async () => {
    const response = await getSheetData();
    console.log(response);
  };
  
  return (
    <div>
      <Button onClick={handleOnGetSheetDataClick}>Get Sheet Data</Button>
    </div>
  )
}
