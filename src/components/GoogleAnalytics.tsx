const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_ID?.trim() || "G-3FTFSHJ5TB";

export default function GoogleAnalytics() {
  if (process.env.VERCEL_ENV === "preview") return null;

  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '${GA_MEASUREMENT_ID}');`,
        }}
      />
    </>
  );
}
