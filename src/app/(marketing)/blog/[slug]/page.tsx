import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BlogPostCard from "@/components/marketing/BlogPostCard";
import { BLOG_POSTS, getBlogPostBySlug } from "@/lib/data/blog-posts";

type PageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const post = getBlogPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: `${post.title} | Nilüfer İlaçlama`,
    description: post.summary,
    alternates: { canonical: `/blog/${post.slug}` },
  };
}

export default function BlogPostPage({ params }: PageProps) {
  const post = getBlogPostBySlug(params.slug);
  if (!post) notFound();

  const otherPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <article className="bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/blog"
          className="text-sm font-medium text-ink/50 transition-colors hover:text-primary-green"
        >
          ← Blog
        </Link>

        <p className="mt-6 text-xs font-medium text-ink/40">
          <span className="mr-2 inline-block rounded-full bg-primary-green px-3 py-1 text-[11px] font-semibold text-white">
            {post.category}
          </span>
          {post.date} · {post.author}
        </p>
        <h1 className="mt-2 text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
          {post.title}
        </h1>

        <div className="mt-8 space-y-5 text-base leading-relaxed text-ink/70">
          {post.content.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-14 rounded-2xl border border-primary-green/30 bg-primary-green/5 p-6">
          <p className="text-sm font-semibold text-ink">
            Bu konuda yardıma mı ihtiyacınız var?
          </p>
          <p className="mt-1 text-sm text-ink/60">
            Uzman ekibimiz ücretsiz keşif ile durumu yerinde değerlendirsin.
          </p>
          <Link
            href="/teklif"
            className="mt-4 inline-flex rounded-full bg-primary-red px-6 py-2.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-primary-green"
          >
            Ücretsiz Keşif Talep Et
          </Link>
        </div>
      </div>

      {otherPosts.length > 0 && (
        <div className="mx-auto mt-20 max-w-5xl">
          <h2 className="text-xl font-bold text-ink">Diğer Yazılar</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {otherPosts.map((p, i) => (
              <BlogPostCard
                key={p.slug}
                href={`/blog/${p.slug}`}
                title={p.title}
                summary={p.summary}
                category={p.category}
                date={p.date}
                index={i}
              />
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
