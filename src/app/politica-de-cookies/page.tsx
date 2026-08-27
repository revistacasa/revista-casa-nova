import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de Cookies",
  description: `Como a ${SITE.name} usa cookies para métricas e, no futuro, publicidade.`,
  alternates: { canonical: `${SITE.url}/politica-de-cookies` },
};

const H = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-display text-2xl font-bold mt-8 mb-3">{children}</h2>
);

export default function CookiesPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 text-ink/80 leading-relaxed">
      <h1 className="font-display text-4xl font-extrabold text-ink">
        Política de Cookies
      </h1>
      <p className="mt-4 text-soft">Última atualização: agosto de 2026</p>

      <p className="mt-6">
        Cookies são pequenos arquivos de texto que um site pode guardar no seu
        navegador. Esta página diz o que está ligado e o que ainda não está.
      </p>

      <H>1. O que está ativo</H>
      <p>
        Usamos cookies de medição do <strong>Google Analytics 4</strong> para
        saber, de forma agregada, quais páginas são mais lidas. Não usamos
        cookies de publicidade. O servidor também pode usar o mínimo necessário
        para abrir as páginas.
      </p>

      <H>2. Cookies de medição</H>
      <p>
        O Google Analytics guarda cookies no seu navegador (em geral com nomes
        que começam com <code>_ga</code>). Eles ajudam a distinguir visitas, sem
        nos dizer quem você é. O Google processa esses dados. Você pode apagá-los
        ou bloqueá-los no navegador; o site continua abrindo. Também existe a{" "}
        <a
          href="https://tools.google.com/dlpage/gaoptout"
          target="_blank"
          rel="noopener nofollow"
          className="text-accent underline"
        >
          extensão de desativação do Google Analytics
        </a>
        .
      </p>

      <H>3. Cookies de publicidade (ainda não ativos)</H>
      <p>
        Quando ativarmos anúncios (Google AdSense), cookies do Google e de
        parceiros poderão ser usados para exibir anúncios e limitar a
        repetição. Você poderá controlar isso nas{" "}
        <a
          href="https://www.google.com/settings/ads"
          target="_blank"
          rel="noopener nofollow"
          className="text-accent underline"
        >
          Configurações de Anúncios do Google
        </a>
        . Antes disso, instalaremos o aviso de consentimento exigido.
      </p>

      <H>4. Como gerenciar cookies</H>
      <p>
        Você pode bloquear ou apagar cookies a qualquer momento nas
        configurações do seu navegador. O site continua funcionando.
      </p>

      <H>5. Consentimento</H>
      <p>
        Ao navegar, os cookies de medição descritos acima podem ser gravados.
        Cookies de anúncio não estão ligados. Quando forem, um aviso aparecerá
        antes, quando a lei exigir. Veja também a nossa{" "}
        <a href="/politica-de-privacidade" className="text-accent underline">
          Política de Privacidade
        </a>
        .
      </p>
    </div>
  );
}
