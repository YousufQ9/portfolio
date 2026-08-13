import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { profile } from "../data/profile";
import "./Navbar.css";

// Top navigation bar, fixed to the top of every page.
// NavLink automatically adds an "active" class to whichever link matches
// the current URL, which the CSS uses to underline the current page.
const NAV_LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/experience", label: "Experience" },
  { to: "/projects", label: "Projects" },
  { to: "/certifications", label: "Certifications" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Add a subtle shadow/background once the page has scrolled a little,
  // so the nav reads clearly even over busy hero content.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever the route changes (handled by NavLink
  // clicks below) — simplest approach without adding a router-change effect.
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar__inner container">
        <NavLink to="/" className="navbar__brand" onClick={closeMenu}>
          <span className="navbar__brand-mark" aria-hidden="true">YQ</span>
          <span className="navbar__brand-name">{profile.shortName}</span>
        </NavLink>

        <nav className="navbar__links" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                "navbar__link" + (isActive ? " navbar__link--active" : "")
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <a href={profile.linkedin} target="_blank" rel="noreferrer" className="btn btn-secondary btn-small navbar__cta">
          Connect
        </a>

        <button
          className="navbar__toggle"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {menuOpen && (
        <nav className="navbar__mobile" aria-label="Mobile">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                "navbar__mobile-link" + (isActive ? " navbar__mobile-link--active" : "")
              }
              onClick={closeMenu}
            >
              {link.label}
            </NavLink>
          ))}
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="navbar__mobile-link">
            Connect on LinkedIn
          </a>
        </nav>
      )}
    </header>
  );
}
