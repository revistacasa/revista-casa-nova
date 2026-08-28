"use client";

import { useMemo, useState } from "react";

const TIPOS = [
  {
    id: "pva",
    nome: "PVA / látex",
    rendimento: 8,
    quando: "Parede interna comum, acabamento mais simples.",
  },
  {
    id: "fosca",
    nome: "Acrílica fosca",
    rendimento: 10,
    quando: "Sala, quarto, corredor — o tipo mais usado em parede.",
  },
  {
    id: "acetinada",
    nome: "Acrílica acetinada",
    rendimento: 11,
    quando: "Cozinha, banheiro, área que vai limpar com pano.",
  },
] as const;

const PORTA_M2 = 0.8 * 2.1;
const JANELA_M2 = 1.2 * 1.2;
const PERDA = 0.1;

function packCans(litros: number) {
  let resto = litros;
  const n18 = Math.floor(resto / 18);
  resto = +(resto - n18 * 18).toFixed(2);
  let n36 = Math.floor(resto / 3.6);
  resto = +(resto - n36 * 3.6).toFixed(2);
  let n09 = resto > 0.05 ? Math.ceil(resto / 0.9) : 0;
  if (n09 >= 4) {
    n36 += 1;
    n09 = 0;
  }
  return { n18, n36, n09 };
}

const field =
  "w-full rounded-lg border border-[#eae5dc] bg-white px-3 py-2 text-ink outline-none focus:border-accent";

export default function CalculadoraTinta() {
  const [comp, setComp] = useState("4");
  const [larg, setLarg] = useState("3");
  const [alt, setAlt] = useState("2.6");
  const [portas, setPortas] = useState("1");
  const [janelas, setJanelas] = useState("1");
  const [teto, setTeto] = useState(false);
  const [tipo, setTipo] = useState<(typeof TIPOS)[number]["id"]>("fosca");
  const [demaos, setDemaos] = useState<1 | 2>(2);

  const resultado = useMemo(() => {
    const c = Number(comp.replace(",", "."));
    const l = Number(larg.replace(",", "."));
    const a = Number(alt.replace(",", "."));
    const np = Math.max(0, Math.floor(Number(portas) || 0));
    const nj = Math.max(0, Math.floor(Number(janelas) || 0));
    if (![c, l, a].every((n) => Number.isFinite(n) && n > 0)) return null;

    const paredes = 2 * (c + l) * a;
    const tetoM2 = teto ? c * l : 0;
    const desconto = np * PORTA_M2 + nj * JANELA_M2;
    const area = Math.max(0, paredes + tetoM2 - desconto);
    const spec = TIPOS.find((t) => t.id === tipo)!;
    const litrosBrutos = (area * demaos) / spec.rendimento;
    const litros = litrosBrutos * (1 + PERDA);
    const latas = packCans(litros);
    return { area, spec, litros, latas, paredes, tetoM2, desconto };
  }, [comp, larg, alt, portas, janelas, teto, tipo, demaos]);

  return (
    <section className="my-10 rounded-2xl border border-[#eae5dc] bg-cream/60 p-5 md:p-7">
      <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase mb-2">
        Calculadora
      </p>
      <h2 className="font-display text-2xl font-extrabold text-ink leading-tight">
        Quanto de tinta esse cômodo pede
      </h2>
      <p className="text-soft mt-2 text-sm leading-relaxed">
        Mede o retângulo do cômodo. A conta usa um rendimento conservador por
        tipo de tinta, mais 10% de perda (canto, absorção, o que fica na
        bandeja). A lata que você comprar manda no número final — se a
        embalagem disser outro rendimento, vale o dela.
      </p>

      <div className="mt-6 grid sm:grid-cols-3 gap-3">
        <label className="text-sm font-medium text-ink">
          Comprimento (m)
          <input
            className={`${field} mt-1`}
            inputMode="decimal"
            value={comp}
            onChange={(e) => setComp(e.target.value)}
          />
        </label>
        <label className="text-sm font-medium text-ink">
          Largura (m)
          <input
            className={`${field} mt-1`}
            inputMode="decimal"
            value={larg}
            onChange={(e) => setLarg(e.target.value)}
          />
        </label>
        <label className="text-sm font-medium text-ink">
          Pé-direito (m)
          <input
            className={`${field} mt-1`}
            inputMode="decimal"
            value={alt}
            onChange={(e) => setAlt(e.target.value)}
          />
        </label>
      </div>

      <div className="mt-3 grid sm:grid-cols-2 gap-3">
        <label className="text-sm font-medium text-ink">
          Portas (quantidade)
          <input
            className={`${field} mt-1`}
            inputMode="numeric"
            value={portas}
            onChange={(e) => setPortas(e.target.value)}
          />
        </label>
        <label className="text-sm font-medium text-ink">
          Janelas (quantidade)
          <input
            className={`${field} mt-1`}
            inputMode="numeric"
            value={janelas}
            onChange={(e) => setJanelas(e.target.value)}
          />
        </label>
      </div>
      <p className="text-xs text-soft mt-1">
        Cada porta entra como 0,80 × 2,10 m. Cada janela, 1,20 × 1,20 m. Se a
        sua for bem diferente, arredonda a quantidade.
      </p>

      <label className="mt-4 flex items-center gap-2 text-sm text-ink">
        <input
          type="checkbox"
          checked={teto}
          onChange={(e) => setTeto(e.target.checked)}
          className="accent-[#b4552d]"
        />
        Incluir o teto
      </label>

      <fieldset className="mt-5">
        <legend className="text-sm font-medium text-ink mb-2">Tipo de tinta</legend>
        <div className="grid gap-2">
          {TIPOS.map((t) => (
            <label
              key={t.id}
              className={`flex items-start gap-3 rounded-xl border px-3 py-3 cursor-pointer ${
                tipo === t.id ? "border-accent bg-white" : "border-[#eae5dc] bg-white/70"
              }`}
            >
              <input
                type="radio"
                name="tipo-tinta"
                checked={tipo === t.id}
                onChange={() => setTipo(t.id)}
                className="mt-1 accent-[#b4552d]"
              />
              <span>
                <span className="font-semibold">{t.nome}</span>
                <span className="text-soft"> · {t.rendimento} m²/L por demão</span>
                <span className="block text-xs text-soft mt-0.5">{t.quando}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-5">
        <legend className="text-sm font-medium text-ink mb-2">Demãos</legend>
        <div className="flex gap-2">
          {([1, 2] as const).map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setDemaos(n)}
              className={`flex-1 rounded-xl border px-3 py-2 text-sm font-semibold ${
                demaos === n
                  ? "border-accent bg-accent text-white"
                  : "border-[#eae5dc] bg-white text-ink"
              }`}
            >
              {n} demão{n === 1 ? "" : "s"}
            </button>
          ))}
        </div>
        <p className="text-xs text-soft mt-2">
          Uma demão só quase nunca cobre bem. O artigo pede duas finas.
        </p>
      </fieldset>

      {resultado && (
        <div className="mt-6 rounded-xl bg-ink text-paper p-5">
          <p className="text-xs tracking-[0.2em] uppercase text-paper/70">Resultado</p>
          <p className="font-display text-3xl font-extrabold mt-1">
            {resultado.litros.toFixed(1).replace(".", ",")} litros
          </p>
          <p className="text-sm text-paper/80 mt-2 leading-relaxed">
            Área líquida {resultado.area.toFixed(1).replace(".", ",")} m² ·{" "}
            {demaos} demão{demaos === 1 ? "" : "s"} · {resultado.spec.nome} (
            {resultado.spec.rendimento} m²/L) · já com 10% a mais.
          </p>
          <ul className="mt-4 text-sm space-y-1">
            {resultado.latas.n18 > 0 && (
              <li>
                {resultado.latas.n18} lata{resultado.latas.n18 === 1 ? "" : "s"} de 18 L
              </li>
            )}
            {resultado.latas.n36 > 0 && (
              <li>
                {resultado.latas.n36} lata{resultado.latas.n36 === 1 ? "" : "s"} de 3,6 L
              </li>
            )}
            {resultado.latas.n09 > 0 && (
              <li>
                {resultado.latas.n09} lata{resultado.latas.n09 === 1 ? "" : "s"} de 0,9 L
              </li>
            )}
            {resultado.latas.n18 + resultado.latas.n36 + resultado.latas.n09 === 0 && (
              <li>Menos de 0,9 L — uma latinha de 0,9 L cobre.</li>
            )}
          </ul>
          <p className="text-xs text-paper/65 mt-4 leading-relaxed">
            Fundo preparador, se a parede chupar tinta, é conta à parte. Gesso
            cru e massa nova bebem mais do que essa média.
          </p>
        </div>
      )}
    </section>
  );
}
