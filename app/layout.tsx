import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Noto_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Providers from "@/providers";

const jetbrainsMonoHeading = JetBrains_Mono({ subsets: ["latin"], variable: "--font-heading" });
const notoSans = Noto_Sans({ subsets: ["latin"], variable: "--font-sans" });
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://your-domain.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "RoadRescue | 24/7 Roadside Assistance & Mechanic Service",
    template: "%s | RoadRescue",
  },
  description:
    "Get fast, reliable roadside assistance anytime. Book trusted mechanics, towing and emergency vehicle services near you with real-time tracking and secure payments.",
  keywords: [
    "roadside assistance",
    "mechanic service",
    "emergency car repair",
    "towing service",
    "vehicle breakdown help",
    "on-demand mechanic",
  ],
  applicationName: "RoadRescue",
  authors: [{ name: "RoadRescue" }],
  creator: "RoadRescue",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: ["/favicon.ico"],
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "RoadRescue",
    title: "RoadRescue | 24/7 Roadside Assistance & Mechanic Service",
    description:
      "Stuck on the road? Book a trusted mechanic or towing service in minutes with live tracking.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "RoadRescue - Roadside Assistance",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "RoadRescue | 24/7 Roadside Assistance",
    description:
      "Book trusted mechanics and towing services in minutes with live tracking.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        notoSans.variable,
        jetbrainsMonoHeading.variable
      )}
      suppressHydrationWarning
    >
      <Providers>
      <body className="min-h-full flex flex-col">{children}</body>
      </Providers>
    </html>
  );
}