// import { useState } from "react";

// const FEATURES = [
//   { icon: "🧠", title: "Study Helper", desc: "Notes → summary + flip-card questions in English or বাংলা.", action: "start" },
//   { icon: "📝", title: "Exam Mode", desc: "Turn any note into a timed practice exam.", action: "exam" },
//   { icon: "📚", title: "Notes Library", desc: "Browse and share notes from other IIUC students.", action: "library" },
//   { icon: "🗓️", title: "Study Planner", desc: "Plan your week and track what to revise next.", action: "planner" },
// ];

// const STATS = [
//   { value: "10k+", label: "Notes processed" },
//   { value: "2", label: "Languages" },
//   { value: "3", label: "Question levels" },
// ];

// const STEPS = [
//   { n: "01", t: "Upload or paste", d: "Photo of slides, a PDF, or raw text — anything works." },
//   { n: "02", t: "Pick your format", d: "Summary, flip cards, or a full exam in English or বাংলা." },
//   { n: "03", t: "Share & revise", d: "Save to the notes library and practice with your batch." },
// ];

// export default function Home({ onStart, onLibrary, onExam, onPlanner }) {
//   const [hovered, setHovered] = useState(null);

//   const handlers = {
//     start: onStart,
//     exam: onExam,
//     library: onLibrary,
//     planner: onPlanner,
//   };

//   return (
//     <div className="space-y-10 sm:space-y-14">
//       {/* HERO — Centered Card, max-w-5xl */}
//       <section className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950 via-indigo-800 to-fuchsia-800 px-6 py-12 sm:px-12 sm:py-20 text-white shadow-2xl shadow-indigo-900/40">
//         {/* Background Glows */}
//         <div className="pointer-events-none absolute -top-32 -right-24 h-96 w-96 rounded-full bg-fuchsia-400/30 blur-3xl" />
//         <div className="pointer-events-none absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-indigo-400/30 blur-3xl" />
//         <div className="pointer-events-none absolute inset-0 opacity-[0.06]"
//           style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)", backgroundSize: "22px 22px" }} />

//         {/* Grid Layout: Left Text / Right Cards */}
//         <div className="relative grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          
//           {/* LEFT: Title & Buttons */}
//           <div>
//             <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium ring-1 ring-white/25 backdrop-blur">
//               <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
//               Your campus copilot is ready
//             </span>
//             <h2 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight">
//               Study smarter,<br />
//               <span className="bg-gradient-to-r from-amber-200 via-pink-200 to-fuchsia-200 bg-clip-text text-transparent">
//                 not harder.
//               </span>
//             </h2>
//             <p className="mt-6 text-sm sm:text-base text-indigo-100/90 max-w-md">
//               Turn messy notes into clean summaries, flip-card questions and timed exams —
//               then share them with the whole IIUC community.
//             </p>

//             <div className="mt-8 flex flex-wrap gap-3">
//               <button
//                 onClick={onStart}
//                 className="group rounded-xl bg-white px-6 py-3 text-sm font-semibold text-indigo-800 shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0"
//               >
//                 Start with Study Helper
//                 <span className="ml-1 inline-block transition group-hover:translate-x-0.5">→</span>
//               </button>
//               <button
//                 onClick={onLibrary}
//                 className="rounded-xl bg-white/10 px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/30 backdrop-blur transition hover:bg-white/20"
//               >
//                 Browse Notes Library
//               </button>
//             </div>
//           </div>

//           {/* RIGHT: Floating Cards Mockup */}
//           <div className="relative hidden lg:block">
//             {/* Soft glow behind the cards */}
//             <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-white/20 to-white/0 blur-2xl" />
            
//             {/* Main Note Card */}
//             <div className="relative rotate-2 rounded-2xl bg-white/95 p-5 text-slate-800 shadow-2xl shadow-black/30 ring-1 ring-white/40 transition hover:rotate-0">
//               <div className="flex items-center justify-between text-[11px] font-medium text-slate-500">
//                 <span>📄 lecture-notes.pdf</span>
//                 <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-emerald-700">processed</span>
//               </div>
//               <h4 className="mt-3 text-sm font-semibold text-slate-800">Operating Systems — Week 7</h4>
//               <ul className="mt-2 space-y-1.5 text-xs text-slate-600">
//                 <li>• Scheduling: FCFS, SJF, Round Robin</li>
//                 <li>• Deadlock: 4 necessary conditions</li>
//                 <li>• Banker's algorithm walkthrough</li>
//               </ul>
//               <div className="mt-4 flex gap-2 text-[11px]">
//                 <span className="rounded-md bg-indigo-50 px-2 py-1 text-indigo-700">5 flip cards</span>
//                 <span className="rounded-md bg-fuchsia-50 px-2 py-1 text-fuchsia-700">Exam ready</span>
//               </div>
//             </div>

//             {/* Small Floating Card */}
//             <div className="absolute -bottom-8 -left-8 -rotate-3 rounded-xl bg-white/95 p-4 shadow-xl ring-1 ring-white/40 max-w-[200px]">
//               <p className="text-[11px] font-medium text-slate-500">Question 3</p>
//               <p className="text-xs font-semibold text-slate-800 mt-1">What are the 4 conditions for deadlock?</p>
//             </div>
//           </div>

//         </div>
//       </section>

//       {/* STATS — Centered, max-w-5xl */}
//       <section className="mx-auto max-w-5xl rounded-2xl bg-white/70 ring-1 ring-slate-200 shadow-sm backdrop-blur">
//         <div className="grid grid-cols-3 divide-x divide-slate-200">
//           {STATS.map((s) => (
//             <div key={s.label} className="p-5 sm:p-6 text-center">
//               <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-700 to-fuchsia-700 bg-clip-text text-transparent">
//                 {s.value}
//               </p>
//               <p className="mt-1 text-[11px] uppercase tracking-widest text-slate-500">{s.label}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* FEATURES — Centered, max-w-5xl */}
//       <section className="mx-auto max-w-5xl">
//         <div className="mb-6 flex items-end justify-between gap-4">
//           <div>
//             <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600">Everything in one place</p>
//             <h3 className="mt-1 text-2xl sm:text-3xl font-bold text-slate-900">Built for IIUC students</h3>
//           </div>
//           <span className="hidden sm:inline text-xs text-slate-500">4 tools · zero setup</span>
//         </div>

//         <div className="grid gap-4 sm:grid-cols-2">
//           {FEATURES.map((f) => (
//             <button
//               key={f.title}
//               onClick={handlers[f.action]}
//               onMouseEnter={() => setHovered(f.title)}
//               onMouseLeave={() => setHovered(null)}
//               className={`group relative overflow-hidden rounded-2xl p-6 text-left ring-1 transition-all duration-300 ${
//                 hovered === f.title
//                   ? "bg-gradient-to-br from-indigo-600 to-fuchsia-600 text-white ring-transparent shadow-2xl shadow-indigo-500/40 -translate-y-1"
//                   : "bg-white text-slate-800 ring-slate-200 shadow-sm hover:shadow-lg"
//               }`}
//             >
//               <span className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full bg-white/10 blur-2xl opacity-0 transition group-hover:opacity-100" />
//               <div className={`mb-3 flex h-12 w-12 items-center justify-center rounded-xl text-2xl transition ${
//                 hovered === f.title ? "bg-white/20" : "bg-indigo-50"
//               }`}>
//                 {f.icon}
//               </div>
//               <h3 className="font-semibold text-lg">{f.title}</h3>
//               <p className={`mt-1 text-sm ${hovered === f.title ? "text-indigo-100" : "text-slate-500"}`}>
//                 {f.desc}
//               </p>
//               <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium opacity-70 group-hover:opacity-100">
//                 Open <span className="transition group-hover:translate-x-0.5">→</span>
//               </span>
//             </button>
//           ))}
//         </div>
//       </section>

//       {/* HOW IT WORKS — Centered, max-w-5xl */}
//       <section className="mx-auto max-w-5xl rounded-3xl bg-slate-900 p-6 sm:p-8 text-white shadow-xl">
//         <div className="mb-6">
//           <p className="text-xs font-semibold uppercase tracking-widest text-indigo-300">How it works</p>
//           <h3 className="mt-1 text-2xl sm:text-3xl font-bold">From notes to mastery in 3 steps</h3>
//         </div>
//         <div className="grid gap-4 sm:grid-cols-3">
//           {STEPS.map((s) => (
//             <div key={s.n} className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10 transition hover:bg-white/10">
//               <p className="text-3xl font-bold bg-gradient-to-r from-amber-300 to-fuchsia-300 bg-clip-text text-transparent">
//                 {s.n}
//               </p>
//               <h4 className="mt-2 font-semibold">{s.t}</h4>
//               <p className="mt-1 text-sm text-slate-300">{s.d}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* PLANNER CTA BANNER — Redesigned to match exact request */}
//       <section className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900 to-fuchsia-900 p-6 sm:px-10 sm:py-8 text-white shadow-2xl shadow-indigo-900/30 relative">
//         {/* Decorative background glows */}
//         <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-fuchsia-500/20 blur-3xl" />
//         <div className="pointer-events-none absolute -left-10 -bottom-16 h-56 w-56 rounded-full bg-indigo-500/20 blur-3xl" />
        
//         {/* Flex container: Left text, Right button */}
//         <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-6">
//           <div>
//             <h3 className="text-xl sm:text-2xl font-bold tracking-tight">Plan your study week</h3>
//             <p className="text-sm text-indigo-100/80 mt-1 max-w-lg">
//               Set targets, track progress, and stay ahead of exams.
//             </p>
//           </div>
//           <div className="flex-shrink-0">
//             <button
//               onClick={onPlanner}
//               className="group inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-indigo-900 shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0"
//             >
//               Open Study Planner
//               <span className="transition group-hover:translate-x-1">→</span>
//             </button>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }


import { useState } from "react";

const FEATURES = [
  { icon: "🧠", title: "Study Helper", desc: "Notes → summary + flip-card questions in English or বাংলা.", action: "start" },
  { icon: "📝", title: "Exam Mode", desc: "Turn any note into a timed practice exam.", action: "exam" },
  { icon: "📚", title: "Notes Library", desc: "Browse and share notes from other IIUC students.", action: "library" },
  { icon: "🗓️", title: "Study Planner", desc: "Plan your week and track what to revise next.", action: "planner" },
];

const STATS = [
  { value: "10k+", label: "Notes processed" },
  { value: "2", label: "Languages" },
  { value: "3", label: "Question levels" },
];

const STEPS = [
  { n: "01", t: "Upload or paste", d: "Photo of slides, a PDF, or raw text — anything works." },
  { n: "02", t: "Pick your format", d: "Summary, flip cards, or a full exam in English or বাংলা." },
  { n: "03", t: "Share & revise", d: "Save to the notes library and practice with your batch." },
];

export default function Home({ onStart, onLibrary, onExam, onPlanner }) {
  const [hovered, setHovered] = useState(null);

  const handlers = {
    start: onStart,
    exam: onExam,
    library: onLibrary,
    planner: onPlanner,
  };

  return (
    <div className="relative left-1/2 w-screen -translate-x-1/2 space-y-10 px-4 sm:space-y-14 sm:px-8 lg:px-12">
      {/* HERO — wide, fills the screen */}
      <section className="relative w-full overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950 via-indigo-800 to-fuchsia-800 px-6 py-12 sm:px-12 sm:py-20 lg:px-16 lg:py-24 text-white shadow-2xl shadow-indigo-900/40">
        {/* Background Glows */}
        <div className="pointer-events-none absolute -top-32 -right-24 h-96 w-96 rounded-full bg-fuchsia-400/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-indigo-400/30 blur-3xl" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)", backgroundSize: "22px 22px" }}
        />

        {/* Grid Layout: Left Text / Right Cards */}
        <div className="relative grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* LEFT: Title & Buttons */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium ring-1 ring-white/25 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Your campus copilot is ready
            </span>
            <h2 className="mt-6 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] tracking-tight">
              Exam tomorrow?,<br />
              <span className="bg-gradient-to-r from-amber-200 via-pink-200 to-fuchsia-200 bg-clip-text text-transparent">
                We’ve got your notes.
              </span>
            </h2>
            <p className="mt-6 text-sm sm:text-base lg:text-lg text-indigo-100/90 max-w-xl">
              Missed the lecture? Didn’t get the notes before exam day? No problem. Grab your friends’ notes from the IIUC library, turn them into a quick summary in seconds, then test yourself with flip cards and a timed exam.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={onStart}
                className="group rounded-xl bg-white px-6 py-3 text-sm font-semibold text-indigo-800 shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0"
              >
                Start with Study Helper
                <span className="ml-1 inline-block transition group-hover:translate-x-0.5">→</span>
              </button>
              <button
                onClick={onLibrary}
                className="rounded-xl bg-white/10 px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/30 backdrop-blur transition hover:bg-white/20"
              >
                Browse Notes Library
              </button>
            </div>
          </div>

          {/* RIGHT: Floating Cards Mockup (unchanged) */}
          <div className="relative hidden lg:flex lg:justify-end">
            <div className="relative w-full max-w-md">
              {/* Soft glow behind the cards */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-white/20 to-white/0 blur-2xl" />

              {/* Main Note Card */}
              <div className="relative rotate-2 rounded-2xl bg-white/95 p-5 text-slate-800 shadow-2xl shadow-black/30 ring-1 ring-white/40 transition hover:rotate-0">
                <div className="flex items-center justify-between text-[11px] font-medium text-slate-500">
                  <span>📄 lecture-notes.pdf</span>
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-emerald-700">processed</span>
                </div>
                <h4 className="mt-3 text-sm font-semibold text-slate-800">Operating Systems — Week 7</h4>
                <ul className="mt-2 space-y-1.5 text-xs text-slate-600">
                  <li>• Scheduling: FCFS, SJF, Round Robin</li>
                  <li>• Deadlock: 4 necessary conditions</li>
                  <li>• Banker's algorithm walkthrough</li>
                </ul>
                <div className="mt-4 flex gap-2 text-[11px]">
                  <span className="rounded-md bg-indigo-50 px-2 py-1 text-indigo-700">5 flip cards</span>
                  <span className="rounded-md bg-fuchsia-50 px-2 py-1 text-fuchsia-700">Exam ready</span>
                </div>
              </div>

              {/* Small Floating Card */}
              <div className="absolute -bottom-8 -left-8 -rotate-3 rounded-xl bg-white/95 p-4 shadow-xl ring-1 ring-white/40 max-w-[200px]">
                <p className="text-[11px] font-medium text-slate-500">Question 3</p>
                <p className="text-xs font-semibold text-slate-800 mt-1">What are the 4 conditions for deadlock?</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="w-full rounded-2xl bg-white/70 ring-1 ring-slate-200 shadow-sm backdrop-blur">
        <div className="grid grid-cols-3 divide-x divide-slate-200">
          {STATS.map((s) => (
            <div key={s.label} className="p-5 sm:p-6 text-center">
              <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-700 to-fuchsia-700 bg-clip-text text-transparent">
                {s.value}
              </p>
              <p className="mt-1 text-[11px] uppercase tracking-widest text-slate-500">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="w-full">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600">Everything in one place</p>
            <h3 className="mt-1 text-2xl sm:text-3xl font-bold text-slate-900">Built for IIUC students</h3>
          </div>
          <span className="hidden sm:inline text-xs text-slate-500">4 tools · zero setup</span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <button
              key={f.title}
              onClick={handlers[f.action]}
              onMouseEnter={() => setHovered(f.title)}
              onMouseLeave={() => setHovered(null)}
              className={`group relative overflow-hidden rounded-2xl p-6 text-left ring-1 transition-all duration-300 ${
                hovered === f.title
                  ? "bg-gradient-to-br from-indigo-600 to-fuchsia-600 text-white ring-transparent shadow-2xl shadow-indigo-500/40 -translate-y-1"
                  : "bg-white text-slate-800 ring-slate-200 shadow-sm hover:shadow-lg"
              }`}
            >
              <span className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full bg-white/10 blur-2xl opacity-0 transition group-hover:opacity-100" />
              <div
                className={`mb-3 flex h-12 w-12 items-center justify-center rounded-xl text-2xl transition ${
                  hovered === f.title ? "bg-white/20" : "bg-indigo-50"
                }`}
              >
                {f.icon}
              </div>
              <h3 className="font-semibold text-lg">{f.title}</h3>
              <p className={`mt-1 text-sm ${hovered === f.title ? "text-indigo-100" : "text-slate-500"}`}>
                {f.desc}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium opacity-70 group-hover:opacity-100">
                Open <span className="transition group-hover:translate-x-0.5">→</span>
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="w-full rounded-3xl bg-slate-900 p-6 sm:p-8 lg:p-10 text-white shadow-xl">
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-300">How it works</p>
          <h3 className="mt-1 text-2xl sm:text-3xl font-bold">From notes to mastery in 3 steps</h3>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.n} className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10 transition hover:bg-white/10">
              <p className="text-3xl font-bold bg-gradient-to-r from-amber-300 to-fuchsia-300 bg-clip-text text-transparent">
                {s.n}
              </p>
              <h4 className="mt-2 font-semibold">{s.t}</h4>
              <p className="mt-1 text-sm text-slate-300">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PLANNER CTA BANNER */}
      <section className="relative w-full overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900 to-fuchsia-900 p-6 sm:px-10 sm:py-8 lg:px-14 text-white shadow-2xl shadow-indigo-900/30">
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-10 -bottom-16 h-56 w-56 rounded-full bg-indigo-500/20 blur-3xl" />

        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight">Plan your study week</h3>
            <p className="text-sm text-indigo-100/80 mt-1 max-w-lg">
              Set targets, track progress, and stay ahead of exams.
            </p>
          </div>
          <div className="flex-shrink-0">
            <button
              onClick={onPlanner}
              className="group inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-indigo-900 shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0"
            >
              Open Study Planner
              <span className="transition group-hover:translate-x-1">→</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}