import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <p className="text-6xl mb-6">🏠</p>
      <h1 className="font-display text-4xl font-extrabold mb-3">
        Página não encontrada
      </h1>
      <p className="text-soft mb-8">
        Essa página não existe ou foi movida. Que tal voltar para o início e
        explorar nossos guias?
      </p>
      <div className="flex gap-3 justify-center">
        <Link
          href="/"
          className="bg-accent text-white font-semibold rounded-full px-6 py-3 hover:bg-[#9c4825] transition-colors"
        >
          ← Voltar para a home
        </Link>
        <Link
          href="/artigos"
          className="bg-cream text-ink/70 font-semibold rounded-full px-6 py-3 hover:bg-[#e5ddd0] transition-colors"
        >
          Ver todos os artigos
        </Link>
      </div>
    </div>
  );
}
