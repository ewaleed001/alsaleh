import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MainContent from "@/components/MainContent";
import ScrollToTop from "@/components/ScrollToTop";
import { LanguageProvider } from "@/context/LanguageContext";
import "./globals.css";



export const metadata: Metadata = {
  title: "Al-Saleh Group Real Estate | شركة آل صالح العقارية",
  description: "اكتشف أكثر من 50 عاماً من الخبرة في السوق العقاري السعودي. مشاريع سكنية وتجارية وفندقية في الرياض ومناطق المملكة.",
  icons: {
    icon: '/logo.svg',
  },
  openGraph: {
    title: "شركة آل صالح العقارية | Al-Saleh Group Real Estate",
    description: "أكثر من 50 عاماً من الثقة والتميز في السوق العقاري السعودي",
    type: "website",
    locale: "ar_SA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className="font-arabic antialiased text-brand-dark bg-brand-light selection:bg-brand-secondary/30 selection:text-brand-primary">
        <LanguageProvider>
          <Header />
          <MainContent>
            {children}
          </MainContent>
          <Footer />
          <ScrollToTop />
        </LanguageProvider>
      </body>
    </html>
  );
}
