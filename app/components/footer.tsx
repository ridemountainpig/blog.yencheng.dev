import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mb-16">
      <ul className="font-sm mt-8 flex flex-col space-y-2 space-x-0 text-neutral-600 md:flex-row md:space-y-0 md:space-x-4 dark:text-neutral-300">
        <li>
          <a
            className="flex items-center font-medium transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/ridemountainpig"
          >
            <ArrowUpRight />
            <p className="ml-1">GitHub</p>
          </a>
        </li>
        <li>
          <a
            className="flex items-center font-medium transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            rel="noopener noreferrer"
            target="_blank"
            href="https://x.com/ridemountainpig"
          >
            <ArrowUpRight />
            <p className="ml-1">X</p>
          </a>
        </li>
        <li>
          <a
            className="flex items-center font-medium transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            rel="noopener noreferrer"
            target="_blank"
            href="https://www.linkedin.com/in/iamyencheng/"
          >
            <ArrowUpRight />
            <p className="ml-1">LinkedIn</p>
          </a>
        </li>
        <li>
          <a
            className="flex items-center font-medium transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/ridemountainpig/blog.yencheng.dev"
          >
            <ArrowUpRight />
            <p className="ml-1">View Source</p>
          </a>
        </li>
      </ul>
      <p className="mt-8 font-medium text-neutral-600 dark:text-neutral-300">
        © {new Date().getFullYear()} Yen Cheng. All rights reserved.
      </p>
    </footer>
  );
}
