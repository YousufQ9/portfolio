import { useEffect } from "react";

// Lightweight, dependency-free SEO helper. Since this site is a static
// single-page app (no server-side rendering), we set the document title and
// meta description on the client after each page mounts. This is enough for
// browser tabs, bookmarks, and social shares that render the page — it does
// not help crawlers that don't execute JavaScript, but GitHub Pages has no
// server-side rendering option, so this is the standard approach for a
// Vite + React static site.
//
// Usage: <Seo title="Projects" description="..." /> at the top of any page.
export default function Seo({ title, description }) {
  useEffect(() => {
    const fullTitle = title ? `${title} — Mohammad Yousuf Qureshi` : "Mohammad Yousuf Qureshi — Data Analyst";
    document.title = fullTitle;

    const setMeta = (name, content, attr = "name") => {
      if (!content) return;
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    if (description) {
      setMeta("description", description);
      setMeta("og:description", description, "property");
    }
    setMeta("og:title", fullTitle, "property");
    setMeta("og:type", "website", "property");
  }, [title, description]);

  return null;
}
