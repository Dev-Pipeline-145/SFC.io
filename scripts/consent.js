/**
 * Privacy notice + opt-out loader for salesforceconsultants.io
 * Google Analytics (G-JXKDK1RBS0) and commercial advertising pixels may run on landing.
 * Visitors can opt out via “Do Not Sell or Share My Info” or Global Privacy Control.
 * See /privacy-policy/ and /cookie-policy/
 */
(function () {
  var STORAGE_KEY = "sfc_privacy_choice";
  var LEGACY_KEY = "sfc_cookie_consent";
  var GA_ID = "G-JXKDK1RBS0";

  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function () {
      window.dataLayer.push(arguments);
    };

  function hasGpc() {
    try {
      return !!navigator.globalPrivacyControl;
    } catch (e) {
      return false;
    }
  }

  function readChoice() {
    try {
      var current = localStorage.getItem(STORAGE_KEY);
      if (current) return current;
      var legacy = localStorage.getItem(LEGACY_KEY);
      if (legacy === "rejected") return "opted_out";
      if (legacy === "accepted") return "acknowledged";
    } catch (e) {
      /* private mode */
    }
    return null;
  }

  function writeChoice(value) {
    try {
      localStorage.setItem(STORAGE_KEY, value);
      localStorage.removeItem(LEGACY_KEY);
    } catch (e) {
      /* private mode */
    }
  }

  function isOptedOut(choice) {
    return choice === "opted_out" || hasGpc();
  }

  function setConsentDefault(granted) {
    var state = granted ? "granted" : "denied";
    window.gtag("consent", "default", {
      ad_storage: state,
      ad_user_data: state,
      ad_personalization: state,
      analytics_storage: state,
      functionality_storage: "granted",
      security_storage: "granted",
      wait_for_update: 500,
    });
  }

  function updateConsent(granted) {
    var state = granted ? "granted" : "denied";
    window.gtag("consent", "update", {
      ad_storage: state,
      ad_user_data: state,
      ad_personalization: state,
      analytics_storage: state,
    });
  }

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

  function loadCommercialPixels() {
    if (window.__sfcPixelsLoaded) return;
    window.__sfcPixelsLoaded = true;
    // Standard commercial ad pixels may be added here. They run on landing unless opted out.
  }

  function enableTracking() {
    updateConsent(true);
    loadAnalytics();
    loadCommercialPixels();
  }

  function disableTracking() {
    updateConsent(false);
  }

  function hideBanner() {
    var el = document.getElementById("cookie-consent-banner");
    if (el) el.remove();
  }

  function injectStyles() {
    if (document.getElementById("cookie-consent-styles")) return;
    var style = document.createElement("style");
    style.id = "cookie-consent-styles";
    style.textContent =
      "#cookie-consent-banner{position:fixed;bottom:0;left:0;right:0;z-index:10001;background:#DEF2F1;color:#17252A;padding:1.1rem 1.25rem;box-shadow:0 -8px 30px rgba(23,37,42,.12);font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;}" +
      "#cookie-consent-banner .cc-inner{max-width:1100px;margin:0 auto;display:flex;gap:1.25rem;align-items:center;justify-content:space-between;flex-wrap:wrap;}" +
      "#cookie-consent-banner p{margin:0;font-size:.95rem;line-height:1.5;max-width:760px;color:#17252A;}" +
      "#cookie-consent-banner a{color:#2B7A78;text-decoration:underline;}" +
      "#cookie-consent-banner .cc-actions{display:flex;gap:.6rem;flex-wrap:wrap;}" +
      "#cookie-consent-banner button{border:none;border-radius:8px;padding:.7rem 1.15rem;font-weight:700;cursor:pointer;font-size:.9rem;}" +
      "#cookie-consent-banner .cc-accept{background:#2B7A78;color:#FFFFFF;}" +
      "#cookie-consent-banner .cc-reject{background:transparent;color:#17252A;border:1px solid #2B7A78;}" +
      "@media (max-width:640px){#cookie-consent-banner{padding:.9rem 1rem;}#cookie-consent-banner .cc-inner{flex-direction:column;align-items:stretch;gap:.85rem;}#cookie-consent-banner p{max-width:none;font-size:.9rem;}#cookie-consent-banner .cc-actions{flex-direction:column;width:100%;}#cookie-consent-banner button{width:100%;min-height:44px;}}";
    document.head.appendChild(style);
  }

  function showBanner(mode) {
    hideBanner();
    injectStyles();
    var opted = isOptedOut(readChoice());
    var banner = document.createElement("div");
    banner.id = "cookie-consent-banner";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-label", "Privacy notice");
    var notice =
      mode === "settings" && opted
        ? "You have opted out of Google Analytics and advertising cookies. You can allow them again or keep your opt-out."
        : "We use cookies and similar technologies, including Google Analytics and commercial advertising pixels, when you visit this site. See our " +
          '<a href="/privacy-policy/">Privacy Policy</a> and <a href="/cookie-policy/">Cookie Policy</a>. You can opt out of sale/sharing at any time.';
    var primaryLabel = opted && mode === "settings" ? "Keep opt-out" : "OK";
    var secondaryLabel = opted ? "Allow analytics &amp; ads" : "Do Not Sell or Share My Info";
    banner.innerHTML =
      '<div class="cc-inner"><p>' +
      notice +
      "</p>" +
      '<div class="cc-actions">' +
      '<button type="button" class="cc-accept">' +
      primaryLabel +
      "</button>" +
      '<button type="button" class="cc-reject">' +
      secondaryLabel +
      "</button>" +
      "</div></div>";
    document.body.appendChild(banner);

    banner.querySelector(".cc-accept").addEventListener("click", function () {
      if (opted && mode === "settings") {
        writeChoice("opted_out");
        disableTracking();
      } else if (!hasGpc()) {
        writeChoice("acknowledged");
        enableTracking();
      } else {
        writeChoice("opted_out");
        disableTracking();
      }
      hideBanner();
    });

    banner.querySelector(".cc-reject").addEventListener("click", function () {
      if (opted) {
        writeChoice("acknowledged");
        enableTracking();
      } else {
        writeChoice("opted_out");
        disableTracking();
      }
      hideBanner();
    });
  }

  function init() {
    var choice = readChoice();
    var opted = isOptedOut(choice);
    setConsentDefault(!opted);
    if (opted) {
      disableTracking();
    } else {
      enableTracking();
    }
    if (choice !== "acknowledged" && choice !== "opted_out") {
      showBanner("notice");
    }
  }

  window.sfcOptOut = function () {
    writeChoice("opted_out");
    disableTracking();
    showBanner("settings");
  };

  window.sfcOpenCookieSettings = function () {
    showBanner("settings");
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
