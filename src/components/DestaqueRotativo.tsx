"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { categoryMeta } from "@/lib/site";

export type DestaqueCard = {
  slug: string;
  title: string;
  description: string;
  cover: string;
  date: string;
  categorySlug: string;
  readingTime: number;
};

const STORAGE_KEY = "rcn-destaque-idx";

function formatDate(iso: string): string {
  const d = new Date(iso + "T12:00:00");
  return d.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function DestaqueRotativo({ posts }: { posts: DestaqueCard[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (posts.length < 2) return;
    try {
      const last = Number(window.localStorage.getItem(STORAGE_KEY) || "-1");
      const next = Number.isFinite(last) ? (last + 1) % posts.length : 0;
      window.localStorage.setItem(STORAGE_KEY, String(next));
      setIndex(next);
    } catch {
      setIndex(0);
    }
  }, [posts.length]);

  const featured = posts[index] ?? posts[0];
  if (!featured) return <p className="text-soft">Nenhum artigo publicado ainda.</p>;

  const rest = posts.filter((p) => p.slug !== featured.slug);
  const sidePosts = rest.slice(0, 4);
  const fMeta = categoryMeta(featured.categorySlug);

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <Link
        href={`/artigos/${featured.slug}`}
        className="group lg:col-span-2 block bg-white rounded-2xl overflow-hidden border border-[#eae5dc] hover:shadow-xl transition-all"
      >
        <div className="relative aspect-[16/9] overflow-hidden">
          {featured.cover ? (
            <Image
              src={featured.cover}
              alt={featured.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
            />
          ) : (
            <div
              className={`w-full h-full bg-gradient-to-br ${fMeta.gradient} flex items-center justify-center`}
            >
              <span className="text-7xl drop-shadow-lg">{fMeta.emoji}</span>
            </div>
          )}
          <span className="absolute top-4 left-4 bg-accent text-white text-xs font-semibold px-4 py-1.5 rounded-full">
            {fMeta.name}
          </span>
        </div>
        <div className="p-6">
          <h2 className="font-display text-2xl md:text-3xl font-extrabold leading-tight group-hover:text-accent transition-colors">
            {featured.title}
          </h2>
          <p className="text-soft mt-3 line-clamp-2">{featured.description}</p>
          <p className="text-xs text-soft mt-3">
            {formatDate(featured.date)} · {featured.readingTime} min de leitura
          </p>
        </div>
      </Link>

      <div className="grid grid-cols-1 gap-4 content-start">
        {sidePosts.map((p) => (
          <Link
            key={p.slug}
            href={`/artigos/${p.slug}`}
            className="group flex gap-3 bg-white rounded-xl overflow-hidden border border-[#eae5dc] hover:border-accent/40 hover:shadow-md transition-all"
          >
            <div className="relative w-32 h-24 shrink-0 overflow-hidden">
              {p.cover ? (
                <Image
                  src={p.cover}
                  alt={p.title}
                  fill
                  sizes="128px"
                  className="object-cover"
                />
              ) : (
                <div
                  className={`w-full h-full bg-gradient-to-br ${categoryMeta(p.categorySlug).gradient} flex items-center justify-center`}
                >
                  <span className="text-2xl">{categoryMeta(p.categorySlug).emoji}</span>
                </div>
              )}
            </div>
            <div className="py-3 pr-3 min-w-0 flex-1">
              <p className="text-[10px] font-semibold text-accent uppercase tracking-wide">
                {categoryMeta(p.categorySlug).name}
              </p>
              <h3 className="text-sm font-semibold leading-snug group-hover:text-accent transition-colors line-clamp-3">
                {p.title}
              </h3>
              <p className="text-[11px] text-soft mt-1">{formatDate(p.date)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
