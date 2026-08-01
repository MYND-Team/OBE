import { useEffect, useState } from "react";
import { X } from "lucide-react";

const hearAboutOptions = ["Instagram", "Google Search", "Referral", "Airbnb / Booking.com", "Other"];
const investorTypeOptions = ["First Timer", "STR Owners", "Portfolio Scalers"];

export function ContactModal({ open, onClose }) {
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const handleClose = () => {
    onClose();
    setSubmitted(false);
  };

  return (
    <div className="contact-modal" role="dialog" aria-modal="true" aria-label="Book a free estimate">
      <div className="contact-modal__backdrop" onClick={handleClose} />
      <div className="contact-modal__panel">
        <button className="contact-modal__close" type="button" onClick={handleClose} aria-label="Close">
          <X size={20} aria-hidden="true" />
        </button>

        {submitted ? (
          <div className="contact-modal__success">
            <h2>Thanks — we've got it.</h2>
            <p>Someone from OBÉ will reach out shortly to schedule your free estimate.</p>
          </div>
        ) : (
          <>
            <h2>Get Your Free Estimate</h2>
            <p className="contact-modal__intro">
              Fill out the form below and find out how we can design your short-term rental to
              produce higher revenue, attract more bookings, and stand out in competitive markets.
            </p>
            <p className="contact-modal__contact-line">
              Email: <a href="mailto:contact@obespaces.com">contact@obespaces.com</a>
            </p>

            <form className="contact-modal__form" onSubmit={handleSubmit}>
              <label className="contact-modal__field">
                <span>Name *</span>
                <div className="contact-modal__row">
                  <input type="text" name="firstName" placeholder="First Name" required />
                  <input type="text" name="lastName" placeholder="Last Name" required />
                </div>
              </label>

              <label className="contact-modal__field">
                <span>Email *</span>
                <input type="email" name="email" placeholder="example@example.com" required />
              </label>

              <label className="contact-modal__field">
                <span>Phone Number *</span>
                <input type="tel" name="phone" placeholder="(000) 000-0000" required />
              </label>

              <label className="contact-modal__field">
                <span>Which best describes you? *</span>
                <select name="investorType" defaultValue="" required>
                  <option value="" disabled>
                    Please select
                  </option>
                  {investorTypeOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              <label className="contact-modal__field">
                <span>How did you hear about us? *</span>
                <select name="hearAbout" defaultValue="" required>
                  <option value="" disabled>
                    Please select
                  </option>
                  {hearAboutOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              <button className="contact-modal__submit" type="submit">
                Continue to Schedule Your Call
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
