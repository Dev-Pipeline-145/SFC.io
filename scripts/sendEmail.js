document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  if (!form) {
    console.error("Contact form not found.");
    return;
  }

  const submitButton = form.querySelector("button[type='submit']");
  const emailInput = form.querySelector("input[type='email']");
  const phoneInput = form.querySelector("input[name='phone']");
  let invalidEmailToastShown = false;
  let invalidPhoneToastShown = false;

  submitButton.disabled = false;

  function validateEmail(email) {
    const emailRegex = /^[\w._%+-]+@[\w.-]+\.[a-zA-Z]{2,10}$/;
    return emailRegex.test(email);
  }

  function validatePhone(phone) {
    if (!phone) return true;
    const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    return phoneRegex.test(phone);
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const requiredFields = form.querySelectorAll("[required]");
    const missingFields = [];

    requiredFields.forEach((el) => {
      if (!el.value.trim()) {
        const label = form.querySelector(`label[for="${el.id}"]`);
        missingFields.push(
          label
            ? label.innerText.replace("*", "").trim()
            : el.name || el.id || "Unnamed field"
        );
      }
    });

    if (missingFields.length > 0) {
      displayToast(
        `Please fill in the following fields: ${missingFields.join(", ")}`,
        "error"
      );
      return;
    }

    const emailValue = emailInput?.value.trim();
    if (!validateEmail(emailValue)) {
      if (!invalidEmailToastShown) {
        displayToast("Please enter a valid email address.", "error");
        invalidEmailToastShown = true;
      }
      return;
    }

    const phoneValue = phoneInput?.value.trim();
    if (!validatePhone(phoneValue)) {
      if (!invalidPhoneToastShown) {
        displayToast("Please enter a valid phone number.", "error");
        invalidPhoneToastShown = true;
      }
      return;
    }

    submitButton.disabled = true;
    submitForm();
  });

  function submitForm() {
    const formData = new FormData(form);
    const emailData = Object.fromEntries(formData.entries());

    fetch("https://flask-mailer-04f370a78f42.herokuapp.com/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(emailData),
    })
      .then(async (response) => {
        const result = await response.json();
        if (response.ok) {
          // Track successful form submission in Google Analytics
          if (typeof gtag !== 'undefined') {
            gtag('event', 'form_submit', {
              'event_category': 'conversion',
              'event_label': 'contact_form_success',
              'value': 1,
              'custom_parameter_3': 'usa_canada_europe',
              'custom_parameter_4': 'california_missouri_kansas_rocky_mountain_region',
              'conversion': true,
              'engagement_time_msec': 1
            });
            // Track as conversion event
            gtag('event', 'generate_lead', {
              'event_category': 'conversion',
              'event_label': 'contact_form_lead',
              'value': 1,
              'currency': 'USD',
              'custom_parameter_3': 'usa_canada_europe'
            });
          }
          displayToast(
            result.MESSAGE || "Message sent successfully!",
            "success"
          );
          form.reset();
          invalidEmailToastShown = false;
          invalidPhoneToastShown = false;
        } else {
          displayToast(
            result.error || result.MESSAGE || "Failed to send message.",
            "error"
          );
        }
      })
      .catch((error) => {
        console.error("Network error:", error);
        displayToast(
          "There was a problem sending the email. Please try again later.",
          "error"
        );
      })
      .finally(() => {
        submitButton.disabled = false;
      });
  }

  function displayToast(message, type = "success") {
    const container = document.querySelector(".toast-container");
    if (!container) {
      alert(`${type.toUpperCase()}: ${message}`);
      return;
    }

    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.innerText = message;

    container.appendChild(toast);

    toast.addEventListener("animationend", (e) => {
      if (e.animationName === "stayThenFade") {
        toast.remove();
      }
    });
  }
});
