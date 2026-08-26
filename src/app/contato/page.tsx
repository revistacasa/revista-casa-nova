import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contato",
  description: `Fale com a ${SITE.name}: sugestões de pauta, correções, parcerias e publicidade.`,
  alternates: { canonical: `${SITE.url}/contato` },
};

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 pt-10 article-body">
      <h1 className="font-display text-4xl font-extrabold">Contato</h1>
      <p className="mt-6">
        Adoramos ouvir dos leitores. Você pode falar com a redação da{" "}
        <strong>{SITE.name}</strong> por e-mail:
      </p>
      <p>
        📧 <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
      </p>
      <p>
        Enquanto o domínio próprio não estiver no ar, essa caixa pode ainda
        não receber mensagem. Se o e-mail voltar, tente de novo depois que o
        site estiver no endereço definitivo — ou avise pela rede social da
        revista, se houver.
      </p>
      <h2>Assuntos mais comuns</h2>
      <ul>
        <li>
          <strong>Sugestão de pauta</strong> — tem um problema em casa que não
          achou aqui? Conte para a gente;
        </li>
        <li>
          <strong>Correções</strong> — encontrou um erro em algum artigo? Avise
          (levamos a sério e corrigimos rápido);
        </li>
        <li>
          <strong>Parcerias e publicidade</strong> — marcas e profissionais
          interessados em colaborar;
        </li>
        <li>
          <strong>Direitos autorais</strong> — qualquer questão relacionada a
          conteúdo.
        </li>
      </ul>
      <p>
        Respondemos em até <strong>5 dias úteis</strong>. Obrigado pela
        leitura.
      </p>
    </div>
  );
}
