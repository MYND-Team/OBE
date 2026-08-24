import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { LogoMark } from "./LogoMark.jsx";
import urbanImg from "../assets/urban-hero.jpg";
import shoreImg from "../assets/shore-living-1.jpg";
import { SHEETS_ENDPOINT } from "../config.js";
import { trackLeadConversion } from "../lib/analytics.js";

const stageOptions = [
  "Finished, furnished",
  "Finished, unfurnished",
  "Semi finished",
  "Unfinished",
];

const timelineOptions = [
  "As soon as possible",
  "Within a month",
  "1 to 3 months",
  "Just exploring",
];

// Upgrade labels are "Name, price EGP: description" — the sheet only wants the name.
function upgradeName(label) {
  return label.split(/,\s*(?:from\s*)?[\d,]+\s*EGP.*$/i)[0].trim();
}

// Map collection slug/name → Apps Script sheet key
function resolveSheetKey(collectionName) {
  const name = (collectionName || "").toLowerCase();
  if (name === "shore") return "shore";
  return "urban"; // default
}

async function postToSheets(payload) {
  const res = await fetch(SHEETS_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "text/plain" },
    body: JSON.stringify(payload),
  });
  return res.json();
}

export function RequestPackageModal({ open, onClose, collectionName, bedroomLabel, price, upgrades = [] }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!open) {
      setVisible(false);
      return undefined;
    }

    const t = setTimeout(() => setVisible(true), 10);

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    document.body.classList.add("menu-open");
    window.addEventListener("keydown", onKeyDown);

    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
      document.body.classList.remove("menu-open");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const form = event.target;
    const timestamp = new Date().toLocaleString("en-GB", { timeZone: "Africa/Cairo" });
    const sheetKey = resolveSheetKey(collectionName);

    try {
      await postToSheets({
        sheet: sheetKey,
        headers: [
          "Timestamp",
          "First Name",
          "Last Name",
          "WhatsApp",
          "Email",
          "Property Location",
          "Property Stage",
          "Timeline",
          "Notes",
          "Quoted Price",
          "Upgrades",
          "Bedrooms",
        ],
        row: [
          timestamp,
          form.firstName.value,
          form.lastName.value,
          form.whatsapp.value,
          form.email.value,
          form.property_location.value,
          form.property_stage.value,
          form.timeline.value,
          form.notes?.value || "",
          price || "",
          upgrades.map(upgradeName).join(", "),
          bedroomLabel || "",
        ],
      });
    } catch (_) {
      // best-effort
    } finally {
      setLoading(false);
      setSubmitted(true);
      trackLeadConversion("request_package");
    }
  };

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => {
      onClose();
      setSubmitted(false);
    }, 280);
  };

  const getImage = () => {
    if ((collectionName || "").toLowerCase() === "shore") return shoreImg;
    return urbanImg;
  };

  const modal = (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
    >
      {/* Backdrop */}
      <div
        onClick={handleClose}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(20,20,12,0.65)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          opacity: visible ? 1 : 0,
          transition: "opacity 300ms ease",
          cursor: "pointer",
        }}
      />

      {/* Panel */}
      <div
        className="pkg-modal__panel"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "scale(1) translateY(0)" : "scale(0.94) translateY(24px)",
          transition: "opacity 300ms ease, transform 340ms cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {/* Left: image */}
        <div className="pkg-modal__img-side">
          <img src={getImage()} alt={collectionName} />
          <div className="pkg-modal__img-overlay pkg-modal__img-overlay--top">
            <LogoMark className="pkg-modal__logo" />
          </div>
          <div className="pkg-modal__img-overlay pkg-modal__img-overlay--bottom">
            <h3>{collectionName}</h3>
          </div>
        </div>

        {/* Right: form */}
        <div className="pkg-modal__form-side" data-lenis-prevent>
          <button
            className="pkg-modal__close"
            type="button"
            onClick={handleClose}
            aria-label="Close"
          >
            <X size={20} aria-hidden="true" />
          </button>

          {submitted ? (
            <div className="pkg-modal__success">
              <h2>Request received. We are on it.</h2>
              <p>We are confirming the {collectionName} collection for your property. You will hear from us on WhatsApp within 24 hours to lock the details and start your 30 days. If we need anything, we will ask first.</p>
            </div>
          ) : (
            <>
              <h2 className="pkg-modal__title">Request this Package</h2>

              <form className="pkg-modal__form" onSubmit={handleSubmit}>
                <label className="pkg-modal__field">
                  <span>Name</span>
                  <div className="pkg-modal__row">
                    <input type="text" name="firstName" placeholder="First name" />
                    <input type="text" name="lastName" placeholder="Last name" />
                  </div>
                </label>

                <label className="pkg-modal__field">
                  <span>WhatsApp number (required)</span>
                  <input type="tel" name="whatsapp" placeholder="+20 100 000 0000" required />
                  <span className="pkg-modal__hint">This is where we will reply.</span>
                </label>

                <label className="pkg-modal__field">
                  <span>Email (required)</span>
                  <input type="email" name="email" placeholder="example@example.com" required />
                </label>

                <label className="pkg-modal__field">
                  <span>Where is the property? (required)</span>
                  <input type="text" name="property_location" placeholder="Neighborhood" required />
                  <span className="pkg-modal__hint">Neighborhood is enough.</span>
                </label>

                <label className="pkg-modal__field">
                  <span>What stage is it at? (required)</span>
                  <select name="property_stage" defaultValue="" required>
                    <option value="" disabled>Select</option>
                    {stageOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </label>

                <label className="pkg-modal__field">
                  <span>When do you want it live? (required)</span>
                  <select name="timeline" defaultValue="" required>
                    <option value="" disabled>Select</option>
                    {timelineOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </label>

                {upgrades.length > 0 && (
                  <p className="pkg-modal__hint" style={{ margin: "-0.4rem 0 0.2rem" }}>
                    Upgrades: {upgrades.join(", ")}
                  </p>
                )}

                <label className="pkg-modal__field">
                  <span>Anything we should know? (optional)</span>
                  <textarea name="notes" placeholder="" rows={3} />
                </label>

                <button className="pkg-modal__submit" type="submit" disabled={loading}>
                  {loading ? "Sending…" : "Request This Package"}
                </button>

                <p className="pkg-modal__trust">
                  No payment now. We confirm the details and reply on WhatsApp within 24 hours.
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
