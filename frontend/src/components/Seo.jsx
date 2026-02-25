import { useEffect } from "react";

function setMetaTag(attr, key, content) {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLinkTag(rel, href) {
  if (!href) return;
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export default function Seo({ title, description, canonical, robots, og }) {
  useEffect(() => {
    if (title) document.title = title;
    setMetaTag("name", "description", description);
    setMetaTag("name", "robots", robots);
    setLinkTag("canonical", canonical);

    if (og?.type) setMetaTag("property", "og:type", og.type);
    if (og?.title) setMetaTag("property", "og:title", og.title);
    if (og?.description) setMetaTag("property", "og:description", og.description);
    if (og?.url) setMetaTag("property", "og:url", og.url);
  }, [title, description, canonical, robots, og]);

  return null;
}
