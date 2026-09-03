export function searchCookieHandler(searchData) {
  if (!searchData) return;

  const data = {
    keywords: searchData.keywords || "",
    experience: searchData.experience || "",
    locations: searchData.locations || [],
    timestamp: Date.now()
  };

  const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
  const cookieDomain = process.env.NEXT_PUBLIC_COOKIE_DOMAIN || ".wisowl.com";
  const domainAttr = isLocalhost ? "" : `;domain=${cookieDomain}`;

  document.cookie =
    "job_search=" +
    encodeURIComponent(JSON.stringify(data)) +
    `${domainAttr};path=/;max-age=1800`; // 30 mins
}
