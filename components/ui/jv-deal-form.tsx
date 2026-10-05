"use client";

import { useEffect, useState, type FormEvent } from "react";
import { RiArrowRightLine, RiShieldCheckLine } from "@remixicon/react";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { captureLeadSource, leadSourceFields } from "@/utils/lead-source";
import { AddressAutocomplete } from "@/components/ui/address-autocomplete";

// Field names must stay in sync with the "jv-deal" definition in public/__forms.html.
const field = { validationBehavior: "native" as const, fieldClassName: "offer-field", inputClassName: "text-headline-regular" };

export function JvDealForm() {
  const [submission, setSubmission] = useState<"idle" | "sending" | "success" | "error">("idle");

  useEffect(captureLeadSource, []);

  async function submitDeal(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setSubmission("sending");
    try {
      const body = new URLSearchParams();
      new FormData(form).forEach((value, key) => body.append(key, String(value)));
      Object.entries(leadSourceFields()).forEach(([key, value]) => body.append(key, value));
      const response = await fetch(form.action, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      if (!response.ok) throw new Error("Deal submission was not accepted");
      setSubmission("success");
      form.reset();
    } catch {
      setSubmission("error");
    }
  }

  if (submission === "success") {
    return (
      <div role="status" className="flex min-h-80 flex-col items-center justify-center gap-4 text-center">
        <RiShieldCheckLine className="size-12 text-accent-600" aria-hidden />
        <h3 className="text-title-2-semibold text-accent-950">Your deal is in.</h3>
        <p className="text-headline-regular text-text-secondary">Thanks for sending it over. The Genesis team will review the numbers and reach out to you.</p>
      </div>
    );
  }

  return (
    <form name="jv-deal" method="POST" action="/__forms.html" data-netlify="true" data-netlify-honeypot="bot-field" onSubmit={submitDeal} className="flex flex-col gap-4" aria-busy={submission === "sending"}>
      <input type="hidden" name="form-name" value="jv-deal" />
      <div hidden aria-hidden="true">
        <Input label="Leave this field empty" name="bot-field" autoComplete="off" />
      </div>
      <p className="text-caption-1-semibold tracking-widest text-accent-700">YOUR INFO</p>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="Name" name="name" autoComplete="name" placeholder="Your full name" isRequired {...field} />
        <Input label="Phone Number" name="phone" type="tel" autoComplete="tel" placeholder="(555) 123-4567" isRequired {...field} />
      </div>
      <Input label="Email" name="email" type="email" autoComplete="email" placeholder="you@example.com" isRequired {...field} />

      <p className="mt-4 text-caption-1-semibold tracking-widest text-accent-700">THE DEAL</p>
      <AddressAutocomplete name="property_address" />
      <Input label="Deal Type" name="deal_type" placeholder="Cash, subject-to, seller finance, land, multifamily…" {...field} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="Contract Price" name="contract_price" inputMode="numeric" placeholder="$150,000" isRequired {...field} />
        <Input label="Your Asking Price to Buyers" name="asking_price" inputMode="numeric" placeholder="$175,000" {...field} />
        <Input label="Estimated ARV" name="arv" inputMode="numeric" placeholder="$260,000" {...field} />
        <Input label="Estimated Repairs" name="repairs" inputMode="numeric" placeholder="$40,000" {...field} />
      </div>
      <Input label="Closing Date on Your Contract" name="contract_close_date" placeholder="MM/DD/YYYY" isRequired {...field} />
      <Input label="Link to Photos or Video" name="photos_link" placeholder="Google Drive, Dropbox, etc." {...field} />
      <Input label="Anything Else We Should Know" name="notes" placeholder="Access, occupancy, seller situation, EMD…" {...field} />

      <Button type="submit" trailingIcon={RiArrowRightLine} disabled={submission === "sending"} className="mt-2 h-12 w-full rounded-xl text-headline-semibold">{submission === "sending" ? "Sending Your Deal…" : "Submit My Deal"}</Button>
      <p className="text-caption-1-regular text-text-secondary">We’ll follow up about your deal by phone or email. We don’t send text messages to numbers submitted through this form.</p>
      {submission === "error" && <p role="alert" className="text-body-regular text-text-error-primary">We couldn’t send your deal. Your details are still here — please try again.</p>}
    </form>
  );
}
