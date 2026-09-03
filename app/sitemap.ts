import type { MetadataRoute } from "next";
import {
  getBlogPosts,
  getPostLanguage,
  getPostTranslations,
} from "app/blog/utils";

export const baseUrl = "https://blog.yencheng.dev";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let posts = getBlogPosts();

  let blogs: MetadataRoute.Sitemap = posts.map((post) => {
    let translations = getPostTranslations(post, posts);
    let entry: MetadataRoute.Sitemap[number] = {
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.metadata.publishedAt,
    };

    if (translations.length > 1) {
      entry.alternates = {
        languages: Object.fromEntries(
          translations.map((translation) => [
            getPostLanguage(translation),
            `${baseUrl}/blog/${translation.slug}`,
          ]),
        ),
      };
    }

    return entry;
  });

  let routes: MetadataRoute.Sitemap = [""].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...blogs];
}
