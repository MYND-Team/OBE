// Fires the lead conversion event to GA4 and the Meta Pixel. Safe to call even
// if a script was blocked (ad blocker) or GA4's measurement ID is still the
// placeholder in index.html, since both globals are guarded before use.
export function trackLeadConversion(formName) {
  if (typeof window === "undefined") return;

  if (typeof window.gtag === "function") {
    window.gtag("event", "generate_lead", { form_name: formName });
  }

  if (typeof window.fbq === "function") {
    window.fbq("track", "Lead", { content_name: formName });
  }
}
