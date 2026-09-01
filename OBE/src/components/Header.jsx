import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { LogoMark } from "./LogoMark.jsx";
import { Button } from "./Button.jsx";
import { EstimateModal } from "./EstimateModal.jsx";
import siteContent from "../site-content.json";

const { navItems, ctaLabel } = siteContent.header;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
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
  };

  const handleNavClick = (item) => (event) => {
    if (item.href === "/#contact") {
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
          item.href === "/#contact" ? (
            <a key={item.label} href={item.href} onClick={handleNavClick(item)} data-cursor={item.label}>
              {item.label}
            </a>
          ) : (
            <Link key={item.label} to={item.href} onClick={handleNavClick(item)} data-cursor={item.label}>
              {item.label}
            </Link>
          )
        ))}
      </nav>

      <div className="header-actions">
        <Button onClick={openContact} variant="consult" className="header-cta">
          {ctaLabel}
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
          <nav className="mobile-menu__nav" aria-label="Mobile primary">
            {navItems.map((item, index) => {
              const number = String(index + 1).padStart(2, "0");
              const content = (
                <>
                  <span className="mobile-menu__link-index">{number}</span>
                  <span className="mobile-menu__link-label">{item.label}</span>
                </>
              );
              return item.href === "/#contact" ? (
                <a key={item.label} className="mobile-menu__link" href={item.href} onClick={handleNavClick(item)}>
                  {content}
                </a>
              ) : (
                <Link key={item.label} className="mobile-menu__link" to={item.href} onClick={handleNavClick(item)}>
                  {content}
                </Link>
              );
            })}
          </nav>
          <button
            type="button"
            className="mobile-menu__cta"
            onClick={() => {
              close();
              setContactOpen(true);
            }}
          >
            <span>{ctaLabel}</span>
            <ArrowUpRight size={20} aria-hidden="true" />
          </button>
        </div>
      </div>
      <EstimateModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </header>
  );
}
