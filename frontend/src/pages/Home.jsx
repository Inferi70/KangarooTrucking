import { Link } from "react-router-dom";
import heroImg from "../assets/TruckLoaded.jpg"

export default function Home() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pt-12 pb-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
              Freight you can trust - from pickup to delivery.
            </h1>

            <p className="text-lg text-zinc-600 dark:text-zinc-200">
                      Our mission is to provide reliable, efficient, and safe local trucking services for large deliveries. We are committed to serving our community with professionalism and integrity, ensuring every shipment arrives on time and in excellent condition. By combining dependable service with a customer-first approach, we aim to be the trusted partner businesses and individuals rely on for their Utah transportation needs.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                className="rounded-xl bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90 dark:bg-white dark:text-zinc-950"
                to="/contact"
              >
                Request a Quote
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 sm:grid-cols-3">
              {[
                ["Service", "Local in-state deliveries"],
                ["Equipment", "Flatbed · Forklift"],
                ["Updates", "Proactive ETAs"],
              ].map(([k, v]) => (
                <div key={k} className="rounded-2xl border border-zinc-200 p-4 dark:border-zinc-700">
                  <div className="text-xs text-zinc-500 dark:text-zinc-300">{k}</div>
                  <div className="font-semibold">{v}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            {/* Replace later with a real hero image */}
            <div className="aspect-[16/11] overflow-hidden rounded-3xl border border-zinc-200 dark:border-zinc-700">
              <img
                src={heroImg}
                alt="Kangaroo Trucking, truck on the road"
                className="h-full w-full object-cover"
              />
            </div>
          
            <div className="absolute -bottom-6 left-6 right-6 rounded-3xl border border-zinc-200 p-5 backdrop-blur dark:border-zinc-700 bg-white/60 dark:bg-zinc-900/60
">
              <p className="text-lg font-semibold text-center">We'll Hop To It</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-200 dark:border-zinc-700">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14">
          <h2 className="text-2xl font-black tracking-tight">Services</h2>
          <p className="mt-2 text-zinc-600 dark:text-zinc-200">
            Flexible capacity for recurring lanes and one-off shipments.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              ["Flatbed", "Large and irregular freight handled safely."],
            ].map(([title, desc]) => (
              <div key={title} className="rounded-3xl border border-zinc-200 p-6 dark:border-zinc-700">
                <div className="font-semibold">{title}</div>
                <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-200">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-200 dark:border-zinc-700">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-2xl font-black tracking-tight">Coverage</h2>
            <p className="mt-2 text-zinc-600 dark:text-zinc-200">
              We currently provide pickup and delivery services within Utah only.
For availability or special requests, please contact our dispatch team.
            </p>

            <div className="mt-6">
              <Link
                className="rounded-xl bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90 dark:bg-white dark:text-zinc-950"
                to="/contact"
              >
                Contact Dispatch
              </Link>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900">
            <iframe
              className="h-[420px] w-full"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3054.2118773058205!2d-111.75657682420427!3d40.04837237797689!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x874da41ba1d45507%3A0x58b71fdbe8fd493f!2s1237%20W%20400%20N%2C%20Payson%2C%20UT%2084651!5e0!3m2!1sen!2sus!4v1769132751784!5m2!1sen!2sus"
            />
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-200 dark:border-zinc-700">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14">
          <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-8 md:p-10 dark:border-zinc-700 dark:bg-zinc-900/40">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-xl font-black tracking-tight">Ready to move freight?</h3>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-200">
                  Fast response, clear pricing, reliable execution.
                </p>
              </div>
              <Link
                className="rounded-xl bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90 dark:bg-white dark:text-zinc-950"
                to="/contact"
              >
                Request a Quote
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

