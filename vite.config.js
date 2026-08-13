import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// ============================================================================
// VITE CONFIG
// ----------------------------------------------------------------------------
// The `base` option below is the single most important setting for
// deploying correctly to GitHub Pages.
//
// GitHub Pages serves a normal project repository (not a custom domain) at:
//   https://<your-username>.github.io/<your-repo-name>/
//
// That means every asset URL (JS, CSS, images) needs to be prefixed with
// "/<your-repo-name>/" or the browser will look for them at the domain
// root and get 404s — this is the #1 cause of a blank white page after
// deploying a Vite app to GitHub Pages.
//
// ACTION REQUIRED: replace "portfolio" below with your actual GitHub
// repository name (exactly as it appears in the repo URL), for example:
//   base: "/yousuf-portfolio/"
//
// If you ever set up a custom domain (e.g. via a CNAME file) instead of
// using the github.io/<repo> URL, change this back to base: "/".
// ============================================================================
export default defineConfig({
  plugins: [react()],
  base: "/portfolio/",
});
