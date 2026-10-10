const steps = [
  {
    title: "Share your location",
    text: "Pick the problem. Your browser location is attached to the request.",
  },
  {
    title: "A mechanic accepts",
    text: "Verified mechanics nearby see your job and one of them takes it.",
  },
  {
    title: "Get fixed, then pay",
    text: "The mechanic completes the job and confirms the price with you.",
  },
];



export default function HowItWorks() {
  return (
     <section id="how-it-works" className="scroll-mt-20 border-t bg-primary/15">
      
          <div className="mx-auto max-w-7xl px-5 py-24">
            <h2 className="max-w-md text-3xl font-semibold tracking-tight">
              From breakdown to back on the road.
            </h2>
            <ol className="mt-12 grid gap-10 md:grid-cols-3">
              {steps.map((s, i) => (
                <li key={s.title}>
                  <span className="flex size-8 items-center justify-center rounded-full border bg-background text-sm font-medium">
                    {i + 1}
                  </span>
                  <h3 className="mt-4 font-medium">{s.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {s.text}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>
  )
}
