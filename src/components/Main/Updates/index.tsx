import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
} from "@nextui-org/react";
import instaPP from "@/public/insta-pp.png";
import ytPP from "@/public/utsc-yt.jpg";
import movPP from "@/public/movemberPP.png";
import Image from "next/image";
import Link from "next/link";

export default function App() {
  return (
    <section>
      <div className="">
        <h2 className="text-4xl text-center font-bold pb-4 pt-8 text-[#640d14] dark:text-[#a24857]">
          Latest Updates
        </h2>
      </div>
      <p className="text-center">
        Find the lates about UTSC&apos;s men&apos;s ice hockey team with the
        following links:
      </p>
      <div className="grid grid-cols-3 mx-10 my-8 gap-8 max-sm:grid-cols-1">
        <Card>
          <CardHeader>
            <h4 className="text-center font-bold">Instagram</h4>
          </CardHeader>
          <CardBody>
            <Image
              src={instaPP}
              alt="Instagram"
              width={500}
              height={500}
            />
          </CardBody>
          <CardFooter>
            <Link
              href="https://www.instagram.com/utscmenstchockey/"
              target="_blank"
            >
              <Button>Follow</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <h4 className="text-center font-bold">Youtube</h4>
          </CardHeader>
          <CardBody>
            <Image
              src={ytPP}
              alt="Facebook"
              width={500}
              height={500}
            />
          </CardBody>
          <CardFooter>
            <Link
              href="https://www.youtube.com/@UTSCMensTCHockey"
              target="_blank"
            >
              <Button>Watch</Button>
            </Link>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className="text-center font-bold">
            <h4>Movember</h4>
          </CardHeader>
          <CardBody>
            <Image
              src={movPP}
              alt="Twitter"
              width={500}
              height={500}
            />
          </CardBody>
          <CardFooter>
            <Link
              href="https://ca.movember.com/donate/details?teamId=2481322#amount"
              target="_blank"
            >
              <Button>Donate</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
