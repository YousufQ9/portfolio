import { useParams, Link, Navigate } from "react-router-dom";
import Seo from "../components/Seo";
import { projects } from "../data/projects";
import "./ProjectDetail.css";

// This page renders at /projects/:slug — e.g. /projects/lufthansa-reddit-signals.
// It looks up the matching project from src/data/projects.js by slug and
// renders every section that has content, skipping any that are null/empty
// (so a lighter project never shows an empty "Data Cleaning" heading).
export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  // If someone visits a slug that doesn't exist (typo, old link, etc.),
  // send them back to the projects list rather than showing a dead page.
  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  const hasLinks =
    project.links && (project.links.github || project.links.dashboard || project.links.report || project.links.dataset);
  const hasScreenshots = project.screenshots && project.screenshots.length > 0;

  return (
    <>
      <Seo title={project.title} description={project.shortDescription} />

      <article className="project-detail">
        <header className="project-detail__header">
          <div className="container">
            <Link to="/projects" className="project-detail__back">
              ← All projects
            </Link>

            <div className="project-detail__tags">
              {project.category.map((c) => (
                <span className="tag" key={c}>{c}</span>
              ))}
            </div>

            <h1 className="project-detail__title">{project.title}</h1>
            <p className="project-detail__desc">{project.shortDescription}</p>

            {project.context && (
              <p className="project-detail__context">
                {project.context} {project.period && `· ${project.period}`}
              </p>
            )}

            <div className="project-detail__tools">
              {project.tools.map((t) => (
                <span className="tag tag-neutral" key={t}>{t}</span>
              ))}
            </div>

            {hasLinks && (
              <div className="project-detail__links">
                {project.links.github && (
                  <a href={project.links.github} target="_blank" rel="noreferrer" className="btn btn-primary btn-small">
                    View on GitHub
                  </a>
                )}
                {project.links.dashboard && (
                  <a href={project.links.dashboard} target="_blank" rel="noreferrer" className="btn btn-secondary btn-small">
                    View live dashboard
                  </a>
                )}
                {project.links.report && (
                  <a href={project.links.report} target="_blank" rel="noreferrer" className="btn btn-secondary btn-small">
                    View report
                  </a>
                )}
                {project.links.dataset && project.links.dataset.startsWith("http") && (
                  <a href={project.links.dataset} target="_blank" rel="noreferrer" className="btn btn-secondary btn-small">
                    View dataset
                  </a>
                )}
                {project.links.dataset && !project.links.dataset.startsWith("http") && (
                  <span className="tag tag-neutral">Dataset: {project.links.dataset}</span>
                )}
              </div>
            )}
          </div>
        </header>

        {project.thumbnail && (
          <div className="project-detail__hero-image">
            <div className="container">
              <img src={project.thumbnail} alt={`${project.title} preview`} />
            </div>
          </div>
        )}

        <div className="container project-detail__body">
          <Section title="The problem">
            <p>{project.problem}</p>
          </Section>

          {project.data && (
            <Section title="The data">
              <dl className="project-detail__data-grid">
                {project.data.source && (
                  <>
                    <dt>Source</dt>
                    <dd>{project.data.source}</dd>
                  </>
                )}
                {project.data.size && (
                  <>
                    <dt>Size</dt>
                    <dd>{project.data.size}</dd>
                  </>
                )}
                {project.data.variables && project.data.variables.length > 0 && (
                  <>
                    <dt>Key variables</dt>
                    <dd>
                      <ul className="project-detail__list">
                        {project.data.variables.map((v) => (
                          <li key={v}>{v}</li>
                        ))}
                      </ul>
                    </dd>
                  </>
                )}
                {project.data.limitations && (
                  <>
                    <dt>Limitations</dt>
                    <dd>{project.data.limitations}</dd>
                  </>
                )}
              </dl>
            </Section>
          )}

          {project.methodology && project.methodology.length > 0 && (
            <Section title="Methodology">
              <ol className="project-detail__methodology">
                {project.methodology.map((step, i) => (
                  <li key={i}>
                    <span className="project-detail__methodology-index">{String(i + 1).padStart(2, "0")}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </Section>
          )}

          {project.dataCleaning && (
            <Section title="Data cleaning">
              <p>{project.dataCleaning}</p>
            </Section>
          )}

          {project.analysis && project.analysis.length > 0 && (
            <Section title="Analysis">
              {project.analysis.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </Section>
          )}

          {hasScreenshots && (
            <Section title="Dashboard & report">
              <div className="project-detail__screenshots">
                {project.screenshots.map((shot, i) => (
                  <figure className="project-detail__screenshot" key={i}>
                    <img src={shot.src} alt={shot.caption || `${project.title} screenshot ${i + 1}`} loading="lazy" />
                    {shot.caption && <figcaption>{shot.caption}</figcaption>}
                  </figure>
                ))}
              </div>
            </Section>
          )}

          {project.findings && project.findings.length > 0 && (
            <Section title="Key findings">
              <ul className="project-detail__findings">
                {project.findings.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </Section>
          )}

          {project.recommendations && project.recommendations.length > 0 && (
            <Section title="Recommendations">
              <ul className="project-detail__findings">
                {project.recommendations.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </Section>
          )}

          {project.results && (
            <Section title="Results & impact">
              <p className="project-detail__results">{project.results}</p>
            </Section>
          )}

          <div className="project-detail__footer-nav">
            <Link to="/projects" className="btn btn-secondary">
              ← Back to all projects
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}

function Section({ title, children }) {
  return (
    <section className="project-detail__section">
      <h2 className="project-detail__section-title">{title}</h2>
      {children}
    </section>
  );
}
