import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { Marked, type Tokens } from "marked";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export interface Post {
  slug: string;
  title: string;
  date: string;
  updated: string;
  category: string;
  categorySlug: string;
  tags: string[];
  description: string;
  cover: string;
  readingTime: number;
  html: string;
}

const marked = new Marked({
  gfm: true,
  breaks: false,
  renderer: {
    link(this: { parser: { parseInline(t: unknown[]): string } }, token: Tokens.Link) {
      const external = /^https?:\/\//.test(token.href);
      const attrs = external ? ' target="_blank" rel="noopener nofollow"' : "";
      const text = this.parser.parseInline(token.tokens);
      return `<a href="${token.href}"${attrs}>${text}</a>`;
    },
    image(token: Tokens.Image) {
      return `<img src="${token.href}" alt="${token.text ?? ""}" loading="lazy" decoding="async" />`;
    },
  },
});

function parseFile(file: string): Post | null {
  const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf-8");
  const { data, content } = matter(raw);
  if (data.draft === true) return null;
  const words = content.split(/\s+/).length;
  return {
    slug: data.slug || file.replace(/\.md$/, ""),
    title: data.title || "Sem título",
    date: String(data.date || "2026-01-01"),
    updated: String(data.updated || data.date || "2026-01-01"),
    category: data.category || "Sem categoria",
    categorySlug: data.categorySlug || "sem-categoria",
    tags: Array.isArray(data.tags) ? data.tags : [],
    description: data.description || "",
    cover: data.cover || "",
    readingTime: Math.max(1, Math.round(words / 200)),
    html: marked.parse(content) as string,
  };
}

let cache: Post[] | null = null;

export function getAllPosts(): Post[] {
  if (cache) return cache;
  const files = fs.existsSync(POSTS_DIR)
    ? fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"))
    : [];
  cache = files
    .map(parseFile)
    .filter((p): p is Post => p !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
  return cache;
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function getCategorySlugs(): string[] {
  return [...new Set(getAllPosts().map((p) => p.categorySlug))];
}

export function getPostsByCategory(slug: string): Post[] {
  return getAllPosts().filter((p) => p.categorySlug === slug);
}

export function slugifyTag(tag: string): string {
  return tag
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function getAllTags(): { tag: string; slug: string; count: number }[] {
  const counts = new Map<string, { tag: string; count: number }>();
  for (const p of getAllPosts()) {
    for (const t of p.tags) {
      const slug = slugifyTag(t);
      const cur = counts.get(slug);
      counts.set(slug, { tag: t, count: (cur?.count ?? 0) + 1 });
    }
  }
  return [...counts.entries()]
    .map(([slug, { tag, count }]) => ({ tag, slug, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag, "pt-BR"));
}

export function getPostsByTag(slug: string): Post[] {
  const needle = slug.toLowerCase();
  return getAllPosts().filter((p) =>
    p.tags.some((t) => slugifyTag(t) === needle || t.toLowerCase() === needle)
  );
}

export function getRelated(post: Post, n = 3): Post[] {
  const sameCat = getAllPosts().filter(
    (p) => p.slug !== post.slug && p.categorySlug === post.categorySlug
  );
  if (sameCat.length >= n) return sameCat.slice(0, n);
  const others = getAllPosts().filter(
    (p) => p.slug !== post.slug && !sameCat.includes(p)
  );
  return [...sameCat, ...others].slice(0, n);
}

export function formatDate(iso: string): string {
  const d = new Date(iso + "T12:00:00");
  return d.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
