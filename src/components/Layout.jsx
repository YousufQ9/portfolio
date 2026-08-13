import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

// Every route in App.jsx is nested inside this Layout, so Navbar and Footer
// render once and stay consistent across the whole site. <Outlet /> is where
// React Router injects the current page's content.
export default function Layout() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
