import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE } from "@/lib/site";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const isPreview = process.env.VERCEL_ENV === "preview";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Guias Práticos para Reformar e Cuidar da sua Casa`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "reforma",
    "casa",
    "faça você mesmo",
    "decoração",
    "limpeza",
    "organização",
    "jardim",
    "reparos",
    "guia passo a passo",
  ],
  robots: {
    index: !isPreview,
    follow: !isPreview,
    googleBot: {
      index: !isPreview,
      follow: !isPreview,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: SITE.locale,
    siteName: SITE.name,
    url: SITE.url,
    title: `${SITE.name} — Guias Práticos para a sua Casa`,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.name,
    description: SITE.description,
  },
  alternates: {
    canonical: SITE.url,
  },
  verification: {
    google: "-ze6GBorWqcjmQlidJXAI11byN6Zfu_jw8k3yG7c2a4",
  },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.name,
  url: SITE.url,
  email: SITE.email,
  description: SITE.description,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col bg-paper text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
