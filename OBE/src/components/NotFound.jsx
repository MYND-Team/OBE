import { usePageReveal } from "../hooks/usePageReveal.js";
import { Button } from "./Button.jsx";

export function NotFound() {
  const pageRef = usePageReveal();

  return (
    <main className="page not-found-page" ref={pageRef}>
      <section className="not-found">
        <p className="section-label">404</p>
        <h1>This page does not exist.</h1>
        <p>
          The page you are looking for may have moved. Head back to the homepage or browse
          our furnishing collections.
        </p>
        <div className="not-found__actions">
          <Button to="/" variant="dark">Go to Homepage</Button>
          <Button to="/collections" variant="consult">View Collections</Button>
        </div>
      </section>
    </main>
  );
}
