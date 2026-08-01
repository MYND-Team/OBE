import { ArrowUpRight, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export function Button({ children, to, href, onClick, variant = "dark", className = "" }) {
  const classes = `button button--${variant} ${className}`.trim();
  const Icon = variant === "consult" ? ChevronRight : ArrowUpRight;
  const content = (
    <>
      <span className="button__label">{children}</span>
      <span className="button__icon" aria-hidden="true">
        <Icon size={16} />
      </span>
    </>
  );

  if (to) {
    return (
      <Link className={classes} to={to} onClick={onClick} data-cursor="view">
        {content}
      </Link>
    );
  }

  if (href && !onClick) {
    return (
      <a className={classes} href={href} data-cursor="view">
        {content}
      </a>
    );
  }

  return (
    <button className={classes} type="button" onClick={onClick} data-cursor="view">
      {content}
    </button>
  );
}
