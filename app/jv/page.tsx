import type { Metadata } from "next";
import Link from "next/link";
import { RiArrowDownLine, RiArrowLeftLine, RiCalendarCheckLine, RiCheckLine, RiFlashlightLine, RiMapPinLine, RiShakeHandsLine } from "@remixicon/react";
import { Badge } from "@/components/base/badges/badge";
import { ButtonLink } from "@/components/base/buttons/button";
import { JvDealForm } from "@/components/ui/jv-deal-form";
import { company, contact } from "@/components/ui/legal-page";

export const metadata: Metadata = {
  title: "Sell Us Your Deal | Genesis Home Buyers LLC",
  description: "Have a property under contract and need a buyer? Genesis Home Buyers is a direct cash buyer. Send us the deal and we'll make you an offer.",
  alternates: { canonical: "/jv" },
};

const linkClass = "rounded-md text-accent-700 underline underline-offset-4 outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring";

const steps = [
  { title: "Submit your deal", text: "Send the address, your contract numbers, and your closing date. It takes about two minutes." },
  { title: "We review the numbers", text: "We look over the property, comps, and repair costs." },
  { title: "Get our offer", text: "If it fits what we buy, we send you an offer to buy the property or take an assignment of your contract." },
  { title: "We close", text: "We work with title to close on your timeline, so you get paid." },
];

const reasons = [
  { icon: RiMapPinLine, title: "Direct cash buyer", text: "We buy in Jacksonville and Pensacola, plus deals across Florida and in other states." },
  { icon: RiFlashlightLine, title: "Fast answers", text: "Every deal gets a real review and a straight yes or no." },
  { icon: RiCalendarCheckLine, title: "We respect your closing date", text: "We work with your title company to close before your contract runs out." },
  { icon: RiShakeHandsLine, title: "Easy to work with", text: "Clear offers and clear communication from review to closing." },
];

export default function DealsPage() {
  return (
    <>
      <main className="bg-background-full">
        <section className="deals-hero bg-accent-950 px-5 pb-16 pt-12 text-text-white sm:px-8 lg:pb-20 lg:pt-16">
          <div className="mx-auto max-w-6xl">
            <Link href="/" className="-my-2 inline-flex items-center gap-2 rounded-md py-2 text-body-medium text-accent-200 outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring">
              <RiArrowLeftLine className="size-4" aria-hidden />
              Back to home
            </Link>
            <div className="mt-8">
              <Badge className="rounded-full border border-accent-200/60 bg-accent-950/50 px-4 py-2 text-body-medium text-accent-50">Need a buyer? We’re the buyer</Badge>
            </div>
            <h1 className="mt-5 max-w-3xl text-balance text-display-4-bold sm:text-display-2-bold">Have a property under contract and need a buyer? That’s us.</h1>
            <p className="mt-6 max-w-2xl text-title-3-regular text-accent-50">Genesis Home Buyers is a direct cash buyer. Send us the property and your contract numbers, and we’ll make you an offer to buy it. No buyers list, no middleman, just us closing on your timeline.</p>
            <ButtonLink href="#submit-deal" trailingIcon={RiArrowDownLine} className="mt-8 h-12 rounded-full px-6 text-headline-semibold">Sell Us Your Deal</ButtonLink>
          </div>
        </section>

        <div className="px-5 py-16 sm:px-8 lg:py-20">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="flex flex-col gap-12 lg:col-span-6">
              <section aria-labelledby="deal-steps-heading">
                <p className="mb-3 text-caption-1-semibold tracking-widest text-accent-600">HOW IT WORKS</p>
                <h2 id="deal-steps-heading" className="text-display-4-bold text-accent-950">From your contract to our offer</h2>
                <ol className="mt-8 flex flex-col gap-5">
                  {steps.map(({ title, text }, index) => (
                    <li key={title} className="flex gap-4">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent-950 text-headline-semibold text-accent-50">{index + 1}</span>
                      <div>
                        <h3 className="text-title-3-semibold text-accent-950">{title}</h3>
                        <p className="mt-1 text-headline-regular text-text-secondary">{text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>

              <section aria-labelledby="deal-why-heading">
                <p className="mb-3 text-caption-1-semibold tracking-widest text-accent-600">WHY SELL TO GENESIS</p>
                <h2 id="deal-why-heading" className="text-display-4-bold text-accent-950">A buyer you can count on</h2>
                <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                  {reasons.map(({ icon: Icon, title, text }) => (
                    <li key={title} className="rounded-3xl border border-border-button-default bg-background-primary-default p-6">
                      <span className="flex size-10 items-center justify-center rounded-full bg-accent-100 text-accent-700"><Icon className="size-5" aria-hidden /></span>
                      <h3 className="mt-4 text-headline-semibold text-accent-950">{title}</h3>
                      <p className="mt-1 text-body-regular text-text-secondary">{text}</p>
                    </li>
                  ))}
                </ul>
              </section>

              <div className="rounded-3xl border border-accent-200 bg-accent-50 p-6">
                <h2 className="text-title-3-semibold text-accent-950">What we look for</h2>
                <ul className="mt-3 flex flex-col gap-2">
                  {["A signed purchase contract you can assign or close on", "Realistic numbers: contract price, ARV, and repairs", "Enough time before your closing date for us to review and close", "Photos or video, and access for a walkthrough"].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-body-regular text-text-primary"><RiCheckLine className="mt-0.5 size-5 shrink-0 text-accent-600" aria-hidden />{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div id="submit-deal" className="scroll-mt-8 rounded-3xl border border-border-button-default bg-background-primary-default p-5 shadow-xl sm:p-7 lg:sticky lg:top-8">
                <h2 className="text-title-1-bold text-accent-950">Submit your deal</h2>
                <p className="mt-2 mb-6 text-body-regular text-text-secondary">Takes about two minutes. We’ll review the numbers and send you an offer if it’s a fit.</p>
                <JvDealForm />
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 pb-8 text-center text-body-regular text-text-secondary sm:flex-row sm:px-8 xl:px-0">
        <p>© 2026 {company}.</p>
        <p>Questions about a deal? Call <a href={contact.phoneHref} className={linkClass}>{contact.phone}</a> or email <a href={`mailto:${contact.email}`} className={linkClass}>{contact.email}</a>.</p>
      </footer>
    </>
  );
}
