// Google Ads account tag (genesishomebuyers.co, ads account 928-856-0109). Loaded on every page by app/layout.tsx.
export const googleAdsId = "AW-18489122014";

// Conversion label from Google Ads → Goals → Conversions → the "Submit lead form" action's event snippet
// (the part after the slash in send_to: "AW-18489122014/<label>").
const offerLeadLabel = "ohPRCMSVzY0dEN65pvBE";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/** Report one seller lead to Google Ads. Call only after the offer form submission is accepted. */
export function trackOfferLead() {
  if (!offerLeadLabel) return;
  window.gtag?.("event", "conversion", { send_to: `${googleAdsId}/${offerLeadLabel}`, value: 1.0, currency: "USD" });
}

// Conversion label for the "Website phone click" action (Goals → Conversions → its event snippet, Click option).
const phoneClickLabel = "x50oCLi4x44dEN65pvBE";

/** Report a tap on any phone number link to Google Ads. Google counts one per ad click, so repeat taps are fine. */
export function trackPhoneClick() {
  if (!phoneClickLabel) return;
  window.gtag?.("event", "conversion", { send_to: `${googleAdsId}/${phoneClickLabel}`, value: 1.0, currency: "USD", transport_type: "beacon" });
}
