import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <section className="mx-auto flex w-full max-w-3xl flex-col items-center pt-10 text-center sm:pt-16">
      <p className="font-nunito text-white-brown-700 text-7xl">404</p>
      <div className="relative mt-6 inline-block">
        <span
          aria-hidden="true"
          className="bg-white-brown-600 title-highlight absolute bottom-0.5 left-0 h-3.5 w-full opacity-90 sm:h-4"
        />
        <h1 className="font-nunito relative text-3xl tracking-wide">
          Page Not Found
        </h1>
      </div>
      <p className="text-white-black-600 mt-5">
        The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="font-nunito bg-white-brown-500 text-white-brown-800 mt-8 rounded-xl px-4 py-2 transition-transform hover:-translate-y-0.5"
      >
        Back to Blog
      </Link>
    </section>
  );
}
