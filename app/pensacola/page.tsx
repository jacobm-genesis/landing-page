import type { Metadata } from "next";
import { HomePage } from "@/components/ui/home-page";
import { markets } from "@/utils/markets";

const title = "Sell Your House Fast for Cash in Pensacola, FL | Genesis Home Buyers LLC";
const description = "Sell your Pensacola house as-is to Genesis Home Buyers LLC. Fair cash offers within 24 hours for homes in Pensacola, Gulf Breeze, Pace, and Milton. No fees, no repairs, close in as little as 7 days.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/pensacola" },
  openGraph: { url: "/pensacola", title, description },
  twitter: { title, description },
};

export default function Pensacola() {
  return <HomePage market={markets.pensacola} />;
}
