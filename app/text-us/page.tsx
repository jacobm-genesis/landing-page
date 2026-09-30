import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { RiArrowLeftLine } from "@remixicon/react";
import { company, contact } from "@/components/ui/legal-page";

export const metadata: Metadata = {
  title: "Text Us | Genesis Home Buyers LLC",
  description: "Send Genesis Home Buyers LLC a message and a member of our team will text you back.",
};

const linkClass = "rounded-md text-accent-700 underline underline-offset-4 outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring";

// The GoHighLevel (LeadConnector) chat widget is the only SMS opt-in on this page, as A2P 10DLC
// registration requires. Its consent text and links are configured in GoHighLevel, not here.
export default function TextUs() {
  return (
    <>
      <main className="bg-background-full px-5 pt-12 sm:px-8 lg:pt-16">
        <div className="mx-auto max-w-3xl">
          <Link href="/" className="inline-flex items-center gap-2 rounded-md text-body-medium text-accent-700 outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring">
            <RiArrowLeftLine className="size-4" aria-hidden />
            Back to home
          </Link>
          <header className="mt-8 pb-6">
            <p className="mb-3 text-caption-1-semibold tracking-widest text-accent-600">{company.toUpperCase()}</p>
            <h1 className="text-display-4-bold text-accent-950">Text With Our Team</h1>
            <p className="mt-4 text-headline-regular text-text-secondary">Have a question about selling your house? Send us a message below and a member of the Genesis team will text you back. You can also call us at <a href={contact.phoneHref} className={linkClass}>{contact.phone}</a> or email <a href={`mailto:${contact.email}`} className={linkClass}>{contact.email}</a>.</p>
            <p className="mt-4 text-body-regular text-text-secondary">By opting in, you agree to our <Link href="/terms" className={linkClass}>Terms &amp; Conditions</Link> and <Link href="/privacy" className={linkClass}>Privacy Policy</Link>. Reply STOP to opt out or HELP for help at any time.</p>
          </header>
        </div>
      </main>
      <Script src="https://widgets.leadconnectorhq.com/loader.js" data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js" data-widget-id="6abd5a56d2e8beb1e451c4a9" data-source="WEB_USER" strategy="afterInteractive" />
    </>
  );
}
