import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Experience from "./pages/Experience";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Certifications from "./pages/Certifications";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";

// All routes are nested inside <Layout>, which renders the Navbar and
// Footer once and puts the matched page in the middle via <Outlet />.
//
// `basename={import.meta.env.BASE_URL}` is what makes this work correctly
// on GitHub Pages. When you build for a project site (e.g.
// username.github.io/portfolio/), Vite's BASE_URL becomes "/portfolio/"
// (set in vite.config.js), and React Router needs that same prefix so
// that internal links like <Link to="/projects"> resolve to
// "/portfolio/projects" instead of "/projects". Locally in development,
// BASE_URL is just "/", so nothing changes when running `npm run dev`.
export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="experience" element={<Experience />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:slug" element={<ProjectDetail />} />
          <Route path="certifications" element={<Certifications />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
