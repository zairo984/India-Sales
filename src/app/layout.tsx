import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "India Sales",
  icons:{
    icon:"/fevicon.jpg",
  },
  description: "All products for horse and horse riders",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>IndiaSales</title>
        {/* <link rel="icon" href="/favicon.jpg" /> */}
        {/* You can use .png or .svg as well */}
        <link rel="icon" type="image/png" href="/fevicon.png" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black`}>
      <Navbar />
        {children}
      </body>
    </html>
  );
}
