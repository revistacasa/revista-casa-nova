import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de Cookies",
  description: `Como a ${SITE.name} usa cookies para métricas e publicidade.`,
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
        navegador. Esta página diz o que usamos <strong>hoje</strong> e o que
        poderá ser usado no futuro.
      </p>

      <H>1. O que está ativo agora</H>
      <p>
        Não usamos cookies de medição (Google Analytics) nem cookies de
        publicidade. O site pode usar apenas o que o próprio navegador e o
        servidor precisam para abrir as páginas — sem te identificar.
      </p>

      <H>2. Cookies de medição (ainda não ativos)</H>
      <p>
        Se no futuro usarmos o Google Analytics, cookies ajudarão a saber,
        de forma agregada, quais páginas são mais lidas. Essa coleta{" "}
        <strong>não está ligada hoje</strong>. Quando for ligada, esta página
        será atualizada.
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
        Ao navegar hoje, você não está aceitando cookies de medição nem de
        anúncio — eles não estão ligados. Quando forem, um aviso aparecerá
        antes, quando a lei exigir. Veja também a nossa{" "}
        <a href="/politica-de-privacidade" className="text-accent underline">
          Política de Privacidade
        </a>
        .
      </p>
    </div>
  );
}
