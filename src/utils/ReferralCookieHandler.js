export function referralCookieHandler() {
    const params = new URLSearchParams(window.location.search);
    const utm = ["referee"];
    const data = {};

    let hasReferee = false;

    utm.forEach(key => {
      if (params.has(key)) {
        hasReferee = true;
        data[key] = params.get(key);
      }
    });

    if (hasReferee) {
      document.cookie =
    "referee=" + encodeURIComponent(JSON.stringify(data)) +
    ";domain=.wisowl.com;path=/;max-age=2592000";
      // document.cookie = `utm_data=${JSON.stringify(data)}; domain=.wisowl.com; path=/; max-age=1800`;
    }
}
  