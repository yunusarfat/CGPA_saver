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

// export default function Study({ onExam }) {
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
//     }
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

//   const fileInput =
//     "block w-full text-sm text-slate-600 file:mr-3 file:rounded-lg file:border-0 file:bg-indigo-50 file:px-3 file:py-2 file:text-indigo-700";

//   return (
//     <div className="space-y-6">
//       <form onSubmit={generate} className="bg-white rounded-2xl shadow-sm p-4 space-y-4">
//         <div>
//           <label className="block text-sm font-medium text-slate-700 mb-1">
//             Photo of notes or slides
//           </label>
//           <input type="file" accept="image/*" onChange={onFile} className={fileInput} />
//           {preview && (
//             <img src={preview} alt="Your notes" className="mt-3 max-h-48 rounded-lg border" />
//           )}
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-slate-700 mb-1">
//             Or upload a document (PDF, DOCX, TXT)
//           </label>
//           <input
//             type="file"
//             accept=".pdf,.docx,.txt"
//             onChange={(e) => setDoc(e.target.files?.[0] || null)}
//             className={fileInput}
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-slate-700 mb-1">
//             Or paste your notes
//           </label>
//           <textarea
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//             rows={5}
//             placeholder="Paste lecture notes here..."
//             className="w-full rounded-xl border border-slate-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />
//         </div>

//         <div className="flex flex-wrap items-center gap-4">
//           <div className="flex rounded-xl border border-slate-300 overflow-hidden text-sm">
//             {[["en", "English"], ["bn", "বাংলা"]].map(([val, label]) => (
//               <button
//                 key={val}
//                 type="button"
//                 onClick={() => setLanguage(val)}
//                 className={`px-4 py-2 ${
//                   language === val ? "bg-indigo-600 text-white" : "bg-white text-slate-700"
//                 }`}
//               >
//                 {label}
//               </button>
//             ))}
//           </div>
//           <label className="text-sm text-slate-700 flex items-center gap-2">
//             Questions
//             <select
//               value={count}
//               onChange={(e) => setCount(Number(e.target.value))}
//               className="rounded-lg border border-slate-300 px-2 py-1"
//             >
//               {[3, 5, 8].map((n) => (
//                 <option key={n} value={n}>{n}</option>
//               ))}
//             </select>
//           </label>
//           <button
//             type="submit"
//             disabled={loading}
//             className="ml-auto rounded-xl bg-indigo-600 px-5 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
//           >
//             {loading ? "Working..." : "Generate"}
//           </button>
//         </div>
//       </form>

//       {error && (
//         <div role="alert" className="rounded-xl bg-red-100 text-red-700 px-4 py-3 text-sm">
//           {error}
//         </div>
//       )}

//       {loading && (
//         <div className="text-center text-sm text-slate-500 animate-pulse">
//           Reading your notes... this can take 10 to 30 seconds.
//         </div>
//       )}

//       {result && (
//         <section className="space-y-4">
//           <div className="bg-white rounded-2xl shadow-sm p-4">
//             <h2 className="text-lg font-semibold text-slate-800">{result.title}</h2>
//             <ul className="mt-2 list-disc pl-5 space-y-1 text-sm text-slate-700">
//               {result.summary.map((s, i) => (
//                 <li key={i}>{s}</li>
//               ))}
//             </ul>
//           </div>
//           <h3 className="text-sm font-semibold text-slate-600">
//             Practice questions (tap a card to see the answer)
//           </h3>
//           <div className="grid gap-4 sm:grid-cols-2">
//             {result.questions.map((item, i) => (
//               <FlipCard key={i} q={item.q} a={item.a} index={i} />
//             ))}
//           </div>
//           <button
//             type="button"
//             onClick={() => onExam(result.source_text, language)}
//             className="rounded-xl bg-emerald-600 px-5 py-2 text-sm font-medium text-white hover:bg-emerald-700"
//           >
//             Take an exam on these notes
//           </button>
//         </section>
//       )}
//     </div>
//   );
// }




import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

// Shrink the photo before upload: faster and cheaper for the model
async function resizeImage(file, max = 1024) {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, max / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d").drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  return new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.85));
}

function FlipCard({ q, a, index }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setFlipped((f) => !f)}
      className="flip w-full h-48 text-left group"
      aria-label={`Question ${index + 1}, click to flip`}
    >
      <div className={`flip-inner w-full h-full ${flipped ? "is-flipped" : ""}`}>
        <div className="flip-face absolute inset-0 rounded-2xl bg-white ring-1 ring-slate-200 shadow-md shadow-indigo-900/5 p-5 overflow-auto transition group-hover:shadow-xl group-hover:shadow-indigo-500/20 group-hover:ring-indigo-300">
          <span className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-indigo-700">
            Question {index + 1}
          </span>
          <p className="mt-3 text-sm font-medium leading-relaxed text-slate-800">{q}</p>
          <p className="absolute bottom-3 right-4 text-[11px] font-medium text-slate-400">tap to flip ↻</p>
        </div>
        <div className="flip-face flip-back rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-fuchsia-700 text-white shadow-xl shadow-indigo-500/30 p-5 overflow-auto">
          <span className="inline-flex items-center rounded-full bg-white/20 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-white">
            Answer
          </span>
          <p className="mt-3 text-sm leading-relaxed text-indigo-50">{a}</p>
        </div>
      </div>
    </button>
  );
}

export default function Study({ onExam }) {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [doc, setDoc] = useState(null);
  const [preview, setPreview] = useState(null);
  const [language, setLanguage] = useState("en");
  const [count, setCount] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  function onFile(e) {
    const f = e.target.files?.[0];
    setFile(f || null);
    setPreview(f ? URL.createObjectURL(f) : null);
  }

  async function generate(e) {
    e.preventDefault();
    if (loading) return;
    setError("");
    setResult(null);
    if (!file && !doc && !text.trim()) {
      setError("Add a photo, a document, or paste some text first.");
      return;
    }
    setLoading(true);
    try {
      const form = new FormData();
      form.append("text", text);
      form.append("language", language);
      form.append("count", String(count));
      if (file) form.append("image", await resizeImage(file), "notes.jpg");
      if (doc) form.append("document", doc);

      const res = await fetch(`${API_URL}/study`, { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Something went wrong.");
      setResult(data);
    } catch (err) {
      setError(err.message || "Network error. Is the backend running?");
    } finally {
      setLoading(false);
    }
  }

  const fileInput =
    "block w-full cursor-pointer rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-3 text-sm text-slate-600 transition hover:border-indigo-400 hover:bg-indigo-50/50 file:mr-3 file:cursor-pointer file:rounded-lg file:border-0 file:bg-gradient-to-r file:from-indigo-600 file:to-fuchsia-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:opacity-90";

  const labelCls = "mb-2 flex items-center gap-2 text-sm font-semibold text-slate-800";
  const badge =
    "flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-fuchsia-600 text-[11px] font-bold text-white";

  return (
    <div className="space-y-8">
      <form
        onSubmit={generate}
        className="overflow-hidden rounded-3xl bg-white shadow-xl shadow-indigo-900/10 ring-1 ring-slate-200"
      >
        {/* Form header strip */}
        <div className="relative overflow-hidden bg-gradient-to-r from-indigo-950 via-indigo-800 to-fuchsia-800 px-6 py-5 text-white">
          <div className="pointer-events-none absolute -right-10 -top-16 h-40 w-40 rounded-full bg-fuchsia-400/30 blur-3xl" />
          <h2 className="relative text-xl font-bold tracking-tight">🧠 Study Helper</h2>
          <p className="relative mt-1 text-sm text-indigo-100/90">
            Add your notes any way you like and get a summary plus flip-card questions.
          </p>
        </div>

        <div className="space-y-6 p-5 sm:p-6">
          <div>
            <label className={labelCls}>
              <span className={badge}>1</span> Photo of notes or slides
            </label>
            <input type="file" accept="image/*" onChange={onFile} className={fileInput} />
            {preview && (
              <img
                src={preview}
                alt="Your notes"
                className="mt-3 max-h-48 rounded-xl ring-1 ring-slate-200 shadow-md"
              />
            )}
          </div>

          <div>
            <label className={labelCls}>
              <span className={badge}>2</span> Or upload a document (PDF, DOCX, TXT)
            </label>
            <input
              type="file"
              accept=".pdf,.docx,.txt"
              onChange={(e) => setDoc(e.target.files?.[0] || null)}
              className={fileInput}
            />
          </div>

          <div>
            <label className={labelCls}>
              <span className={badge}>3</span> Or paste your notes
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={5}
              placeholder="Paste lecture notes here..."
              className="w-full rounded-xl border border-slate-300 bg-slate-50 p-3 text-sm transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/15"
            />
          </div>

          <div className="flex flex-wrap items-center gap-4 border-t border-slate-100 pt-5">
            <div className="flex overflow-hidden rounded-xl bg-slate-100 p-1 text-sm ring-1 ring-slate-200">
              {[["en", "English"], ["bn", "বাংলা"]].map(([val, label]) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setLanguage(val)}
                  className={`rounded-lg px-4 py-2 font-medium transition ${
                    language === val
                      ? "bg-white text-indigo-700 shadow-md"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
              Questions
              <select
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/15"
              >
                {[3, 5, 8].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </label>
            <button
              type="submit"
              disabled={loading}
              className="ml-auto rounded-xl bg-gradient-to-r from-indigo-600 to-fuchsia-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 disabled:translate-y-0 disabled:opacity-50 disabled:shadow-none"
            >
              {loading ? "Working..." : "✨ Generate"}
            </button>
          </div>
        </div>
      </form>

      {error && (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 shadow-sm"
        >
          <span>⚠️</span>
          <span>{error}</span>
        </div>
      )}

      {loading && (
        <div className="rounded-2xl bg-indigo-50 px-4 py-6 text-center text-sm font-medium text-indigo-700 ring-1 ring-indigo-100 animate-pulse">
          Reading your notes... this can take 10 to 30 seconds.
        </div>
      )}

      {result && (
        <section className="space-y-6">
          <div className="relative overflow-hidden rounded-3xl bg-white p-6 shadow-lg shadow-indigo-900/10 ring-1 ring-slate-200">
            <div className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-indigo-600 to-fuchsia-600" />
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600">Summary</p>
            <h2 className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl">{result.title}</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700 marker:text-fuchsia-500">
              {result.summary.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>

          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600">Flip cards</p>
              <h3 className="mt-1 text-lg font-bold text-slate-900">
                Practice questions
              </h3>
            </div>
            <span className="text-xs text-slate-500">Tap a card to see the answer</span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {result.questions.map((item, i) => (
              <FlipCard key={i} q={item.q} a={item.a} index={i} />
            ))}
          </div>

          <button
            type="button"
            onClick={() => onExam(result.source_text, language)}
            className="rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0"
          >
            📝 Take an exam on these notes →
          </button>
        </section>
      )}
    </div>
  );
}