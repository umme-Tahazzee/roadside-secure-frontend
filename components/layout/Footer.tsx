import Logo from "@/utils/logo";
import Link from "next/link";


const columns = [
  {
    title: "Platform",
    links: [
      { href: "/register", label: "Request help" },
      { href: "/register", label: "Become a mechanic" },
      { href: "/login", label: "Log in" },
    ],
  },
  {
    title: "Services",
    links: [
      { href: "/#services", label: "Flat tire" },
      { href: "/#services", label: "Battery jump start" },
      { href: "/#services", label: "Towing" },
      { href: "/#services", label: "Fuel delivery" },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "/#how-it-works", label: "How it works" },
      { href: "/#faq", label: "FAQ" },
      { href: "mailto:support@roadrescue.com", label: "Contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-7xl px-5 py-14">
        <div className="grid gap-10 md:grid-cols-[1.5fr_repeat(3,1fr)]">
          <div className="max-w-xs">
                    <Logo className="mt-2"  imageClassName="h-30 w-fit"/>    
           
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Roadside help from verified mechanics near you, whenever your
              vehicle lets you down.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-medium">{col.title}</h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} RoadRescue. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-foreground">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-foreground">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}