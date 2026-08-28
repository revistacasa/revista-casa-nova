import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";
import CalculadoraTinta from "@/components/CalculadoraTinta";

export const metadata: Metadata = {
  title: "Calculadora de tinta para parede",
  description:
    "Calcule quantos litros de tinta um cômodo pede: metragem, tipo de tinta, uma ou duas demãos, e a sugestão de latas.",
  alternates: { canonical: `${SITE.url}/ferramentas/calculadora-de-tinta` },
};

export default function CalculadoraTintaPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <nav className="text-xs text-soft mb-4" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-accent">
          Início
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink/60">Calculadora de tinta</span>
      </nav>
      <CalculadoraTinta />
      <p className="text-sm text-soft mt-6 leading-relaxed">
        Depois de saber o litro, o que evita o “bigode” na parede é a ordem do
        serviço, não a quantidade. O passo a passo está em{" "}
        <Link href="/artigos/pintar-parede-sem-marca" className="text-accent underline">
          como pintar parede sem marca de emenda
        </Link>
        .
      </p>
    </div>
  );
}
