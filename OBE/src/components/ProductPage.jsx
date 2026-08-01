import { Navigate, Link, useParams } from "react-router-dom";
import { ArrowLeft, Check, HeartHandshake, Ruler, ShieldCheck } from "lucide-react";
import { Button } from "./Button.jsx";
import { ProductCard } from "./ProductCard.jsx";
import { products } from "../data.js";
import { usePageReveal } from "../hooks/usePageReveal.js";

export function ProductPage() {
  const { slug } = useParams();
  const product = products.find((item) => item.slug === slug);
  const pageRef = usePageReveal();

  if (!product) {
    return <Navigate to="/" replace />;
  }

  const related = products.filter((item) => item.slug !== product.slug).slice(0, 3);

  return (
    <main className="page product-page" ref={pageRef}>
      <section className="product-hero">
        <figure className="product-hero__media" data-image-reveal>
          <img src={product.hero} alt={product.name} />
        </figure>
        <div className="product-hero__content">
          <Link className="back-link" to="/" data-cursor="Back">
            <ArrowLeft size={18} aria-hidden="true" />
            Collection
          </Link>
          <p className="section-label">{product.type}</p>
          <h1>{product.name}</h1>
          <p>{product.lead}</p>
          <div className="product-hero__actions">
            <span className="product-price">{product.price}</span>
            <Button>Request allocation</Button>
          </div>
        </div>
      </section>

      <section className="product-spec section">
        <div className="product-spec__copy" data-reveal>
          <p className="section-label">Piece notes</p>
          <h2>Tailored by hand, resolved for daily life.</h2>
          <p>
            Each order begins with a design estimate to align proportions, finish, upholstery,
            and installation details to the architecture it will inhabit.
          </p>
        </div>
        <div className="spec-list" data-reveal>
          <article>
            <Ruler size={22} aria-hidden="true" />
            <span>Dimensions</span>
            <p>{product.dimensions}</p>
          </article>
          <article>
            <ShieldCheck size={22} aria-hidden="true" />
            <span>Materials</span>
            <p>{product.material}</p>
          </article>
          <article>
            <HeartHandshake size={22} aria-hidden="true" />
            <span>Edition</span>
            <p>{product.edition}</p>
          </article>
        </div>
      </section>

      <section className="product-detail section">
        <figure data-image-reveal>
          <img src={product.detail} alt={`${product.name} material detail`} loading="lazy" />
        </figure>
        <div data-reveal>
          <p className="section-label">Material palette</p>
          <h2>Finish options selected for tone, weight, and patina.</h2>
          <ul className="palette-list">
            {product.palette.map((item) => (
              <li key={item}>
                <Check size={18} aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="product-gallery-section section">
        <div className="section-heading" data-reveal>
          <p className="section-label">In detail</p>
          <h2>More views from the commission.</h2>
        </div>
        <div className="product-gallery-strip">
          {product.gallery.map((image, index) => (
            <figure className={`product-gallery-shot product-gallery-shot--${index + 1}`} key={image} data-reveal data-image-reveal>
              <img src={image} alt={`${product.name} view ${index + 1}`} loading="lazy" />
            </figure>
          ))}
        </div>
      </section>

      <section className="related section">
        <div className="section-heading" data-reveal>
          <p className="section-label">Related pieces</p>
          <h2>Complete the composition.</h2>
        </div>
        <div className="product-grid product-grid--related">
          {related.map((item, index) => (
            <ProductCard key={item.slug} product={item} index={index} />
          ))}
        </div>
      </section>
    </main>
  );
}
