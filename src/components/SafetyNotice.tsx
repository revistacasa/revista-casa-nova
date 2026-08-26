/**
 * Aviso de segurança exibido automaticamente ao final de TODOS os artigos.
 * Política editorial da Casa Nova: conteúdo informativo; serviços de risco
 * (elétrica, gás, estrutural, produtos químicos, altura) exigem profissional;
 * nunca misturar produtos de limpeza; dúvida = profissional.
 */
export default function SafetyNotice() {
  return (
    <aside className="mt-10 bg-cream border-l-4 border-accent rounded-r-xl p-5">
      <p className="font-display font-bold text-lg mb-2">⚠️ Segurança em primeiro lugar</p>
      <p className="text-sm text-ink/80 leading-relaxed">
        Este artigo tem caráter <strong>informativo</strong>. Para serviços que
        envolvam <strong>eletricidade, gás, estrutura, altura, produtos
        químicos ou ferramentas de risco</strong>, contrate um profissional
        qualificado. <strong>Nunca misture produtos de limpeza</strong> (como
        água sanitária com amônia ou ácidos) — a combinação libera gases
        tóxicos. Use sempre equipamentos de proteção (EPIs) e, se tiver
        qualquer dúvida sobre o passo a passo, pare e consulte um especialista.
      </p>
    </aside>
  );
}
