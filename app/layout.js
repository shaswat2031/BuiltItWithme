import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "BuiltItWithme",
  description:
    "Beautiful, responsive websites custom-built for your brand starting at just ₹699. Get your professional website in just 3-4 days.",
  keywords: [
    "web design",
    "portfolio website",
    "affordable websites",
    "professional web development",
  ],
  authors: [{ name: "BuiltItWithme Team" }],
  openGraph: {
    title: "BuiltItWithme - Custom Web Design & Development",
    description:
      "Beautiful, responsive websites custom-built for your brand starting at just ₹699.",
    url: "https://builtitwith.me",
    siteName: "BuiltItWithme",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}