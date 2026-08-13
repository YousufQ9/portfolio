import { Link } from "react-router-dom";
import Seo from "../components/Seo";

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found" description="The page you're looking for doesn't exist." />
      <section className="section" style={{ textAlign: "center", padding: "8rem 0" }}>
        <div className="container">
          <p className="eyebrow" style={{ justifyContent: "center" }}>404</p>
          <h1>This page doesn't exist</h1>
          <p style={{ maxWidth: "50ch", margin: "0 auto 2rem" }}>
            The page you're looking for may have moved. Head back to the homepage to find your way around.
          </p>
          <Link to="/" className="btn btn-primary">
            Back to home
          </Link>
        </div>
      </section>
    </>
  );
}
