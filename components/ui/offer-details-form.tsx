"use client";

import { useState, type FormEvent } from "react";
import { Radio, RadioGroup, Label } from "react-aria-components";
import { RiArrowRightLine, RiShieldCheckLine } from "@remixicon/react";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { cx } from "@/utils/cx";

/** Contact details from the main offer form, sent again so the CRM can match the existing contact. */
export type OfferContact = { name: string; email: string; phone: string; address: string };

// Field names must stay in sync with the "offer-details" definition in public/__forms.html.
const questions = [
  { name: "condition", label: "Property condition", options: ["Move-in ready", "Needs some work", "Needs major repairs"] },
  { name: "timeline", label: "When do you want to sell?", options: ["ASAP", "Within 30 days", "1–3 months", "Just exploring"] },
  { name: "occupancy", label: "Who lives there now?", options: ["I do", "Tenant", "Vacant"] },
];

const field = { fieldClassName: "offer-field", inputClassName: "text-headline-regular" };

/** Optional second step shown after the offer request is in. Every question can be skipped. */
export function OfferDetailsForm({ contact }: { contact: OfferContact }) {
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  async function submitDetails(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");
    try {
      const body = new URLSearchParams();
      new FormData(form).forEach((value, key) => body.append(key, String(value)));
      await fetch(form.action, { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: body.toString() });
    } finally {
      // The lead is already saved, so never leave the seller stuck on an error here.
      setStatus("done");
    }
  }

  if (status === "done") {
    return (
      <div role="status" className="flex min-h-80 flex-col items-center justify-center gap-4 text-center">
        <RiShieldCheckLine className="size-12 text-accent-600" aria-hidden />
        <h3 className="text-title-2-semibold">You’re all set.</h3>
        <p className="text-headline-regular text-text-secondary">Thank you. The Genesis team will reach out soon to talk about your property.</p>
      </div>
    );
  }

  return (
    <form name="offer-details" method="POST" action="/__forms.html" onSubmit={submitDetails} className="flex flex-col gap-5" aria-busy={status === "sending"}>
      <div role="status" className="flex items-start gap-3 rounded-xl bg-accent-50 p-4">
        <RiShieldCheckLine className="mt-0.5 size-6 shrink-0 text-accent-600" aria-hidden />
        <div>
          <h3 className="text-headline-semibold text-accent-950">Your request is in.</h3>
          <p className="text-body-regular text-text-secondary">Want a stronger offer, faster? Tell us a bit more. Everything below is optional.</p>
        </div>
      </div>
      <input type="hidden" name="form-name" value="offer-details" />
      {Object.entries(contact).map(([key, value]) => <input key={key} type="hidden" name={key} value={value} />)}

      {questions.map(({ name, label, options }) => (
        <RadioGroup key={name} name={name} className="flex flex-col gap-2">
          <Label className="text-body-medium text-text-primary">{label}</Label>
          <div className="flex flex-wrap gap-2">
            {options.map((option) => (
              <Radio
                key={option}
                value={option}
                className={({ isSelected, isFocusVisible }) => cx(
                  "cursor-pointer rounded-full border px-4 py-2 text-body-medium outline-none transition-colors",
                  isSelected ? "border-accent-600 bg-accent-600 text-text-white" : "border-border-button-default bg-background-primary-default text-text-primary hover:border-border-button-hover",
                  isFocusVisible && "ring-2 ring-border-focus-ring",
                )}
              >
                {option}
              </Radio>
            ))}
          </div>
        </RadioGroup>
      ))}

      <Input label="Anything else we should know?" name="details_notes" placeholder="Roof leak, inherited, behind on payments…" {...field} />

      <div className="flex flex-col gap-2">
        <Button type="submit" trailingIcon={RiArrowRightLine} disabled={status === "sending"} className="h-12 w-full rounded-xl text-headline-semibold">{status === "sending" ? "Sending…" : "Send Details"}</Button>
        <Button type="button" variant="ghost" onClick={() => setStatus("done")} className="h-11 w-full rounded-xl">Skip — just call me</Button>
      </div>
    </form>
  );
}
