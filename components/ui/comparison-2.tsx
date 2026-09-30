import { RiArrowRightLine, RiCheckLine, RiCloseLine, RiShieldCheckLine } from "@remixicon/react";
import { Badge } from "@/components/base/badges/badge";
import { ButtonLink } from "@/components/base/buttons/button";
import { Divider } from "@/components/base/divider/divider";
import { cx } from "@/utils/cx";

const comparisonRows = [
  { traditional: "Waiting for the right buyer can take months", genesis: "A fair cash offer within 24 hours" },
  { traditional: "Showings can interrupt your everyday life", genesis: "No showings. No open houses." },
  { traditional: "Buyer financing can delay the sale", genesis: "A cash purchase. Close in as little as 7 days." },
  { traditional: "Closing depends on the buyer’s schedule", genesis: "You choose your closing day" },
  { traditional: "Agent fees and commissions reduce your proceeds", genesis: "Zero fees. Zero commissions." },
  { traditional: "Repairs and prep can mean more work for you", genesis: "Sell as-is. Leave the repairs to us." },
];

export function Comparison2() {
  return (
    <section id="cash-offer-comparison" aria-labelledby="comparison-heading" className="scroll-mt-28 bg-background-secondary-default px-5 py-16 sm:px-8 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <Badge className="mb-4 rounded-full border border-accent-200 bg-accent-50 px-4 py-1.5 text-caption-1-semibold text-accent-800">A SIMPLER WAY TO SELL</Badge>
          <h2 id="comparison-heading" className="text-display-4-bold text-accent-950 sm:text-display-3-bold">Our cash offer program</h2>
          <p className="mt-4 text-headline-regular text-text-secondary">See how selling to Genesis compares with listing your home on the market.</p>
        </div>

        <div className="genesis-glass-stage mt-10 grid items-center gap-4 rounded-3xl md:mt-12 md:grid-cols-2 md:gap-0">
          {(["traditional", "genesis"] as const).map((option) => {
            const isGenesis = option === "genesis";
            const Icon = isGenesis ? RiCheckLine : RiCloseLine;
            return (
              <article key={option} aria-labelledby={`${option}-comparison-title`} className={cx("genesis-glass rounded-3xl border border-border-button-default p-6 sm:p-8 lg:px-10", isGenesis ? "genesis-glass-dark relative text-accent-50 md:py-12" : "text-text-secondary md:rounded-r-none md:border-r-0")}>
                <p className={cx("mb-3 text-caption-1-semibold tracking-widest", isGenesis ? "text-accent-300" : "text-text-secondary")}>{isGenesis ? "THE GENESIS DIFFERENCE" : "SELLING ON THE MARKET"}</p>
                <h3 id={`${option}-comparison-title`} className={cx("mb-6 text-title-2-semibold", !isGenesis && "text-text-primary")}>{isGenesis ? "Our Cash Offer Program" : "Traditional Process"}</h3>
                <ul>
                  {comparisonRows.map((row, index) => (
                    <li key={row.genesis}>
                      <div className="flex min-h-20 items-center gap-3 py-4 lg:min-h-16">
                        <span aria-hidden className={cx("flex size-6 shrink-0 items-center justify-center rounded-full", isGenesis ? "bg-accent-200 text-accent-950" : "bg-background-tertiary-default text-text-tertiary")}><Icon className="size-4" /></span>
                        <span className={isGenesis ? "text-body-medium" : "text-body-regular"}>{row[option]}</span>
                      </div>
                      {index < comparisonRows.length - 1 && <Divider aria-hidden className={isGenesis ? "bg-accent-100/20" : "bg-separator-border"} />}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col items-center gap-4 text-center sm:mt-10">
          <ButtonLink href="#offer" trailingIcon={RiArrowRightLine} className="h-12 rounded-full px-6 text-body-semibold">Get My Free Cash Offer</ButtonLink>
          <p className="flex items-center gap-2 text-body-regular text-text-secondary"><RiShieldCheckLine className="size-4 shrink-0 text-accent-700" aria-hidden />No pressure. No obligation.</p>
        </div>
      </div>
    </section>
  );
}
