import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import { experience, earlierExperience } from "../data/experience";
import { education } from "../data/profile";
import "./Experience.css";
import { withBase } from "../utils/withBase";

export default function Experience() {
  return (
    <>
      <Seo
        title="Experience"
        description="Work history spanning industry analytics practicums, freelance data analysis, and engineering estimation - with the tools and outcomes for each role."
      />

      <section className="section page-header">
        <div className="container">
          <p className="eyebrow">Background</p>
          <h1>Experience</h1>
          <p className="page-header__sub">
            Applied analytics work across freelance projects, an industry practicum, and coursework - 
            building on four years in engineering estimation, where accuracy and checking assumptions weren't optional.
          </p>
        </div>
      </section>

      <section className="section-tight timeline-section">
        <div className="container">
          <div className="timeline">
            {experience.map((job) => (
              <article className="timeline__item" key={job.id}>
                <div className="timeline__marker" aria-hidden="true">
                  <span className="timeline__dot" />
                  <span className="timeline__line" />
                </div>

                <div className="timeline__content">
                  <div className="timeline__header">
                    <div>
                      <h2 className="timeline__role">{job.role}</h2>
                      <p className="timeline__org">
                        {job.organization}
                        {job.location && <span className="timeline__location"> · {job.location}</span>}
                      </p>
                    </div>
                    <div className="timeline__dates-wrap">
                      <span className="tag tag-neutral">{job.type}</span>
                      <p className="timeline__dates">{job.dates}</p>
                    </div>
                  </div>

                  <p className="timeline__summary">{job.summary}</p>

                  {job.highlights && job.highlights.length > 0 && (
                    <ul className="timeline__highlights">
                      {job.highlights.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  )}

                  {job.tools && job.tools.length > 0 && (
                    <div className="timeline__tools">
                      {job.tools.map((t) => (
                        <span className="tag" key={t}>{t}</span>
                      ))}
                    </div>
                  )}

                  {job.projectSlug && (
                    <Link to={`/projects/${job.projectSlug}`} className="timeline__project-link">
                      Read the full case study on this project →
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>

          {earlierExperience.length > 0 && (
            <div className="earlier-experience">
              <h3 className="earlier-experience__title">Earlier experience</h3>
              <div className="earlier-experience__list">
                {earlierExperience.map((job, i) => (
                  <div className="earlier-experience__item" key={i}>
                    <div>
                      <p className="earlier-experience__role">{job.role}</p>
                      <p className="earlier-experience__org">
                        {job.organization} {job.location && `· ${job.location}`}
                      </p>
                    </div>
                    <p className="earlier-experience__dates">{job.dates}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="section education-section">
        <div className="container">
          <div className="section-header">
            <p className="eyebrow">Education</p>
            <h2>Academic background</h2>
          </div>

          <div className="education-list">
            {education.map((ed) => (
              <div className="education-card card" key={ed.institution}>
                <div className="education-card__header">
                  <div>
                    <h3 className="education-card__degree">{ed.degree}</h3>
                    <p className="education-card__institution">{ed.institution}</p>
                    {ed.field && <p className="education-card__field">{ed.field}</p>}
                  </div>
                  <p className="education-card__dates">{ed.dates}</p>
                </div>

                {ed.detail && <p className="education-card__detail">{ed.detail}</p>}

                {(ed.degreeUrl || ed.transcriptUrl) && (
                  <div className="education-card__docs">
                    {ed.degreeUrl && (
                      <a href={withBase(ed.degreeUrl)} target="_blank" rel="noreferrer" className="btn btn-secondary btn-small">
                        View degree
                      </a>
                    )}
                    {ed.transcriptUrl && (
                      <a href={withBase(ed.transcriptUrl)} target="_blank" rel="noreferrer" className="btn btn-secondary btn-small">
                        View transcript
                      </a>
                    )}
                  </div>
                )}

                {ed.honors && ed.honors.length > 0 && (
                  <div className="education-card__honors">
                    {ed.honors.map((h) => (
                      <span className="tag tag-neutral" key={h}>{h}</span>
                    ))}
                  </div>
                )}

                {ed.coursework && ed.coursework.length > 0 && (
                  <div className="education-card__coursework">
                    <p className="education-card__coursework-label">Relevant coursework</p>
                    <p className="education-card__coursework-list">{ed.coursework.join(" · ")}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
