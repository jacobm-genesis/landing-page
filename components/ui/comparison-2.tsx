import { RiArrowRightLine, RiCheckLine, RiCloseLine, RiShieldCheckLine } from "@remixicon/react";
import { Badge } from "@/components/base/badges/badge";
import { ButtonLink } from "@/components/base/buttons/button";
import { cx } from "@/utils/cx";

// Typical costs of listing a $300,000 home; ranges, not quotes.
const listingCosts = [
  { label: "Agent commission (5–6%)", amount: "$15,000–$18,000" },
  { label: "Repairs, cleanup & staging", amount: "$5,000–$25,000" },
  { label: "Seller closing costs (title, doc stamps)", amount: "$4,000–$6,000" },
  { label: "Holding costs while listed (mortgage, taxes, insurance, utilities)", amount: "$4,000–$8,000" },
];

const comparisonRows = [
  { traditional: "2–4 months to close", genesis: "Close in as little as 7 days" },
  { traditional: "5–6% agent commission", genesis: "Zero fees or commissions" },
  { traditional: "You pay closing costs", genesis: "We pay closing costs" },
  { traditional: "Repairs before you list", genesis: "Sell completely as-is" },
  { traditional: "Strangers touring your home", genesis: "No showings, ever" },
  { traditional: "Buyer’s loan can fall through", genesis: "Cash — no financing risk" },
  { traditional: "Closing on the buyer’s schedule", genesis: "You pick your closing day" },
];

export function Comparison2() {
  return (
    <section id="cash-offer-comparison" aria-labelledby="comparison-heading" className="scroll-mt-28 bg-background-secondary-default px-5 py-16 sm:px-8 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <Badge className="mb-4 rounded-full border border-accent-200 bg-accent-50 px-4 py-1.5 text-caption-1-semibold text-accent-800">WHAT LISTING REALLY COSTS</Badge>
          <h2 id="comparison-heading" className="text-balance text-display-4-bold text-accent-950 sm:text-display-3-bold">The list price isn’t what you take home</h2>
          <p className="mt-4 text-headline-regular text-text-secondary">Most people call an agent first. Here’s what that path typically costs on a $300,000 Jacksonville home — before any price cuts or post-inspection repair requests.</p>
        </div>

        <div className="mt-10 grid gap-5 md:mt-12 lg:grid-cols-5">
          <article aria-labelledby="listing-costs-title" className="flex flex-col rounded-3xl border border-border-button-default bg-background-primary-default p-6 sm:p-8 lg:col-span-2">
            <p className="mb-3 text-caption-1-semibold tracking-widest text-text-secondary">THE TRADITIONAL ROUTE</p>
            <h3 id="listing-costs-title" className="text-title-2-semibold text-text-primary">What comes out of your sale</h3>
            <dl className="mt-6 flex flex-col divide-y divide-separator-border">
              {listingCosts.map(({ label, amount }) => (
                <div key={label} className="flex items-baseline justify-between gap-4 py-4">
                  <dt className="text-body-regular text-text-secondary">{label}</dt>
                  <dd className="shrink-0 text-right text-body-semibold text-text-error-primary">{amount}</dd>
                </div>
              ))}
              <div className="flex items-baseline justify-between gap-4 pt-5">
                <dt className="text-headline-semibold text-text-primary">Typical total</dt>
                <dd className="shrink-0 text-right text-title-3-bold text-text-error-primary">$28,000–$57,000</dd>
              </div>
            </dl>
            <p className="mt-2 text-body-regular text-text-secondary">Plus 2–4 months of your time — and the deal can still fall apart at the last minute.</p>
            <p className="mt-auto pt-6 text-caption-1-regular text-text-tertiary">Typical ranges for illustration. Your actual costs depend on your home, price, and market.</p>
          </article>

          <div className="overflow-hidden rounded-3xl border border-border-button-default bg-background-primary-default lg:col-span-3">
            <table className="h-full w-full table-fixed text-center">
              <caption className="sr-only">Traditional listing compared with selling to Genesis Home Buyers</caption>
              <thead className="bg-accent-950">
                <tr>
                  <th scope="col" className="px-4 py-5 text-caption-1-semibold tracking-widest text-accent-100">TRADITIONAL LISTING</th>
                  <th scope="col" className="border-l border-accent-100/20 px-4 py-5 text-caption-1-semibold tracking-widest text-accent-300">SELLING TO GENESIS</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map(({ traditional, genesis }, index) => (
                  <tr key={genesis} className={cx(index > 0 && "border-t border-separator-border")}>
                    <td className="px-3 py-4 sm:px-5">
                      <span className="inline-flex items-center gap-2 text-body-regular text-text-secondary">
                        <RiCloseLine className="hidden size-4 shrink-0 text-text-tertiary sm:block" aria-hidden />{traditional}
                      </span>
                    </td>
                    <td className="border-l border-accent-100 bg-accent-50 px-3 py-4 sm:px-5">
                      <span className="inline-flex items-center gap-2 text-body-semibold text-accent-950">
                        <RiCheckLine className="hidden size-4 shrink-0 text-accent-700 sm:block" aria-hidden />{genesis}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-3xl rounded-3xl border border-accent-200 bg-accent-50 p-6 sm:mt-10 sm:p-8">
          <h3 className="text-title-3-semibold text-accent-950">Will our offer be lower than list price?</h3>
          <p className="mt-2 text-headline-regular text-text-secondary">Usually, yes — and we’ll tell you that up front. But it’s a number you actually keep: no commissions, no closing costs, no repairs, no months of waiting, and a closing date you choose. Once you add up what listing really costs, the gap is often much smaller than it looks.</p>
        </div>

        <div className="mt-8 flex flex-col items-center gap-4 text-center sm:mt-10">
          <ButtonLink href="#offer" trailingIcon={RiArrowRightLine} className="h-12 rounded-full px-6 text-body-semibold">See What We’d Offer</ButtonLink>
          <p className="flex items-center gap-2 text-body-regular text-text-secondary"><RiShieldCheckLine className="size-4 shrink-0 text-accent-700" aria-hidden />No pressure. No obligation.</p>
        </div>
      </div>
    </section>
  );
}
