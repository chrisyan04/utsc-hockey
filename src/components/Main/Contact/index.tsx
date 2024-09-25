import React from 'react'
import {Card, CardBody} from '@nextui-org/react'

export default function Contact() {
  return (
    <section className="flex justify-center items-center">
      <Card className="my-32">
        <CardBody>
          <h1 className="text-4xl font-bold text-center flex text-[#640d14] dark:text-[#a24857]">
            {"Contact Us:"}&nbsp;&nbsp;
            <span className="font-normal">{"utscicehockey@gmail.com"}</span>
          </h1>
        </CardBody>
      </Card>
    </section>
  );
}
