import type { Metadata } from "next";
import {
  DM_Sans,
  Playfair_Display,
  Sora,
  Space_Mono,
} from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "600", "700", "800"],
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "600"],
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "VenIQ Media LLP — Digital Growth Agency",
    template: "%s | VenIQ Media",
  },
  description:
    "VenIQ Media LLP builds digital growth systems for hospitals, doctors, clinics, and modern businesses in India — from content to conversions.",
  keywords: [
    "digital marketing agency",
    "social media management",
    "healthcare marketing",
    "online reputation management",
    "influencer marketing",
    "web design India",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.veniqmedia.com",
    siteName: "VenIQ Media LLP",
    title: "VenIQ Media LLP — Digital Growth Agency",
    description:
      "Building Digital Growth Systems for Hospitals, Doctors, and Modern Businesses.",
  },
  twitter: {
    card: "summary_large_image",
    title: "VenIQ Media LLP — Digital Growth Agency",
    description:
      "Building Digital Growth Systems for Hospitals, Doctors, and Modern Businesses.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const fontVariables = [
  playfairDisplay.variable,
  sora.variable,
  dmSans.variable,
  spaceMono.variable,
].join(" ");

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontVariables} font-body antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
