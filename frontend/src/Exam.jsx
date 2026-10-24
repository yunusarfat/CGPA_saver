// import { useEffect, useState } from "react";

// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

// export default function Exam({ source, language }) {
//   const [exam, setExam] = useState(null);
//   const [answers, setAnswers] = useState({});
//   const [submitted, setSubmitted] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [left, setLeft] = useState(0);

//   async function start() {
//     setError(""); setExam(null); setAnswers({}); setSubmitted(false); setLoading(true);
//     try {
//       const res = await fetch(`${API_URL}/exam`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ text: source, language, count: 5 }),
//       });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.detail || "Something went wrong.");
//       setExam(data);
//       setLeft(data.questions.length * 60);
//     } catch (e) {
//       setError(e.message);
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     if (!exam || submitted) return;
//     if (left <= 0) { setSubmitted(true); return; }
//     const t = setTimeout(() => setLeft((l) => l - 1), 1000);
//     return () => clearTimeout(t);
//   }, [exam, submitted, left]);

//   if (!source) {
//     return (
//       <p className="bg-white rounded-2xl p-4 text-sm text-slate-600">
//         Generate study notes first (Study tab) or open a note in the Library, then choose "Take an exam".
//       </p>
//     );
//   }

//   const score = exam ? exam.questions.filter((q, i) => answers[i] === q.answer).length : 0;
//   const mm = String(Math.floor(left / 60)).padStart(2, "0");
//   const ss = String(left % 60).padStart(2, "0");

//   return (
//     <div className="space-y-4">
//       {!exam && (
//         <button onClick={start} disabled={loading}
//           className="rounded-xl bg-indigo-600 px-5 py-2 text-sm font-medium text-white disabled:opacity-50">
//           {loading ? "Building your exam..." : "Start exam (5 questions, 1 min each)"}
//         </button>
//       )}
//       {error && <div role="alert" className="rounded-xl bg-red-100 text-red-700 px-4 py-3 text-sm">{error}</div>}

//       {exam && (
//         <>
//           <div className="flex items-center justify-between bg-white rounded-2xl shadow-sm p-4">
//             <h2 className="font-semibold text-slate-800">{exam.title}</h2>
//             {submitted
//               ? <span className="text-sm font-semibold text-emerald-700">Score: {score} / {exam.questions.length}</span>
//               : <span className="text-sm font-mono text-slate-600">{mm}:{ss}</span>}
//           </div>

//           {exam.questions.map((q, i) => (
//             <div key={i} className="bg-white rounded-2xl shadow-sm p-4">
//               <p className="text-sm font-medium text-slate-800 mb-2">{i + 1}. {q.q}</p>
//               <div className="space-y-2">
//                 {q.options.map((o, j) => {
//                   const picked = answers[i] === j;
//                   let style = picked ? "border-indigo-500 bg-indigo-50" : "border-slate-200";
//                   if (submitted && j === q.answer) style = "border-emerald-500 bg-emerald-50";
//                   else if (submitted && picked) style = "border-red-500 bg-red-50";
//                   return (
//                     <button key={j} type="button" disabled={submitted}
//                       onClick={() => setAnswers((a) => ({ ...a, [i]: j }))}
//                       className={`w-full text-left rounded-xl border px-3 py-2 text-sm ${style}`}>
//                       {o}
//                     </button>
//                   );
//                 })}
//               </div>
//               {submitted && q.explanation && (
//                 <p className="mt-2 text-xs text-slate-500">{q.explanation}</p>
//               )}
//             </div>
//           ))}

//           {!submitted ? (
//             <button onClick={() => setSubmitted(true)}
//               className="rounded-xl bg-emerald-600 px-5 py-2 text-sm font-medium text-white">
//               Submit exam
//             </button>
//           ) : (
//             <button onClick={start}
//               className="rounded-xl bg-indigo-600 px-5 py-2 text-sm font-medium text-white">
//               Try a new exam
//             </button>
//           )}
//         </>
//       )}
//     </div>
//   );
// }




import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export default function Exam({ source, language }) {
  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [left, setLeft] = useState(0);

  async function start() {
    setError(""); setExam(null); setAnswers({}); setSubmitted(false); setLoading(true);
    try {
      const res = await fetch(`${API_URL}/exam`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: source, language, count: 5 }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Something went wrong.");
      setExam(data);
      setLeft(data.questions.length * 60);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!exam || submitted) return;
    if (left <= 0) { setSubmitted(true); return; }
    const t = setTimeout(() => setLeft((l) => l - 1), 1000);
    return () => clearTimeout(t);
  }, [exam, submitted, left]);

  if (!source) {
    return (
      <div className="flex items-start gap-3 rounded-2xl bg-white p-5 text-sm text-slate-600 shadow-lg shadow-indigo-900/10 ring-1 ring-slate-200">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-xl">📝</span>
        <p className="leading-relaxed">
          Generate study notes first (Study tab) or open a note in the Library, then choose "Take an exam".
        </p>
      </div>
    );
  }

  const score = exam ? exam.questions.filter((q, i) => answers[i] === q.answer).length : 0;
  const mm = String(Math.floor(left / 60)).padStart(2, "0");
  const ss = String(left % 60).padStart(2, "0");

  return (
    <div className="space-y-5">
      {!exam && (
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950 via-indigo-800 to-fuchsia-800 p-8 text-white shadow-2xl shadow-indigo-900/30 sm:p-10">
          <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-fuchsia-400/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-indigo-400/30 blur-3xl" />
          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium ring-1 ring-white/25 backdrop-blur">
              ⏱️ Timed practice
            </span>
            <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">Ready to test yourself?</h2>
            <p className="mt-2 max-w-md text-sm text-indigo-100/90">
              Multiple choice questions built from your notes, with a countdown and instant results.
            </p>
            <button onClick={start} disabled={loading}
              className="mt-6 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-indigo-800 shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 disabled:translate-y-0 disabled:opacity-50">
              {loading ? "Building your exam..." : "Start exam (5 questions, 1 min each) →"}
            </button>
          </div>
        </div>
      )}
      {error && (
        <div role="alert" className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 shadow-sm">
          <span>⚠️</span>
          <span>{error}</span>
        </div>
      )}

      {exam && (
        <>
          <div className="sticky top-2 z-10 flex items-center justify-between rounded-2xl bg-gradient-to-r from-indigo-900 to-fuchsia-900 px-5 py-4 text-white shadow-xl shadow-indigo-900/30 ring-1 ring-white/10">
            <h2 className="text-base font-bold tracking-tight sm:text-lg">{exam.title}</h2>
            {submitted
              ? <span className="rounded-full bg-emerald-400/20 px-4 py-1.5 text-sm font-bold text-emerald-200 ring-1 ring-emerald-300/40">Score: {score} / {exam.questions.length}</span>
              : <span className="rounded-full bg-white/15 px-4 py-1.5 font-mono text-base font-bold tracking-wider text-white ring-1 ring-white/30">⏱ {mm}:{ss}</span>}
          </div>

          {exam.questions.map((q, i) => (
            <div key={i} className="rounded-2xl bg-white p-5 shadow-md shadow-indigo-900/5 ring-1 ring-slate-200">
              <p className="mb-4 flex gap-3 text-sm font-semibold leading-relaxed text-slate-900 sm:text-base">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-fuchsia-600 text-xs font-bold text-white">{i + 1}</span>
                <span>{q.q}</span>
              </p>
              <div className="space-y-2.5">
                {q.options.map((o, j) => {
                  const picked = answers[i] === j;
                  let style = picked
                    ? "border-indigo-500 bg-indigo-50 text-indigo-900 ring-2 ring-indigo-500/20"
                    : "border-slate-200 bg-white text-slate-700 hover:border-indigo-300 hover:bg-slate-50";
                  if (submitted && j === q.answer) style = "border-emerald-500 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-500/20";
                  else if (submitted && picked) style = "border-red-500 bg-red-50 text-red-900 ring-2 ring-red-500/20";
                  return (
                    <button key={j} type="button" disabled={submitted}
                      onClick={() => setAnswers((a) => ({ ...a, [i]: j }))}
                      className={`w-full rounded-xl border px-4 py-3 text-left text-sm font-medium transition ${style}`}>
                      {o}
                    </button>
                  );
                })}
              </div>
              {submitted && q.explanation && (
                <p className="mt-4 rounded-xl bg-slate-50 px-4 py-3 text-xs leading-relaxed text-slate-600 ring-1 ring-slate-200">
                  💡 {q.explanation}
                </p>
              )}
            </div>
          ))}

          {!submitted ? (
            <button onClick={() => setSubmitted(true)}
              className="rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0">
              Submit exam ✓
            </button>
          ) : (
            <button onClick={start}
              className="rounded-xl bg-gradient-to-r from-indigo-600 to-fuchsia-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0">
              Try a new exam ↻
            </button>
          )}
        </>
      )}
    </div>
  );
}