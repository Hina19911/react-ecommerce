// src/pages/Locations.jsx
import { Link } from "react-router-dom";

function LocationCard({ name, address1, address2, phone, hours, mapSrc }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
      {/* Map */}
      <div className="aspect-[16/9] w-full">
        <iframe
          title={`${name} map`}
          src={mapSrc}
          className="h-full w-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      {/* Details */}
      <div className="p-5">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="mt-1 text-sm text-slate-600">
          {address1}
          <br />
          {address2}
        </p>

        <div className="mt-3 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
          <div>
            <div className="font-medium">Hours</div>
            <ul className="mt-1 space-y-0.5 text-slate-700">
              {hours.map((h) => (
                <li key={h.label}>
                  <span className="text-slate-500 w-20 inline-block">{h.label}</span>
                  {h.value}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="font-medium">Contact</div>
            <p className="mt-1 text-slate-700">
              <a className="hover:underline" href={`tel:${phone.replace(/\D/g, "")}`}>
                {phone}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Locations() {
  // demo data — replace with your real addresses
  const commonHours = [
    { label: "Mon–Fri:", value: "10:00 – 7:00" },
    { label: "Sat:", value: "11:00 – 6:00" },
    { label: "Sun:", value: "Closed" },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* Page header */}
      <div className="mb-6 rounded-xl bg-gradient-to-br via-purple-600 to-fuchsia-600 p-6 text-white">
        <h1 className="text-2xl font-bold">Our Locations</h1>
        <p className="text-white/90">Come say hi at one of our stores!</p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <LocationCard
          name="PhoneMart — Downtown"
          address1="123 Main Street"
          address2="Toronto, ON M5V 2T6"
          phone="(416) 555-0110"
          hours={commonHours}
          // Google Maps embed (no API key needed). You can change the q= address.
          mapSrc="https://www.google.com/maps?q=123%20Main%20Street%20Toronto&output=embed"
        />
        <LocationCard
          name="PhoneMart — North"
          address1="456 Maple Ave"
          address2="North York, ON M2N 5W1"
          phone="(416) 555-0147"
          hours={commonHours}
          mapSrc="https://www.google.com/maps?q=456%20Maple%20Ave%20North%20York&output=embed"
        />
      </div>

      {/* CTA */}
      <div className="mt-8 flex items-center justify-between rounded-xl border border-slate-200 bg-white p-5">
        <div>
          <div className="text-lg font-semibold">Need directions?</div>
          <p className="text-sm text-slate-600">
            Tap a map above or call us and we’ll guide you in.
          </p>
        </div>
        <Link
          to="/"
          className="rounded-md bg-fuchsia-500 px-4 py-2 text-sm font-medium text-white hover:bg-fuchsia-600"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
