import { Link } from "react-router-dom";
import { ArrowUpRight, CalendarDays, Handshake, Target } from "lucide-react";
import { collections } from "../data.js";
import siteContent from "../site-content.json";
import { usePageReveal } from "../hooks/usePageReveal.js";

const visibleCollections = collections.filter((collection) => ["urban", "shore"].includes(collection.slug));

const reasonIcons = [Target, CalendarDays, Handshake];
const reasons = siteContent.collectionsPage.why.reasons.map((reason, index) => ({
  ...reason,
  icon: reasonIcons[index % reasonIcons.length],
}));

export function CollectionsPage() {
  const pageRef = usePageReveal();
  const { heroHeading, heroGold, heroSub, why } = siteContent.collectionsPage;

  return (
    <main className="page collections-page" ref={pageRef}>
      <section className="cl-hero" data-reveal>
        <p className="section-label">The Collections</p>
        <h1>
          {heroHeading}
          <br />
          <span className="cl-hero__gold">{heroGold}</span>
        </h1>
        <p className="cl-hero__sub">{heroSub}</p>
      </section>

      <section className="cl-bands" aria-label="Collections">
        {visibleCollections.map((collection, index) => (
          <article className="cl-band" key={collection.slug} data-reveal>
            <Link className="cl-band__media" to={`/collections/${collection.slug}`} data-cursor="Explore">
              <img src={collection.image} alt={`${collection.name} collection, furnished short term rental interior`} loading="lazy" />
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
          <p className="section-label">{why.label}</p>
          <h2>{why.heading}</h2>
          <p className="cl-why__lead">{why.lead}</p>
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
