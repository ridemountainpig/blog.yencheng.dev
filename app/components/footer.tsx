import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-white-brown-500 mx-auto mt-24 mb-8 w-full max-w-4xl border-t pt-8 sm:mt-32">
      <ul className="text-white-brown-800 flex flex-wrap items-center justify-center gap-2 text-sm">
        <li>
          <a
            className="bg-white-brown-500 flex items-center rounded-xl px-3 py-2 transition-transform hover:-translate-y-0.5"
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/ridemountainpig"
          >
            <ArrowUpRight className="size-4" />
            <span className="ml-1">GitHub</span>
          </a>
        </li>
        <li>
          <a
            className="bg-white-brown-500 flex items-center rounded-xl px-3 py-2 transition-transform hover:-translate-y-0.5"
            rel="noopener noreferrer"
            target="_blank"
            href="https://x.com/ridemountainpig"
          >
            <ArrowUpRight className="size-4" />
            <span className="ml-1">X</span>
          </a>
        </li>
        <li>
          <a
            className="bg-white-brown-500 flex items-center rounded-xl px-3 py-2 transition-transform hover:-translate-y-0.5"
            rel="noopener noreferrer"
            target="_blank"
            href="https://www.linkedin.com/in/iamyencheng/"
          >
            <ArrowUpRight className="size-4" />
            <span className="ml-1">LinkedIn</span>
          </a>
        </li>
        <li>
          <a
            className="bg-white-brown-500 flex items-center rounded-xl px-3 py-2 transition-transform hover:-translate-y-0.5"
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/ridemountainpig/blog.yencheng.dev"
          >
            <ArrowUpRight className="size-4" />
            <span className="ml-1">View Source</span>
          </a>
        </li>
      </ul>
      <p className="font-nunito text-white-black-700 mt-6 text-center text-sm tracking-wide sm:text-base">
        © {new Date().getFullYear()} Yen Cheng Lin. All rights reserved.
      </p>
    </footer>
  );
}
