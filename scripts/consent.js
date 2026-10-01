/**
 * Cookie consent + GA4 loader for salesforceconsultants.io
 * Measurement ID G-JXKDK1RBS0 loads only after analytics consent.
 * See /privacy-policy/ and /cookie-policy/
 */
(function () {
  var STORAGE_KEY = "sfc_cookie_consent";
  var GA_ID = "G-JXKDK1RBS0";

  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function () {
      window.dataLayer.push(arguments);
    };

  window.gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
    functionality_storage: "granted",
    security_storage: "granted",
    wait_for_update: 500,
  });

  function loadAnalytics() {
    if (document.getElementById("sfc-ga4")) return;
    var script = document.createElement("script");
    script.id = "sfc-ga4";
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
    document.head.appendChild(script);
    window.gtag("js", new Date());
    window.gtag("config", GA_ID, {
      anonymize_ip: true,
      cookie_flags: "SameSite=None;Secure",
      send_page_view: true,
    });
  }

  function hideBanner() {
    var el = document.getElementById("cookie-consent-banner");
    if (el) el.remove();
  }

  function applyConsent(value, persist) {
    if (persist !== false) {
      try {
        localStorage.setItem(STORAGE_KEY, value);
      } catch (e) {
        /* private mode */
      }
    }
    if (value === "accepted") {
      window.gtag("consent", "update", { analytics_storage: "granted" });
      loadAnalytics();
    } else {
      window.gtag("consent", "update", { analytics_storage: "denied" });
    }
    hideBanner();
  }

  function injectStyles() {
    if (document.getElementById("cookie-consent-styles")) return;
    var style = document.createElement("style");
    style.id = "cookie-consent-styles";
    style.textContent =
      "#cookie-consent-banner{position:fixed;bottom:0;left:0;right:0;z-index:10001;background:#DEF2F1;color:#17252A;padding:1.1rem 1.25rem;box-shadow:0 -8px 30px rgba(23,37,42,.12);font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;}" +
      "#cookie-consent-banner .cc-inner{max-width:1100px;margin:0 auto;display:flex;gap:1.25rem;align-items:center;justify-content:space-between;flex-wrap:wrap;}" +
      "#cookie-consent-banner p{margin:0;font-size:.95rem;line-height:1.5;max-width:720px;color:#17252A;}" +
      "#cookie-consent-banner a{color:#2B7A78;text-decoration:underline;}" +
      "#cookie-consent-banner .cc-actions{display:flex;gap:.6rem;flex-wrap:wrap;}" +
      "#cookie-consent-banner button{border:none;border-radius:8px;padding:.7rem 1.15rem;font-weight:700;cursor:pointer;font-size:.9rem;}" +
      "#cookie-consent-banner .cc-accept{background:#2B7A78;color:#FFFFFF;}" +
      "#cookie-consent-banner .cc-reject{background:transparent;color:#17252A;border:1px solid #2B7A78;}";
    document.head.appendChild(style);
  }

  function showBanner() {
    if (document.getElementById("cookie-consent-banner")) return;
    injectStyles();
    var banner = document.createElement("div");
    banner.id = "cookie-consent-banner";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-label", "Cookie consent");
    banner.innerHTML =
      '<div class="cc-inner">' +
      "<p>We use essential cookies to run this site. Analytics cookies (Google Analytics) are used only if you accept, so we can understand how the site is used. See our " +
      '<a href="/privacy-policy/">Privacy Policy</a> and <a href="/cookie-policy/">Cookie Policy</a>.</p>' +
      '<div class="cc-actions">' +
      '<button type="button" class="cc-accept">Accept analytics</button>' +
      '<button type="button" class="cc-reject">Reject</button>' +
      "</div></div>";
    document.body.appendChild(banner);
    banner.querySelector(".cc-accept").addEventListener("click", function () {
      applyConsent("accepted");
    });
    banner.querySelector(".cc-reject").addEventListener("click", function () {
      applyConsent("rejected");
    });
  }

  function savedConsent() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function init() {
    var saved = savedConsent();
    if (saved === "accepted") {
      applyConsent("accepted", false);
      return;
    }
    if (saved === "rejected") {
      return;
    }
    showBanner();
  }

  window.sfcOpenCookieSettings = function () {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      /* ignore */
    }
    showBanner();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
