import { RiArrowRightLine, RiCheckLine, RiCloseLine, RiShieldCheckLine } from "@remixicon/react";
import { Badge } from "@/components/base/badges/badge";
import { ButtonLink } from "@/components/base/buttons/button";
import { cx } from "@/utils/cx";

// One worked example: a $300,000 Jacksonville home that sells after 5 months on the market.
// Costs are typical figures for that scenario; the offer is within Genesis's typical $200k–$230k range.
const listPrice = 300_000;
const monthsListed = 5;
const genesisOffer = 230_000;

const listingCosts = [
  { label: "Agent commission (5.5%)", amount: 16_500 },
  { label: "Repairs & prep to list", amount: 15_000 },
  { label: "Price reductions (3%)", amount: 9_000 },
  { label: "Seller closing costs", amount: 4_500 },
  { label: `Mortgage interest (${monthsListed} mo)`, amount: 4_400 },
  { label: `Insurance & utilities (${monthsListed} mo)`, amount: 2_500 },
  { label: `Prorated property taxes (${monthsListed} mo)`, amount: 2_200 },
  { label: "Inspection repair credits", amount: 3_000 },
];

const listingNet = listPrice - listingCosts.reduce((sum, { amount }) => sum + amount, 0);
const difference = listingNet - genesisOffer;
const usd = (value: number) => `$${value.toLocaleString("en-US")}`;
const roundedDifference = `$${Math.round(difference / 1000)}k`;

const comparisonRows = [
  { traditional: `${monthsListed}+ months to sell and close`, genesis: "Close in as little as 7 days" },
  { traditional: "5–6% agent commission", genesis: "Zero fees or commissions" },
  { traditional: "You pay closing costs", genesis: "We pay closing costs" },
  { traditional: "Repairs before you list", genesis: "Sell completely as-is" },
  { traditional: "Mortgage, taxes & bills every month", genesis: "No months of carrying costs" },
  { traditional: "Price cut after price cut", genesis: "One clear cash offer" },
  { traditional: "Strangers touring your home", genesis: "No showings, ever" },
  { traditional: "Vacant home invites squatters", genesis: "Done before it sits empty" },
];

const differenceBuys = [
  `${monthsListed} months of your life back`,
  "No showings or open houses",
  "No repairs, no price cuts",
  "No mortgage, tax & utility bills while you wait",
  "No squatter risk on a vacant house",
  "Cash on the day you choose",
];

function PayoutCard({ option }: { option: "traditional" | "genesis" }) {
  const isGenesis = option === "genesis";
  return (
    <article aria-label={isGenesis ? "Selling to Genesis: what you walk away with" : "Listing with an agent: what you walk away with"} className={cx("flex flex-col rounded-3xl border p-6", isGenesis ? "border-accent-800 bg-accent-950 text-accent-50" : "border-border-button-default bg-background-primary-default")}>
      <p className={cx("text-caption-1-semibold tracking-widest", isGenesis ? "text-accent-300" : "text-text-secondary")}>{isGenesis ? "SELL TO GENESIS" : "LIST WITH AN AGENT"}</p>
      <div className="mt-4 flex items-baseline justify-between gap-3">
        <span className={cx("text-body-medium", isGenesis ? "text-accent-100" : "text-text-secondary")}>{isGenesis ? "Cash offer" : "List price"}</span>
        <span className={cx("text-headline-semibold", isGenesis ? "text-accent-50" : "text-text-primary")}>{usd(isGenesis ? genesisOffer : listPrice)}</span>
      </div>
      <dl className={cx("mt-3 flex flex-col divide-y border-y", isGenesis ? "divide-accent-100/15 border-accent-100/15" : "divide-separator-border border-separator-border")}>
        {listingCosts.map(({ label, amount }) => (
          <div key={label} className="flex items-baseline justify-between gap-3 py-2">
            <dt className={cx("text-body-regular", isGenesis ? "text-accent-100" : "text-text-secondary")}>{isGenesis ? label.replace(/ \(.*\)$/, "") : label}</dt>
            <dd className={cx("shrink-0 text-body-semibold", isGenesis ? "text-accent-300" : "text-text-error-primary")}>{isGenesis ? "$0" : `−${usd(amount)}`}</dd>
          </div>
        ))}
      </dl>
      <p className={cx("mt-5 text-body-medium", isGenesis ? "text-accent-100" : "text-text-secondary")}>You walk away with</p>
      <p className={cx("text-title-1-bold", isGenesis ? "text-accent-300" : "text-text-error-primary")}>{usd(isGenesis ? genesisOffer : listingNet)}</p>
      <p className={cx("mt-1 text-body-regular", isGenesis ? "text-accent-100" : "text-text-secondary")}>{isGenesis ? "in as little as 7 days" : `after ${monthsListed}+ months — if the deal doesn’t fall through`}</p>
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

        <div className="mx-auto mt-8 max-w-4xl rounded-3xl border border-accent-200 bg-accent-50 p-6 text-center sm:mt-10 sm:p-8">
          <p className="text-caption-1-semibold tracking-widest text-accent-700">THE REAL DIFFERENCE</p>
          <h3 className="mt-2 text-title-1-bold text-accent-950">About {roundedDifference}. Here’s what it buys you.</h3>
          <ul className="mt-5 flex flex-wrap justify-center gap-2">
            {differenceBuys.map((item) => (
              <li key={item} className="flex items-center gap-2 rounded-full border border-accent-200 bg-background-primary-default px-4 py-2 text-body-medium text-accent-950">
                <RiCheckLine className="size-4 shrink-0 text-accent-600" aria-hidden />{item}
              </li>
            ))}
          </ul>
        </div>
        <p className="mx-auto mt-4 max-w-3xl text-center text-caption-1-regular text-text-tertiary">Example for a {usd(listPrice)} home that sells after {monthsListed} months. Typical costs shown; your actual costs and our offer depend on your home’s condition, price, and market.</p>

        <div className="mt-8 flex flex-col items-center gap-4 text-center sm:mt-10">
          <ButtonLink href="#offer" trailingIcon={RiArrowRightLine} className="h-12 rounded-full px-6 text-body-semibold">See What We’d Offer</ButtonLink>
          <p className="flex items-center gap-2 text-body-regular text-text-secondary"><RiShieldCheckLine className="size-4 shrink-0 text-accent-700" aria-hidden />No pressure. No obligation.</p>
        </div>
      </div>
    </section>
  );
}
