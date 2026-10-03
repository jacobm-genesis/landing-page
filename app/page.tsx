import type { Metadata } from "next";
import { HomePage } from "@/components/ui/home-page";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function Home() {
  return <HomePage />;
}
