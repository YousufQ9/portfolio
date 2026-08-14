import { Link } from "react-router-dom";
import { withBase } from "../utils/withBase";
import "./ProjectCard.css";

// A project summary card for the /projects grid. Clicking anywhere on the
// card navigates to its own full case-study page at /projects/:slug
// (see src/pages/ProjectDetail.jsx) — it no longer expands in place.
export default function ProjectCard({ project }) {
  return (
    <Link to={`/projects/${project.slug}`} className="pcard">
      <div className="pcard__thumb" aria-hidden="true">
        {project.thumbnail ? (
          <img src={withBase(project.thumbnail)} alt="" loading="lazy" />
        ) : (
          <ThumbPlaceholder seed={project.slug} />
        )}
      </div>

      <div className="pcard__body">
        <div className="pcard__tags">
          {project.category.slice(0, 2).map((c) => (
            <span className="tag" key={c}>{c}</span>
          ))}
        </div>
        <h3 className="pcard__title">{project.title}</h3>
        <p className="pcard__desc">{project.shortDescription}</p>

        <div className="pcard__tools">
          {project.tools.slice(0, 4).map((t) => (
            <span className="tag tag-neutral" key={t}>{t}</span>
          ))}
          {project.tools.length > 4 && (
            <span className="tag tag-neutral">+{project.tools.length - 4}</span>
          )}
        </div>

        {project.keyResult && (
          <p className="pcard__key-result">
            <span className="pcard__key-result-label">Key result —</span> {project.keyResult}
          </p>
        )}
      </div>

      <div className="pcard__chevron" aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M6.75 4.5L11.25 9L6.75 13.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <span className="visually-hidden">View case study</span>
    </Link>
  );
}

// Deterministic, seed-based placeholder pattern for projects without a real
// thumbnail image yet — so the grid never shows a broken image icon.
function ThumbPlaceholder({ seed }) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  const bars = Array.from({ length: 5 }, (_, i) => 20 + ((hash >> (i * 4)) % 60));

  return (
    <svg viewBox="0 0 200 120" className="pcard__thumb-placeholder">
      <rect width="200" height="120" fill="var(--color-accent-soft)" />
      {bars.map((h, i) => (
        <rect
          key={i}
          x={30 + i * 32}
          y={100 - h}
          width="18"
          height={h}
          rx="2"
          fill="var(--color-accent)"
          opacity={0.35 + i * 0.12}
        />
      ))}
    </svg>
  );
}
