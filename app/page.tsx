import { BlogPosts } from "app/components/posts";

export default function Page() {
  return (
    <section>
      <div className="mb-8 flex h-fit items-center gap-x-2">
        <img
          src="/yencheng.png"
          alt="Yen Cheng"
          className="-ml-2 h-12 w-12 rounded-full"
        />
        <h1 className="text-3xl font-semibold tracking-wide">
          Yen Cheng's Blog
        </h1>
      </div>
      <p className="mb-4 inline-flex items-center text-lg font-medium">
        Hi, I'm Yen Cheng Lin. I'm a software engineer and passionate creator of
        amazing things. This is my blog, you can visit my portfolio to learn
        more about me.
      </p>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  );
}
