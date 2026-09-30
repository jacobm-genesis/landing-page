import { RiArrowRightLine, RiDiscussLine, RiFileList3Line, RiHandCoinLine } from "@remixicon/react";
import { Badge } from "@/components/base/badges/badge";
import { ButtonLink } from "@/components/base/buttons/button";
import { cx } from "@/utils/cx";

const steps = [
  {
    icon: RiFileList3Line,
    title: "Submit Your Info",
    description: "Share a few details about your property. We’ll be in touch within 24 hours for a no-obligation conversation.",
  },
  {
    icon: RiDiscussLine,
    title: "Let’s Have a Conversation",
    description: "Talk with our local team about your home, your situation, and the timeline that works best for you.",
  },
  {
    icon: RiHandCoinLine,
    title: "Receive Your Cash Offer",
    description: "Get a fair cash offer with no fees or repairs. If you accept, choose your closing day and get paid in as little as 7 days.",
  },
];

export default function OnboardingBlock() {
  return (
    <section id="how-it-works" aria-labelledby="process-heading" className="scroll-mt-28 px-5 pb-20 pt-10 sm:px-8 lg:pt-12">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-3 text-caption-1-semibold tracking-widest text-accent-600">HOW IT WORKS</p>
          <h2 id="process-heading" className="text-display-4-bold text-accent-950 sm:text-display-3-bold">The process is as simple as <span className="whitespace-nowrap text-accent-700">1, 2, 3</span></h2>
          <p className="mt-4 text-headline-regular text-text-secondary">Sell your house fast for cash in three simple steps.</p>
        </div>

        <ol role="list" className="genesis-glass-stage mt-10 grid gap-5 rounded-3xl md:grid-cols-3 lg:gap-6">
          {steps.map(({ icon: Icon, title, description }, index) => {
            const highlighted = index === steps.length - 1;
            return (
              <li key={title} className={cx("genesis-glass flex flex-col items-center rounded-3xl border border-border-button-default px-6 py-8 text-center lg:px-8", highlighted ? "genesis-glass-dark text-accent-50" : "text-accent-950")}>
                <Badge className={cx("rounded-full px-3 py-1 text-caption-1-semibold tracking-widest", highlighted ? "bg-accent-100/10 text-accent-200" : "bg-accent-50 text-accent-700")}>STEP {index + 1}</Badge>
                <span aria-hidden className={cx("my-6 flex size-16 items-center justify-center rounded-2xl border", highlighted ? "border-accent-300/30 bg-accent-200/10 text-accent-300" : "border-accent-200 bg-accent-50 text-accent-700")}><Icon className="size-8" /></span>
                <h3 className="text-title-3-semibold">{title}</h3>
                <p className={cx("mt-3 text-headline-regular", highlighted ? "text-accent-100" : "text-text-secondary")}>{description}</p>
              </li>
            );
          })}
        </ol>

        <div className="mt-8 text-center">
          <ButtonLink href="#offer" trailingIcon={RiArrowRightLine} className="h-12 rounded-full px-6 text-body-semibold">Get Started</ButtonLink>
        </div>
      </div>
    </section>
  );
}
