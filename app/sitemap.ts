import type { MetadataRoute } from "next";
import { siteUrl } from "@/utils/site";

export const dynamic = "force-static";

// Every public page. Add new pages (city or situation pages) here so Google finds them.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/jv`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteUrl}/text-us`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteUrl}/privacy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${siteUrl}/terms`, changeFrequency: "yearly", priority: 0.2 },
  ];
}
