import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { company, contact } from "@/components/ui/legal-page";
import { cx } from "@/utils/cx";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });

const siteUrl = "https://genesis-home-buyers-llc.netlify.app";
const title = "Sell Your House Fast for Cash in Jacksonville, FL | Genesis Home Buyers LLC";
const description = "Sell your Jacksonville house as-is to Genesis Home Buyers LLC. Get a fair cash offer within 24 hours, pay no fees or commissions, and close in as little as 7 days.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: { type: "website", url: "/", siteName: company, locale: "en_US", title, description },
  twitter: { card: "summary_large_image", title, description },
};

// Business details for search engines (Google local results, maps, and AI answers).
const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: company,
  description,
  url: siteUrl,
  logo: `${siteUrl}/icon.png`,
  image: `${siteUrl}/opengraph-image.jpg`,
  telephone: contact.phoneHref.replace("tel:", ""),
  email: contact.email,
  address: { "@type": "PostalAddress", streetAddress: "9507 Egrets Landing Dr", addressLocality: "Jacksonville", addressRegion: "FL", postalCode: "32257", addressCountry: "US" },
  areaServed: { "@type": "City", name: "Jacksonville, FL" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={cx(inter.variable, "h-full antialiased")}>
      <body className="min-h-full font-sans">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd).replace(/</g, "\\u003c") }} />
        {children}
      </body>
    </html>
  );
}
