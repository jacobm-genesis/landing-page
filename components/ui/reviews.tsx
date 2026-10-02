import { RiDoubleQuotesL, RiStarFill } from "@remixicon/react";
import { Badge } from "@/components/base/badges/badge";
import { cx } from "@/utils/cx";

type Review = { quote: string; name: string; area?: string; rating?: number };

// Real seller reviews only, used with the seller's permission (e.g. copied from Google Business Profile).
// While this list is empty the section is hidden on the live site.
const reviews: Review[] = [];

// Layout preview for `npm run dev` only; never rendered in a production build.
const devSamples: Review[] = Array.from({ length: 3 }, (_, index) => ({
  quote: "Sample slot — replace with a real seller review. Two or three sentences about how fast, easy, and fair the sale was work best.",
  name: `Seller ${index + 1}`,
  area: "Neighborhood, Jacksonville",
  rating: 5,
}));

export function Reviews() {
  const isSample = reviews.length === 0;
  const shown = isSample ? (process.env.NODE_ENV === "development" ? devSamples : []) : reviews;
  if (shown.length === 0) return null;

  return (
    <section id="reviews" aria-labelledby="reviews-heading" className="scroll-mt-28 px-5 py-16 sm:px-8 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-caption-1-semibold tracking-widest text-accent-600">WHAT SELLERS SAY</p>
          <h2 id="reviews-heading" className="text-balance text-display-4-bold text-accent-950 sm:text-display-3-bold">Real people. Real closings.</h2>
          {isSample && <Badge className="mt-4 rounded-full border border-border-error-default bg-background-primary-default px-3 py-1 text-caption-1-semibold text-text-error-primary">LOCAL PREVIEW ONLY — HIDDEN ON THE LIVE SITE UNTIL REAL REVIEWS ARE ADDED</Badge>}
        </div>
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {shown.map(({ quote, name, area, rating }) => (
            <li key={name} className={cx("flex flex-col rounded-3xl border bg-background-primary-default p-7", isSample ? "border-dashed border-border-button-hover" : "border-border-button-default")}>
              <div className="flex items-center justify-between">
                <RiDoubleQuotesL className="size-8 text-accent-200" aria-hidden />
                {rating && (
                  <span className="flex gap-0.5 text-accent-600" role="img" aria-label={`${rating} out of 5 stars`}>
                    {Array.from({ length: rating }, (_, star) => <RiStarFill key={star} className="size-4" aria-hidden />)}
                  </span>
                )}
              </div>
              <blockquote className="mt-4 flex-1 text-headline-regular text-text-primary">{quote}</blockquote>
              <p className="mt-6 text-body-semibold text-accent-950">{name}</p>
              {area && <p className="text-body-regular text-text-secondary">{area}</p>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
