// First-touch lead attribution: remembers how a visitor first arrived (ad click, search, social, direct)
// and sends it with every form submission so the CRM can tag the lead.

const storageKey = "genesis-first-touch";

type Attribution = {
  lead_source: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  gclid: string;
  landing_page: string;
  referrer: string;
};

function classify(params: URLSearchParams, referrer: string): string {
  if (params.get("gclid") || params.get("gbraid") || params.get("wbraid")) return "Google Ads";
  if (params.get("fbclid")) return "Facebook";
  const utmSource = params.get("utm_source");
  if (utmSource) return [utmSource, params.get("utm_medium")].filter(Boolean).join(" / ");
  let host = "";
  try {
    host = referrer ? new URL(referrer).hostname.replace(/^www\./, "") : "";
  } catch {}
  if (!host || host === window.location.hostname.replace(/^www\./, "")) return "Direct";
  if (/(^|\.)(google|bing|yahoo|duckduckgo)\./.test(host)) return "Organic Search";
  if (/(^|\.)(facebook|instagram)\.com$/.test(host) || host === "fb.me") return "Facebook / Instagram";
  return `Referral: ${host}`;
}

function current(): Attribution {
  const params = new URLSearchParams(window.location.search);
  return {
    lead_source: classify(params, document.referrer),
    utm_source: params.get("utm_source") ?? "",
    utm_medium: params.get("utm_medium") ?? "",
    utm_campaign: params.get("utm_campaign") ?? "",
    utm_term: params.get("utm_term") ?? "",
    gclid: params.get("gclid") ?? params.get("gbraid") ?? params.get("wbraid") ?? "",
    landing_page: window.location.pathname + window.location.search,
    referrer: document.referrer,
  };
}

/** Call once per page load. Keeps the first arrival of the browser session; a later ad click replaces it. */
export function captureLeadSource() {
  const now = current();
  try {
    const saved = sessionStorage.getItem(storageKey);
    if (!saved || now.lead_source === "Google Ads" || now.lead_source === "Facebook") {
      sessionStorage.setItem(storageKey, JSON.stringify(now));
    }
  } catch {}
}

/** Attribution fields to send with a form submission. */
export function leadSourceFields(): Attribution {
  try {
    const saved = sessionStorage.getItem(storageKey);
    if (saved) return JSON.parse(saved) as Attribution;
  } catch {}
  return current();
}
