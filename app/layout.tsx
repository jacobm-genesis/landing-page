import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { cx } from "@/utils/cx";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Genesis Home Buyers LLC | Sell Your House for Cash",
  description: "Sell your house as-is with Genesis Home Buyers LLC. Get a fair cash offer within 24 hours, pay no fees or commissions, and close on your timeline.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={cx(inter.variable, "h-full antialiased")}>
      <body className="min-h-full font-sans">{children}</body>
    </html>
  );
}
