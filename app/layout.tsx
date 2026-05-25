// next-akiyama\app\layout.tsx

import type { Metadata } from "next";
import "./globals.css";

// フォント
import { Noto_Sans_JP } from "next/font/google"

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
})

// app/layout.tsx
export const metadata: Metadata = {
  title: {
    template: "%s ｜ Next.js16 × microcmsのサンプルサイト",
    default: "Next.js16 × microcmsのサンプルサイト", 
  },
  description: "Next.js 16.1.6(Turbopack) × microcmsのサンプルサイトです。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={notoSansJP.className}>
      <body>
        {children}
      </body>
    </html>
  );
}
