import { RiArrowRightLine, RiCheckLine, RiCloseLine, RiShieldCheckLine } from "@remixicon/react";
import { Badge } from "@/components/base/badges/badge";
import { ButtonLink } from "@/components/base/buttons/button";
import { cx } from "@/utils/cx";

// Same $300,000 home sold two ways. Listing costs are typical ranges; the offer range is Genesis's typical as-is offer.
const payouts = {
  traditional: {
    eyebrow: "LIST WITH AN AGENT",
    startLabel: "List price",
    start: "$300,000",
    lines: [
      { label: "Agent commission", amount: "−$15k–$18k" },
      { label: "Repairs & staging", amount: "−$5k–$25k" },
      { label: "Closing costs", amount: "−$4k–$6k" },
      { label: "Holding costs", amount: "−$4k–$8k" },
    ],
    net: "$243k–$272k",
    when: "in 2–4 months — if the deal doesn’t fall through",
  },
  genesis: {
    eyebrow: "SELL TO GENESIS",
    startLabel: "Cash offer",
    start: "$200k–$230k",
    lines: [
      { label: "Agent commission", amount: "$0" },
      { label: "Repairs & staging", amount: "$0" },
      { label: "Closing costs", amount: "$0 — we pay" },
      { label: "Holding costs", amount: "$0" },
    ],
    net: "$200k–$230k",
    when: "in as little as 7 days — cash, no financing risk",
  },
};

const comparisonRows = [
  { traditional: "2–4 months to close", genesis: "Close in as little as 7 days" },
  { traditional: "5–6% agent commission", genesis: "Zero fees or commissions" },
  { traditional: "You pay closing costs", genesis: "We pay closing costs" },
  { traditional: "Repairs before you list", genesis: "Sell completely as-is" },
  { traditional: "Strangers touring your home", genesis: "No showings, ever" },
  { traditional: "Buyer’s loan can fall through", genesis: "Cash — no financing risk" },
  { traditional: "Closing on the buyer’s schedule", genesis: "You pick your closing day" },
];

function PayoutCard({ option }: { option: keyof typeof payouts }) {
  const isGenesis = option === "genesis";
  const { eyebrow, startLabel, start, lines, net, when } = payouts[option];
  return (
    <article aria-label={isGenesis ? "Selling to Genesis: what you walk away with" : "Listing with an agent: what you walk away with"} className={cx("flex flex-col rounded-3xl border p-6", isGenesis ? "border-accent-800 bg-accent-950 text-accent-50" : "border-border-button-default bg-background-primary-default")}>
      <p className={cx("text-caption-1-semibold tracking-widest", isGenesis ? "text-accent-300" : "text-text-secondary")}>{eyebrow}</p>
      <div className="mt-4 flex items-baseline justify-between gap-3">
        <span className={cx("text-body-medium", isGenesis ? "text-accent-100" : "text-text-secondary")}>{startLabel}</span>
        <span className={cx("text-headline-semibold", isGenesis ? "text-accent-50" : "text-text-primary")}>{start}</span>
      </div>
      <dl className={cx("mt-3 flex flex-col divide-y border-y", isGenesis ? "divide-accent-100/15 border-accent-100/15" : "divide-separator-border border-separator-border")}>
        {lines.map(({ label, amount }) => (
          <div key={label} className="flex items-baseline justify-between gap-3 py-2.5">
            <dt className={cx("text-body-regular", isGenesis ? "text-accent-100" : "text-text-secondary")}>{label}</dt>
            <dd className={cx("shrink-0 text-body-semibold", isGenesis ? "text-accent-300" : "text-text-error-primary")}>{amount}</dd>
          </div>
        ))}
      </dl>
      <p className={cx("mt-5 text-body-medium", isGenesis ? "text-accent-100" : "text-text-secondary")}>You walk away with</p>
      <p className={cx("text-title-1-bold", isGenesis ? "text-accent-300" : "text-text-error-primary")}>{net}</p>
      <p className={cx("mt-1 text-body-regular", isGenesis ? "text-accent-100" : "text-text-secondary")}>{when}</p>
    </article>
  );
}

function ProcessCard({ option }: { option: "traditional" | "genesis" }) {
  const isGenesis = option === "genesis";
  const Icon = isGenesis ? RiCheckLine : RiCloseLine;
  return (
    <article aria-labelledby={`${option}-process-title`} className={cx("rounded-3xl border p-6", isGenesis ? "border-accent-200 bg-accent-50" : "border-border-button-default bg-background-primary-default")}>
      <h3 id={`${option}-process-title`} className={cx("text-caption-1-semibold tracking-widest", isGenesis ? "text-accent-700" : "text-text-secondary")}>{isGenesis ? "THE GENESIS WAY" : "THE TRADITIONAL WAY"}</h3>
      <ul className="mt-3 flex flex-col">
        {comparisonRows.map((row) => (
          <li key={row.genesis} className="flex items-center gap-3 py-2.5">
            <span aria-hidden className={cx("flex size-6 shrink-0 items-center justify-center rounded-full", isGenesis ? "bg-accent-600 text-text-white" : "bg-background-tertiary-default text-text-error-primary")}><Icon className="size-4" /></span>
            <span className={isGenesis ? "text-body-semibold text-accent-950" : "text-body-regular text-text-secondary"}>{row[option]}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

export function Comparison2() {
  return (
    <section id="cash-offer-comparison" aria-labelledby="comparison-heading" className="scroll-mt-28 bg-background-secondary-default px-5 py-16 sm:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <Badge className="mb-4 rounded-full border border-accent-200 bg-accent-50 px-4 py-1.5 text-caption-1-semibold text-accent-800">WHAT YOU ACTUALLY TAKE HOME</Badge>
          <h2 id="comparison-heading" className="text-balance text-display-4-bold text-accent-950 sm:text-display-3-bold">The list price isn’t what you take home</h2>
          <p className="mt-4 text-headline-regular text-text-secondary">Same $300,000 Jacksonville house. Two ways to sell it.</p>
        </div>

        <div className="mt-10 grid gap-4 md:mt-12 md:grid-cols-2 xl:grid-cols-4">
          <PayoutCard option="traditional" />
          <ProcessCard option="traditional" />
          <ProcessCard option="genesis" />
          <PayoutCard option="genesis" />
        </div>
        <p className="mt-4 text-center text-caption-1-regular text-text-tertiary">Typical ranges for illustration. Listing costs and our offer depend on your home’s condition, price, and market.</p>

        <div className="mx-auto mt-8 max-w-3xl rounded-3xl border border-accent-200 bg-accent-50 p-6 text-center sm:mt-10 sm:p-8">
          <h3 className="text-title-3-semibold text-accent-950">Our offer can be lower on paper. Here’s what the difference buys you.</h3>
          <p className="mt-2 text-headline-regular text-text-secondary">Months of your life back. No showings, no repairs, no deal falling apart at the last minute — and cash in hand on the day you choose.</p>
        </div>

        <div className="mt-8 flex flex-col items-center gap-4 text-center sm:mt-10">
          <ButtonLink href="#offer" trailingIcon={RiArrowRightLine} className="h-12 rounded-full px-6 text-body-semibold">See What We’d Offer</ButtonLink>
          <p className="flex items-center gap-2 text-body-regular text-text-secondary"><RiShieldCheckLine className="size-4 shrink-0 text-accent-700" aria-hidden />No pressure. No obligation.</p>
        </div>
      </div>
    </section>
  );
}
