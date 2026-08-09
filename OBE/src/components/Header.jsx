import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import { LogoMark } from "./LogoMark.jsx";
import { Button } from "./Button.jsx";
import { EstimateModal } from "./EstimateModal.jsx";

const navItems = [
  { label: "About Us", href: "/#intro" },
  { label: "Collections", href: "/collections" },
  { label: "Contact Us", href: "/#contact" }
];

const investorTypes = ["First Timer", "STR Owners", "Portfolio Scalers"];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [investorOpen, setInvestorOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const location = useLocation();

  // Featured collection detail pages (urban, shore) get the home-page transparent
  // treatment so the header blends with the full-bleed hero image.
  // All other /collections/* paths (list page, etc.) stay solid immediately.
  const featuredSlugs = ["/collections/urban", "/collections/shore"];
  const isFeaturedCollection = featuredSlugs.some(slug => location.pathname === slug || location.pathname.startsWith(slug + "/"));
  const forceSolid = location.pathname.startsWith("/collections") && !isFeaturedCollection;

  useEffect(() => {
    setScrolled(false);
    const onScroll = () => setScrolled(window.scrollY > 24);
    // Re-evaluate immediately (user may have arrived mid-scroll via back/forward)
    requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [location.pathname]);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  const close = () => {
    setOpen(false);
    setInvestorOpen(false);
  };

  const handleNavClick = (item) => (event) => {
    if (item.label === "Contact Us") {
      event.preventDefault();
      close();
      setContactOpen(true);
    } else {
      close();
    }
  };

  const openContact = () => setContactOpen(true);

  useEffect(() => {
    const onOpenContact = () => setContactOpen(true);
    window.addEventListener("obe:open-contact", onOpenContact);
    return () => window.removeEventListener("obe:open-contact", onOpenContact);
  }, []);

  const pageHandle = location.pathname.includes("/urban") ? "urban" : location.pathname.includes("/shore") ? "shore" : undefined;

  return (
    <header
      data-page-handle={pageHandle}
      className={[
        "site-header",
        !isFeaturedCollection && (scrolled || forceSolid) ? "site-header--scrolled" : "",
        forceSolid ? "site-header--collections" : "",
        isFeaturedCollection ? "site-header--featured" : "",
      ].filter(Boolean).join(" ")}
    >
      <Link className="brand" to="/" onClick={close} data-cursor="Home" aria-label="Home">
        <LogoMark />
      </Link>

      <nav className="nav" aria-label="Primary">
        {navItems.map((item) => (
          item.label === "Contact Us" ? (
            <a key={item.label} href={item.href} onClick={handleNavClick(item)} data-cursor={item.label}>
              {item.label}
            </a>
          ) : (
            <Link key={item.label} to={item.href} onClick={handleNavClick(item)} data-cursor={item.label}>
              {item.label}
            </Link>
          )
        ))}
        <div className={`investor-menu ${investorOpen ? "investor-menu--open" : ""}`}>
          <button
            className="investor-menu__button"
            type="button"
            aria-haspopup="true"
            aria-expanded={investorOpen}
            onClick={() => setInvestorOpen((value) => !value)}
          >
            Investor Type
            <ChevronDown size={15} aria-hidden="true" />
          </button>
          <div className="investor-menu__panel">
            {investorTypes.map((item) => (
              <a key={item} href="/#mistakes" onClick={() => setInvestorOpen(false)}>
                {item}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <div className="header-actions">
        <Button onClick={openContact} variant="consult" className="header-cta">
          Get Your Free Estimate
        </Button>
        <button
          className="menu-toggle"
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
      </div>

      <div className={`mobile-menu ${open ? "mobile-menu--open" : ""}`} aria-hidden={!open}>
        <div className="mobile-menu__inner">
          {navItems.map((item) => (
            item.label === "Contact Us" ? (
              <a key={item.label} href={item.href} onClick={handleNavClick(item)}>
                {item.label}
              </a>
            ) : (
              <Link key={item.label} to={item.href} onClick={handleNavClick(item)}>
                {item.label}
              </Link>
            )
          ))}
          <div className="mobile-menu__group">
            <span>Investor Type</span>
            {investorTypes.map((item) => (
              <a key={item} href="/#mistakes" onClick={close}>
                {item}
              </a>
            ))}
          </div>
          <a
            href="#"
            onClick={(event) => {
              event.preventDefault();
              close();
              setContactOpen(true);
            }}
          >
            Get Your Free Estimate
          </a>
        </div>
      </div>
      <EstimateModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </header>
  );
}
