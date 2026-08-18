import logoMark from "../assets/footer-logo-cropped.png";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" id="contact">
      <div className="footer__grid">
        <div className="footer__brand">
          <span className="brand brand--footer" aria-label="OBÉ">
            <img className="logo-mark" src={logoMark} alt="" aria-hidden="true" />
          </span>
        </div>
        <nav aria-label="Footer">
          <a href="/#intro">About Us</a>
          <a href="/collections">Collections</a>
          <a href="/#contact">Contact Us</a>
        </nav>
        <nav className="footer__social" aria-label="Social">
          <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="https://tiktok.com" target="_blank" rel="noreferrer">TikTok</a>
        </nav>
      </div>
      <div className="footer__base">
        <a href="mailto:contact@obespaces.com">contact@obespaces.com</a>
        <p>&copy; {year} OBÉ. All rights reserved.</p>
      </div>
      <img className="footer__wordmark" src={logoMark} alt="" aria-hidden="true" />
    </footer>
  );
}
