import type { Metadata } from "next";
import Link from "next/link";
import { RiArrowDownLine, RiArrowLeftLine, RiCheckLine, RiHandCoinLine, RiMapPinLine, RiMegaphoneLine, RiMessage3Line } from "@remixicon/react";
import { Badge } from "@/components/base/badges/badge";
import { ButtonLink } from "@/components/base/buttons/button";
import { JvDealForm } from "@/components/ui/jv-deal-form";
import { company, contact } from "@/components/ui/legal-page";

export const metadata: Metadata = {
  title: "Partner With Us | Joint Venture Deals with Genesis Home Buyers LLC",
  description: "Have a property under contract? Partner with Genesis Home Buyers on a joint venture. We market it to our buyers and split the assignment fee 50/50.",
};

const linkClass = "rounded-md text-accent-700 underline underline-offset-4 outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring";

const steps = [
  { title: "Submit your deal", text: "Send the address, your contract numbers, and the closing date. It takes about two minutes." },
  { title: "We review it", text: "We run the numbers. If it’s a fit, we send you a JV agreement with the 50/50 split in writing." },
  { title: "We market it", text: "We take your deal to our buyers and work the price and terms." },
  { title: "We assign and close", text: "We line up the buyer and work with title to get it to the closing table." },
  { title: "You get paid", text: "When it closes, you get your 50% of the assignment fee." },
];

const reasons = [
  { icon: RiMapPinLine, title: "Jacksonville & Pensacola specialists", text: "Our home markets, plus deals across Florida and in other states." },
  { icon: RiHandCoinLine, title: "A straight 50/50 split", text: "Clear terms, agreed in writing before we market anything." },
  { icon: RiMegaphoneLine, title: "Real buyers, real work", text: "We comp it, package it, and put it in front of buyers who close." },
  { icon: RiMessage3Line, title: "You stay in the loop", text: "Updates from review to closing, so you always know where your deal stands." },
];

export default function JvPage() {
  return (
    <>
      <main className="bg-background-full">
        <section className="bg-accent-950 px-5 pb-16 pt-12 text-text-white sm:px-8 lg:pb-20 lg:pt-16">
          <div className="mx-auto max-w-6xl">
            <Link href="/" className="inline-flex items-center gap-2 rounded-md text-body-medium text-accent-200 outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring">
              <RiArrowLeftLine className="size-4" aria-hidden />
              Back to home
            </Link>
            <div className="mt-8">
              <Badge className="rounded-full border border-accent-200/60 bg-accent-950/50 px-4 py-2 text-body-medium text-accent-50">Joint venture partners · 50/50 split</Badge>
            </div>
            <h1 className="mt-5 max-w-3xl text-balance text-display-4-bold sm:text-display-2-bold">Got a deal under contract? We’ll find the buyer.</h1>
            <p className="mt-6 max-w-2xl text-title-3-regular text-accent-50">Send us your deal. We market it to our buyers, handle the assignment, and split the assignment fee with you 50/50 when it closes.</p>
            <ButtonLink href="#submit-deal" trailingIcon={RiArrowDownLine} className="mt-8 h-12 rounded-full px-6 text-headline-semibold">Submit My Deal</ButtonLink>
          </div>
        </section>

        <div className="px-5 py-16 sm:px-8 lg:py-20">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="flex flex-col gap-12 lg:col-span-6">
              <section aria-labelledby="jv-steps-heading">
                <p className="mb-3 text-caption-1-semibold tracking-widest text-accent-600">HOW IT WORKS</p>
                <h2 id="jv-steps-heading" className="text-display-4-bold text-accent-950">Five steps to getting paid</h2>
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

              <section aria-labelledby="jv-why-heading">
                <p className="mb-3 text-caption-1-semibold tracking-widest text-accent-600">WHY GENESIS</p>
                <h2 id="jv-why-heading" className="text-display-4-bold text-accent-950">We treat your deal like our own</h2>
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
                  {["A signed purchase contract you can assign", "Realistic numbers: contract price, ARV, and repairs", "Enough time before your closing date to market it", "Photos or video, and access for buyers"].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-body-regular text-text-primary"><RiCheckLine className="mt-0.5 size-5 shrink-0 text-accent-600" aria-hidden />{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div id="submit-deal" className="scroll-mt-8 rounded-3xl border border-border-button-default bg-background-primary-default p-5 shadow-xl sm:p-7 lg:sticky lg:top-8">
                <h2 className="text-title-1-bold text-accent-950">Submit your deal</h2>
                <p className="mt-2 mb-6 text-body-regular text-text-secondary">Takes about two minutes. We’ll review it and get back to you.</p>
                <JvDealForm />
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 pb-8 text-center text-body-regular text-text-secondary sm:flex-row sm:px-8 xl:px-0">
        <p>© 2026 {company}.</p>
        <p>Questions about a deal? Call or text <a href={contact.phoneHref} className={linkClass}>{contact.phone}</a> or email <a href={`mailto:${contact.email}`} className={linkClass}>{contact.email}</a>.</p>
      </footer>
    </>
  );
}
