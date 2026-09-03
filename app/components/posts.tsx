import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  formatDate,
  getLocalizedBlogPosts,
  PostLanguage,
} from "app/blog/utils";

export function BlogPosts({ language }: { language: PostLanguage }) {
  let blogsByYear = getLocalizedBlogPosts(language)
    .sort(
      (a, b) =>
        new Date(b.metadata.publishedAt).getTime() -
        new Date(a.metadata.publishedAt).getTime(),
    )
    .reduce<Map<string, ReturnType<typeof getLocalizedBlogPosts>>>(
      (groups, post) => {
        let year = post.metadata.publishedAt.slice(0, 4);
        let posts = groups.get(year) ?? [];

        posts.push(post);
        groups.set(year, posts);

        return groups;
      },
      new Map(),
    );

  return (
    <div className="space-y-14">
      {[...blogsByYear].map(([year, posts]) => (
        <section
          key={year}
          aria-labelledby={`posts-${year}`}
          className="grid gap-5 sm:grid-cols-[6rem_1fr] sm:gap-8"
        >
          <div>
            <h2
              id={`posts-${year}`}
              className="font-nunito bg-white-brown-600 text-white-brown-950 inline-block rounded-xl px-3 py-2 text-xl leading-none"
            >
              {year}
            </h2>
          </div>
          <ul className="space-y-3">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  className="group border-white-brown-500 bg-white-brown-200 hover:bg-white-brown-500 flex flex-col gap-3 rounded-2xl border px-5 py-4 transition-all hover:-translate-y-0.5 sm:flex-row sm:items-center sm:justify-between sm:gap-8"
                  href={`/blog/${post.slug}`}
                >
                  <span className="font-nunito text-white-black-900 text-lg leading-snug">
                    {post.metadata.title}
                  </span>
                  <span className="text-white-black-600 flex shrink-0 items-center gap-2 text-sm">
                    <time
                      dateTime={post.metadata.publishedAt}
                      className="tabular-nums"
                    >
                      {formatDate(post.metadata.publishedAt, false, language)}
                    </time>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="text-white-brown-800 size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
