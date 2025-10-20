import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, Gift, Phone, Mail, Image as ImageIcon, Info, Heart, Send, ChevronDown } from "lucide-react";

// Simple utility
const cx = (...classes) => classes.filter(Boolean).join(" ");

// ======== CONFIG — EDIT THESE FIELDS ========
const COUPLE = {
  partnerA: "Bryce",
  partnerB: "Sadie",
};
const DATE = {
  // Use a real date/time in your timezone
  iso: "2026-05-23T16:30:00", // May 23, 2026 @ 4:30 PM
  display: ", May 23, 2026",
};
const VENUE = {
  name: "Powell Butte Community Center",
  address: "8404 SW Reif Rd Powell Butte, OR 97753",
  mapUrl: "https://maps.app.goo.gl/9DziAZfyJwu94P2f7",
};
const CONTACT = {
  email: "HarrisBryce01@gmail.com",
  phone: "541-662-2240",
};
const REGISTRIES = [
  { name: "Amazon", url: "https://www.amazon.com/hz/wishlist/ls/1UE1LOA1ZQVN9?ref_=wl_share", note: "Amazon Wishlist" },
  { name: "Target", url: "https://target.com", note: "Home & linens" },
  { name: "Venmo", url: "https://venmo.com/Bryce-Harris-27", note: "Honeymoon fund" },
];
const HOTEL_BLOCKS = [
  { name: "Garden Inn", distance: "0.8 mi", url: "#", code: "WED20" },
  { name: "Riverside Suites", distance: "1.3 mi", url: "#", code: "A&J2026" },
];
const SCHEDULE = [
  { time: "4:00 PM", title: "Guest Arrival", desc: "Find your seat, enjoy a welcome drink." },
  { time: "4:30 PM", title: "Ceremony", desc: "Our vows under the willow." },
  { time: "5:15 PM", title: "Cocktail Hour", desc: "Snacks, photos, & mingling." },
  { time: "6:30 PM", title: "Dinner", desc: "Family-style service." },
  { time: "8:00 PM", title: "Dancing", desc: "Bring your best moves." },
  { time: "10:30 PM", title: "Send-Off", desc: "Sparklers & farewell." },
];
const FAQS = [
  { q: "What should I wear?", a: "Garden party attire—pastels, florals, comfortable shoes for grass." },
  { q: "Is the ceremony outdoors?", a: "Yes. We’ll have shade and water stations. In case of rain, the barn is our backup." },
  { q: "Can I bring kids?", a: "We love your little ones, but this event is adults-only unless noted on your invitation." },
  { q: "Where do I park?", a: "Free on-site parking. Look for signs and attendants." },
];
// ===========================================

// Countdown hook
function useCountdown(targetIso) {
  const target = useMemo(() => new Date(targetIso).getTime(), [targetIso]);
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(target - now, 0);
  const s = Math.floor(diff / 1000);
  const days = Math.floor(s / 86400);
  const hours = Math.floor((s % 86400) / 3600);
  const minutes = Math.floor((s % 3600) / 60);
  const seconds = s % 60;
  return { days, hours, minutes, seconds, done: diff === 0 };
}

// Accordion
function AccordionItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border rounded-xl overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-4 text-left">
        <span className="font-medium">{question}</span>
        <ChevronDown className={cx("h-5 w-5 transition-transform", open && "rotate-180")} />
      </button>
      <div className={cx("grid transition-all", open ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}> 
        <div className="overflow-hidden">
          <p className="p-4 pt-0 text-slate-600">{answer}</p>
        </div>
      </div>
    </div>
  );
}

export default function WeddingSite() {
  const { days, hours, minutes, seconds } = useCountdown(DATE.iso);

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-rose-50 text-slate-800">
      {/* Nav */}
      <header className="sticky top-0 z-40 backdrop-blur border-b bg-white/70">
        <nav className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <a href="#home" className="font-semibold tracking-wide">{COUPLE.partnerA} & {COUPLE.partnerB}</a>
          <div className="hidden sm:flex gap-6 text-sm">
            <a href="#details" className="hover:text-rose-600">Details</a>
            <a href="#schedule" className="hover:text-rose-600">Schedule</a>
            <a href="#rsvp" className="hover:text-rose-600">RSVP</a>
            <a href="#registry" className="hover:text-rose-600">Registry</a>
            <a href="#faq" className="hover:text-rose-600">FAQ</a>
            <a href="#photos" className="hover:text-rose-600">Photos</a>
          </div>
          <a href="#rsvp" className="inline-flex items-center gap-2 rounded-2xl bg-rose-600 px-4 py-2 text-white text-sm shadow hover:bg-rose-700">
            <Send className="h-4 w-4" /> RSVP
          </a>
        </nav>
      </header>

      {/* Hero */}
      <section id="home" className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 [mask-image:radial-gradient(circle_at_center,white,transparent_70%)]">
          <img
            src="https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=2400&auto=format&fit=crop"
            alt="Flowers"
            className="h-full w-full object-cover opacity-30"
          />
        </div>
        <div className="mx-auto max-w-6xl px-4 py-24 md:py-32 text-center">
          <motion.h1 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl md:text-6xl font-serif tracking-tight">
            {COUPLE.partnerA} <span className="text-rose-600">&</span> {COUPLE.partnerB}
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-4 text-lg md:text-xl text-slate-600">
            {DATE.display} • {VENUE.name}
          </motion.p>
          {/* Countdown */}
          <div className="mt-10 flex items-center justify-center gap-4 md:gap-8">
            {[{label: 'Days', value: days}, {label: 'Hours', value: hours}, {label: 'Minutes', value: minutes}, {label: 'Seconds', value: seconds}].map((b) => (
              <div key={b.label} className="rounded-2xl bg-white/80 backdrop-blur px-5 py-4 shadow border min-w-[90px]">
                <div className="text-3xl md:text-4xl font-bold tabular-nums">{String(b.value).padStart(2, '0')}</div>
                <div className="text-xs uppercase tracking-wider text-slate-500">{b.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Details */}
      <section id="details" className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-rose-600" />
              <h3 className="font-semibold">When</h3>
            </div>
            <p className="mt-3 text-slate-600">{DATE.display}</p>
          </div>
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-rose-600" />
              <h3 className="font-semibold">Where</h3>
            </div>
            <p className="mt-3 text-slate-600">{VENUE.name}<br />{VENUE.address}</p>
            <a className="mt-4 inline-flex items-center gap-2 text-rose-700 hover:underline" href={VENUE.mapUrl} target="_blank" rel="noreferrer">
              View on Maps <MapPin className="h-4 w-4" />
            </a>
          </div>
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <Info className="h-5 w-5 text-rose-600" />
              <h3 className="font-semibold">Dress Code</h3>
            </div>
            <p className="mt-3 text-slate-600">Garden party attire. Ceremony outdoors; reception indoors.</p>
          </div>
        </div>

        {/* Hotels */}
        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-4">Hotel Blocks</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {HOTEL_BLOCKS.map((h) => (
              <div key={h.name} className="rounded-2xl border bg-white p-5 shadow-sm flex items-center justify-between">
                <div>
                  <div className="font-medium">{h.name}</div>
                  <div className="text-sm text-slate-500">{h.distance} away • Code: {h.code}</div>
                </div>
                <a href={h.url} className="rounded-xl border px-4 py-2 text-sm hover:bg-rose-50">Book</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section id="schedule" className="bg-white/70 border-y">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-serif mb-8 flex items-center gap-3"><Clock className="h-6 w-6 text-rose-600"/> Schedule</h2>
          <ol className="relative border-s pl-6">
            {SCHEDULE.map((item, i) => (
              <li key={i} className="mb-8 ms-6">
                <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-rose-600 text-white text-xs">{i+1}</span>
                <div className="rounded-2xl border bg-white p-5 shadow-sm">
                  <div className="font-semibold">{item.title} • {item.time}</div>
                  <p className="text-sm text-slate-600 mt-1">{item.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* RSVP */}
      <section id="rsvp" className="mx-auto max-w-3xl px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-serif mb-6 flex items-center gap-3"><Heart className="h-6 w-6 text-rose-600"/> RSVP</h2>
        <p className="text-slate-600 mb-6">Please RSVP by May 15, 2026. If you have any questions about dietary restrictions or accessibility, let us know.</p>
        {/* Simple no-backend form — connect to Formspree or Google Forms */}
        <form
          className="rounded-2xl border bg-white p-6 shadow-sm grid gap-4"
          action="https://formspree.io/f/your-form-id" // ← Replace with your form endpoint
          method="POST"
        >
          <input type="hidden" name="_subject" value="Wedding RSVP" />
          <div className="grid md:grid-cols-2 gap-4">
            <label className="grid gap-2 text-sm">
              <span>First & Last Name</span>
              <input name="name" required className="rounded-xl border px-3 py-2" placeholder="Taylor Smith" />
            </label>
            <label className="grid gap-2 text-sm">
              <span>Email</span>
              <input name="email" type="email" required className="rounded-xl border px-3 py-2" placeholder="you@email.com" />
            </label>
          </div>
          <label className="grid gap-2 text-sm">
            <span>Will you attend?</span>
            <select name="attendance" required className="rounded-xl border px-3 py-2">
              <option value="accept">Joyfully accepts</option>
              <option value="decline">Regretfully declines</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm">
            <span>Guests (including you)</span>
            <input name="guests" type="number" min="1" className="rounded-xl border px-3 py-2" placeholder="1" />
          </label>
          <label className="grid gap-2 text-sm">
            <span>Dietary Restrictions / Notes</span>
            <textarea name="notes" rows={4} className="rounded-xl border px-3 py-2" placeholder="Vegetarian, gluten-free, accessibility needs, etc." />
          </label>
          <button className="mt-2 inline-flex items-center gap-2 rounded-2xl bg-rose-600 px-5 py-2.5 text-white text-sm shadow hover:bg-rose-700">
            <Send className="h-4 w-4"/> Submit RSVP
          </button>
          <p className="text-xs text-slate-500">This form uses a third-party endpoint. Replace the action URL with your Formspree/Google Forms link.</p>
        </form>
      </section>

      {/* Registry */}
      <section id="registry" className="bg-white/70 border-y">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-serif mb-6 flex items-center gap-3"><Gift className="h-6 w-6 text-rose-600"/> Registry</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {REGISTRIES.map((r) => (
              <a key={r.name} href={r.url} className="rounded-2xl border bg-white p-5 shadow-sm hover:shadow-md transition">
                <div className="font-medium">{r.name}</div>
                <div className="text-sm text-slate-500">{r.note}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Photos / Gallery */}
      <section id="photos" className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-serif mb-6 flex items-center gap-3"><ImageIcon className="h-6 w-6 text-rose-600"/> Photos</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1529636127164-4003b512c4a8?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1522673607200-7f18f4d1d5e2?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1509579312009-48b3a4abf0ff?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=1200&auto=format&fit=crop",
          ].map((src, i) => (
            <img key={i} src={src} alt="Gallery" className="h-44 md:h-56 w-full object-cover rounded-xl border"/>
          ))}
        </div>
      </section>

      {/* Map */}
      <section className="bg-white/70 border-y">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-serif mb-6 flex items-center gap-3"><MapPin className="h-6 w-6 text-rose-600"/> Venue Map</h2>
          <div className="rounded-2xl border overflow-hidden shadow-sm">
            {/* Replace with your Google Maps embedded link */}
            <iframe
              title="Venue Map"
              src="https://maps.app.goo.gl/9DziAZfyJwu94P2f7"
              width="100%" height="360" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-4xl px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-serif mb-6 flex items-center gap-3"><Info className="h-6 w-6 text-rose-600"/> FAQ</h2>
        <div className="grid gap-3">
          {FAQS.map((f, idx) => <AccordionItem key={idx} question={f.q} answer={f.a} />)}
        </div>
      </section>

      {/* Contact */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-2xl md:text-3xl font-serif mb-3 flex items-center gap-3"><Info className="h-6 w-6 text-rose-600"/> Questions?</h2>
          <p className="text-slate-600">Reach out to us any time.</p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <a href={`mailto:${CONTACT.email}`} className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 hover:bg-rose-50"><Mail className="h-4 w-4"/>{CONTACT.email}</a>
            <a href={`tel:${CONTACT.phone}`} className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 hover:bg-rose-50"><Phone className="h-4 w-4"/>{CONTACT.phone}</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="mx-auto max-w-6xl px-4 py-8 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} {COUPLE.partnerA} & {COUPLE.partnerB}. All love reserved.
        </div>
      </footer>
    </div>
  );
}

