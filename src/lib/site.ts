function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, "");
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3001";
}

export const SITE = {
  name: "Revista Casa Nova",
  shortName: "Casa Nova",
  get url() {
    return resolveSiteUrl();
  },
  description:
    "Guias práticos e completos para a sua casa: reformas, reparos, limpeza, organização, decoração, cozinha e jardim. Passo a passo confiável, do básico ao avançado.",
  locale: "pt_BR",
  author: "Redação Casa Nova",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "contato@revistacasanova.com.br",
};

export const CATEGORIES: Record<
  string,
  { name: string; emoji: string; gradient: string; image: string }
> = {
  reformas: {
    name: "Reformas",
    emoji: "🔨",
    gradient: "from-[#b4552d] to-[#8a3d1f]",
    image: "/images/categorias/reformas.jpg",
  },
  "diy-faca-voce-mesmo": {
    name: "DIY — Faça você mesmo",
    emoji: "🛠️",
    gradient: "from-[#5a7d6a] to-[#3d5a4c]",
    image: "/images/categorias/diy-faca-voce-mesmo.jpg",
  },
  decoracao: {
    name: "Decoração",
    emoji: "🛋️",
    gradient: "from-[#a8763e] to-[#7a5427]",
    image: "/images/categorias/decoracao.jpg",
  },
  cozinha: {
    name: "Cozinha",
    emoji: "🍳",
    gradient: "from-[#b4552d] to-[#a8763e]",
    image: "/images/categorias/cozinha.jpg",
  },
  jardim: {
    name: "Jardim",
    emoji: "🌿",
    gradient: "from-[#5a7d6a] to-[#7ba888]",
    image: "/images/categorias/jardim.jpg",
  },
  ambientes: {
    name: "Ambientes",
    emoji: "🏠",
    gradient: "from-[#6b635a] to-[#4a443d]",
    image: "/images/categorias/ambientes.jpg",
  },
  compras: {
    name: "Compras",
    emoji: "🛒",
    gradient: "from-[#8a6d3b] to-[#6b5429]",
    image: "/images/categorias/compras.jpg",
  },
  "produtos-reviews": {
    name: "Produtos e Reviews",
    emoji: "⭐",
    gradient: "from-[#4a443d] to-[#201d1a]",
    image: "/images/categorias/produtos-reviews.jpg",
  },
};

export function categoryMeta(slug: string) {
  return (
    CATEGORIES[slug] ?? {
      name: slug.replace(/-/g, " "),
      emoji: "📌",
      gradient: "from-[#8a8378] to-[#5a554d]",
      image: "",
    }
  );
}
