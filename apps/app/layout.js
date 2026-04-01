import TopProgressBar from "@/components/TopProgressBar";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import Providers from "./providers";

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
  icons: {
    icon: "/logo-without-background.png",
    apple: "/logo-without-background.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Suspense fallback={null}>
            <TopProgressBar />
          </Suspense>
          {children}
        </Providers>
      </body>
    </html>
  );
}
