/* ==========================================================================
   Inkpactful — site configuration and behavior
   --------------------------------------------------------------------------
   >>> SWAP POINT <<<
   These three values are the ONLY things you need to change when TidyCal and
   the Inkpactful email address are live. Everything else on the site reads
   from here. Edit, commit, push. Netlify redeploys automatically.
   ========================================================================== */

const INKPACTFUL = {

  /* Your public TidyCal booking link for the 15-MINUTE FIT CALL ONLY.
     Do NOT put the 90-minute Impact Lens session or the 45-minute findings
     walkthrough here. Those stay unlisted and are sent privately after payment.
     Example: "https://tidycal.com/inkpactful/fit-call"
     Leave as null until the link is live — the page shows a graceful fallback. */
  bookingUrl: "https://tidycal.com/m8n0892/fitcall",

  /* TidyCal link for the 90-MINUTE IMPACT LENS session.
     Used by the "Book Your Impact Lens" buttons on How We Work.
     While null, those buttons fall back to the fit call page.
     NOTE: this link lets someone book a 90-minute slot without a fit call and
     without paying. Keep the TidyCal event's availability tight, or remove the
     buttons, if that becomes a problem. */
  lensBookingUrl: "https://tidycal.com/m8n0892/impactlens",

  /* Public contact address. */
  contactEmail: "info@inkpactful.com",

  /* Optional LinkedIn profiles for the founders. Leave null to hide. */
  linkedInShaikh: null,
  linkedInTasmiha: null

};

/* --------------------------------------------------------------------------
   Nothing below this line needs editing.
   -------------------------------------------------------------------------- */

(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {

    /* ---- Mobile navigation ---------------------------------------------- */
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.getElementById("site-nav");

    if (toggle && nav) {
      toggle.addEventListener("click", function () {
        var open = nav.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
        toggle.textContent = open ? "Close" : "Menu";
      });

      // Close the menu when a link inside it is followed
      nav.addEventListener("click", function (e) {
        if (e.target.tagName === "A" && nav.classList.contains("is-open")) {
          nav.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
          toggle.textContent = "Menu";
        }
      });

      // Escape closes the menu
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && nav.classList.contains("is-open")) {
          nav.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
          toggle.textContent = "Menu";
          toggle.focus();
        }
      });
    }

    /* ---- Contact email --------------------------------------------------- */
    var emailTargets = document.querySelectorAll("[data-email]");
    Array.prototype.forEach.call(emailTargets, function (el) {
      if (INKPACTFUL.contactEmail) {
        el.textContent = INKPACTFUL.contactEmail;
        el.classList.remove("placeholder");
        if (el.tagName === "A") {
          el.setAttribute("href", "mailto:" + INKPACTFUL.contactEmail);
        }
      }
    });

    /* ---- Founder LinkedIn links ------------------------------------------ */
    [["shaikh", INKPACTFUL.linkedInShaikh], ["tasmiha", INKPACTFUL.linkedInTasmiha]]
      .forEach(function (pair) {
        var el = document.querySelector('[data-linkedin="' + pair[0] + '"]');
        if (!el) return;
        if (pair[1]) {
          el.setAttribute("href", pair[1]);
          el.hidden = false;
        } else {
          el.hidden = true;
        }
      });

    /* ---- Booking embed --------------------------------------------------- */
    // TidyCal is embedded with its own JS widget (a div + their embed.js),
    // not a plain iframe src. See: https://help.tidycal.com/article/141-embeding-tidycal-on-your-site
    var embed = document.getElementById("booking-embed");
    if (embed && INKPACTFUL.bookingUrl) {
      var tidyCalPath = INKPACTFUL.bookingUrl
        .replace(/^https?:\/\/(www\.)?tidycal\.com\//i, "")
        .replace(/\/$/, "");

      var widget = document.createElement("div");
      widget.className = "tidycal-embed";
      widget.setAttribute("data-path", tidyCalPath);
      embed.innerHTML = "";
      embed.appendChild(widget);

      if (!document.querySelector('script[src="https://tidycal.com/js/embed.js"]')) {
        var script = document.createElement("script");
        script.src = "https://tidycal.com/js/embed.js";
        script.async = true;
        document.body.appendChild(script);
      }
    }
    // If bookingUrl is null, the fallback markup already in the HTML stays put.

    /* ---- Impact Lens booking buttons -------------------------------------- */
    var lensLinks = document.querySelectorAll("[data-lens-booking]");
    Array.prototype.forEach.call(lensLinks, function (el) {
      if (INKPACTFUL.lensBookingUrl) {
        el.setAttribute("href", INKPACTFUL.lensBookingUrl);
        el.setAttribute("target", "_blank");
        el.setAttribute("rel", "noopener");
      }
      // else: keeps its href to book.html so the button is never a dead end
    });

    /* ---- Direct booking links elsewhere ---------------------------------- */
    // Any element marked data-booking-direct jumps straight to the scheduler
    // once the URL exists; until then it keeps its href to /book.html.
    var directLinks = document.querySelectorAll("[data-booking-direct]");
    Array.prototype.forEach.call(directLinks, function (el) {
      if (INKPACTFUL.bookingUrl) {
        el.setAttribute("href", INKPACTFUL.bookingUrl);
        el.setAttribute("target", "_blank");
        el.setAttribute("rel", "noopener");
      }
    });

    /* ---- Current year in footer ------------------------------------------ */
    var years = document.querySelectorAll("[data-year]");
    Array.prototype.forEach.call(years, function (el) {
      el.textContent = new Date().getFullYear();
    });

  });
})();
