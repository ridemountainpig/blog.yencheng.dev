import Link from "next/link";
import Image, { type ImageProps } from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import { highlight } from "sugar-high";
import React from "react";
import { Video } from "./video";

function Table({ data }) {
  let headers = data.headers.map((header, index) => (
    <th key={index}>{header}</th>
  ));
  let rows = data.rows.map((row, index) => (
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ));

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function CustomLink(props) {
  let href = props.href;

  if (href.startsWith("/")) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    );
  }

  if (href.startsWith("#")) {
    return <a {...props} />;
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
}

function RoundedImage(props) {
  if (
    typeof props.src === "string" &&
    [".mp4", ".webview", ".mov"].some((ext) => props.src.endsWith(ext))
  ) {
    return <Video {...props} />;
  }

  return (
    <img
      alt={props.alt || ""}
      loading="lazy"
      decoding="async"
      className="rounded-2xl"
      {...props}
    />
  );
}

const imageGridColumnClasses: Record<string, string> = {
  "2": "grid-cols-1 sm:grid-cols-2",
  "5": "grid-cols-2 sm:grid-cols-5",
};

function ImageGrid({
  children,
  columns = 2,
}: {
  children: React.ReactNode;
  columns?: number | string;
}) {
  return (
    <div
      className={`my-6 grid gap-2 ${imageGridColumnClasses[String(columns)] ?? imageGridColumnClasses["2"]}`}
    >
      {children}
    </div>
  );
}

function GridImage({ width = 900, height = 1200, ...props }: ImageProps) {
  return (
    <Image
      {...props}
      width={width}
      height={height}
      className="h-auto w-full rounded-2xl"
      sizes="(min-width: 672px) 328px, calc(100vw - 48px)"
      style={{ ...props.style, margin: 0 }}
    />
  );
}

function Code({ children, ...props }) {
  let codeHTML = highlight(children);
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
}

function slugify(str) {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\p{L}\p{N}-]+/gu, "") // Keep letters and numbers from every language
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

function createHeading(level) {
  const Heading = ({ children }) => {
    let slug = slugify(children);
    return React.createElement(
      `h${level}`,
      {
        id: slug,
        className: [
          "w-fit",
          level <= 2 && "border-white-brown-700 border-b-3 border-dashed",
        ]
          .filter(Boolean)
          .join(" "),
      },
      [
        React.createElement("a", {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: "anchor",
        }),
      ],
      children,
    );
  };

  Heading.displayName = `Heading${level}`;

  return Heading;
}

let components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  img: RoundedImage,
  a: CustomLink,
  code: Code,
  GridImage,
  ImageGrid,
  Table,
  Video,
};

export function CustomMDX(props) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  );
}
