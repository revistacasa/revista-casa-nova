import Link from "next/link";
import { Post, formatDate } from "@/lib/posts";
import { categoryMeta } from "@/lib/site";

/**
 * Card de artigo. Se o post tiver capa, mostra a imagem;
 * senão, mostra um placeholder elegante (gradiente da categoria + emoji).
 */
export default function PostCard({
  post,
  variant = "default",
}: {
  post: Post;
  variant?: "default" | "compact";
}) {
  const meta = categoryMeta(post.categorySlug);
  return (
    <Link
      href={`/artigos/${post.slug}`}
      className="group block bg-white rounded-xl overflow-hidden border border-[#eae5dc] hover:shadow-lg hover:border-accent/40 transition-all"
    >
      <div className={`relative ${variant === "compact" ? "aspect-[16/10]" : "aspect-[16/9]"} overflow-hidden`}>
        {post.cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.cover}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${meta.gradient} flex items-center justify-center`}>
            <span className="text-5xl drop-shadow-lg group-hover:scale-110 transition-transform duration-500">
              {meta.emoji}
            </span>
          </div>
        )}
        <span className="absolute top-3 left-3 bg-white/95 text-ink text-[11px] font-semibold px-3 py-1 rounded-full">
          {meta.name}
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-display font-bold text-lg leading-snug group-hover:text-accent transition-colors line-clamp-2">
          {post.title}
        </h3>
        {variant === "default" && (
          <p className="text-sm text-soft mt-2 line-clamp-2">{post.description}</p>
        )}
        <p className="text-xs text-soft/80 mt-3">
          {formatDate(post.date)} · {post.readingTime} min de leitura
        </p>
      </div>
    </Link>
  );
}
