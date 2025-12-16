import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://indiasales.co"),
  title: {
    default: "India Sales - Premium Equestrian Products",
    template: "%s | India Sales",
  },
  description: "Premium quality equestrian products for horses and riders. Saddle pads, horse rugs, riding apparel & accessories. Trusted manufacturer since 1989.",
  keywords: ["equestrian", "horse products", "saddle pads", "horse rugs", "riding gear", "India Sales", "Kanpur"],
  authors: [{ name: "India Sales" }],
  creator: "India Sales",
  publisher: "India Sales",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://indiasales.co",
    siteName: "India Sales",
    title: "India Sales - Premium Equestrian Products",
    description: "Premium quality equestrian products for horses and riders since 1989.",
    images: [
      {
        url: "/images/logo.jpg",
        width: 1200,
        height: 630,
        alt: "India Sales - Equestrian Products",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "India Sales - Premium Equestrian Products",
    description: "Premium quality equestrian products for horses and riders since 1989.",
    images: ["/images/logo.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black min-h-screen`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-white text-black px-4 py-2 rounded z-[100]"
        >
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content">{children}</main>
      </body>
    </html>
  );
}
