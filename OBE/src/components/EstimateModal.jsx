import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { SHEETS_ENDPOINT } from "../config.js";

const bedroomOptions = ["Studio", "1", "2", "3", "4 or more"];
const stageOptions = ["Unfinished", "Semi finished", "Finished, unfurnished", "Finished, furnished"];
const earningOptions = ["Empty, not listed", "Listed but underperforming", "Preparing it now", "I own several"];
const referralOptions = ["Instagram", "Google", "A friend", "Other"];

async function postToSheets(payload) {
  const res = await fetch(SHEETS_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "text/plain" },
    body: JSON.stringify(payload),
  });
  return res.json();
}

const requiredFieldLabels = {
  property_location: "Where is the property?",
  bedrooms: "How many bedrooms?",
  property_stage: "What stage is it at?",
  earning_status: "Is it earning yet?",
  firstName: "Name",
  lastName: "Name",
  email: "Email",
};

export function EstimateModal({ open, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    const scrollY = window.scrollY;
    document.body.classList.add("menu-open");
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.classList.remove("menu-open");
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollY);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const form = event.target;
    const phone = form.phone.value.trim();
    const digits = phone.replace(/\D/g, "");

    if (!phone) {
      setError("We need a WhatsApp number to send your estimate. Could you add it?");
      return;
    }
    if (digits.length < 7) {
      setError("That number looks incomplete. Could you check it?");
      return;
    }
    for (const name of Object.keys(requiredFieldLabels)) {
      if (!form[name].value.trim()) {
        setError("Just this one to go, then you are done.");
        return;
      }
    }

    setLoading(true);
    const timestamp = new Date().toLocaleString("en-GB", { timeZone: "Africa/Cairo" });

    try {
      await postToSheets({
        sheet: "estimate",
        headers: [
          "Timestamp",
          "First Name",
          "Last Name",
          "WhatsApp / Phone",
          "Email",
          "Property Location",
          "Bedrooms",
          "Property Stage",
          "Earning Status",
        ],
        row: [
          timestamp,
          form.firstName.value,
          form.lastName.value,
          form.phone.value,
          form.email.value,
          form.property_location.value,
          form.bedrooms.value,
          form.property_stage.value,
          form.earning_status.value,
        ],
      });
      setSubmitted(true);
    } catch (_) {
      setError("Something went wrong on our side, not yours. Please try once more, or message us at contact@obespaces.com");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
    setSubmitted(false);
    setError("");
  };

  return (
    <div className="contact-modal" role="dialog" aria-modal="true" aria-label="Get Your Free Estimate">
      <div className="contact-modal__backdrop" onClick={handleClose} />
      <div className="contact-modal__panel" data-lenis-prevent>
        <button className="contact-modal__close" type="button" onClick={handleClose} aria-label="Close">
          <X size={20} aria-hidden="true" />
        </button>

        {submitted ? (
          <div className="contact-modal__success">
            <h2>Got it. Your estimate is on the way.</h2>
            <p>Our team is putting together a revenue projection for your property. It reaches you on WhatsApp within 24 hours. If anything is unclear, we will ask before we send.</p>
          </div>
        ) : (
          <>
            <h2>Get Your Free Estimate</h2>
            <p className="contact-modal__intro">
              Four quick details about your property. We send back a real revenue projection: what listings like yours earn now, and what the top ten percent earn. Within 24 hours, on WhatsApp.
            </p>
            <p className="contact-modal__takes">Takes about a minute.</p>
            <p className="contact-modal__contact-line">
              Questions? <a href="mailto:contact@obespaces.com">contact@obespaces.com</a>
            </p>

            <form className="contact-modal__form" onSubmit={handleSubmit}>
              {/* Property info */}
              <label className="contact-modal__field">
                <span>Where is the property? *</span>
                <input
                  type="text"
                  name="property_location"
                  placeholder="Neighborhood is enough"
                  required
                />
              </label>

              <label className="contact-modal__field">
                <span>How many bedrooms? *</span>
                <select name="bedrooms" defaultValue="" required>
                  <option value="" disabled>Select</option>
                  {bedroomOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </label>

              <label className="contact-modal__field">
                <span>What stage is it at? *</span>
                <select name="property_stage" defaultValue="" required>
                  <option value="" disabled>Select</option>
                  {stageOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </label>

              <label className="contact-modal__field">
                <span>Is it earning yet? *</span>
                <select name="earning_status" defaultValue="" required>
                  <option value="" disabled>Select</option>
                  {earningOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </label>

              {/* Contact info */}
              <label className="contact-modal__field">
                <span>Name *</span>
                <div className="contact-modal__row">
                  <input type="text" name="firstName" placeholder="First Name" required />
                  <input type="text" name="lastName" placeholder="Last Name" required />
                </div>
              </label>

              <label className="contact-modal__field">
                <span>WhatsApp number *</span>
                <input type="tel" name="phone" placeholder="(000) 000 0000" required />
                <span className="contact-modal__hint">This is where your estimate arrives.</span>
              </label>

              <label className="contact-modal__field">
                <span>Email *</span>
                <input type="email" name="email" placeholder="example@example.com" required />
              </label>

              <label className="contact-modal__field">
                <span>How did you hear about us?</span>
                <select name="referral" defaultValue="">
                  <option value="">Select (optional)</option>
                  {referralOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </label>

              {error ? <p className="contact-modal__error" role="alert">{error}</p> : null}

              <button className="contact-modal__submit" type="submit" disabled={loading}>
                {loading ? "Sending…" : "Get My Free Estimate"}
              </button>
              <p className="contact-modal__secondary">Prefer to talk first? Book a call.</p>
              <p className="contact-modal__trust">No cost. No obligation. A real projection, not a sales call.</p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
