import Link from "next/link";
import Image from "next/image";
import { Post, formatDate } from "@/lib/posts";
import { categoryMeta } from "@/lib/site";

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
          <Image
            src={post.cover}
            alt={post.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
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
        <p className="text-xs text-soft mt-3">
          {formatDate(post.date)} · {post.readingTime} min de leitura
        </p>
      </div>
    </Link>
  );
}
