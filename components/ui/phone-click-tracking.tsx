"use client";

import { useEffect } from "react";
import { trackPhoneClick } from "@/utils/google-ads";

/** Counts taps on every phone link site-wide (header, sticky bar, footer, legal pages) as a Google Ads conversion. */
export function PhoneClickTracking() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      if ((event.target as Element | null)?.closest?.('a[href^="tel:"]')) trackPhoneClick();
    }
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);
  return null;
}
