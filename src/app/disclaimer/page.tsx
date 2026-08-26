import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: `Avisos legais e de segurança do conteúdo da ${SITE.name}.`,
  alternates: { canonical: `${SITE.url}/disclaimer` },
};

const H = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-display text-2xl font-bold mt-8 mb-3">{children}</h2>
);

export default function DisclaimerPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 text-ink/80 leading-relaxed">
      <h1 className="font-display text-4xl font-extrabold text-ink">Disclaimer</h1>

      <H>1. Caráter informativo</H>
      <p>
        Todo o conteúdo da <strong>{SITE.name}</strong> tem objetivo
        educacional e informativo. Os guias são descrições gerais de
        procedimentos e não substituem avaliação técnica do seu caso
        específico.
      </p>

      <H>2. Segurança é inegociável</H>
      <p>
        Serviços que envolvam <strong>eletricidade, gás, estrutura (pilares,
        vigas, paredes portantes), altura, produtos químicos ou ferramentas
        de risco</strong> devem ser executados por profissionais habilitados.
        <strong> Nunca misture produtos de limpeza ou químicos</strong> —
        combinações como água sanitária com amônia ou com ácidos liberam
        gases tóxicos. Se você não tem certeza de que consegue executar um
        passo a passo com segurança, <strong>pare e contrate um
        profissional</strong>. O site não se responsabiliza por danos,
        acidentes ou lesões decorrentes da aplicação do conteúdo.
      </p>

      <H>3. Preços e disponibilidade</H>
      <p>
        Valores mencionados em artigos são estimativas de referência e podem
        variar por região, época e fornecedor. Sempre confirme com
        profissionais e lojas da sua região.
      </p>

      <H>4. Links de afiliados</H>
      <p>
        Alguns links para produtos podem ser de afiliados: se você comprar
        por eles, recebemos uma pequena comissão sem custo adicional para
        você. Isso não influencia nossas recomendações — indicamos o que
        avaliamos como melhor para cada necessidade.
      </p>

      <H>5. Direitos autorais</H>
      <p>
        Os textos e imagens deste site são de autoria da {SITE.name} e não
        podem ser reproduzidos integralmente sem autorização. Citações são
        bem-vindas com link para a fonte.
      </p>
    </div>
  );
}
