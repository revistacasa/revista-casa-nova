import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sobre Nós",
  description: `Conheça a ${SITE.name}: um repositório de guias práticos e evergreen sobre casa, reforma, limpeza, decoração e jardim.`,
  alternates: { canonical: `${SITE.url}/sobre` },
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 pt-10 article-body">
      <h1 className="font-display text-4xl font-extrabold" style={{ fontFamily: "var(--font-display)" }}>
        Sobre a {SITE.name}
      </h1>
      <p className="mt-6">
        A <strong>{SITE.name}</strong> nasceu de uma ideia simples: quando
        surge um problema em casa — uma pia entupida, uma parede com mofo, uma
        prateleira para instalar — você deveria encontrar, em um só lugar, um
        guia <strong>claro, completo e seguro</strong> do início ao fim.
      </p>
      <h2>Nossa missão</h2>
      <p>
        Ser a referência brasileira de conteúdo prático sobre casa: do básico
        ao avançado, cobrindo reformas, reparos, limpeza, organização,
        decoração, cozinha e jardim — sempre com linguagem simples, passo a
        passo testável e honestidade sobre limites e riscos.
      </p>
      <h2>O que você encontra aqui</h2>
      <ul>
        <li><strong>Guias completos</strong> — cada artigo resolve uma dor real, do diagnóstico à execução;</li>
        <li><strong>Conteúdo evergreen</strong> — escrevemos para continuar válido por anos, e revisamos quando muda algo relevante;</li>
        <li><strong>Segurança em primeiro lugar</strong> — indicamos quando a tarefa exige profissional e nunca recomendamos procedimentos perigosos, como misturar produtos químicos;</li>
        <li><strong>Comparativos e listas</strong> — para você decidir antes de comprar.</li>
      </ul>
      <h2>Nossa política editorial</h2>
      <p>
        Todo conteúdo é original e escrito para ajudar de verdade o leitor.
        Quando indicarmos produtos no futuro, faremos com transparência,
        usando links de afiliado devidamente identificados — isso nunca muda
        nossa opinião sobre o que é melhor para você.
      </p>
      <p>
        Dúvidas, sugestões de pauta ou correções? Fale com a gente pela{" "}
        <a href="/contato">página de contato</a>.
      </p>
    </div>
  );
}
