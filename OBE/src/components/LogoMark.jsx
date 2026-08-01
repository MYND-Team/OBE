import logoMark from "../assets/obe-logo.png";

export function LogoMark({ className = "" }) {
  return <img className={`logo-mark ${className}`.trim()} src={logoMark} alt="" aria-hidden="true" />;
}
