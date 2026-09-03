import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { CustomMDX } from "app/components/mdx";
import { LanguageSwitcher } from "app/components/language-switcher";
import {
  formatDate,
  getBlogPosts,
  getPostLanguage,
  getPostTranslations,
} from "app/blog/utils";
import { baseUrl } from "app/sitemap";

type BlogPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  let posts = getBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata | undefined> {
  const { slug } = await params;
  let posts = getBlogPosts();
  let post = posts.find((post) => post.slug === slug);
  if (!post) {
    return;
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;
  let ogImage = image
    ? image
    : `${baseUrl}/og?title=${encodeURIComponent(title)}`;
  let language = getPostLanguage(post);
  let translations = getPostTranslations(post, posts);
  let postSlug = post.slug;
  let languages = Object.fromEntries(
    translations.map((translation) => [
      getPostLanguage(translation),
      `${baseUrl}/blog/${translation.slug}`,
    ]),
  );
  let defaultTranslation =
    translations.find((translation) => getPostLanguage(translation) === "en") ??
    post;
  languages["x-default"] = `${baseUrl}/blog/${defaultTranslation.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/blog/${postSlug}`,
      languages,
      types: {
        "application/rss+xml": "/rss",
      },
    },
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${baseUrl}/blog/${postSlug}`,
      locale: language === "zh-TW" ? "zh_TW" : "en_US",
      alternateLocale: translations
        .filter((translation) => translation.slug !== postSlug)
        .map((translation) =>
          getPostLanguage(translation) === "zh-TW" ? "zh_TW" : "en_US",
        ),
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Blog({ params }: BlogPageProps) {
  const { slug } = await params;
  let posts = getBlogPosts();
  let post = posts.find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  let language = getPostLanguage(post);
  let translations = getPostTranslations(post, posts);

  return (
    <section lang={language} className="article-page mx-auto w-full max-w-3xl">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            inLanguage: language,
            image: post.metadata.image
              ? `${baseUrl}${post.metadata.image}`
              : `${baseUrl}/og?title=${encodeURIComponent(post.metadata.title)}`,
            url: `${baseUrl}/blog/${post.slug}`,
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `${baseUrl}/blog/${post.slug}`,
            },
            author: {
              "@type": "Person",
              name: "Yen Cheng Lin",
              url: "https://yencheng.dev",
            },
          }),
        }}
      />
      <header className="mb-12">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <h1 className="title font-nunito text-3xl leading-tight tracking-wide sm:text-4xl">
            {post.metadata.title}
          </h1>
          <div className="shrink-0 sm:pt-1.5">
            <LanguageSwitcher
              currentSlug={post.slug}
              translations={translations}
            />
          </div>
        </div>
        <p className="text-white-black-600 mt-5 text-base">
          {formatDate(post.metadata.publishedAt, false, language)}
        </p>
      </header>
      <article className="prose text-lg leading-8 tracking-wide">
        <CustomMDX source={post.content} />
      </article>
      <div className="mt-14">
        <Link
          href={language === "zh-TW" ? "/?lang=zh-TW" : "/"}
          className="font-nunito bg-white-brown-500 text-white-brown-800 inline-flex items-center gap-1.5 rounded-xl px-4 py-2 transition-transform hover:-translate-y-0.5"
        >
          <ArrowLeft strokeWidth={2.25} className="size-4" />
          {language === "zh-TW" ? "回到部落格" : "Back to Blog"}
        </Link>
      </div>
    </section>
  );
}
