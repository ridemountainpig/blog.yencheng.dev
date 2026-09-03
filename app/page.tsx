import type { Metadata } from "next";
import { BlogPosts } from "app/components/posts";
import { HomeLanguageSwitcher } from "app/components/language-switcher";
import { PostLanguage } from "app/blog/utils";
import Image from "next/image";

const homeCopy: Record<PostLanguage, { title: string; introduction: string }> =
  {
    "zh-TW": {
      title: "Yen Cheng 的部落格",
      introduction:
        "嗨，我是林彥成，一位軟體工程師，也喜歡動手創造各種有趣的事物。這裡是我的部落格，你也可以前往作品集網站進一步認識我。",
    },
    en: {
      title: "Yen Cheng's Blog",
      introduction:
        "Hi, I'm Yen Cheng Lin. I'm a software engineer and passionate creator of amazing things. This is my blog, you can visit my portfolio to learn more about me.",
    },
  };

type HomePageProps = {
  searchParams: Promise<{ lang?: string | string[] }>;
};

export async function generateMetadata({
  searchParams,
}: HomePageProps): Promise<Metadata> {
  let { lang } = await searchParams;
  let language: PostLanguage = lang === "zh-TW" ? "zh-TW" : "en";
  let copy = homeCopy[language];

  return {
    title: copy.title,
    description: copy.introduction,
    alternates: {
      canonical: "/",
      types: {
        "application/rss+xml": "/rss",
      },
    },
  };
}

export default async function Page({ searchParams }: HomePageProps) {
  let { lang } = await searchParams;
  let language: PostLanguage = lang === "zh-TW" ? "zh-TW" : "en";
  let copy = homeCopy[language];

  return (
    <section lang={language} className="mx-auto w-full max-w-4xl">
      <header className="mb-16 text-center sm:mb-20">
        <Image
          src="/yencheng.png"
          alt="Yen Cheng"
          width={72}
          height={72}
          priority
          className="bg-white-brown-500 mx-auto size-[72px] rounded-2xl p-1"
        />
        <div className="mt-7">
          <div className="relative inline-block">
            <span
              aria-hidden="true"
              className="bg-white-brown-600 title-highlight absolute bottom-1 left-0 h-5 w-full opacity-90 sm:h-6"
            />
            <h1 className="font-nunito relative text-4xl tracking-wide sm:text-5xl">
              {copy.title}
            </h1>
          </div>
        </div>
        <p className="text-white-black-700 mx-auto mt-8 max-w-3xl text-lg leading-8">
          {copy.introduction}
        </p>
        <div className="mt-6 flex justify-center">
          <HomeLanguageSwitcher currentLanguage={language} />
        </div>
      </header>
      <BlogPosts language={language} />
    </section>
  );
}
