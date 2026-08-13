import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// React Router does not reset scroll position between page navigations by
// default (unlike a traditional multi-page site). Without this, clicking
// from Home to Projects would leave the user scrolled halfway down the
// new page. This component renders nothing — it just watches the URL and
// scrolls to the top whenever the path changes.
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
