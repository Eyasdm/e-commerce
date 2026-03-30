import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "./providers";
import TopProgressBar from "@/components/TopProgressBar";
import ChatWidget from "@/components/ChatWidget";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "TechNest",
  description: "Premium tech accessories, delivered.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          {/*
            TopProgressBar uses useSearchParams() internally which requires
            a Suspense boundary when used inside the App Router.
          */}
          <Suspense fallback={null}>
            <TopProgressBar />
          </Suspense>

          <Navbar />
          {children}
          <ChatWidget />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
