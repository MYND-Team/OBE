import { useEffect, useState } from "react";
import { X } from "lucide-react";

const bedroomOptions = ["Studio", "1", "2", "3", "4 or more"];
const stageOptions = ["Unfinished", "Semi finished", "Finished, unfurnished", "Finished, furnished"];
const earningOptions = ["Empty, not listed", "Listed but underperforming"];

export function EstimateModal({ open, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.body.classList.add("menu-open");
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.classList.remove("menu-open");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const form = event.target;
    const data = new FormData(form);

    try {
      await fetch("https://formsubmit.co/ajax/contact@obespaces.com", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data
      });
    } catch (_) {
      // best-effort
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  const handleClose = () => {
    onClose();
    setSubmitted(false);
  };

  return (
    <div className="contact-modal" role="dialog" aria-modal="true" aria-label="Get Your Free Estimate">
      <div className="contact-modal__backdrop" onClick={handleClose} />
      <div className="contact-modal__panel">
        <button className="contact-modal__close" type="button" onClick={handleClose} aria-label="Close">
          <X size={20} aria-hidden="true" />
        </button>

        {submitted ? (
          <div className="contact-modal__success">
            <h2>Request received. We are on it.</h2>
            <p>We are confirming details and will reach out via WhatsApp within 24 hours.</p>
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
              <input type="hidden" name="_subject" value="New Free Estimate Request" />
              <input type="hidden" name="_captcha" value="false" />

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

              <button className="contact-modal__submit" type="submit" disabled={loading}>
                {loading ? "Sending…" : "Get My Free Estimate"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
