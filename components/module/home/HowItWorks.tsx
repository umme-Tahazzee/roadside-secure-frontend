import Eyebrow from "@/utils/Eyebrow";
import SectionTitle from "@/utils/SectionTitle";
import card1 from "@/app/assests/img/how-it-works/Map.png";
import card2 from "@/app/assests/img/how-it-works/card2.png";
import card3 from "@/app/assests/img/how-it-works/card3.png";
import card4 from "@/app/assests/img/how-it-works/card4.png";
import Image from "next/image";
import { ChevronUp } from "lucide-react";

const steps = [
  {
    id: 1,
    img: card1,
    title: "Request Assistance",
    text: "Select your problem and share your location. We attach it to the request automatically.",
  },
  {
    id: 2,
    img: card2,
    title: "Get Matched",
    text: "Verified mechanics nearby see your request and one of them accepts it within minutes.",
  },
  {
    id: 3,
    img: card3,
    title: "Track in Real Time",
    text: "Follow your mechanic live on the map and see the exact arrival time.",
  },
  {
    id: 4,
    img: card4,
    title: "Get Back on the Road",
    text: "The mechanic finishes the job and confirms the final price with you before payment.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="mx-auto  flex w-full max-w-7xl flex-col items-center justify-center px-4"
    >
      <Eyebrow label="How it works" />
      <SectionTitle title="Get roadside help in" highlight="simple 4 steps" description="Get roadside assistance in just a few simple steps. Choose the service you need, share your location, and get connected with a nearby mechanic. Track your request as help arrives, get your vehicle back on the road, and pay after the service is completed." />

      <div className="relative grid w-full grid-cols-1 gap-6 py-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((item) => (
          <article
            key={item.id}
            className="group relative flex flex-col items-center rounded-2xl border border-border bg-card p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
          >
            {/* Step number badge */}
            <span className="absolute left-4 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground shadow-md">
              {item.id}
            </span>

            {/* Image with background circle */}
            <div className="relative flex h-[220px] w-full items-center justify-center">
              <div className="absolute h-[200px] w-[200px] rounded-full bg-primary/15 transition-transform duration-300 group-hover:scale-105" />
              <Image
                src={item.img}
                alt={item.title}
                width={300}
                height={300}
                className="relative z-10 h-full w-auto object-contain"
              />
            </div>

            {/* Content */}
            <h3 className="mt-4 text-lg font-semibold tracking-tight">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {item.text}
            </p>
            {/* Half-moon arrow connector (desktop only, last card e nai) */}
            {item.id !== steps.length && (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-full hidden h-10 w-[calc(60%+0.5rem)]
                 rounded-b-full border-x-2 border-b-2 border-dashed border-primary/40 lg:block"
              >
                <ChevronUp className="absolute -top-1 right-0 h-5 w-5 
                translate-x-1/2 text-primary" />
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
