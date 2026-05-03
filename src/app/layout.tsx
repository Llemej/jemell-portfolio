import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/molecules/Header";
import Footer from "@/components/molecules/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Jemell — Portfolio & Activity Log",
    template: "%s | Jemell",
  },
  description:
    "A high-performance portfolio showcasing internship projects, SEO audits, frontend engineering, and weekly learning logs.",
  keywords: [
    "portfolio",
    "internship",
    "frontend",
    "next.js",
    "typescript",
    "SEO",
  ],
  authors: [{ name: "Jemell" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Jemell Portfolio",
    title: "Jemell — Portfolio & Activity Log",
    description:
      "Internship projects, technical logs, and engineering case studies.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
