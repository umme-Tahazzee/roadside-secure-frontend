import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'
import Link from 'next/link'


export default function ForMechanics() {
  return (
     <section id="mechanics" className="scroll-mt-20 border-t">
    
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 md:grid-cols-2">
            <div>
              <h2 className="max-w-md text-3xl font-semibold tracking-tight">
                Are you a mechanic? Get jobs near you.
              </h2>
              <p className="mt-4 max-w-md leading-relaxed text-muted-foreground">
                Set up your profile, upload your documents, and start accepting
                requests once you&apos;re approved.
              </p>
              <Button className="mt-8" size='xl'>
                <Link href="/register">Join as a mechanic</Link>
              </Button>
            </div>
            <ul className="space-y-4 self-center">
              {[
                "Go online or offline whenever you want",
                "See pending jobs close to your location",
                "Set the final price when you complete a job",
                "Confirm cash payments in one tap",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-5 items-center justify-center rounded-full bg-primary/10 text-primary dark:text-teal-400">
                    <Check className="size-3.5" />
                  </span>
                  <span className="text-sm leading-relaxed">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
  )
}
