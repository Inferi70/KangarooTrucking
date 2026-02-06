export default function About() {
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-black tracking-tight">About</h1>
      <p className="mt-4 text-zinc-600 dark:text-zinc-200 max-w-3xl">
        This is a placeholder page, meant to be here for later when the company grows we will expand and make this page avaible.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {[
          ["Reliability", "Clear ETAs and consistent execution."],
          ["Safety", "Securement and careful handling."],
          ["Communication", "Updates you can count on."],
        ].map(([t, d]) => (
          <div key={t} className="rounded-3xl border border-zinc-200 p-6 dark:border-zinc-700">
            <div className="font-semibold">{t}</div>
            <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-200">{d}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

