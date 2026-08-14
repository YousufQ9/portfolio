// A single, tiny helper that every image/file path from src/data/*.js
// should pass through before being used in an <img src>, <a href>, etc.
//
// WHY THIS EXISTS: paths stored in the data files (thumbnails, screenshots,
// the résumé) are written as simple, absolute-looking paths from the
// public/ folder, e.g. "/images/projects/thing.jpg". That works fine in
// local development, but breaks on GitHub Pages — a project site is served
// from a sub-path like yousufq9.github.io/portfolio/, and a leading-slash
// path is resolved against the domain root instead, causing a 404.
//
// withBase() strips any leading slash off the stored path and prepends
// Vite's BASE_URL (which is "/" locally and "/portfolio/" — or whatever
// `base` is set to in vite.config.js — in production), so the same path
// works correctly in both places automatically.
//
// Usage: <img src={withBase(project.thumbnail)} />
export function withBase(path) {
  if (!path) return path;
  const base = import.meta.env.BASE_URL; // e.g. "/" or "/portfolio/"
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return `${base}${cleanPath}`;
}
