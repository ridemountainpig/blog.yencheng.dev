import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export function Navbar() {
  return (
    <header className="mb-16 flex items-center justify-between gap-4 sm:mb-24">
      <Link
        href="/"
        className="group flex items-center gap-2.5 transition-transform hover:-translate-y-0.5 sm:gap-3"
      >
        <Image
          src="/yencheng.png"
          alt=""
          width={40}
          height={40}
          priority
          className="bg-white-brown-500 size-9 rounded-xl p-0.5 sm:size-10"
        />
        <span className="font-nunito text-white-black-900 relative text-lg leading-none sm:text-2xl">
          <span
            aria-hidden="true"
            className="bg-white-brown-600 absolute bottom-0 left-0 h-1.5 w-full origin-left scale-x-0 opacity-90 transition-transform duration-300 ease-in-out group-hover:scale-x-100 sm:h-2"
          />
          <span className="relative">Yen Cheng Lin</span>
        </span>
      </Link>
      <Link
        href="https://yencheng.dev"
        title="Portfolio"
        className="font-nunito bg-white-brown-500 text-white-brown-800 flex items-center gap-1 rounded-xl px-3 py-2 text-sm leading-none transition-transform hover:-translate-y-0.5 sm:text-base"
      >
        Portfolio
        <ArrowUpRight strokeWidth={2.25} className="size-4" />
      </Link>
    </header>
  );
}
