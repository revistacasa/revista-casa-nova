import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategorySlugs, getPostsByCategory } from "@/lib/posts";
import { categoryMeta, SITE } from "@/lib/site";
import PostCard from "@/components/PostCard";

interface Params {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getCategorySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const meta = categoryMeta(slug);
  const posts = getPostsByCategory(slug);
  if (posts.length === 0) return {};
  return {
    title: `${meta.name}: guias práticos passo a passo`,
    description: `Artigos de ${meta.name} na ${SITE.name}: ${posts
      .slice(0, 3)
      .map((p) => p.title)
      .join(", ")} e mais. Guias completos e seguros.`,
    alternates: { canonical: `${SITE.url}/categoria/${slug}` },
    openGraph: {
      title: `${meta.name} | ${SITE.name}`,
      description: `Guias práticos de ${meta.name} para a sua casa.`,
      url: `${SITE.url}/categoria/${slug}`,
      type: "website",
    },
  };
}

export default async function CategoryPage({ params }: Params) {
  const { slug } = await params;
  const posts = getPostsByCategory(slug);
  if (posts.length === 0) notFound();
  const meta = categoryMeta(slug);

  return (
    <div className="max-w-6xl mx-auto px-4 pt-10">
      <nav className="text-xs text-soft mb-3">
        <a href="/" className="hover:text-accent">Início</a>
        <span className="mx-2">/</span>
        <span className="text-ink/60">{meta.name}</span>
      </nav>
      <div className="flex items-center gap-4">
        <span className="text-5xl">{meta.emoji}</span>
        <div>
          <h1 className="font-display text-3xl md:text-4xl font-extrabold">
            {meta.name}
          </h1>
          <p className="text-soft mt-1">
            {posts.length} artigo{posts.length === 1 ? "" : "s"} para a sua casa
          </p>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {posts.map((p) => (
          <PostCard key={p.slug} post={p} />
        ))}
      </div>
    </div>
  );
}
