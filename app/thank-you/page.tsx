import type { Metadata } from "next";
import Link from "next/link";
import { RiArrowLeftLine, RiContactsBook2Line, RiPhoneLine, RiShieldCheckLine } from "@remixicon/react";
import { Avatar } from "@/components/base/avatar/avatar";
import { ButtonLink } from "@/components/base/buttons/button";
import { company, contact } from "@/components/ui/legal-page";

export const metadata: Metadata = {
  title: "Thank You | Genesis Home Buyers LLC",
  description: "Your request is in. Dustin Fox from Genesis Home Buyers will be calling you soon.",
  robots: { index: false, follow: false },
};

const linkClass = "rounded-md text-accent-700 underline underline-offset-4 outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring";

// Sellers land here after the offer form's optional details step (sent or skipped).
export default function ThankYouPage() {
  return (
    <main className="flex min-h-screen flex-col bg-background-full px-5 py-12 sm:px-8 lg:py-16">
      <div className="mx-auto w-full max-w-xl">
        <Link href="/" className="-my-2 inline-flex items-center gap-2 rounded-md py-2 text-body-medium text-accent-700 outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring">
          <RiArrowLeftLine className="size-4" aria-hidden />
          Back to home
        </Link>

        <header className="mt-8 flex flex-col items-center text-center">
          <span className="flex size-14 items-center justify-center rounded-full bg-accent-100 text-accent-700"><RiShieldCheckLine className="size-8" aria-hidden /></span>
          <h1 className="mt-5 text-display-4-bold text-accent-950">Thank you. Your request is in.</h1>
          <p className="mt-3 text-headline-regular text-text-secondary">There’s nothing else you need to do right now.</p>
        </header>

        <section aria-labelledby="caller-heading" className="mt-10 rounded-3xl border border-border-button-default bg-background-primary-default p-6 text-center sm:p-8">
          <Avatar src="/team/dustin-fox.jpg" alt="Dustin Fox" className="mx-auto size-24 border-4 border-background-primary-default bg-accent-200 shadow-sm [&_img]:object-top" />
          <p className="mt-4 text-caption-1-semibold tracking-widest text-accent-600">WHO’S CALLING YOU</p>
          <h2 id="caller-heading" className="mt-2 text-title-2-semibold text-accent-950">Dustin Fox will be calling you soon</h2>
          <p className="mt-1 text-body-regular text-text-secondary">Co-Founder &amp; COO, {company}</p>
          <p className="mt-4 text-headline-regular text-text-secondary">He’ll call from <a href={contact.phoneHref} className={linkClass}>{contact.phone}</a> to learn about your property and answer your questions.</p>
        </section>

        <section aria-labelledby="save-heading" className="mt-6 rounded-3xl border border-accent-200 bg-accent-50 p-6 text-center sm:p-8">
          <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-accent-100 text-accent-700"><RiContactsBook2Line className="size-6" aria-hidden /></span>
          <h2 id="save-heading" className="mt-4 text-title-3-semibold text-accent-950">Save our number so you know it’s us</h2>
          <p className="mt-2 text-body-regular text-text-secondary">Add Genesis Home Buyers to your contacts, and your phone will show our name when Dustin calls instead of an unknown number.</p>
          <ButtonLink href="/genesis-home-buyers.vcf" leadingIcon={RiContactsBook2Line} className="mt-6 h-12 w-full rounded-xl text-headline-semibold sm:w-auto sm:px-8">Save Our Number</ButtonLink>
        </section>

        <p className="mt-8 flex items-center justify-center gap-2 text-center text-body-regular text-text-secondary">
          <RiPhoneLine className="size-4 shrink-0 text-accent-600" aria-hidden />
          <span>Can’t wait? Call us now at <a href={contact.phoneHref} className={linkClass}>{contact.phone}</a>.</span>
        </p>
      </div>
    </main>
  );
}
