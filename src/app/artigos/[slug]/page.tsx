import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllPosts,
  getPostBySlug,
  getRelated,
  slugifyTag,
} from "@/lib/posts";
import { categoryMeta, SITE } from "@/lib/site";
import PostCard from "@/components/PostCard";
import SafetyNotice from "@/components/SafetyNotice";

interface Params {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    alternates: {
      canonical: `${SITE.url}/artigos/${post.slug}`,
    },
    openGraph: {
      type: "article",
      locale: SITE.locale,
      title: post.title,
      description: post.description,
      url: `${SITE.url}/artigos/${post.slug}`,
      siteName: SITE.name,
      publishedTime: post.date,
      modifiedTime: post.updated,
      images: post.cover ? [{ url: post.cover }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function ArticlePage({ params }: Params) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const meta = categoryMeta(post.categorySlug);
  const related = getRelated(post, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated,
    author: { "@type": "Organization", name: SITE.name },
    publisher: { "@type": "Organization", name: SITE.name },
    mainEntityOfPage: `${SITE.url}/artigos/${post.slug}`,
    image: post.cover ? [post.cover] : undefined,
    inLanguage: "pt-BR",
  };

  return (
    <article className="max-w-3xl mx-auto px-4 pt-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className="text-xs text-soft mb-4" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-accent">
          Início
        </Link>
        <span className="mx-2">/</span>
        <Link href={`/categoria/${post.categorySlug}`} className="hover:text-accent">
          {meta.name}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink/60">{post.title}</span>
      </nav>

      <header className="mb-8">
        <Link
          href={`/categoria/${post.categorySlug}`}
          className="inline-block bg-accent/10 text-accent text-xs font-semibold px-3 py-1 rounded-full hover:bg-accent hover:text-white transition-colors"
        >
          {meta.name}
        </Link>
        <h1 className="font-display text-3xl md:text-4xl font-extrabold leading-tight mt-4">
          {post.title}
        </h1>
        <p className="text-soft mt-3 text-lg leading-relaxed">{post.description}</p>
        <p className="text-xs text-soft/80 mt-4">
          {post.readingTime} min de leitura · Por {SITE.author}
        </p>
      </header>

      <div
        className="article-body"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />

      <SafetyNotice />

      {post.tags.length > 0 && (
        <section className="mt-8 pt-6 border-t border-[#eae5dc]">
          <p className="text-xs font-semibold tracking-[0.2em] text-soft uppercase mb-3">
            Tags
          </p>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <Link
                key={t}
                href={`/tag/${slugifyTag(t)}`}
                className="text-xs bg-cream text-ink/70 hover:bg-accent hover:text-white px-3 py-1.5 rounded-full transition-colors"
              >
                #{t}
              </Link>
            ))}
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="mt-12 pt-8 border-t border-[#eae5dc]">
          <h2 className="font-display text-2xl font-extrabold mb-6">Continue lendo</h2>
          <div className="grid sm:grid-cols-3 gap-5 -mx-4 sm:mx-0">
            {related.map((p) => (
              <PostCard key={p.slug} post={p} variant="compact" />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
