const revealElements = document.querySelectorAll("[data-reveal]");
const header = document.querySelector(".site-header");
const progressBar = document.querySelector(".progress-bar");
const tiltElements = document.querySelectorAll("[data-tilt]");
const scrollTopButtons = document.querySelectorAll("[data-scroll-top]");
const trackButtons = document.querySelectorAll("[data-track]");
const selectionStage = document.querySelector("#selection-stage");
const paymentStage = document.querySelector("#payment-stage");
const planOptions = document.querySelector("#plan-options");
const selectionBadge = document.querySelector("#selection-badge");
const planStageTitle = document.querySelector("#plan-stage-title");
const summaryTrack = document.querySelector("#summary-track");
const summaryPrice = document.querySelector("#summary-price");
const summaryCopy = document.querySelector("#summary-copy");
const paymentPoints = document.querySelector("#payment-points");
const confirmSelectionButton = document.querySelector("#confirm-selection");
const instapayButton = document.querySelector("#instapay-link");
const paymentHelper = document.querySelector("#payment-helper");
const intakePanel = document.querySelector("#intake-panel");
const intakeSelection = document.querySelector("#intake-selection");
const selectedTrackInput = document.querySelector("#selected-track-input");
const selectedPlanInput = document.querySelector("#selected-plan-input");
const leadForm = document.querySelector("#lead-form");
const leadName = document.querySelector("#lead-name");
const leadWhatsapp = document.querySelector("#lead-whatsapp");
const leadEmail = document.querySelector("#lead-email");
const leadGoal = document.querySelector("#lead-goal");
const leadNotes = document.querySelector("#lead-notes");
const emailFallback = document.querySelector("#email-fallback");
const formNote = document.querySelector("#form-note");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const instapayBaseLink = "https://ipn.eg/S/sherif.amer92/instapay/7NdOtO";

const coachingPrograms = {
  entry: {
    label: "Entry",
    name: "Entry Transformation",
    plans: [
      {
        label: "1 Month",
        price: "EGP 1,000",
        note: "A clean entry point for structure, consistency, and a premium start.",
        points: [
          "Training plan with 2 updates per month",
          "Nutrition plan with 2 updates per month",
          "Same-day WhatsApp follow-up",
          "Customized app subscription included",
        ],
      },
      {
        label: "3 Months",
        price: "EGP 2,500",
        note: "Best for building rhythm and keeping progress steady across a longer block.",
        points: [
          "Three-month entry coaching cycle",
          "Training and nutrition structure included",
          "WhatsApp accountability and updates",
          "App delivery for daily follow-through",
        ],
      },
      {
        label: "6 Months",
        price: "EGP 4,000",
        note: "The strongest value for clients who want long-term habit and body change.",
        points: [
          "Six-month structured coaching path",
          "Clear routine with repeated refinements",
          "Nutrition and training support together",
          "Built for long-term consistency",
        ],
      },
    ],
  },
  premium: {
    label: "Premium",
    name: "Lifestyle Transformation",
    plans: [
      {
        label: "1 Month",
        price: "EGP 2,000",
        note: "High-touch support for clients who want faster feedback and tighter follow-up.",
        points: [
          "Training plan with 4 updates per month",
          "Nutrition plan with 4 updates per month",
          "WhatsApp replies within 2 hours",
          "Premium app access plus recipes",
        ],
      },
      {
        label: "3 Months",
        price: "EGP 4,000",
        note: "A stronger premium block for visible momentum with close support.",
        points: [
          "Three-month premium transformation block",
          "Faster coaching loop and more refinements",
          "Recipe access inside the app",
          "Ideal for clients who want a tighter system",
        ],
      },
      {
        label: "6 Months",
        price: "EGP 10,000",
        note: "The highest-touch option for serious transformation and long-range progress.",
        points: [
          "Six-month premium transformation path",
          "Fast response support and repeated adjustments",
          "Premium app guidance with recipes",
          "Best for clients who want the full coaching experience",
        ],
      },
    ],
  },
};

let activeTrackKey = "";
let activePlanLabel = "";

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
    rootMargin: "0px 0px -40px 0px",
  }
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

if (!prefersReducedMotion) {
  tiltElements.forEach((element) => {
    let frameId = 0;
    let rotateX = 0;
    let rotateY = 0;
    let glowX = 50;
    let glowY = 50;

    const renderTilt = () => {
      element.style.setProperty("--tilt-x", `${rotateX}deg`);
      element.style.setProperty("--tilt-y", `${rotateY}deg`);
      element.style.setProperty("--glow-x", `${glowX}%`);
      element.style.setProperty("--glow-y", `${glowY}%`);
      frameId = 0;
    };

    const queueRender = () => {
      if (!frameId) {
        frameId = window.requestAnimationFrame(renderTilt);
      }
    };

    const handlePointerMove = (event) => {
      const bounds = element.getBoundingClientRect();
      const relativeX = (event.clientX - bounds.left) / bounds.width;
      const relativeY = (event.clientY - bounds.top) / bounds.height;
      const offsetX = relativeX - 0.5;
      const offsetY = relativeY - 0.5;

      rotateX = Number((-offsetY * 10).toFixed(2));
      rotateY = Number((offsetX * 14).toFixed(2));
      glowX = Number((relativeX * 100).toFixed(2));
      glowY = Number((relativeY * 100).toFixed(2));
      queueRender();
    };

    const handlePointerLeave = () => {
      rotateX = 0;
      rotateY = 0;
      glowX = 50;
      glowY = 50;
      queueRender();
    };

    element.addEventListener("pointermove", handlePointerMove);
    element.addEventListener("pointerleave", handlePointerLeave);
  });
}

scrollTopButtons.forEach((button) => {
  button.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  });
});

const getActivePlan = () => {
  if (!activeTrackKey || !activePlanLabel) {
    return null;
  }

  return coachingPrograms[activeTrackKey].plans.find(
    (plan) => plan.label === activePlanLabel
  );
};

const getPlanAmount = (price = "") => price.replace(/[^\d]/g, "");

const copyTextFallback = (value) => {
  const helperInput = document.createElement("textarea");
  helperInput.value = value;
  helperInput.setAttribute("readonly", "");
  helperInput.style.position = "absolute";
  helperInput.style.left = "-9999px";
  document.body.appendChild(helperInput);
  helperInput.select();

  let copied = false;

  try {
    copied = document.execCommand("copy");
  } catch (error) {
    copied = false;
  }

  document.body.removeChild(helperInput);
  return copied;
};

const updateInstapayState = (message) => {
  if (!instapayButton || !paymentHelper) {
    return;
  }

  const plan = getActivePlan();

  if (!plan) {
    instapayButton.disabled = true;
    instapayButton.textContent = "Open Instapay";
    paymentHelper.textContent =
      message || "Select a duration to prepare the Instapay amount and WhatsApp flow.";
    return;
  }

  instapayButton.disabled = false;
  instapayButton.textContent = `Pay ${plan.price} on Instapay`;
  paymentHelper.textContent =
    message || `The selected amount will be copied first, then Instapay opens for ${plan.price}.`;
};

const clearConfirmedSelection = () => {
  selectedTrackInput.value = "";
  selectedPlanInput.value = "";
  intakeSelection.textContent = "No plan confirmed yet.";
  formNote.textContent =
    "WhatsApp opens with the client details and the chosen plan. Payment can then continue with Instapay confirmation.";
  intakePanel?.classList.remove("is-ready");
};

const updateEmailFallback = () => {
  if (!emailFallback) {
    return;
  }

  const plan = getActivePlan();
  const subjectParts = ["Coaching Inquiry"];

  if (selectedTrackInput.value && selectedPlanInput.value) {
    subjectParts.push(`${selectedTrackInput.value} - ${selectedPlanInput.value}`);
  }

  const bodyLines = [
    "New coaching inquiry",
    "",
    `Program: ${selectedTrackInput.value || "Not confirmed yet"}`,
    `Duration: ${selectedPlanInput.value || "Not confirmed yet"}`,
    plan ? `Price: ${plan.price}` : "Price: To be confirmed",
    `Instapay link: ${instapayBaseLink}`,
    `Name: ${leadName?.value?.trim() || ""}`,
    `WhatsApp: ${leadWhatsapp?.value?.trim() || ""}`,
    `Email: ${leadEmail?.value?.trim() || ""}`,
    `Goal: ${leadGoal?.value?.trim() || ""}`,
    `Notes: ${leadNotes?.value?.trim() || ""}`,
  ];

  emailFallback.href = `mailto:sherifmoussa12@gmail.com?subject=${encodeURIComponent(
    subjectParts.join(" / ")
  )}&body=${encodeURIComponent(bodyLines.join("\n"))}`;
};

const renderPlanSummary = () => {
  const plan = getActivePlan();

  if (!plan) {
    updateInstapayState();
    return;
  }

  summaryTrack.textContent = `${coachingPrograms[activeTrackKey].name} / ${plan.label}`;
  summaryPrice.textContent = plan.price;
  summaryCopy.textContent = plan.note;
  paymentPoints.innerHTML = plan.points
    .map(
      (point) =>
        `<article><strong>${point}</strong><span>Designed to keep the experience premium, clear, and easy to follow.</span></article>`
    )
    .join("");
  confirmSelectionButton.textContent = `Confirm ${coachingPrograms[activeTrackKey].label} / ${plan.label}`;
  updateInstapayState();
};

const renderPlanOptions = (trackKey) => {
  const program = coachingPrograms[trackKey];

  if (!program || !planOptions) {
    return;
  }

  planOptions.innerHTML = "";

  program.plans.forEach((plan) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "plan-pill";
    button.textContent = `${plan.label} - ${plan.price}`;
    button.addEventListener("click", () => {
      activePlanLabel = plan.label;

      planOptions.querySelectorAll(".plan-pill").forEach((pill) => {
        pill.classList.toggle("is-active", pill === button);
      });

      paymentStage.hidden = false;
      renderPlanSummary();
      clearConfirmedSelection();
      updateEmailFallback();
    });

    planOptions.appendChild(button);
  });
};

trackButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeTrackKey = button.dataset.track || "";
    activePlanLabel = "";

    trackButtons.forEach((trackButton) => {
      const isActive = trackButton === button;
      trackButton.classList.toggle("is-active", isActive);
      trackButton.setAttribute("aria-pressed", `${isActive}`);
    });

    selectionStage.hidden = false;
    paymentStage.hidden = true;
    selectionBadge.textContent = `${coachingPrograms[activeTrackKey].label} selected`;
    planStageTitle.textContent = `Choose your ${coachingPrograms[activeTrackKey].label} duration.`;
    renderPlanOptions(activeTrackKey);
    clearConfirmedSelection();
    updateInstapayState();
    updateEmailFallback();
  });
});

instapayButton?.addEventListener("click", async () => {
  const plan = getActivePlan();

  if (!plan) {
    updateInstapayState("Choose a duration first so the correct Instapay amount is ready.");
    return;
  }

  const amount = getPlanAmount(plan.price);
  let amountCopied = false;

  if (amount) {
    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(amount);
        amountCopied = true;
      } catch (error) {
        amountCopied = copyTextFallback(amount);
      }
    } else {
      amountCopied = copyTextFallback(amount);
    }
  }

  updateInstapayState(
    amountCopied
      ? `${plan.price} was copied and Instapay is opening now.`
      : `Instapay is opening for ${plan.price}.`
  );

  window.open(instapayBaseLink, "_blank", "noopener");
});

confirmSelectionButton?.addEventListener("click", () => {
  const plan = getActivePlan();

  if (!activeTrackKey || !plan) {
    return;
  }

  selectedTrackInput.value = coachingPrograms[activeTrackKey].name;
  selectedPlanInput.value = `${plan.label} / ${plan.price}`;
  intakeSelection.textContent = `${coachingPrograms[activeTrackKey].name} / ${plan.label} / ${plan.price}`;
  formNote.textContent =
    "Selection confirmed. Fill the client details and send them on WhatsApp to continue with booking and Instapay follow-up.";
  intakePanel?.classList.add("is-ready");
  updateEmailFallback();
  intakePanel?.scrollIntoView({
    behavior: prefersReducedMotion ? "auto" : "smooth",
    block: "start",
  });
  leadName?.focus();
});

[leadName, leadWhatsapp, leadEmail, leadGoal, leadNotes].forEach((field) => {
  field?.addEventListener("input", updateEmailFallback);
});

leadForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!selectedTrackInput.value || !selectedPlanInput.value) {
    formNote.textContent = "Choose the program, duration, and confirm the plan first.";
    intakePanel?.classList.remove("is-ready");
    return;
  }

  if (!leadForm.reportValidity()) {
    return;
  }

  const messageLines = [
    "Hello Coach Sherif, I want to start online coaching.",
    "",
    `Program: ${selectedTrackInput.value}`,
    `Plan: ${selectedPlanInput.value}`,
    `Instapay link: ${instapayBaseLink}`,
    `Name: ${leadName.value.trim()}`,
    `WhatsApp: ${leadWhatsapp.value.trim()}`,
    leadEmail.value.trim() ? `Email: ${leadEmail.value.trim()}` : "",
    `Goal: ${leadGoal.value.trim()}`,
    leadNotes.value.trim() ? `Notes: ${leadNotes.value.trim()}` : "",
  ].filter(Boolean);

  updateEmailFallback();
  window.open(
    `https://wa.me/201153309494?text=${encodeURIComponent(messageLines.join("\n"))}`,
    "_blank",
    "noopener"
  );
  formNote.textContent =
    "WhatsApp opened with the full client intake and confirmed plan.";
});

updateEmailFallback();
updateInstapayState();

const updateChrome = () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? scrollTop / docHeight : 0;

  progressBar.style.transform = `scaleX(${progress})`;
  header.classList.toggle("is-scrolled", scrollTop > 24);
};

updateChrome();
window.addEventListener("scroll", updateChrome, { passive: true });
