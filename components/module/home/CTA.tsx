import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function CTA() {
  return (
     <section className="border-t">
          <div className="mx-auto max-w-7xl px-5 py-20">
            <div className="rounded-3xl bg-primary px-8 py-14 text-primary-foreground sm:px-14">
              <h2 className="max-w-lg text-3xl font-semibold tracking-tight">
                Keep RoadRescue ready before you need it.
              </h2>
              <p className="mt-3 max-w-md text-primary-foreground/80">
                Create your account now so help is one tap away.
              </p>
              <Button size="lg" variant="secondary" className="mt-8" >
                <Link href="/register">Create account</Link>
              </Button>
            </div>
          </div>
        </section>
  )
}
