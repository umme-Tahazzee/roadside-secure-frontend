import {
  BatteryCharging,
  CircleDashed,
  Fuel,
  KeyRound,
  Truck,
  Wrench,
} from "lucide-react";

const services = [
  { icon: CircleDashed, name: "Flat tire", text: "Spare swap or on-the-spot repair." },
  { icon: BatteryCharging, name: "Battery jump start", text: "Back on the road without a tow." },
  { icon: Truck, name: "Towing", text: "Move your vehicle to a garage you choose." },
  { icon: Fuel, name: "Fuel delivery", text: "A few litres to get you to the next station." },
  { icon: KeyRound, name: "Lockout", text: "Get back into your vehicle without damage." },
  { icon: Wrench, name: "Engine trouble", text: "Diagnosis and basic fixes at the roadside." },
];

export default function Services() {
  return (
    <section id="services" className="scroll-mt-20 border-t">
      <div className="mx-auto max-w-7xl px-5 py-24">
        <div className="max-w-xl">
          <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Whatever stopped you, there&apos;s a mechanic for it.
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Pick the problem, share your location, and a verified mechanic
            nearby takes it from there.
          </p>
        </div>

     
        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.name}
              className="group bg-background p-7 transition-colors hover:bg-muted/50"
            >
              <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform duration-200 group-hover:scale-105 dark:text-teal-400">
                <s.icon className="size-5" />
              </span>
              <h3 className="mt-5 font-medium">{s.name}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {s.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}