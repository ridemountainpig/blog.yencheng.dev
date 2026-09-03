import Link from "next/link";
import { BlogPost, getPostLanguage, PostLanguage } from "app/blog/utils";

const languageLabels: Record<PostLanguage, string> = {
  "zh-TW": "中文",
  en: "English",
};

function LanguageToggle({
  currentLanguage,
  label,
  options,
}: {
  currentLanguage: PostLanguage;
  label: string;
  options: { href: string; language: PostLanguage }[];
}) {
  return (
    <nav
      aria-label={label}
      className="border-white-brown-500 bg-white-brown-200 flex w-fit rounded-full border p-1 text-sm"
    >
      {options.map(({ href, language }) => {
        let isCurrent = language === currentLanguage;

        return (
          <Link
            key={language}
            href={href}
            hrefLang={language}
            aria-current={isCurrent ? "page" : undefined}
            className={`rounded-full px-3 py-1 transition-colors ${
              isCurrent
                ? "bg-white-brown-700 text-white"
                : "text-white-brown-800 hover:bg-white-brown-400"
            }`}
          >
            {languageLabels[language]}
          </Link>
        );
      })}
    </nav>
  );
}

export function HomeLanguageSwitcher({
  currentLanguage,
}: {
  currentLanguage: PostLanguage;
}) {
  return (
    <LanguageToggle
      currentLanguage={currentLanguage}
      label="Homepage language"
      options={[
        { href: "/?lang=zh-TW", language: "zh-TW" },
        { href: "/", language: "en" },
      ]}
    />
  );
}

export function LanguageSwitcher({
  currentSlug,
  translations,
}: {
  currentSlug: string;
  translations: BlogPost[];
}) {
  if (translations.length < 2) {
    return null;
  }

  return (
    <LanguageToggle
      currentLanguage={getPostLanguage(
        translations.find((translation) => translation.slug === currentSlug)!,
      )}
      label="Article language"
      options={translations.map((translation) => ({
        href: `/blog/${translation.slug}`,
        language: getPostLanguage(translation),
      }))}
    />
  );
}
