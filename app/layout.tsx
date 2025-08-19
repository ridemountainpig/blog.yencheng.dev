import "./global.css";
import type { Metadata } from "next";
import { Navbar } from "./components/nav";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Footer from "./components/footer";

export const metadata: Metadata = {
  title: "Yen Cheng's Blog",
  description: "The personal blog of Yen Cheng Lin.",
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

const cx = (...classes) => classes.filter(Boolean).join(" ");

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cx(
        "text-white-black-900 bg-white-black-50 dark:text-white-black-50 dark:bg-white-black-900 font-nunito",
      )}
    >
      <body className="mx-4 mt-8 max-w-xl antialiased lg:mx-auto">
        <main className="mt-6 flex min-w-0 flex-auto flex-col px-2 md:px-0">
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
