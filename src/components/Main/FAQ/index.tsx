import React from 'react'
import {Accordion, AccordionItem} from "@nextui-org/react";

export default function FAQ() {
  return (
    <section className="mt-20 mb-12">
      <h2 className="text-4xl font-bold text-center my-10 text-[#640d14] dark:text-[#a24857]">
        Frequently Asked Questions
      </h2>
      <Accordion variant="shadow">
        <AccordionItem key="1" aria-label="Who are we?" title="Who are we?">
          We are the tri-campus (Div 1) intramural men&apos;s ice hockey team at
          the University of Toronto Scarborough. We compete in the UofT
          Intramural League against other UofT campuses. We are a competitive
          team that plays for the love of the game and the amazing community
          around it. We are not affiliated with the Varsity Blues hockey team.
        </AccordionItem>
        <AccordionItem
          key="2"
          aria-label="How can I play on this team?"
          title="How can I play on this team?"
        >
          Every year we hold tryouts for the team in the second and third weeks
          of the fall semester. The tryouts are open to all UofT students. If
          you are interested in joining the team, follow us on social media for
          updates on tryouts and practices.
        </AccordionItem>
        <AccordionItem
          key="3"
          aria-label="Are tryouts over?"
          title="Are tryouts over?"
        >
          Currently, the tryouts for the 2024-2025 season are over. The team has
          been finalized and the roster has been released. Keep an eye on our
          socials for updates on the next season.
        </AccordionItem>
        <AccordionItem
          key="4"
          aria-label="When and where do games take place?"
          title="When and where do games take place?"
        >
          Games are held at the Varsity Arena on the St. George campus and occur
          on Tuesday nights. The schedule for the games will be released soon.
          Keep an eye on our socials for updates.
        </AccordionItem>
        <AccordionItem
          key="5"
          aria-label="When is the first game?"
          title="When is the first game?"
        >
          The first game of the 2024-2024 season will be released soon. Keep an
          eye on our socials.
        </AccordionItem>
      </Accordion>
    </section>
  );
}
