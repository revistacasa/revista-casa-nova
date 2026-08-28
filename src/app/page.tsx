import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
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
                className="group relative block overflow-hidden rounded-xl aspect-[16/10] min-h-[9.5rem] text-paper hover:shadow-lg hover:scale-[1.02] transition-all"
              >
                {meta.image ? (
                  <Image
                    src={meta.image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
                  />
                ) : (
                  <div className={`absolute inset-0 bg-gradient-to-br ${meta.gradient}`} />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#201d1a]/90 via-[#201d1a]/35 to-[#201d1a]/10" />
                <div className="relative h-full flex flex-col justify-end p-4">
                  <p className="font-display font-bold leading-tight">{meta.name}</p>
                  <p className="text-xs text-paper/80 mt-1">
                    {count} artigo{count === 1 ? "" : "s"}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
