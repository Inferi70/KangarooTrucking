import { useState } from "react";

export default function Contact() {
  const [status, setStatus] = useState("idle");
  async function onSubmit(e) {
    e.preventDefault();
    setStatus("sending");

    const formEl = e.currentTarget;
    const form = new FormData(formEl);
    const payload = Object.fromEntries(form.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
      formEl?.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-black tracking-tight">Contact</h1>
      <p className="mt-4 max-w-3xl text-zinc-600 dark:text-zinc-200">
        Send pickup and delivery details and we will get back to you as soon as possible.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        {/* FORM */}
        <div className="rounded-3xl border border-zinc-200 p-6 dark:border-zinc-700">
          <form onSubmit={onSubmit} className="grid gap-4">
            <input
              name="name"
              required
              className="rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm dark:border-zinc-700 dark:bg-zinc-900"
              placeholder="Name"
            />
            <input
              name="email"
              type="email"
              required
              className="rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm dark:border-zinc-700 dark:bg-zinc-900"
              placeholder="Email"
            />
            <input
              name="phone"
              type="tel"
              required
              className="rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm dark:border-zinc-700 dark:bg-zinc-900"
              placeholder="Phone number"
            />
            <input
              name="subject"
              className="rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm dark:border-zinc-700 dark:bg-zinc-900"
              placeholder="Subject (optional)"
            />
            <textarea
              name="message"
              required
              rows="6"
              className="rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm dark:border-zinc-700 dark:bg-zinc-900"
              placeholder="Message"
            />

            <button
              type="submit"
              disabled={status === "sending"}
              className="rounded-xl bg-zinc-900 px-5 py-3 text-sm font-semibold text-white
                         hover:opacity-90 disabled:opacity-60 dark:bg-white dark:text-zinc-950"
            >
              {status === "sending" ? "Sending..." : "Send"}
            </button>

            {status === "sent" && (
              <p className="text-sm text-emerald-600">
                Message sent successfully. We will get back to you soon.
              </p>
            )}

            {status === "error" && (
              <p className="text-sm text-red-600">
                An error has occurred. Please try again.
              </p>
            )}
          </form>
        </div>

        {/* DISPATCH / INFO STACK */}
        <div className="space-y-4">
          <div className="rounded-3xl border border-zinc-200 p-6 dark:border-zinc-700">
            <div className="font-semibold">Contact</div>
            <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-200">
              Kangarootrucking777@gmail.com
            </div>
            <div className="text-sm text-zinc-600 dark:text-zinc-200">
              (385) 384-3502
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-200 p-6 dark:border-zinc-700">
            <div className="font-semibold">What to include</div>
            <ul className="mt-3 space-y-2 text-sm text-zinc-600 dark:text-zinc-200">
              <li>- Pickup address & delivery ZIP codes</li>
              <li>- Commodity and total weight (up to 50,000 pounds)</li>
              <li>- Pickup date and delivery deadline</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-zinc-200 p-6 dark:border-zinc-700">
            <div className="font-semibold">Hours</div>
            <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-200">
              Monday – Thursday: 8:00am – 5:00pm<br />
              Friday - Saturday: 8:00am - 4:00pm
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-200 p-6 dark:border-zinc-700">
            <div className="font-semibold">Notes</div>
            <ul className="mt-2 text-sm text-zinc-600 dark:text-zinc-200">
              <li>- Unloading can be handled through us, We will bring a forklift to unload with.</li>
              <li>- If you need us to unload the max we can do is 46,000 pounds.</li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
