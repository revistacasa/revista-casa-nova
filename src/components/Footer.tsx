import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/lib/site";
import { CATEGORIES, categoryMeta } from "@/lib/site";

export default function Footer() {
  const cats = Object.keys(CATEGORIES);
  return (
    <footer className="bg-ink text-paper mt-20">
      <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-10">
        <div>
          <Link href="/" className="inline-block">
            <Image
              src="/rc-logo.png"
              alt="Revista Casa Nova"
              width={477}
              height={160}
              className="h-14 w-auto"
            />
          </Link>
          <p className="text-sm text-paper/75 mt-3 leading-relaxed">
            Guias práticos e confiáveis para reformar, organizar, decorar e
            cuidar da sua casa — do básico ao avançado.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] text-paper/70 uppercase mb-3">
            Categorias
          </p>
          <ul className="grid grid-cols-2 gap-y-2 text-sm">
            {cats.map((c) => (
              <li key={c}>
                <Link
                  href={`/categoria/${c}`}
                  className="text-paper/80 hover:text-accent transition-colors"
                >
                  {categoryMeta(c).name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] text-paper/70 uppercase mb-3">
            Institucional
          </p>
          <ul className="flex flex-col gap-2 text-sm">
            <li>
              <Link href="/sobre" className="text-paper/80 hover:text-accent">
                Sobre nós
              </Link>
            </li>
            <li>
              <Link href="/contato" className="text-paper/80 hover:text-accent">
                Contato
              </Link>
            </li>
            <li>
              <Link href="/politica-de-privacidade" className="text-paper/80 hover:text-accent">
                Política de Privacidade
              </Link>
            </li>
            <li>
              <Link href="/politica-de-cookies" className="text-paper/80 hover:text-accent">
                Política de Cookies
              </Link>
            </li>
            <li>
              <Link href="/disclaimer" className="text-paper/80 hover:text-accent">
                Disclaimer
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-paper/10">
        <p className="max-w-6xl mx-auto px-4 py-4 text-xs text-paper/70">
          © {new Date().getFullYear()} {SITE.name}. Todos os direitos
          reservados. · Os conteúdos têm caráter informativo — para serviços
          de risco, contrate um profissional.
        </p>
      </div>
    </footer>
  );
}
