
const faqs = [
  {
    q: "How do I request help?",
    a: "Create an account, verify your email with the 6-digit code, then choose a service and send your request. Your location is shared from your browser.",
  },
  {
    q: "How are mechanics verified?",
    a: "Mechanics upload their documents during onboarding. An admin reviews and approves each one before they can accept jobs.",
  },
  {
    q: "How do I pay?",
    a: "You pay the mechanic once the job is complete. Cash payment is confirmed in the app.",
  },
  {
    q: "Can I cancel a request?",
    a: "Yes. You can cancel from your active request before the mechanic starts the job.",
  },
];


export default function FAQ() {
  return (
    <section id="faq" className="scroll-mt-20 border-t bg-muted/30">
          <div className="mx-auto max-w-5xl px-5 py-24">
            <h2 className="text-3xl font-semibold tracking-tight">Questions</h2>
            <div className="mt-10 divide-y rounded-2xl border bg-background">
              {faqs.map((f) => (
                <details key={f.q} className="group px-6 py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium">
                    {f.q}
                    <span className="text-muted-foreground transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
  )
}
