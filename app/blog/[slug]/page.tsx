import type { Metadata } from "next";
import { notFound } from "next/navigation";
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

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/blog/${postSlug}`,
      languages,
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
    <section lang={language}>
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
              : `/og?title=${encodeURIComponent(post.metadata.title)}`,
            url: `${baseUrl}/blog/${post.slug}`,
            author: {
              "@type": "Person",
              name: "My Portfolio",
            },
          }),
        }}
      />
      <h1 className="title text-2xl font-semibold">{post.metadata.title}</h1>
      <div className="mt-2 mb-8 flex flex-wrap items-center justify-between gap-3 text-lg">
        <p className="text-lg text-neutral-600 dark:text-neutral-400">
          {formatDate(post.metadata.publishedAt, false, language)}
        </p>
        <LanguageSwitcher currentSlug={post.slug} translations={translations} />
      </div>
      <article className="prose text-lg tracking-wider">
        <CustomMDX source={post.content} />
      </article>
    </section>
  );
}
