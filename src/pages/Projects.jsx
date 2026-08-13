import { useState, useMemo } from "react";
import Seo from "../components/Seo";
import ProjectCard from "../components/ProjectCard";
import { projects, categories } from "../data/projects";
import "./Projects.css";

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = useMemo(() => {
    if (activeCategory === "All") return projects;
    return projects.filter((p) => p.category.includes(activeCategory));
  }, [activeCategory]);

  return (
    <>
      <Seo
        title="Projects"
        description="A collection of applied data analytics projects spanning time series forecasting, machine learning, NLP, business intelligence dashboards, and database systems — each with a full case study."
      />

      <section className="section page-header">
        <div className="container">
          <p className="eyebrow">Portfolio</p>
          <h1>Projects</h1>
          <p className="page-header__sub">
            Eleven projects spanning coursework, an NDA industry practicum, and independent builds.
            Click any project to view the full case study — problem, data, methodology, findings, and results.
          </p>
        </div>
      </section>

      <section className="section-tight projects-filter-section">
        <div className="container">
          <div className="projects-filter" role="group" aria-label="Filter projects by category">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`projects-filter__btn ${activeCategory === cat ? "projects-filter__btn--active" : ""}`}
                onClick={() => setActiveCategory(cat)}
                aria-pressed={activeCategory === cat}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight projects-list-section">
        <div className="container">
          <div className="projects-list">
            {filtered.map((project) => (
              <ProjectCard project={project} key={project.slug} />
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="projects-empty">No projects in this category yet.</p>
          )}
        </div>
      </section>
    </>
  );
}
