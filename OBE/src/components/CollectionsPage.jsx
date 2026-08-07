import { Link } from "react-router-dom";
import { ArrowUpRight, CalendarDays, Handshake, Target } from "lucide-react";
import { collections } from "../data.js";
import { usePageReveal } from "../hooks/usePageReveal.js";

const visibleCollections = collections.filter((collection) => ["urban", "shore"].includes(collection.slug));

const reasons = [
  { icon: Target, title: "Built for guests, not you", eyebrow: "Guest-first standard", text: "Built for what guests want, not your taste." },
  { icon: CalendarDays, title: "Empty to live in 30 days", eyebrow: "30-day launch", text: "Delivered, staged, shot. Guaranteed, in 30 days." },
  { icon: Handshake, title: "You do nothing", eyebrow: "One point of contact", text: "One point of contact, every vendor handled by our team." }
];

export function CollectionsPage() {
  const pageRef = usePageReveal();

  return (
    <main className="page collections-page" ref={pageRef}>
      <section className="cl-hero" data-reveal>
        <p className="section-label">The Collections</p>
        <h1>
          Built for the ideal guest.
          <br />
          <span className="cl-hero__gold">Higher rates, better reviews.</span>
        </h1>
        <p className="cl-hero__sub">Every collection is furnished for exactly who your property should win.</p>
      </section>

      <section className="cl-bands" aria-label="Collections">
        {visibleCollections.map((collection, index) => (
          <article className="cl-band" key={collection.slug} data-reveal>
            <Link className="cl-band__media" to={`/collections/${collection.slug}`} data-cursor="Explore">
              <img src={collection.image} alt={collection.name} loading="lazy" />
              <span className="cl-band__index">{String(index + 1).padStart(2, "0")}</span>
            </Link>
            <div className="cl-band__info">
              <span className="cl-band__tag">{collection.tagline}</span>
              <h2>{collection.name}</h2>
              <p className="cl-band__desc">{collection.text}</p>
              <Link className="cl-band__cta" to={`/collections/${collection.slug}`}>
                Explore collection <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </article>
        ))}
      </section>

      <section className="cl-why" id="why-choose">
        <div className="cl-why__head" data-reveal>
          <p className="section-label">The OBÉ Difference</p>
          <h2>Why Choose Us</h2>
          <p className="cl-why__lead">Shell furnishing. A standard built to remove the expensive parts of guessing, waiting, coordinating, and managing.</p>
        </div>
        <div className="cl-why__row" data-reveal>
          {reasons.map(({ icon: Icon, title, eyebrow, text }) => (
            <article className="cl-why__item" key={title}>
              <span className="cl-why__ic">
                <Icon size={24} aria-hidden="true" />
              </span>
              <span className="cl-why__eyebrow">{eyebrow}</span>
              <h3 className="cl-why__t">{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
