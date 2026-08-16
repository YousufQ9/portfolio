import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import DataMotif from "../components/DataMotif";
import SkillsGrid from "../components/SkillsGrid";
import { profile, highlights } from "../data/profile";
import { projects } from "../data/projects";
import { withBase } from "../utils/withBase";
import "./Home.css";

// The four strongest, most varied projects for the homepage teaser grid —
// picked to show range (an NDA industry project, a published BI dashboard,
// a deep learning project, and an ML project) rather than every project.
// The full set lives on the /projects page.
const FEATURED_SLUGS = [
  "lufthansa-reddit-signals",
  "tariff-impact-dashboard",
  "chest-xray-report-generation",
  "vehicle-supply-demand",
];

export default function Home() {
  const featured = FEATURED_SLUGS.map((slug) => projects.find((p) => p.slug === slug)).filter(Boolean);

  return (
    <>
      <Seo
        title="Home"
        description={`${profile.name} — Data Analyst with an M.S. in Analytics from Georgia Tech. Forecasting, machine learning, and BI dashboards built on real data.`}
      />

      {/* ============================== HERO ============================== */}
      <section className="hero">
        <div className="container hero__grid">
          <div className="hero__content">
            <p className="eyebrow">{profile.title} · {profile.tagline}</p>
            <p className="hero__greeting">{profile.heroGreeting}</p>
            <h1 className="hero__headline">{profile.heroStatement}</h1>
            <p className="hero__subtext">{profile.heroSubtext}</p>

            <div className="hero__actions">
              <Link to="/projects" className="btn btn-primary">
                View projects
              </Link>
              <Link to="/experience" className="btn btn-secondary">
                View experience
              </Link>
              {profile.resumeAvailable && (
                <a
                  href={`${import.meta.env.BASE_URL}${profile.resumeUrl}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-secondary"
                >
                  View Résumé
                </a>
              )}
            </div>

            <p className="hero__location">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M7 13S11.5 8.75 11.5 5.5a4.5 4.5 0 1 0-9 0C2.5 8.75 7 13 7 13Z" stroke="currentColor" strokeWidth="1.2" />
                <circle cx="7" cy="5.5" r="1.6" stroke="currentColor" strokeWidth="1.2" />
              </svg>
              {profile.location} · {profile.openTo}
            </p>
          </div>

          <div className="hero__visual" aria-hidden="true">
            <DataMotif className="hero__motif" />
          </div>
        </div>
      </section>

      {/* ============================== HIGHLIGHTS ============================== */}
      {highlights.length > 0 && (
        <section className="section-tight highlights">
          <div className="container">
            <div className="highlights__grid">
              {highlights.map((h) => (
                <div className="highlights__item" key={h.label}>
                  <p className="highlights__value stat-value">{h.value}</p>
                  <p className="highlights__label">{h.label}</p>
                  <p className="highlights__sublabel">{h.sublabel}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============================== SKILLS ============================== */}
      <section className="section skills-section">
        <div className="container">
          <div className="section-header">
            <p className="eyebrow">Toolkit</p>
            <h2>Technologies I actually use, grouped by what they're for</h2>
            <p className="section-header__sub">
              Every tool listed here shows up in a real project below - not a generic skills list.
            </p>
          </div>
          <SkillsGrid />
        </div>
      </section>

      {/* ============================== FEATURED PROJECTS ============================== */}
      <section className="section featured">
        <div className="container">
          <div className="section-header">
            <p className="eyebrow">Selected work</p>
            <h2>A few projects that show the range</h2>
            <p className="section-header__sub">
              From a 45-million-row NDA industry project to a published Tableau dashboard -
              each one links to a full breakdown of the problem, the data, and the results.
            </p>
          </div>

          <div className="featured__grid">
            {featured.map((project) => (
              <Link to={`/projects/${project.slug}`} className="featured-card" key={project.slug}>
                <div className="featured-card__thumb" aria-hidden="true">
                  {project.thumbnail ? (
                    <img src={withBase(project.thumbnail)} alt="" loading="lazy" />
                  ) : (
                    <FeaturedThumb seed={project.slug} />
                  )}
                </div>
                <div className="featured-card__body">
                  <div className="featured-card__tags">
                    {project.category.slice(0, 2).map((c) => (
                      <span className="tag" key={c}>{c}</span>
                    ))}
                  </div>
                  <h3 className="featured-card__title">{project.title}</h3>
                  <p className="featured-card__desc">{project.shortDescription}</p>
                  <p className="featured-card__cta">View case study →</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="featured__more">
            <Link to="/projects" className="btn btn-secondary">
              See all projects
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

// Same deterministic placeholder pattern used in ProjectCard, kept local
// and simple since the homepage only needs a quiet visual, not a photo.
function FeaturedThumb({ seed }) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  const bars = Array.from({ length: 6 }, (_, i) => 15 + ((hash >> (i * 4)) % 65));

  return (
    <svg viewBox="0 0 300 160" className="featured-card__placeholder">
      <rect width="300" height="160" fill="var(--color-accent-soft)" />
      {bars.map((h, i) => (
        <rect
          key={i}
          x={24 + i * 44}
          y={135 - h}
          width="26"
          height={h}
          rx="3"
          fill="var(--color-accent)"
          opacity={0.3 + i * 0.1}
        />
      ))}
    </svg>
  );
}
