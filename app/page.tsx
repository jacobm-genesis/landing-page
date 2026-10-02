"use client";

import { useEffect, useState, type FormEvent } from "react";
import {
  RiArrowRightLine, RiCalendarCheckLine,
  RiHeartLine, RiHome4Line, RiMapPinLine, RiShieldCheckLine,
  RiFlashlightLine, RiCoinsLine, RiArrowRightUpLine, RiMenu3Line, RiCloseLine, RiPhoneLine,
} from "@remixicon/react";
import { Avatar } from "@/components/base/avatar/avatar";
import { Badge } from "@/components/base/badges/badge";
import { Button, ButtonLink } from "@/components/base/buttons/button";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { Divider } from "@/components/base/divider/divider";
import { Input } from "@/components/base/input/input";
import { AddressAutocomplete } from "@/components/ui/address-autocomplete";
import { OfferDetailsForm, zillowLink, type OfferContact } from "@/components/ui/offer-details-form";
import { Comparison2 } from "@/components/ui/comparison-2";
import { Faq } from "@/components/ui/faq";
import { contact } from "@/components/ui/legal-page";
import OnboardingBlock from "@/components/ui/onboarding-setup-steps";import { cx } from "@/utils/cx";
import { trackOfferLead } from "@/utils/google-ads";
import { captureLeadSource, leadSourceFields } from "@/utils/lead-source";

const navLinks = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Why Us", href: "#why-us" },
  { label: "Our Team", href: "#our-team" },
  { label: "FAQ", href: "#faq" },
  { label: "Submit a Deal – JV", href: "/jv" },
];

const teamMembers = [
  { name: "Dustin Fox", photo: "/team/dustin-fox.jpg", title: "Co-Founder & COO" },
  { name: "Jacob Monoson", photo: "/team/jacob-monoson.jpg", title: "Founder & CEO" },
  { name: "Devon Nicol", photo: "/team/devon-nicol.jpg", title: "Vice President" },
];

const reasons = [
  { icon: RiHome4Line, title: "Any Condition", description: "From move-in ready to a little rough around the edges, we buy homes as-is. Leave the repairs to us." },
  { icon: RiHeartLine, title: "Any Situation", description: "Facing foreclosure, divorce, relocation, or an inherited property? We’ll listen and help you find a way forward." },
  { icon: RiMapPinLine, title: "Local & Trusted", description: "Work directly with local people who care about your community. Real conversations, not a national call center." },
];

function GenesisLogo() {
  return (
    <svg viewBox="0 0 1256 304" role="img" aria-label="Genesis Home Buyers LLC" className="h-10 w-40 shrink-0 sm:w-44">
      {/* Display the original artwork in two fitted windows; no mark or lettering is redrawn. */}
      <svg width="304" height="304" viewBox="320 180 620 600">
        <image href="/genesis-logo-web.png" width="1254" height="1254" />
      </svg>
      <svg x="336" y="26" width="920" height="250" viewBox="120 780 1020 275">
        <image href="/genesis-logo-web.png" width="1254" height="1254" />
      </svg>
    </svg>
  );
}

export default function Home() {
  const [submission, setSubmission] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [offerContact, setOfferContact] = useState<OfferContact>({ name: "", email: "", phone: "", address: "" });
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(captureLeadSource, []);

  // Local preview only: open /?preview=details to see the optional details step without submitting a lead.
  useEffect(() => {
    if (process.env.NODE_ENV !== "development" || new URLSearchParams(window.location.search).get("preview") !== "details") return;
    setOfferContact({ name: "Preview Seller", email: "preview@example.com", phone: "9045550123", address: "1563 W 1st St, Jacksonville, FL 32209" });
    setSubmission("success");
    document.getElementById("offer")?.scrollIntoView({ block: "start" });
  }, []);

  useEffect(() => {
    const updateNavigation = () => {
      setIsScrolled(window.scrollY > 320);
      const current = navLinks.findLast(({ href }) => {
        const section = href.startsWith("#") && document.querySelector(href);
        return section && section.getBoundingClientRect().top <= 128;
      });
      setActiveSection(current?.href ?? "");
    };
    updateNavigation();
    window.addEventListener("scroll", updateNavigation, { passive: true });
    return () => window.removeEventListener("scroll", updateNavigation);
  }, []);

  function closeMenu() {
    document.getElementById("mobile-navigation")?.hidePopover();
  }

  async function submitOffer(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setSubmission("sending");
    try {
      const body = new URLSearchParams();
      new FormData(form).forEach((value, key) => body.append(key, String(value)));
      Object.entries(leadSourceFields()).forEach(([key, value]) => body.append(key, value));
      body.append("zillow_link", zillowLink(String(new FormData(form).get("address") ?? "")));
      const response = await fetch(form.action, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      if (!response.ok) throw new Error("Offer request was not accepted");
      const data = new FormData(form);
      setOfferContact({ name: String(data.get("name") ?? ""), email: String(data.get("email") ?? ""), phone: String(data.get("phone") ?? ""), address: String(data.get("address") ?? "") });
      setSubmission("success");
      trackOfferLead();
      form.reset();
    } catch {
      setSubmission("error");
    }
  }

  return (
    <>
      <a href="#main" className="sr-only z-50 rounded-lg bg-background-primary-default p-4 text-body-medium text-accent-800 focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Skip to content</a>
      <header className="fixed inset-x-0 top-0 z-40 px-4 py-4 md:px-10 md:py-5">
        <div data-scrolled={isScrolled} className="genesis-floating-nav mx-auto flex w-full items-center justify-between gap-3 rounded-2xl border border-border-button-default bg-background-secondary-default/80 px-3 py-2 backdrop-blur-2xl backdrop-saturate-150 md:px-4 md:py-2.5">
          <a href="#" onClick={closeMenu} aria-label="Genesis Home Buyers LLC home" className="flex shrink-0 items-center rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring">
            <GenesisLogo />
          </a>
          <nav aria-label="Main navigation" className="hidden min-w-0 flex-1 items-center justify-center gap-2 text-body-medium lg:flex">
            {navLinks.map(({ label, href }) => (
              <a key={href} href={href} aria-current={activeSection === href ? "location" : undefined} className={cx("nav-link whitespace-nowrap px-2 py-2", activeSection === href ? "bg-accent-100/70 text-accent-950" : "text-text-secondary")}>{label}</a>
            ))}
          </nav>
          <div className="flex shrink-0 items-center gap-1 md:gap-2">
            <ButtonLink href={contact.phoneHref} variant="ghost" iconOnly leadingIcon={RiPhoneLine} aria-label={`Call ${contact.phone}`} className={cx("size-11 shrink-0 rounded-full text-accent-950 md:size-10", !isScrolled && "xl:hidden")} />
            <ButtonLink href={contact.phoneHref} variant="ghost" leadingIcon={RiPhoneLine} aria-label={`Call ${contact.phone}`} className={cx("hidden h-10 shrink-0 rounded-full px-3 text-accent-950", !isScrolled && "xl:inline-flex")}>{contact.phone}</ButtonLink>
            <ButtonLink href="#offer" aria-label="Get My Offer" iconOnly={isScrolled} leadingIcon={isScrolled ? RiArrowRightUpLine : undefined} trailingIcon={!isScrolled ? RiArrowRightUpLine : undefined} className={cx("hidden h-10 shrink-0 rounded-full md:inline-flex", isScrolled ? "w-10 p-0" : "px-4")}>Get My Offer</ButtonLink>
            <Button variant="ghost" iconOnly leadingIcon={isMenuOpen ? RiCloseLine : RiMenu3Line} aria-label={isMenuOpen ? "Close menu" : "Open menu"} aria-expanded={isMenuOpen} aria-controls="mobile-navigation" popoverTarget="mobile-navigation" className="size-11 shrink-0 rounded-full text-accent-950 lg:hidden" />
          </div>
        </div>
        <nav id="mobile-navigation" popover="auto" onToggle={(event) => setIsMenuOpen(event.newState === "open")} aria-label="Mobile navigation" className="genesis-mobile-nav rounded-3xl border border-border-button-default bg-background-secondary-default/95 p-4 text-body-medium text-accent-950 backdrop-blur-2xl lg:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map(({ label, href }) => (
              <a key={href} href={href} onClick={closeMenu} aria-current={activeSection === href ? "location" : undefined} className={cx("nav-link rounded-xl px-3 py-3", activeSection === href && "bg-accent-100/70")}>{label}</a>
            ))}
            <Divider className="my-3" />
            <ButtonLink href="#offer" onClick={closeMenu} trailingIcon={RiArrowRightUpLine} className="h-11 rounded-full">Get My Offer</ButtonLink>
          </div>
        </nav>
      </header>
      <main id="main">
        <section className="genesis-hero relative flex min-h-svh w-full items-center overflow-x-clip bg-accent-950 text-text-white" aria-labelledby="hero-heading">
          <video className="genesis-hero-video" src="/hero.mp4" poster="/hero.jpg" autoPlay muted loop playsInline aria-hidden />
          <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-5 pb-20 pt-32 sm:px-8 sm:pt-36 lg:grid-cols-12 lg:gap-12 lg:pb-20 lg:pt-28 xl:px-10">
            <div className="hero-copy min-w-0 lg:col-span-7">
              <Badge className="mb-6 gap-2 rounded-full border border-accent-200/60 bg-accent-950/50 px-4 py-2 text-body-medium text-accent-50">
                <RiHome4Line className="size-4" aria-hidden /> A fresh start begins here
              </Badge>
              <h1 id="hero-heading" className="text-display-4-bold sm:text-display-2-bold xl:text-large-title-bold">
                Sell Your House<br />
                <span className="hero-highlight text-accent-300">Fast, For Cash</span><br />
                <span className="sm:whitespace-nowrap">— Any Condition</span>
              </h1>
              <p className="mt-6 max-w-lg text-title-3-regular text-accent-50">Skip the repairs, the showings, and the agent fees. Genesis Home Buyers makes fair cash offers to Jacksonville homeowners and closes on your timeline.</p>
              <ul className="mt-8 grid gap-3 sm:grid-cols-3">
                {[
                  { icon: RiFlashlightLine, value: "24hr", text: "Fair cash offer within 24 hours" },
                  { icon: RiCoinsLine, value: "$0", text: "No fees, no commissions, no repairs" },
                  { icon: RiCalendarCheckLine, value: "7 days", text: "Close in as little as 7 days" },
                ].map(({ icon: Icon, value, text }) => (
                  <li key={value} className="hero-benefit flex items-center gap-3 rounded-3xl border border-border-button-default bg-accent-950/55 p-4 backdrop-blur-sm sm:block">
                    <span className="mb-0 flex shrink-0 items-center gap-2 text-title-2-semibold text-accent-50 sm:mb-2">
                      <span className="flex size-8 items-center justify-center rounded-full border border-accent-200/60 text-accent-200"><Icon className="size-4" aria-hidden /></span>
                      <span className="min-w-16">{value}</span>
                    </span>
                    <span className="text-body-regular text-accent-50">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="offer-stack relative isolate min-w-0 lg:col-span-5">
              <div aria-hidden className="pointer-events-none absolute inset-0 translate-x-2 translate-y-3 rotate-2 rounded-3xl border border-border-button-default bg-accent-200/80 sm:translate-x-3 sm:translate-y-4" />
              <div id="offer" className="offer-card relative w-full scroll-mt-40 rounded-3xl border border-border-button-default bg-background-primary-default p-5 text-text-primary shadow-xl sm:p-7 md:scroll-mt-28 lg:p-6">
                <div className="mb-6 lg:mb-5">
                  <div className="mb-4 flex items-center gap-3 lg:mb-3">
                    <span className="form-icon flex size-11 shrink-0 items-center justify-center rounded-xl text-text-white"><RiHome4Line className="size-6" aria-hidden /></span>
                    <span className="text-caption-1-semibold tracking-widest text-accent-700">YOUR NEXT CHAPTER<br />STARTS HERE</span>
                  </div>
                  <h2 className="text-title-1-bold">Get Your Free Cash Offer</h2>
                  <p className="mt-2 text-body-regular text-text-secondary">No pressure. No obligation. Just a fresh start.</p>
                </div>
                {submission === "success" ? (
                  <OfferDetailsForm contact={offerContact} />
                ) : (
                  <form name="offer" method="POST" action="/__forms.html" data-netlify="true" data-netlify-honeypot="bot-field" onSubmit={submitOffer} className="flex flex-col gap-4 lg:gap-3" aria-busy={submission === "sending"}>
                    <input type="hidden" name="form-name" value="offer" />
                    <div hidden aria-hidden="true">
                      <Input label="Leave this field empty" name="bot-field" autoComplete="off" />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Input label="Name" name="name" autoComplete="name" placeholder="Your full name" isRequired validationBehavior="native" fieldClassName="offer-field" inputClassName="text-headline-regular" />
                      <Input label="Email" name="email" type="email" autoComplete="email" placeholder="you@example.com" isRequired validationBehavior="native" fieldClassName="offer-field" inputClassName="text-headline-regular" />
                    </div>
                    <Input label="Phone Number" name="phone" type="tel" autoComplete="tel" placeholder="(555) 123-4567" isRequired validationBehavior="native" fieldClassName="offer-field" inputClassName="text-headline-regular" />
                    <AddressAutocomplete />
                    <Checkbox name="sms_consent_transactional" value="yes" className="items-start [&>span:last-child]:text-caption-1-regular [&>span:last-child]:text-text-secondary">
                      I consent to receive transactional (non-marketing) text messages from Genesis Home Buyers LLC (registered as SXSXSX LLC) about my property inquiry, such as offer updates and appointment reminders, at the phone number provided. Message frequency may vary. Message &amp; data rates may apply. Reply HELP for help or STOP to opt out.
                    </Checkbox>
                    <Checkbox name="sms_consent_marketing" value="yes" className="items-start [&>span:last-child]:text-caption-1-regular [&>span:last-child]:text-text-secondary">
                      I consent to receive marketing and promotional text messages from Genesis Home Buyers LLC (registered as SXSXSX LLC), such as cash offer promotions and updates about our home-buying services, at the phone number provided, possibly sent using automated technology. Consent is not a condition of any sale. Message frequency may vary. Message &amp; data rates may apply. Reply HELP for help or STOP to opt out.
                    </Checkbox>
                    <p className="text-caption-1-regular text-text-secondary">Both checkboxes are optional. See our <a href="/privacy" target="_blank" className="text-accent-700 underline underline-offset-2">Privacy Policy</a> and <a href="/terms" target="_blank" className="text-accent-700 underline underline-offset-2">Terms &amp; Conditions</a>.</p>
                    <Button type="submit" trailingIcon={RiArrowRightLine} disabled={submission === "sending"} className="mt-2 h-12 w-full rounded-xl text-headline-semibold">{submission === "sending" ? "Sending Your Request…" : "Get My Cash Offer"}</Button>
                    {submission === "error" && <p role="alert" className="text-body-regular text-text-error-primary">We couldn’t send your request. Your details are still here — please try again.</p>}
                  </form>
                )}
                <p className="mt-4 flex items-center justify-center gap-2 text-caption-1-medium text-text-secondary"><RiShieldCheckLine className="size-4 shrink-0 text-accent-600" aria-hidden />No pressure. No fees. No obligation.</p>
              </div>
            </div>
          </div>
        </section>
        <div className="relative mx-auto -mt-6 flex w-fit max-w-full items-center justify-center gap-3 rounded-t-3xl bg-background-secondary-default px-5 py-4 text-body-medium text-accent-950 sm:px-10">
          <RiHome4Line className="size-6 shrink-0 text-accent-700" aria-hidden />
          <span>Local people. Straightforward offers.</span>
        </div>
        <OnboardingBlock />
        <section id="why-us" aria-labelledby="why-heading" className="genesis-glass-stage scroll-mt-28 border-y border-separator-border bg-background-primary-default px-5 py-16 sm:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div className="max-w-xl">
                <p className="mb-3 text-caption-1-semibold tracking-widest text-accent-600">GOOD PEOPLE. STRAIGHTFORWARD OFFERS.</p>
                <h2 id="why-heading" className="text-display-4-bold text-accent-950 sm:text-display-3-bold">Why Homeowners<br />Choose Genesis</h2>
              </div>
              <p className="max-w-sm text-headline-regular text-text-secondary">For over 3 years we&apos;ve helped homeowners sell quickly and move forward.</p>
            </div>
            <dl className="genesis-glass genesis-glass-dark my-10 grid grid-cols-2 gap-x-4 gap-y-8 rounded-3xl border border-border-button-default px-4 py-8 text-center md:grid-cols-4 md:gap-0 md:py-10">
              {[["3+", "Years in Business"], ["100+", "Homes Purchased"], ["24hr", "Offer Turnaround"], ["$0", "Fees or Commissions"]].map(([value, label]) => (
                <div key={label} className="stat-cell flex flex-col-reverse gap-2 px-2"><dt className="text-body-medium text-accent-100">{label}</dt><dd className="text-display-3-semibold text-accent-300 sm:text-display-2-semibold">{value}</dd></div>
              ))}
            </dl>
            <div className="grid gap-5 md:grid-cols-3">
              {reasons.map(({ icon: Icon, title, description }) => (
                <article key={title} className="genesis-glass rounded-3xl border border-border-button-default p-7">
                  <div className="mb-5 flex items-center gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent-100 text-accent-700"><Icon className="size-5" aria-hidden /></span>
                    <h3 className="text-title-3-semibold text-accent-950">{title}</h3>
                  </div>
                  <p className="text-headline-regular text-text-secondary">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <Comparison2 />
        <section id="our-team" aria-labelledby="team-heading" className="scroll-mt-28 px-5 py-16 sm:px-8 lg:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <p className="mb-3 text-caption-1-semibold tracking-widest text-accent-600">THE PEOPLE BEHIND THE PROMISE</p>
              <h2 id="team-heading" className="text-display-4-bold text-accent-950 sm:text-display-3-bold">Meet the Team</h2>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {teamMembers.map(({ name, photo, title }) => (
                <article key={name} className="team-card relative flex flex-col items-center overflow-hidden rounded-3xl border border-border-button-default bg-background-primary-default px-7 pb-8 pt-10 text-center">
                  <div aria-hidden className="absolute inset-x-0 top-0 h-24 border-b border-accent-200 bg-accent-50" />
                  <Avatar src={photo} alt={name} className="relative size-28 border-4 border-background-primary-default bg-accent-200 shadow-sm [&_img]:object-top" />
                  <h3 className="mt-5 text-title-2-semibold text-accent-950">{name}</h3>
                  <Badge className="mt-2 rounded-full bg-accent-50 px-3 py-1 text-caption-1-medium text-accent-700">{title}</Badge>
                </article>
              ))}
            </div>
          </div>
        </section>
        <Faq />
        <section aria-labelledby="cta-heading" className="closing-cta relative mx-3 mb-12 overflow-hidden rounded-3xl border border-border-button-default bg-accent-950 px-6 py-12 text-text-white sm:mx-5 sm:px-10 lg:py-16">
          <div className="relative mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <p className="mb-4 text-caption-1-semibold tracking-widest text-accent-200">YOUR NEXT CHAPTER STARTS HERE</p>
              <h2 id="cta-heading" className="text-display-4-bold sm:text-display-3-bold">Ready for Your<br />No-Obligation Offer?</h2>
              <p className="mt-4 text-title-3-regular text-accent-100">Your home. Your timeline. Let’s find your next step.</p>
            </div>
            <ButtonLink href="#offer" trailingIcon={RiArrowRightUpLine} className="h-14 shrink-0 rounded-full px-6 text-headline-semibold">Get My Cash Offer</ButtonLink>
          </div>
        </section>
      </main>
      <footer className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-5 px-5 pb-8 text-center text-body-regular text-text-secondary sm:flex-row sm:px-8 sm:text-left">
        <GenesisLogo />
        <address className="flex flex-col items-center gap-1 not-italic sm:items-start">
          <span>{contact.address}</span>
          <span>
            <a href={contact.phoneHref} className="rounded-md text-accent-700 underline-offset-4 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-border-focus-ring">{contact.phone}</a>
            {" · "}
            <a href={`mailto:${contact.email}`} className="rounded-md text-accent-700 underline-offset-4 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-border-focus-ring">{contact.email}</a>
          </span>
        </address>
        <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-4">
          <p>© 2026 Genesis Home Buyers LLC.</p>
          <a href="/privacy" className="rounded-md py-2 text-body-medium text-accent-700 underline-offset-4 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-border-focus-ring">Privacy Policy</a>
          <a href="/terms" className="rounded-md py-2 text-body-medium text-accent-700 underline-offset-4 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-border-focus-ring">Terms &amp; Conditions</a>
          <a href="/text-us" className="rounded-md py-2 text-body-medium text-accent-700 underline-offset-4 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-border-focus-ring">Text Us</a>
          <a href="/jv" className="rounded-md py-2 text-body-medium text-accent-700 underline-offset-4 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-border-focus-ring">Submit a Deal – JV</a>
        </div>
      </footer>
    </>
  );
}
