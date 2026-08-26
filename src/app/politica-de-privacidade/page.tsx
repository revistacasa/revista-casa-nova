import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: `Política de privacidade da ${SITE.name}: quais dados coletamos, por quê e como são usados.`,
  alternates: { canonical: `${SITE.url}/politica-de-privacidade` },
};

const H = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-display text-2xl font-bold mt-8 mb-3">{children}</h2>
);

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 text-ink/80 leading-relaxed">
      <h1 className="font-display text-4xl font-extrabold text-ink">
        Política de Privacidade
      </h1>
      <p className="mt-4 text-soft">Última atualização: agosto de 2026</p>

      <p className="mt-6">
        A <strong>{SITE.name}</strong> (&quot;nós&quot;, &quot;nosso site&quot;) respeita a sua
        privacidade. Esta política explica quais informações podemos coletar quando
        você usa o site, como as usamos e quais são os seus direitos, em
        conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei
        13.709/2018).
      </p>

      <H>1. Quais dados coletamos hoje</H>
      <ul className="list-disc pl-6 flex flex-col gap-2">
        <li>
          <strong>Dados que você nos envia:</strong> quando entra em contato por
          e-mail, tratamos apenas o que você escrever (nome e mensagem) para
          responder.
        </li>
        <li>
          <strong>Registros técnicos do servidor:</strong> o provedor de
          hospedagem pode registrar, de forma automática e temporária, endereço
          IP e tipo de navegador para manter o site no ar e proteger contra
          abuso. Não usamos isso para te identificar.
        </li>
        <li>
          <strong>Google Analytics e cookies de medição:</strong>{" "}
          <em>não estão ativos neste momento</em>. Se passarmos a usá-los, esta
          página será atualizada antes, e — quando a lei exigir — um aviso de
          consentimento aparecerá no site.
        </li>
      </ul>

      <H>2. Publicidade e Google AdSense</H>
      <p>
        Ainda não exibimos anúncios. Quando o Google AdSense for ativado, o
        Google e seus parceiros poderão usar cookies para personalizar anúncios
        com base nas suas visitas a este e a outros sites. Você poderá
        desativar a publicidade personalizada nas{" "}
        <a
          href="https://www.google.com/settings/ads"
          target="_blank"
          rel="noopener nofollow"
          className="text-accent underline"
        >
          Configurações de Anúncios do Google
        </a>
        . Antes de ligar os anúncios, instalaremos a ferramenta de consentimento
        exigida e atualizaremos esta política.
      </p>

      <H>3. Links de afiliados</H>
      <p>
        Alguns artigos poderão, no futuro, conter links de afiliado: se você
        comprar por eles, podemos receber uma comissão, sem custo adicional
        para você. Esses links serão identificados. Sites parceiros têm
        políticas de privacidade próprias.
      </p>

      <H>4. Por que usamos esses dados</H>
      <ul className="list-disc pl-6 flex flex-col gap-2">
        <li>Responder às suas mensagens;</li>
        <li>Manter o site no ar e seguro;</li>
        <li>
          No futuro: melhorar o conteúdo, entender quais assuntos interessam
          mais e, se houver anúncios, medi-los — sempre com esta política
          atualizada.
        </li>
      </ul>

      <H>5. Seus direitos (LGPD)</H>
      <p>
        Você pode solicitar acesso, correção ou exclusão dos seus dados
        pessoais, além de retirar consentimentos, escrevendo para{" "}
        <a href={`mailto:${SITE.email}`} className="text-accent underline">
          {SITE.email}
        </a>
        .
      </p>

      <H>6. Segurança e retenção</H>
      <p>
        Não pedimos dados sensíveis. Mensagens de e-mail ficam só o tempo
        necessário para responder. Logs do servidor seguem a política do
        provedor de hospedagem.
      </p>

      <H>7. Alterações desta política</H>
      <p>
        Podemos atualizar esta página; a data no topo indica a última versão.
        Dúvidas:{" "}
        <a href={`mailto:${SITE.email}`} className="text-accent underline">
          {SITE.email}
        </a>
        .
      </p>
    </div>
  );
}
