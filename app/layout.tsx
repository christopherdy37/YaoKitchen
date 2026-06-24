import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import ConditionalShell from "./ConditionalShell";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Yao's Kitchen — Premium Wake Catering",
  description:
    "Thoughtful food, handled with care. Premium wake catering services across Metro Manila.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-5YNBZFJ6YL"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-5YNBZFJ6YL');
          `}
        </Script>
        <ConditionalShell>{children}</ConditionalShell>
      </body>
    </html>
  );
}
