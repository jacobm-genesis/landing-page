// Google Ads account tag (genesishomebuyers.co, ads account 928-856-0109). Loaded on every page by app/layout.tsx.
export const googleAdsId = "AW-18489122014";

// Conversion label from Google Ads → Goals → Conversions → the "Submit lead form" action's event snippet
// (the part after the slash in send_to: "AW-18489122014/<label>"). Leave empty until that action exists.
const offerLeadLabel = "";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/** Report one seller lead to Google Ads. Call only after the offer form submission is accepted. */
export function trackOfferLead() {
  if (!offerLeadLabel) return;
  window.gtag?.("event", "conversion", { send_to: `${googleAdsId}/${offerLeadLabel}` });
}
