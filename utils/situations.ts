import { markets, type Market } from "@/utils/markets";

/**
 * Situation landing pages (/sell-inherited-house, etc.). Each reuses the Jacksonville homepage and adds its own
 * headline, a "how we help" section, and situation FAQs. Keep claims factual: no legal, tax, or credit advice.
 */
export type Situation = Market & { slug: string; label: string; metaTitle: string; metaDescription: string };

const base = markets.jacksonville;
const areas = "in Jacksonville, Pensacola, and across Florida";

export const situations: Situation[] = [
  {
    ...base,
    slug: "sell-inherited-house",
    label: "Inherited house",
    metaTitle: "Sell an Inherited House Fast for Cash in Jacksonville, FL | Genesis Home Buyers",
    metaDescription: "Inherited a house you don't want to keep? Genesis Home Buyers buys inherited homes as-is in Jacksonville and Pensacola. No cleanout, no repairs, no agent fees. Get a cash offer within 24 hours.",
    heading: "Sell Your Inherited House",
    intro: `Inherited a house you don’t want to keep, fix up, or manage from far away? Genesis Home Buyers makes fair cash offers on inherited homes ${areas}, as-is, and closes when your family is ready.`,
    tagline: "We’re sorry for your loss. We’ll make the house the easy part.",
    situation: {
      eyebrow: "INHERITED PROPERTY",
      title: "One less thing for your family to carry",
      intro: "Settling an estate is a lot. We take the house off your list, without cleanouts, repairs, or months of showings.",
      points: [
        { title: "Leave the belongings", text: "Take what matters to your family and leave the rest. We handle what’s left behind after closing." },
        { title: "Any condition", text: "Dated, damaged, or full of a lifetime of things, we buy it as-is. No repairs and no cleaning." },
        { title: "Easy for every heir", text: "Siblings in different states? A licensed title company handles the paperwork, and sale proceeds are split at closing." },
        { title: "Work with your attorney", text: "If the estate is in probate, we work alongside your probate attorney or personal representative on timing." },
      ],
      faqs: [
        { question: "Can I sell an inherited house that’s still in probate?", answer: "Often, yes. Many inherited homes are sold while probate is open, once the personal representative has authority to sell. Your probate attorney can confirm the right timing for your situation, and we’ll work around it." },
        { question: "Do I have to clean out the house first?", answer: "No. Take anything you want to keep, and leave the rest. We take care of what’s left after closing." },
        { question: "What if several family members inherited the house?", answer: "That’s common. Everyone with an ownership interest signs, and the title company splits the proceeds at closing so each person gets their share." },
      ],
    },
  },
  {
    ...base,
    slug: "sell-house-facing-foreclosure",
    label: "Facing foreclosure",
    metaTitle: "Facing Foreclosure? Sell Your House Fast for Cash in Jacksonville, FL | Genesis Home Buyers",
    metaDescription: "Behind on mortgage payments or facing foreclosure in Jacksonville or Pensacola? Sell your house as-is for cash, pay off the mortgage at closing, and move forward on your terms.",
    heading: "Sell Before Foreclosure",
    intro: `Behind on payments or got a foreclosure notice? You may still have time to sell. Genesis Home Buyers makes fair cash offers ${areas} and can close fast, so the mortgage is paid off at closing, not at auction.`,
    tagline: "No judgment. Just options and a fast answer.",
    situation: {
      eyebrow: "FACING FORECLOSURE",
      title: "Selling can put you back in control",
      intro: "Foreclosure moves on the lender’s timeline. A cash sale lets you pick a closing date that works before it’s too late.",
      points: [
        { title: "Fast answers", text: "A fair cash offer within 24 hours, so you know your options right away." },
        { title: "Close in days, not months", text: "We can close in as little as 7 days when time is short." },
        { title: "Mortgage paid at closing", text: "Your loan payoff, including what’s behind, is paid from the sale through the title company." },
        { title: "As-is, no repairs", text: "No money out of pocket for repairs, cleaning, or agent commissions." },
      ],
      faqs: [
        { question: "Is it too late to sell if I’ve received a foreclosure notice?", answer: "Not necessarily. Many homeowners can still sell until the foreclosure sale date. The sooner you reach out, the more options you have. A free HUD-approved housing counselor can also walk you through every option, not just selling." },
        { question: "What happens to what I owe the bank?", answer: "Your mortgage payoff, including missed payments and fees, is paid from the sale at closing. If the sale price is more than what you owe, the difference goes to you." },
        { question: "Will selling help my credit?", answer: "We can’t give credit advice, but selling before a foreclosure is completed keeps a foreclosure sale from happening on the property. A housing counselor or financial advisor can explain how it affects your situation." },
      ],
    },
  },
  {
    ...base,
    slug: "sell-house-with-tenants",
    label: "House with tenants",
    metaTitle: "Sell a Rental House with Tenants for Cash in Jacksonville, FL | Genesis Home Buyers",
    metaDescription: "Tired landlord? Sell your rental property in Jacksonville or Pensacola with tenants in place. No evictions, no repairs, no showings. Get a fair cash offer within 24 hours.",
    heading: "Sell Your Rental House",
    intro: `Done being a landlord? Genesis Home Buyers buys rental homes ${areas} with tenants still in place, as-is, with no evictions, no repairs, and no disrupting your tenants with showings.`,
    tagline: "Keep your tenants in place. Hand us the keys.",
    situation: {
      eyebrow: "LANDLORDS & RENTALS",
      title: "Sell the rental without the headaches",
      intro: "Selling a tenant-occupied house the traditional way means showings, repairs, and vacancies. A cash sale skips all of it.",
      points: [
        { title: "Tenants can stay", text: "No need to wait for a lease to end or ask anyone to move out before you sell." },
        { title: "No showings", text: "We don’t need a parade of buyers walking through your tenant’s home." },
        { title: "Any condition", text: "Deferred maintenance, worn-out units, or a problem tenant, we buy it as-is." },
        { title: "Leases handled at closing", text: "Existing leases and security deposits transfer through the title company at closing." },
      ],
      faqs: [
        { question: "Do my tenants have to move out before I sell?", answer: "No. We buy rental properties with tenants in place, and their lease comes with the sale." },
        { question: "What happens to my tenants’ security deposits?", answer: "Deposits transfer to the new owner at closing, and the title company documents it so you’re covered." },
        { question: "Will you buy if the tenant is behind on rent?", answer: "Yes. Late-paying or difficult tenants don’t stop us from making you an offer." },
      ],
    },
  },
  {
    ...base,
    slug: "sell-house-during-divorce",
    label: "Divorce",
    metaTitle: "Sell Your House Fast During a Divorce in Jacksonville, FL | Genesis Home Buyers",
    metaDescription: "Going through a divorce in Jacksonville or Pensacola? Sell the house fast for cash, as-is, and split the proceeds at closing. A simple, neutral sale on a timeline that works for both of you.",
    heading: "Divorcing? Sell Your House",
    intro: `When a marriage ends, the house can keep you tied together for months. Genesis Home Buyers makes fair cash offers ${areas} and closes on a timeline that works for both of you.`,
    tagline: "A neutral, simple sale, so you can both move on.",
    situation: {
      eyebrow: "DIVORCE & SEPARATION",
      title: "A clean, simple sale for both of you",
      intro: "A listing means months of agreeing on repairs, showings, and price cuts. A cash sale gives you one clear number and a closing date.",
      points: [
        { title: "One clear offer", text: "A single cash offer both of you can review, with no repairs or price cuts to negotiate." },
        { title: "Proceeds split at closing", text: "The title company pays off the mortgage and splits what’s left the way you both agree or the court decides." },
        { title: "No showings", text: "No coordinating schedules or keeping the house show-ready during a hard time." },
        { title: "Your timeline", text: "Close in as little as 7 days, or on the date your settlement calls for." },
      ],
      faqs: [
        { question: "Do both spouses have to agree to sell?", answer: "If you both own the house, you both need to sign. Many couples find a cash sale easier to agree on because there’s one simple offer. Your attorneys can confirm what your situation requires." },
        { question: "How are the proceeds divided?", answer: "The title company pays off the mortgage and closing costs, then splits the remaining money according to your agreement or court order." },
        { question: "Can we sell before the divorce is final?", answer: "Often, yes, if both owners agree. Check with your attorney about any court orders that affect the house." },
      ],
    },
  },
];
