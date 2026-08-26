import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllTags, getPostsByTag } from "@/lib/posts";
import PostCard from "@/components/PostCard";

interface Params {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllTags().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const posts = getPostsByTag(slug);
  if (posts.length === 0) return {};
  return {
    title: `Tag: ${slug.replace(/-/g, " ")}`,
    robots: { index: false, follow: true },
  };
}

export default async function TagPage({ params }: Params) {
  const { slug } = await params;
  const posts = getPostsByTag(slug);
  if (posts.length === 0) notFound();
  return (
    <div className="max-w-6xl mx-auto px-4 pt-10">
      <p className="text-xs font-semibold tracking-[0.25em] text-accent uppercase mb-2">
        Tag
      </p>
      <h1 className="font-display text-3xl font-extrabold capitalize mb-2">
        #{slug.replace(/-/g, " ")}
      </h1>
      <p className="text-soft">
        {posts.length} artigo{posts.length === 1 ? "" : "s"} com esta tag
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {posts.map((p) => (
          <PostCard key={p.slug} post={p} />
        ))}
      </div>
    </div>
  );
}
