/**
 * Local wording for each city landing page. The homepage is Jacksonville; add a city here and give it a
 * page under app/<slug>/ to launch another market with the same design, form, and CRM flow.
 */
export type Market = {
  /** City name used in local copy. */
  city: string;
  /** First line of the hero heading. */
  heading: string;
  /** Hero paragraph under the heading. */
  intro: string;
  /** Strip under the hero. */
  tagline: string;
  /** Third "Why Genesis" card. */
  localReason: { title: string; description: string };
  /** Answer to "Are we real estate agents?". */
  agentsAnswer: string;
  /** Situation pages: a "how we help" section under the hero, and FAQs shown before the general ones. */
  situation?: {
    eyebrow: string;
    title: string;
    intro: string;
    points: { title: string; text: string }[];
    faqs: { question: string; answer: string }[];
  };
};

export const markets = {
  jacksonville: {
    city: "Jacksonville",
    heading: "Sell Your House",
    intro: "Skip the repairs, the showings, and the agent fees. Genesis Home Buyers makes fair cash offers to Jacksonville homeowners and closes on your timeline.",
    tagline: "Local people. Straightforward offers.",
    localReason: { title: "Local & Trusted", description: "Work directly with local people who care about your community. Real conversations, not a national call center." },
    agentsAnswer: "No. We’re a local Jacksonville home-buying company, not a listing agent. We make you a direct cash offer, so there’s no listing, no showings, and no commission.",
  },
  pensacola: {
    city: "Pensacola",
    heading: "Sell Your Pensacola House",
    intro: "Skip the repairs, the showings, and the agent fees. Genesis Home Buyers makes fair cash offers to homeowners in Pensacola, Gulf Breeze, Pace, Milton, and across Escambia and Santa Rosa counties, and closes on your timeline.",
    tagline: "Real people. Straightforward offers.",
    localReason: { title: "Real People, Not a Call Center", description: "Work directly with our Florida team. Real conversations and straight answers, from your first call to closing day." },
    agentsAnswer: "No. We’re a Florida home-buying company that buys Pensacola houses directly, not a listing agent. We make you a direct cash offer, so there’s no listing, no showings, and no commission.",
  },
} satisfies Record<string, Market>;
