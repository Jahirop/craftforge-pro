// Hub analytics — reuses the site's existing GA4 (gtag) + Meta Pixel (fbq).
// No new analytics tool is added; we only emit events into what's already loaded
// in index.html (GA4 G-93HNDZWHN5, Pixel 4349896151892955).

export type HubLinkGroup = "primary" | "secondary" | "cta";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

/** Fire a GA4 page_view for /hub. Needed because this is an SPA — route
 *  changes don't trigger the gtag config page_view automatically. */
export function trackHubView() {
  window.gtag?.("event", "page_view", {
    page_title: "Portfolio Hub",
    page_path: "/hub",
  });
}

/** Fire on every outbound link tap so per-platform interest is measurable. */
export function trackHubClick(platform: string, url: string, group: HubLinkGroup) {
  window.gtag?.("event", "hub_link_click", {
    link_platform: platform,
    link_url: url,
    link_group: group,
  });
  window.fbq?.("trackCustom", "HubLinkClick", { platform, group });
}
