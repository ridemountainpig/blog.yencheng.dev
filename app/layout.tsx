import "./global.css";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Navbar } from "./components/nav";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Footer from "./components/footer";

const nunito = localFont({
  src: "../public/fonts/NunitoBold.woff2",
  variable: "--font-nunito-local",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#fafafa",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://blog.yencheng.dev"),
  title: "Yen Cheng's Blog",
  description:
    "The personal blog of Yen Cheng Lin, a software engineer and passionate creator of amazing things. Writing about Raycast extensions, side projects, and ideas.",
  alternates: {
    types: {
      "application/rss+xml": "/rss",
    },
  },
  keywords: [
    "Yen Cheng Lin",
    "Yen Cheng's Blog",
    "Yen Cheng",
    "Ridemountainpig",
    "林彥成",
  ],
  authors: [
    {
      name: "ridemountainpig",
      url: "https://www.github.com/ridemountainpig",
    },
  ],
  openGraph: {
    type: "website",
    url: "https://blog.yencheng.dev/",
    title: "Yen Cheng's Blog",
    description:
      "The personal blog of Yen Cheng Lin, a software engineer and passionate creator of amazing things.",
    images: [
      {
        url: "/og",
        width: 1200,
        height: 630,
        alt: "Yen Cheng's Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yen Cheng's Blog",
    description:
      "The personal blog of Yen Cheng Lin, a software engineer and passionate creator of amazing things.",
    creator: "@ridemountainpig",
    images: ["/og"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${nunito.variable} bg-white-black-50 text-white-black-900`}
    >
      <body className="min-h-screen antialiased">
        <main className="mx-auto flex min-h-screen w-full max-w-6xl min-w-0 flex-auto flex-col px-5 pt-6 sm:px-8 xl:px-0">
          <GoogleAnalytics gaId="G-D5P23L59BL" />
          <Navbar />
          {children}
          <Footer />
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  );
}
