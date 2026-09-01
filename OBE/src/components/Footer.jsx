import logoMark from "../assets/footer-logo-cropped.png";
import siteContent from "../site-content.json";

export function Footer() {
  const year = new Date().getFullYear();
  const { navItems } = siteContent.header;
  const { email, social } = siteContent.footer;

  return (
    <footer className="footer" id="contact">
      <div className="footer__grid">
        <div className="footer__brand">
          <span className="brand brand--footer" aria-label="OBÉ">
            <img className="logo-mark" src={logoMark} alt="" aria-hidden="true" />
          </span>
        </div>
        <nav aria-label="Footer">
          {navItems.map((item) => (
            <a href={item.href} key={item.label}>{item.label}</a>
          ))}
        </nav>
        <nav className="footer__social" aria-label="Social">
          {social.map((item) => (
            <a href={item.href} target="_blank" rel="noreferrer" key={item.label}>{item.label}</a>
          ))}
        </nav>
      </div>
      <div className="footer__base">
        <a href={`mailto:${email}`}>{email}</a>
        <p>&copy; {year} OBÉ. All rights reserved.</p>
      </div>
      <img className="footer__wordmark" src={logoMark} alt="" aria-hidden="true" />
    </footer>
  );
}
