import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HomePage } from "@/components/ui/home-page";
import { situations } from "@/utils/situations";

// Only the situations listed in utils/situations.ts exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return situations.map(({ slug }) => ({ situation: slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ situation: string }> }): Promise<Metadata> {
  const { situation: requested } = await params;
  const situation = situations.find(({ slug }) => slug === requested);
  if (!situation) return {};
  const { slug, metaTitle: title, metaDescription: description } = situation;
  return { title, description, alternates: { canonical: `/${slug}` }, openGraph: { url: `/${slug}`, title, description }, twitter: { title, description } };
}

export default async function SituationPage({ params }: { params: Promise<{ situation: string }> }) {
  const { situation: requested } = await params;
  const situation = situations.find(({ slug }) => slug === requested);
  if (!situation) notFound();
  return <HomePage market={situation} />;
}
