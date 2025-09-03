import { useEffect } from "react";

export function useFavicon(href) {
  useEffect(() => {
    const favicon =
      document.querySelector("link[rel='icon']") ||
      document.createElement("link");
    favicon.rel = "icon";
    favicon.type = "image/png";
    favicon.href = href;
    if (!favicon.parentNode) {
      document.head.appendChild(favicon);
    }
  }, [href]);
}

export function useTitle(title) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}
