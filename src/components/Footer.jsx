import { Link } from "react-router-dom";
import { profile } from "../data/profile";
import "./Footer.css";

// The site has no dedicated Contact page — this footer is the single,
// consistent "how to reach me" block that appears at the bottom of every
// page instead. Edit profile.js to change any of the links or text here.
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__top">
          <div className="site-footer__cta">
            <p className="eyebrow">Let's talk</p>
            <h2 className="site-footer__heading">
              Let's talk about your data.
            </h2>
            <div className="site-footer__actions">
              <a href={`mailto:${profile.email}`} className="btn btn-primary">
                Email me
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="btn btn-secondary">
                Connect on LinkedIn
              </a>
            </div>
          </div>

          <div className="site-footer__cols">
            <div className="site-footer__col">
              <p className="site-footer__col-title">Navigate</p>
              <Link to="/">Home</Link>
              <Link to="/experience">Experience</Link>
              <Link to="/projects">Projects</Link>
              <Link to="/certifications">Certifications</Link>
            </div>

            <div className="site-footer__col">
              <p className="site-footer__col-title">Connect</p>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
              <p className="site-footer__phone">Phone/WhatsApp: {profile.phone}</p>
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                {profile.linkedinLabel}
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer">
                {profile.githubLabel}
              </a>
              {profile.resumeAvailable && (
                <a href={`${import.meta.env.BASE_URL}${profile.resumeUrl}`} target="_blank" rel="noreferrer">
                  Download résumé
                </a>
              )}
            </div>

            <div className="site-footer__col">
              <p className="site-footer__col-title">Based in</p>
              <p className="site-footer__location">{profile.location}</p>
              <p className="site-footer__location site-footer__location--muted">{profile.openTo}</p>
            </div>
          </div>
        </div>

        <div className="site-footer__bottom">
          <p>© {year} {profile.name}. Deployed on GitHub Pages.</p>
        </div>
      </div>
    </footer>
  );
}
