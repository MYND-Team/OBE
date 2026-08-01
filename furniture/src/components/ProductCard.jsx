import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export function ProductCard({ product, index }) {
  return (
    <Link
      className={`product-card product-card--${(index % 2) + 1}`}
      to={`/product/${product.slug}`}
      data-cursor="Explore"
    >
      <figure className="product-card__media">
        <img src={product.image} alt={product.name} loading="lazy" />
      </figure>
      <div className="product-card__body">
        <div>
          <p>{product.type}</p>
          <h3>{product.name}</h3>
        </div>
        <span className="product-card__price">{product.price}</span>
        <span className="product-card__icon" aria-hidden="true">
          <ArrowUpRight size={18} />
        </span>
      </div>
    </Link>
  );
}
