import { skillCategories } from "../data/profile";
import "./SkillsGrid.css";

// Renders skills grouped by category as a clean grid of labeled clusters,
// rather than a flat wall of logos. Edit the source data in
// src/data/profile.js — this component just renders whatever is there.
export default function SkillsGrid() {
  return (
    <div className="skills-grid">
      {skillCategories.map((group) => (
        <div className="skills-grid__group" key={group.category}>
          <h3 className="skills-grid__category">{group.category}</h3>
          <div className="skills-grid__pills">
            {group.skills.map((skill) => (
              <span className="skills-grid__pill" key={skill}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
