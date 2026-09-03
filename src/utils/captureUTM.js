export function captureUTM() {
    const params = new URLSearchParams(window.location.search);
    const utm = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
    const data = {};

    let hasUTM = false;

    utm.forEach(key => {
      if (params.has(key)) {
        hasUTM = true;
        data[key] = params.get(key);
      }
    });

    if (hasUTM) {
      const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
      const cookieDomain = process.env.NEXT_PUBLIC_COOKIE_DOMAIN || ".wisowl.com";
      const domainAttr = isLocalhost ? "" : `;domain=${cookieDomain}`;
      
      document.cookie =
        "utm_data=" + encodeURIComponent(JSON.stringify(data)) +
        `${domainAttr};path=/;max-age=2592000`;
    }
}
  