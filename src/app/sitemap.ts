import type { MetadataRoute } from "next";
import { getAllPosts, getCategorySlugs } from "@/lib/posts";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE.url, changeFrequency: "daily", priority: 1.0 },
    { url: `${SITE.url}/artigos`, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE.url}/sobre`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${SITE.url}/contato`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${SITE.url}/politica-de-privacidade`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE.url}/politica-de-cookies`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE.url}/disclaimer`, changeFrequency: "yearly", priority: 0.3 },
  ];

  const categories: MetadataRoute.Sitemap = getCategorySlugs().map((slug) => ({
    url: `${SITE.url}/categoria/${slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const postPages: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${SITE.url}/artigos/${p.slug}`,
    lastModified: new Date(p.updated),
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  return [...staticPages, ...categories, ...postPages];
}
