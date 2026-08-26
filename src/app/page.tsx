import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, getCategorySlugs } from "@/lib/posts";
import { categoryMeta, SITE } from "@/lib/site";
import PostCard from "@/components/PostCard";
import DestaqueRotativo from "@/components/DestaqueRotativo";

export const metadata: Metadata = {
  title: `${SITE.name} — Guias Práticos para Reformar e Cuidar da sua Casa`,
  description: SITE.description,
  alternates: { canonical: SITE.url },
};

export default function HomePage() {
  const posts = getAllPosts();
  const cards = posts.map((p) => ({
    slug: p.slug,
    title: p.title,
    description: p.description,
    cover: p.cover,
    date: p.date,
    categorySlug: p.categorySlug,
    readingTime: p.readingTime,
  }));
  const latest = posts.slice(0, 9);
  const cats = getCategorySlugs();

  return (
    <div className="max-w-6xl mx-auto px-4">
      <section className="pt-8 pb-10">
        <p className="text-xs font-semibold tracking-[0.25em] text-accent uppercase mb-4">
          Em destaque
        </p>
        <DestaqueRotativo posts={cards} />
      </section>

      {latest.length > 0 && (
        <section className="py-10 border-t border-[#eae5dc]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl font-extrabold">Últimos artigos</h2>
            <Link href="/artigos" className="text-sm font-medium text-accent hover:underline">
              Ver todos →
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {latest.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      )}

      <section className="py-10 border-t border-[#eae5dc]">
        <h2 className="font-display text-2xl font-extrabold mb-6">Explore por categoria</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {cats.map((c) => {
            const meta = categoryMeta(c);
            const count = posts.filter((p) => p.categorySlug === c).length;
            return (
              <Link
                key={c}
                href={`/categoria/${c}`}
                className={`group bg-gradient-to-br ${meta.gradient} text-white rounded-xl p-5 hover:scale-[1.02] hover:shadow-lg transition-all`}
              >
                <span className="text-3xl block mb-2">{meta.emoji}</span>
                <p className="font-display font-bold leading-tight">{meta.name}</p>
                <p className="text-xs text-white/70 mt-1">
                  {count} artigo{count === 1 ? "" : "s"}
                </p>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
