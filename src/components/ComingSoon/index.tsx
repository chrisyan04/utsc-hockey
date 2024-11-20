import React from 'react'
import { Image } from "@nextui-org/react";

export default function ComingSoon() {
  return (
    <div className="flex justify-center items-center h-[80vh]">
      <Image
        alt="Card background"
        height={200}
        className="z-0 invert dark:invert-0"
        src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExeTh3N3Uybml3NXhuZ3JyMzduZ2ZibmxnajJyODlua2NsdTZycGtkMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/z6EG2su1f5jOTourNL/giphy.gif"
      />
    </div>
  );
}
