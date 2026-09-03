import { BlogPosts } from "app/components/posts";
import { HomeLanguageSwitcher } from "app/components/language-switcher";
import { PostLanguage } from "app/blog/utils";

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

export default async function Page({ searchParams }: HomePageProps) {
  let { lang } = await searchParams;
  let language: PostLanguage = lang === "zh-TW" ? "zh-TW" : "en";
  let copy = homeCopy[language];

  return (
    <section lang={language}>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex h-fit items-center gap-x-2">
          <img
            src="/yencheng.png"
            alt="Yen Cheng"
            className="-ml-2 h-12 w-12 rounded-full"
          />
          <h1 className="text-3xl font-semibold tracking-wide">{copy.title}</h1>
        </div>
        <HomeLanguageSwitcher currentLanguage={language} />
      </div>
      <p className="mb-4 inline-flex items-center text-lg font-medium">
        {copy.introduction}
      </p>
      <div className="my-8">
        <BlogPosts language={language} />
      </div>
    </section>
  );
}
