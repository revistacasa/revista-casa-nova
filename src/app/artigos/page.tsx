import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import { SITE } from "@/lib/site";
import PostCard from "@/components/PostCard";

export const metadata: Metadata = {
  title: "Todos os Artigos",
  description: `Todos os guias práticos da ${SITE.name}: reformas, reparos, limpeza, decoração, cozinha, jardim e organização — passo a passo e com segurança.`,
  alternates: { canonical: `${SITE.url}/artigos` },
};

export default function AllPostsPage() {
  const posts = getAllPosts();
  return (
    <div className="max-w-6xl mx-auto px-4 pt-10">
      <h1 className="font-display text-3xl md:text-4xl font-extrabold">
        Todos os artigos
      </h1>
      <p className="text-soft mt-2">
        {posts.length} guias práticos para a sua casa — do básico ao avançado.
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {posts.map((p) => (
          <PostCard key={p.slug} post={p} />
        ))}
      </div>
    </div>
  );
}
