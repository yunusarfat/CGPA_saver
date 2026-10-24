// import { useState } from "react";

// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

// // Shrink the photo before upload: faster and cheaper for the model
// async function resizeImage(file, max = 1024) {
//   const bitmap = await createImageBitmap(file);
//   const scale = Math.min(1, max / Math.max(bitmap.width, bitmap.height));
//   const canvas = document.createElement("canvas");
//   canvas.width = Math.round(bitmap.width * scale);
//   canvas.height = Math.round(bitmap.height * scale);
//   canvas.getContext("2d").drawImage(bitmap, 0, 0, canvas.width, canvas.height);
//   return new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.85));
// }

// function FlipCard({ q, a, index }) {
//   const [flipped, setFlipped] = useState(false);
//   return (
//     <button
//       type="button"
//       onClick={() => setFlipped((f) => !f)}
//       className="flip w-full h-44 text-left"
//       aria-label={`Question ${index + 1}, click to flip`}
//     >
//       <div className={`flip-inner w-full h-full ${flipped ? "is-flipped" : ""}`}>
//         <div className="flip-face absolute inset-0 rounded-2xl bg-white border border-slate-200 shadow-sm p-4 overflow-auto">
//           <p className="text-xs font-semibold text-indigo-600 mb-1">Question {index + 1}</p>
//           <p className="text-sm text-slate-800">{q}</p>
//           <p className="absolute bottom-2 right-3 text-xs text-slate-400">tap to flip</p>
//         </div>
//         <div className="flip-face flip-back rounded-2xl bg-indigo-600 text-white shadow-sm p-4 overflow-auto">
//           <p className="text-xs font-semibold text-indigo-200 mb-1">Answer</p>
//           <p className="text-sm">{a}</p>
//         </div>
//       </div>
//     </button>
//   );
// }

// export default function App() {
//   const [text, setText] = useState("");
//   const [file, setFile] = useState(null);
//   const [doc, setDoc] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [language, setLanguage] = useState("en");
//   const [count, setCount] = useState(5);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [result, setResult] = useState(null);

//   function onFile(e) {
//     const f = e.target.files?.[0];
//     setFile(f || null);
//     setPreview(f ? URL.createObjectURL(f) : null);
//   }

//   async function generate(e) {
//     e.preventDefault();
//     if (loading) return;
//     setError("");
//     setResult(null);
//     if (!file && !doc && !text.trim()) {
//       setError("Add a photo, a document, or paste some text first.");
//       return;
// }
//     setLoading(true);
//     try {
//       const form = new FormData();
//       form.append("text", text);
//       form.append("language", language);
//       form.append("count", String(count));
//       if (file) form.append("image", await resizeImage(file), "notes.jpg");
//       if (doc) form.append("document", doc);

//       const res = await fetch(`${API_URL}/study`, { method: "POST", body: form });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.detail || "Something went wrong.");
//       setResult(data);
//     } catch (err) {
//       setError(err.message || "Network error. Is the backend running?");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="min-h-screen bg-slate-100">
//       <header className="bg-indigo-600 text-white">
//         <div className="max-w-3xl mx-auto px-4 py-5">
//           <h1 className="text-xl font-semibold">IIUC Campus Copilot</h1>
//           <p className="text-sm text-indigo-100">
//             Study Helper: turn your notes into a summary and practice questions
//           </p>
//         </div>
//       </header>

//       <main className="max-w-3xl mx-auto px-4 py-6 space-y-6">
//         <form onSubmit={generate} className="bg-white rounded-2xl shadow-sm p-4 space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-slate-700 mb-1">
//               Photo of notes or slides
//             </label>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={onFile}
//               className="block w-full text-sm text-slate-600 file:mr-3 file:rounded-lg file:border-0 file:bg-indigo-50 file:px-3 file:py-2 file:text-indigo-700"
//             />
//             {preview && (
//               <img src={preview} alt="Your notes" className="mt-3 max-h-48 rounded-lg border" />
//             )}
//           </div>
//              <div>
//   <label className="block text-sm font-medium text-slate-700 mb-1">
//     Or upload a document (PDF, DOCX, TXT)
//   </label>
//   <input
//     type="file"
//     accept=".pdf,.docx,.txt"
//     onChange={(e) => setDoc(e.target.files?.[0] || null)}
//     className="block w-full text-sm text-slate-600 file:mr-3 file:rounded-lg file:border-0 file:bg-indigo-50 file:px-3 file:py-2 file:text-indigo-700"
//   />
// </div>
//           <div>
//             <label className="block text-sm font-medium text-slate-700 mb-1">
//               Or paste your notes
//             </label>
//             <textarea
//               value={text}
//               onChange={(e) => setText(e.target.value)}
//               rows={5}
//               placeholder="Paste lecture notes here..."
//               className="w-full rounded-xl border border-slate-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             />
//           </div>

//           <div className="flex flex-wrap items-center gap-4">
//             <div className="flex rounded-xl border border-slate-300 overflow-hidden text-sm">
//               {[["en", "English"], ["bn", "বাংলা"]].map(([val, label]) => (
//                 <button
//                   key={val}
//                   type="button"
//                   onClick={() => setLanguage(val)}
//                   className={`px-4 py-2 ${
//                     language === val ? "bg-indigo-600 text-white" : "bg-white text-slate-700"
//                   }`}
//                 >
//                   {label}
//                 </button>
//               ))}
//             </div>
//             <label className="text-sm text-slate-700 flex items-center gap-2">
//               Questions
//               <select
//                 value={count}
//                 onChange={(e) => setCount(Number(e.target.value))}
//                 className="rounded-lg border border-slate-300 px-2 py-1"
//               >
//                 {[3, 5, 8].map((n) => (
//                   <option key={n} value={n}>{n}</option>
//                 ))}
//               </select>
//             </label>
//             <button
//               type="submit"
//               disabled={loading}
//               className="ml-auto rounded-xl bg-indigo-600 px-5 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
//             >
//               {loading ? "Working..." : "Generate"}
//             </button>
//           </div>
//         </form>

//         {error && (
//           <div role="alert" className="rounded-xl bg-red-100 text-red-700 px-4 py-3 text-sm">
//             {error}
//           </div>
//         )}

//         {loading && (
//           <div className="text-center text-sm text-slate-500 animate-pulse">
//             Reading your notes... this can take 10 to 30 seconds.
//           </div>
//         )}

//         {result && (
//           <section className="space-y-4">
//             <div className="bg-white rounded-2xl shadow-sm p-4">
//               <h2 className="text-lg font-semibold text-slate-800">{result.title}</h2>
//               <ul className="mt-2 list-disc pl-5 space-y-1 text-sm text-slate-700">
//                 {result.summary.map((s, i) => (
//                   <li key={i}>{s}</li>
//                 ))}
//               </ul>
//             </div>
//             <h3 className="text-sm font-semibold text-slate-600">
//               Practice questions (tap a card to see the answer)
//             </h3>
//             <div className="grid gap-4 sm:grid-cols-2">
//               {result.questions.map((item, i) => (
//                 <FlipCard key={i} q={item.q} a={item.a} index={i} />
//               ))}
//             </div>
//           </section>
//         )}
//       </main>
//     </div>
//   );
// }


// import { useState } from "react";
// import Study from "./Study";
// import Exam from "./Exam";
// import Library from "./Library";
// import Home from "./Home";

// export default function App() {
//   const [tab, setTab] = useState("home");
//   const [exam, setExam] = useState({ source: "", language: "en" });

//   function goExam(source, language) {
//     setExam({ source, language });
//     setTab("exam");
//   }

//   const tabs = [
//     ["home", "Home"],
//     ["study", "Study Helper"],
//     ["exam", "Exam"],
//     ["library", "Notes Library"],
//   ];

//   return (
//     <div className="min-h-screen bg-slate-100">
//       <header className="bg-indigo-600 text-white">
//         <div className="max-w-3xl mx-auto px-4 pt-5">
//           <h1 className="text-xl font-semibold">IIUC Campus Copilot</h1>
//           <p className="text-sm text-indigo-100">Notes to summary, exams and a shared notes library</p>
//           <nav className="flex gap-1 mt-4">
//             {tabs.map(([id, label]) => (
//               <button key={id} onClick={() => setTab(id)}
//                 className={`px-4 py-2 text-sm rounded-t-lg ${
//                   tab === id ? "bg-slate-100 text-indigo-700 font-medium" : "text-indigo-100 hover:bg-indigo-500"
//                 }`}>
//                 {label}
//               </button>
//             ))}
//           </nav>
//         </div>
//       </header>
//       <main className="max-w-3xl mx-auto px-4 py-6">
//         {/* HOME PAGE: write or edit your home design here */}
//         {tab === "home" && (
//           <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
//             <h2 className="text-2xl font-semibold text-slate-800">Welcome to IIUC Campus Copilot</h2>
//             <p className="text-sm text-slate-600">
//               Turn your notes into a summary, practice questions and exams. Share notes with other students.
//             </p>
//             <button onClick={() => setTab("study")}
//               className="rounded-xl bg-indigo-600 px-5 py-2 text-sm font-medium text-white">
//               Start with Study Helper
//             </button>
//             <button onClick={() => setTab("library")}
//               className="ml-2 rounded-xl bg-slate-200 px-5 py-2 text-sm font-medium text-slate-800">
//               Browse Notes Library
//             </button>
//           </div>
//         )}
//         {tab === "study" && <Study onExam={goExam} />}
//         {tab === "exam" && <Exam source={exam.source} language={exam.language} />}
//         {tab === "library" && <Library onExam={goExam} />}
//       </main>
//     </div>
//   );
// }



import { useState } from "react";
import Study from "./Study";
import Exam from "./Exam";
import Library from "./Library";
import Home from "./Home";

export default function App() {
  const [tab, setTab] = useState("home");
  const [exam, setExam] = useState({ source: "", language: "en" });

  function goExam(source, language) {
    setExam({ source, language });
    setTab("exam");
  }

  const tabs = [
    ["home", "Home"],
    ["study", "Study Helper"],
    ["exam", "Exam"],
    ["library", "Notes Library"],
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-slate-50 to-indigo-50/60">
      <header className="sticky top-0 z-20 overflow-hidden border-b border-white/10 bg-gradient-to-r from-indigo-950 via-indigo-800 to-fuchsia-800 text-white shadow-xl shadow-indigo-950/40 backdrop-blur">
  {/* Decorative glows + dot pattern */}
  <div className="pointer-events-none absolute -left-20 -top-24 h-56 w-56 rounded-full bg-indigo-400/30 blur-3xl" />
  <div className="pointer-events-none absolute -right-16 -top-24 h-56 w-56 rounded-full bg-fuchsia-400/30 blur-3xl" />
  <div
    className="pointer-events-none absolute inset-0 opacity-[0.06]"
    style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)", backgroundSize: "20px 20px" }}
  />

  <div className="relative flex w-full flex-col gap-3 px-4 py-3 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-12 lg:py-4">
    {/* LEFT: Brand */}
    <div className="flex items-center gap-3">
      <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-300 via-pink-300 to-fuchsia-400 text-xl shadow-lg shadow-fuchsia-900/40 ring-1 ring-white/40">
        🎓
        <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-indigo-900 animate-pulse" />
      </div>
      <div className="leading-tight">
        <h1 className="text-lg font-bold tracking-tight sm:text-xl">
          CGPA{" "}
          <span className="bg-gradient-to-r from-amber-200 via-pink-200 to-fuchsia-200 bg-clip-text text-transparent">
           Saver 
          </span>
        </h1>
        <p className="hidden text-xs text-indigo-100/80 sm:block">
          Notes to summary, exams and a shared notes library
        </p>
      </div>
    </div>

    {/* RIGHT: Navigation */}
    <nav className="-mx-1 flex gap-1 overflow-x-auto rounded-full bg-white/10 p-1 ring-1 ring-white/20 backdrop-blur lg:mx-0 lg:overflow-visible">
      {tabs.map(([id, label]) => (
        <button
          key={id}
          onClick={() => setTab(id)}
          className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition ${
            tab === id
              ? "bg-white text-indigo-800 shadow-md shadow-black/20"
              : "text-indigo-100 hover:bg-white/15 hover:text-white"
          }`}
        >
          {label}
        </button>
      ))}
    </nav>
  </div>
</header>
      <main className="max-w-3xl mx-auto px-4 py-6">
        {/* HOME PAGE: design lives in Home.jsx */}
        {tab === "home" && (
          <Home
            onStart={() => setTab("study")}
            onLibrary={() => setTab("library")}
            onExam={() => goExam("", "en")}
            onPlanner={() => setTab("study")}
          />
        )}
        {tab === "study" && <Study onExam={goExam} />}
        {tab === "exam" && <Exam source={exam.source} language={exam.language} />}
        {tab === "library" && <Library onExam={goExam} />}
      </main>
    </div>
  );
}