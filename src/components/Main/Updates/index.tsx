import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Button,
} from "@nextui-org/react";

export default function App() {
  return (
    <section>
      <div className="">
        <h2 className="text-4xl text-center font-bold pb-4 pt-8 text-[#640d14] dark:text-[#a24857]">
          Recent Updates
        </h2>
      </div>
      <div className="grid grid-cols-5 mx-10 my-8">
        <Card className="h-[200px] border">
          <CardHeader className="absolute z-10 top-1 flex-col !items-start">
            <p className="text-tiny text-white/60 uppercase font-bold">{""}</p>
            <h4 className="text-white font-medium text-large">{""}</h4>
          </CardHeader>
          <Image
            removeWrapper
            alt="Card background"
            className="z-0 w-full h-full object-fill invert dark:invert-0"
            src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExeTh3N3Uybml3NXhuZ3JyMzduZ2ZibmxnajJyODlua2NsdTZycGtkMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/z6EG2su1f5jOTourNL/giphy.gif"
          />
        </Card>
      </div>
    </section>
  );
}
