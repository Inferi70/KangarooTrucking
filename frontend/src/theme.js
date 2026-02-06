export function isDark() {
  return document.documentElement.classList.contains("dark");
}

export function initTheme() {
  const stored = localStorage.getItem("theme");
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const prefersDark = media.matches;

  if (stored === "dark" || stored === "light") {
    document.documentElement.classList.toggle("dark", stored === "dark");
  } else {
    document.documentElement.classList.toggle("dark", prefersDark);
    media.addEventListener("change", (e) => {
      if (!localStorage.getItem("theme")) {
        document.documentElement.classList.toggle("dark", e.matches);
      }
    });
  }
}

export function toggleTheme() {
  const next = isDark() ? "light" : "dark";
  document.documentElement.classList.toggle("dark", next === "dark");
  localStorage.setItem("theme", next);
}
