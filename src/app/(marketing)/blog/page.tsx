import type { Metadata } from "next";
import BlogPostCard from "@/components/marketing/BlogPostCard";
import { BLOG_POSTS } from "@/lib/data/blog-posts";

export const metadata: Metadata = {
  title: "Blog | Nilüfer İlaçlama",
  description: "Haşere kontrolü ve ilaçlama hakkında yazılarımız.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <section className="bg-white px-4 py-14 sm:py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-ink sm:text-4xl">Blog</h1>
          <p className="mt-3 text-ink/60">
            Haşere kontrolü ve ilaçlama üzerine yazılarımız.
          </p>
        </div>

        <div className="mt-10 sm:mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {BLOG_POSTS.map((post, i) => (
            <BlogPostCard
              key={post.slug}
              href={`/blog/${post.slug}`}
              title={post.title}
              summary={post.summary}
              category={post.category}
              date={post.date}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
