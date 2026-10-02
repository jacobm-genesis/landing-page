import { RiAddLine } from "@remixicon/react";
import { contact } from "@/components/ui/legal-page";

// `confirmed: false` marks answers still awaiting Genesis's sign-off; they show a draft tag in `npm run dev`.
const faqs = [
  { question: "Are there any fees or commissions?", answer: "No. You pay no commissions or fees, and we cover the closing costs.", confirmed: true },
  { question: "How fast can you close?", answer: "In as little as 7 days. If you need more time, you pick the closing date that works for you.", confirmed: true },
  { question: "Do I need to make repairs or clean the house?", answer: "No. We buy houses as-is, in any condition. Take what you want to keep and leave the rest behind.", confirmed: true },
  { question: "What if I’m behind on payments or facing foreclosure?", answer: "We can help. We work with homeowners facing foreclosure, divorce, relocation, or an inherited property. Any remaining mortgage is paid off from the sale at closing.", confirmed: true },
  { question: "Are you real estate agents?", answer: "No. We’re a local Jacksonville home-buying company, not a listing agent. We make you a direct cash offer, so there’s no listing, no showings, and no commission.", confirmed: false },
  { question: "How do you come up with your offer?", answer: "We look at your home’s condition, the repairs it needs, and what similar homes nearby have recently sold for. Then we walk you through the number so you can see how we got there.", confirmed: false },
  { question: "Who handles the closing?", answer: "A licensed local title company handles the closing, so your sale and your money are handled securely and by the book.", confirmed: false },
  { question: "Do you buy houses with tenants living in them?", answer: "Yes. We can buy rental properties with tenants still in place.", confirmed: false },
  { question: "What areas do you buy in?", answer: "Jacksonville and Pensacola are our specialties, and we buy houses all across Florida and in other states too.", confirmed: true },
  { question: "Is there any obligation if I request an offer?", answer: "None. Getting an offer is free, and you’re never under any obligation to accept it.", confirmed: true },
];

export function Faq() {
  const showDraftTags = process.env.NODE_ENV === "development";
  return (
    <section id="faq" aria-labelledby="faq-heading" className="scroll-mt-28 border-t border-separator-border bg-background-secondary-default px-5 py-16 sm:px-8 lg:py-20">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <p className="mb-3 text-caption-1-semibold tracking-widest text-accent-600">QUESTIONS, ANSWERED</p>
          <h2 id="faq-heading" className="text-display-4-bold text-accent-950 sm:text-display-3-bold">Frequently Asked Questions</h2>
        </div>
        <div className="mt-10 divide-y divide-separator-border rounded-3xl border border-border-button-default bg-background-primary-default">
          {faqs.map(({ question, answer, confirmed }) => (
            <details key={question} className="group px-5 sm:px-7">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-xl py-5 text-headline-semibold text-accent-950 outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring [&::-webkit-details-marker]:hidden">
                <span>
                  {question}
                  {showDraftTags && !confirmed && <span className="ml-2 rounded-full border border-border-error-default px-2 py-0.5 align-middle text-caption-1-semibold text-text-error-primary">DRAFT</span>}
                </span>
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-accent-50 text-accent-700"><RiAddLine className="size-5 transition-transform group-open:rotate-45" aria-hidden /></span>
              </summary>
              <p className="pb-6 pr-12 text-headline-regular text-text-secondary">{answer}</p>
            </details>
          ))}
        </div>
        <p className="mt-6 text-center text-headline-regular text-text-secondary">
          Still have a question? Call or text <a href={contact.phoneHref} className="rounded-md text-accent-700 underline underline-offset-4 outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring">{contact.phone}</a>.
        </p>
      </div>
    </section>
  );
}
