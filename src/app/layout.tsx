import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import { FaUniversity } from "react-icons/fa";
import SmoothScrolling from "@/components/SmoothScrolling";
import Landing from "@/components/Landing";
import { syne } from "./font";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Student Hub",
  description: "Developed by @zenrsr",
  icons: {
    icon: "/uoe.png"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={syne.className}>
      <body
        className={`${inter.className} flex flex-col min-h-screen bg-black`}
      >
        <main className="flex-grow">
          <SmoothScrolling>{children}</SmoothScrolling>
        </main>
        <Footer />
      </body>
    </html>
  );
}
