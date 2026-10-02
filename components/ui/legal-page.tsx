import type { ReactNode } from "react";
import Link from "next/link";
import { RiArrowLeftLine } from "@remixicon/react";

export const company = "Genesis Home Buyers LLC";

export const contact = {
  email: "jacobm@genesishomebuyers.co",
  phone: "(904) 937-8390",
  phoneHref: "tel:+19049378390",
  address: "9507 Egrets Landing Dr, Jacksonville, FL 32257",
};

export type LegalSection = { heading: string; body: ReactNode };

export function ContactDetails() {
  return (
    <ul>
      <li>{company}</li>
      <li>Email: <a href={`mailto:${contact.email}`} className="text-accent-700 underline underline-offset-4">{contact.email}</a></li>
      <li>Phone: <a href={contact.phoneHref} className="text-accent-700 underline underline-offset-4">{contact.phone}</a></li>
      <li>Mail: {contact.address}</li>
    </ul>
  );
}

export function LegalPage({ title, effectiveDate, intro, sections }: { title: string; effectiveDate: string; intro: ReactNode; sections: LegalSection[] }) {
  return (
    <main className="min-h-screen bg-background-full px-5 py-12 sm:px-8 lg:py-16">
      <article className="mx-auto max-w-3xl">
        <Link href="/" className="-my-2 inline-flex items-center gap-2 rounded-md py-2 text-body-medium text-accent-700 outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring">
          <RiArrowLeftLine className="size-4" aria-hidden />
          Back to home
        </Link>
        <header className="mt-8 border-b border-separator-border pb-8">
          <p className="mb-3 text-caption-1-semibold tracking-widest text-accent-600">{company.toUpperCase()}</p>
          <h1 className="text-display-4-bold text-accent-950">{title}</h1>
          <p className="mt-3 text-body-regular text-text-secondary">Effective {effectiveDate}</p>
          <p className="mt-6 text-headline-regular text-text-secondary">{intro}</p>
        </header>
        <div className="flex flex-col gap-10 py-10">
          {sections.map(({ heading, body }) => (
            <section key={heading} className="flex flex-col gap-3 text-body-regular text-text-secondary [&_li]:ml-5 [&_li]:list-disc [&_strong]:text-text-primary [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-2">
              <h2 className="text-title-2-semibold text-accent-950">{heading}</h2>
              {body}
            </section>
          ))}
        </div>
        <nav aria-label="Legal" className="flex gap-4 border-t border-separator-border pt-4 text-body-medium">
          <Link href="/privacy" className="rounded-md py-2 text-accent-700 underline-offset-4 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-border-focus-ring">Privacy Policy</Link>
          <Link href="/terms" className="rounded-md py-2 text-accent-700 underline-offset-4 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-border-focus-ring">Terms &amp; Conditions</Link>
        </nav>
      </article>
    </main>
  );
}
