import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { toggleTheme, isDark } from "../theme.js";
import logo from "../assets/Kangarootrucking.svg";

function NavItem({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        ["text-sm font-semibold hover:underline", isActive ? "underline" : ""].join(" ")
      }
      end
    >
      {children}
    </NavLink>
  );
}

export default function Layout({ children }) {
  const [dark, setDark] = useState(isDark());

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => setDark(isDark());

    // Run once in case something else changed the class before mount
    handler();

    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <div className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-900 dark:text-zinc-50">
      <header className="sticky top-0 z-20 border-b border-zinc-200 bg-white/70 backdrop-blur dark:border-zinc-700 dark:bg-zinc-900/70">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between">

            <Link to="/" className="flex items-center gap-3">
              <img src={logo} alt="Kangaroo Trucking Logo" className="h-15 w-20" />
              <div className="leading-tight">
                <div className="text-lg font-semibold">Kangaroo Trucking LLC</div>
                <div className="text-xs tracking-wide text-zinc-500 dark:text-zinc-300">
                  WE’LL HOP TO IT
                </div>
              </div>
            </Link>

            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Toggle dark mode"
                onClick={() => {
                  toggleTheme();
                  setDark(isDark());
                }}
                className="grid size-9 place-items-center rounded-xl border border-zinc-200 hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-900"
              >
                {dark ? (
                  // Sun icon
                  <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden="true">
                    <path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12ZM12 2v2m0 16v2m10-10h-2M4 12H2m15.07-7.07-1.41 1.41M7.34 16.66l-1.41 1.41m0-11.31 1.41 1.41m9.73 9.73 1.41 1.41" />
                  </svg>
                ) : (
                  // Moon icon
                  <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden="true">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
                  </svg>
                )}
              </button>

              <Link
                className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:opacity-90 dark:bg-white dark:text-zinc-950"
                to="/contact"
              >
                Request a Quote
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main>{children}</main>

      <footer className="border-t border-zinc-200 dark:border-zinc-700">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 text-sm text-zinc-600 dark:text-zinc-200">
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <div className="font-semibold text-zinc-900 dark:text-zinc-50">Kangaroo Trucking LLC</div>
              <div className="mt-2">Reliable freight solutions with clear communication and on-time delivery.</div>
            </div>

            <div>
              <div className="font-semibold text-zinc-900 dark:text-zinc-50">Services</div>
              <div className="mt-2">Flatbed</div>
            </div>

            <div>
              <div className="font-semibold text-zinc-900 dark:text-zinc-50">Contact</div>
              <div className="mt-2">KangarooTrucking777@gmail.com</div>
              <div>(385) 384-3502</div>
            </div>
          </div>

          <div className="mt-8 border-t border-zinc-200 pt-6 dark:border-zinc-700 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>© 2024 Kangaroo Trucking LLC</div>
            <div>USDOT · MC · Insurance available on request</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

