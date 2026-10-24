// // import { useEffect, useState } from "react";

// // const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

// // export default function Library({ onExam }) {
// //   const [notes, setNotes] = useState([]);
// //   const [q, setQ] = useState("");
// //   const [open, setOpen] = useState(null);
// //   const [form, setForm] = useState({ title: "", course: "", author: "", text: "" });
// //   const [doc, setDoc] = useState(null);
// //   const [msg, setMsg] = useState("");

// //   async function load(query = q) {
// //     try {
// //       const res = await fetch(`${API_URL}/notes?q=${encodeURIComponent(query)}`);
// //       setNotes(await res.json());
// //     } catch { setMsg("Cannot reach the backend."); }
// //   }
// //   useEffect(() => { load(""); }, []);

// //   async function openNote(id) {
// //     const res = await fetch(`${API_URL}/notes/${id}`);
// //     setOpen(await res.json());
// //   }

// //   async function upload(e) {
// //     e.preventDefault();
// //     setMsg("");
// //     if (!form.title.trim()) return setMsg("Add a title.");
// //     const body = new FormData();
// //     Object.entries(form).forEach(([k, v]) => body.append(k, v));
// //     if (doc) body.append("document", doc);
// //     const res = await fetch(`${API_URL}/notes`, { method: "POST", body });
// //     const data = await res.json();
// //     if (!res.ok) return setMsg(data.detail || "Upload failed.");
// //     setForm({ title: "", course: "", author: "", text: "" });
// //     setDoc(null);
// //     setMsg("Uploaded!");
// //     load("");
// //   }

// //   const input = "w-full rounded-xl border border-slate-300 px-3 py-2 text-sm";

// //   if (open) {
// //     return (
// //       <div className="bg-white rounded-2xl shadow-sm p-4 space-y-3">
// //         <button onClick={() => setOpen(null)} className="text-sm text-indigo-600">← Back</button>
// //         <h2 className="text-lg font-semibold">{open.title}</h2>
// //         <p className="text-xs text-slate-500">{open.course} · by {open.author}</p>
// //         <p className="text-sm text-slate-700 whitespace-pre-wrap max-h-96 overflow-auto">{open.content}</p>
// //         <button onClick={() => onExam(open.content, "en")}
// //           className="rounded-xl bg-emerald-600 px-5 py-2 text-sm font-medium text-white">
// //           Quiz me on this
// //         </button>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="space-y-4">
// //       <form onSubmit={upload} className="bg-white rounded-2xl shadow-sm p-4 space-y-3">
// //         <h2 className="font-semibold text-slate-800">Share your notes</h2>
// //         <input className={input} placeholder="Title (e.g. Photosynthesis)" value={form.title}
// //           onChange={(e) => setForm({ ...form, title: e.target.value })} />
// //         <div className="flex gap-2">
// //           <input className={input} placeholder="Course (e.g. BIO 101)" value={form.course}
// //             onChange={(e) => setForm({ ...form, course: e.target.value })} />
// //           <input className={input} placeholder="Your name (optional)" value={form.author}
// //             onChange={(e) => setForm({ ...form, author: e.target.value })} />
// //         </div>
// //         <textarea className={input} rows={3} placeholder="Paste notes..." value={form.text}
// //           onChange={(e) => setForm({ ...form, text: e.target.value })} />
// //         <input type="file" accept=".pdf,.docx,.txt" onChange={(e) => setDoc(e.target.files?.[0] || null)}
// //           className="block w-full text-sm text-slate-600" />
// //         <p className="text-xs text-slate-500">Demo only: do not upload personal or private information.</p>
// //         <button className="rounded-xl bg-indigo-600 px-5 py-2 text-sm font-medium text-white">Upload</button>
// //         {msg && <p className="text-sm text-slate-600">{msg}</p>}
// //       </form>

// //       <input className={input} placeholder="Search notes..." value={q}
// //         onChange={(e) => { setQ(e.target.value); load(e.target.value); }} />

// //       <div className="space-y-3">
// //         {notes.length === 0 && <p className="text-sm text-slate-500">No notes yet. Be the first to share.</p>}
// //         {notes.map((n) => (
// //           <button key={n.id} onClick={() => openNote(n.id)}
// //             className="block w-full text-left bg-white rounded-2xl shadow-sm p-4">
// //             <p className="font-medium text-slate-800">{n.title}</p>
// //             <p className="text-xs text-slate-500">{n.course} · by {n.author}</p>
// //             <p className="text-sm text-slate-600 mt-1 line-clamp-2">{n.snippet}</p>
// //           </button>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }




// import { useEffect, useState } from "react";

// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

// function loadSaved() {
//   try {
//     return JSON.parse(localStorage.getItem("auth") || "null");
//   } catch {
//     return null;
//   }
// }

// export default function Library({ onExam }) {
//   const [auth, setAuth] = useState(loadSaved()); // { token, user }
//   const [mode, setMode] = useState("login");
//   const [acct, setAcct] = useState({ class_id: "", name: "", email: "", password: "" });
//   const [notes, setNotes] = useState([]);
//   const [q, setQ] = useState("");
//   const [open, setOpen] = useState(null);
//   const [form, setForm] = useState({ title: "", course: "", text: "" });
//   const [doc, setDoc] = useState(null);
//   const [msg, setMsg] = useState("");

//   const input = "w-full rounded-xl border border-slate-300 px-3 py-2 text-sm";
//   const headers = auth ? { Authorization: `Bearer ${auth.token}` } : {};

//   function saveAuth(a) {
//     setAuth(a);
//     try {
//       a ? localStorage.setItem("auth", JSON.stringify(a)) : localStorage.removeItem("auth");
//     } catch {}
//   }

//   async function load(query = q) {
//     try {
//       const res = await fetch(`${API_URL}/notes?q=${encodeURIComponent(query)}`);
//       setNotes(await res.json());
//     } catch {
//       setMsg("Cannot reach the backend.");
//     }
//   }
//   useEffect(() => {
//     load("");
//   }, []);

//   async function submitAuth(e) {
//     e.preventDefault();
//     setMsg("");
//     const body =
//       mode === "signup" ? acct : { email: acct.email, password: acct.password };
//     try {
//       const res = await fetch(`${API_URL}/${mode}`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(body),
//       });
//       const data = await res.json();
//       if (!res.ok) return setMsg(data.detail || "Failed.");
//       saveAuth({ token: data.token, user: data.user });
//       setAcct({ class_id: "", name: "", email: "", password: "" });
//     } catch {
//       setMsg("Cannot reach the backend.");
//     }
//   }

//   async function openNote(id) {
//     const res = await fetch(`${API_URL}/notes/${id}`);
//     setOpen(await res.json());
//   }

//   async function upload(e) {
//     e.preventDefault();
//     setMsg("");
//     if (!form.title.trim()) return setMsg("Add a title.");
//     const body = new FormData();
//     Object.entries(form).forEach(([k, v]) => body.append(k, v));
//     if (doc) body.append("document", doc);
//     const res = await fetch(`${API_URL}/notes`, { method: "POST", headers, body });
//     const data = await res.json();
//     if (res.status === 401) {
//       saveAuth(null);
//       return setMsg(data.detail);
//     }
//     if (!res.ok) return setMsg(data.detail || "Upload failed.");
//     setForm({ title: "", course: "", text: "" });
//     setDoc(null);
//     setMsg("Uploaded!");
//     load("");
//   }

//   async function remove(id) {
//     if (!window.confirm("Delete this note?")) return;
//     const res = await fetch(`${API_URL}/notes/${id}`, { method: "DELETE", headers });
//     const data = await res.json();
//     if (!res.ok) return setMsg(data.detail || "Delete failed.");
//     setOpen(null);
//     setMsg("Deleted.");
//     load("");
//   }

//   const mine = (ownerId) => auth && auth.user.id === ownerId;

//   if (open) {
//     return (
//       <div className="bg-white rounded-2xl shadow-sm p-4 space-y-3">
//         <button onClick={() => setOpen(null)} className="text-sm text-indigo-600">
//           ← Back
//         </button>
//         <h2 className="text-lg font-semibold">{open.title}</h2>
//         <p className="text-xs text-slate-500">
//           {open.course} · by {open.author}
//         </p>
//         <p className="text-sm text-slate-700 whitespace-pre-wrap max-h-96 overflow-auto">
//           {open.content}
//         </p>
//         <div className="flex gap-2">
//           <button
//             onClick={() => onExam(open.content, "en")}
//             className="rounded-xl bg-emerald-600 px-5 py-2 text-sm font-medium text-white"
//           >
//             Quiz me on this
//           </button>
//           {mine(open.owner_id) && (
//             <button
//               onClick={() => remove(open.id)}
//               className="rounded-xl bg-red-600 px-5 py-2 text-sm font-medium text-white"
//             >
//               Delete my note
//             </button>
//           )}
//         </div>
//         {msg && <p className="text-sm text-slate-600">{msg}</p>}
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-4">
//       {!auth ? (
//         <form onSubmit={submitAuth} className="bg-white rounded-2xl shadow-sm p-4 space-y-3">
//           <div className="flex gap-2 text-sm">
//             {[["login", "Log in"], ["signup", "Register"]].map(([id, label]) => (
//               <button
//                 key={id}
//                 type="button"
//                 onClick={() => { setMode(id); setMsg(""); }}
//                 className={`px-4 py-2 rounded-xl ${
//                   mode === id ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-700"
//                 }`}
//               >
//                 {label}
//               </button>
//             ))}
//           </div>
//           {mode === "signup" && (
//             <>
//               <input className={input} placeholder="Class ID" value={acct.class_id}
//                 onChange={(e) => setAcct({ ...acct, class_id: e.target.value })} />
//               <input className={input} placeholder="Full name" value={acct.name}
//                 onChange={(e) => setAcct({ ...acct, name: e.target.value })} />
//             </>
//           )}
//           <input className={input} type="email" placeholder="Email" value={acct.email}
//             onChange={(e) => setAcct({ ...acct, email: e.target.value })} />
//           <input className={input} type="password" placeholder="Password (min 6)" value={acct.password}
//             onChange={(e) => setAcct({ ...acct, password: e.target.value })} />
//           <button className="rounded-xl bg-indigo-600 px-5 py-2 text-sm font-medium text-white">
//             {mode === "signup" ? "Register" : "Log in"}
//           </button>
//           <p className="text-xs text-slate-500">
//             Log in to upload notes. Reading, searching and exams are open to everyone.
//           </p>
//           {msg && <p className="text-sm text-red-600">{msg}</p>}
//         </form>
//       ) : (
//         <>
//           <div className="flex items-center justify-between bg-white rounded-2xl shadow-sm p-4 text-sm">
//             <span>
//               Hi, <b>{auth.user.name}</b> ({auth.user.class_id})
//             </span>
//             <button onClick={() => saveAuth(null)} className="text-indigo-600">
//               Log out
//             </button>
//           </div>

//           <form onSubmit={upload} className="bg-white rounded-2xl shadow-sm p-4 space-y-3">
//             <h2 className="font-semibold text-slate-800">Share your notes</h2>
//             <input className={input} placeholder="Title (e.g. Photosynthesis)" value={form.title}
//               onChange={(e) => setForm({ ...form, title: e.target.value })} />
//             <input className={input} placeholder="Course (e.g. BIO 101)" value={form.course}
//               onChange={(e) => setForm({ ...form, course: e.target.value })} />
//             <textarea className={input} rows={3} placeholder="Paste notes..." value={form.text}
//               onChange={(e) => setForm({ ...form, text: e.target.value })} />
//             <input type="file" accept=".pdf,.docx,.txt"
//               onChange={(e) => setDoc(e.target.files?.[0] || null)}
//               className="block w-full text-sm text-slate-600" />
//             <p className="text-xs text-slate-500">
//               Demo only: do not upload personal or private information.
//             </p>
//             <button className="rounded-xl bg-indigo-600 px-5 py-2 text-sm font-medium text-white">
//               Upload
//             </button>
//             {msg && <p className="text-sm text-slate-600">{msg}</p>}
//           </form>
//         </>
//       )}

//       <input className={input} placeholder="Search notes..." value={q}
//         onChange={(e) => { setQ(e.target.value); load(e.target.value); }} />

//       <div className="space-y-3">
//         {notes.length === 0 && (
//           <p className="text-sm text-slate-500">No notes yet. Be the first to share.</p>
//         )}
//         {notes.map((n) => (
//           <div key={n.id} className="bg-white rounded-2xl shadow-sm p-4 flex gap-3">
//             <button onClick={() => openNote(n.id)} className="flex-1 text-left">
//               <p className="font-medium text-slate-800">{n.title}</p>
//               <p className="text-xs text-slate-500">{n.course} · by {n.author}</p>
//               <p className="text-sm text-slate-600 mt-1 line-clamp-2">{n.snippet}</p>
//             </button>
//             {mine(n.owner_id) && (
//               <button onClick={() => remove(n.id)} className="text-xs text-red-600 self-start">
//                 Delete
//               </button>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }





import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "https://cgpa-saver.onrender.com";

function loadSaved() {
  try {
    return JSON.parse(localStorage.getItem("auth") || "null");
  } catch {
    return null;
  }
}

export default function Library({ onExam }) {
  const [auth, setAuth] = useState(loadSaved()); // { token, user }
  const [mode, setMode] = useState("login");
  const [acct, setAcct] = useState({ class_id: "", name: "", email: "", password: "" });
  const [notes, setNotes] = useState([]);
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(null);
  const [form, setForm] = useState({ title: "", course: "", text: "" });
  const [doc, setDoc] = useState(null);
  const [msg, setMsg] = useState("");

  const input =
    "w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/15";
  const card = "rounded-3xl bg-white p-5 shadow-xl shadow-indigo-900/10 ring-1 ring-slate-200 sm:p-6";
  const primaryBtn =
    "rounded-xl bg-gradient-to-r from-indigo-600 to-fuchsia-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0";
  const headers = auth ? { Authorization: `Bearer ${auth.token}` } : {};

  function saveAuth(a) {
    setAuth(a);
    try {
      a ? localStorage.setItem("auth", JSON.stringify(a)) : localStorage.removeItem("auth");
    } catch {}
  }

  async function load(query = q) {
    try {
      const res = await fetch(`${API_URL}/notes?q=${encodeURIComponent(query)}`);
      setNotes(await res.json());
    } catch {
      setMsg("Cannot reach the backend.");
    }
  }
  useEffect(() => {
    load("");
  }, []);

  async function submitAuth(e) {
    e.preventDefault();
    setMsg("");
    const body =
      mode === "signup" ? acct : { email: acct.email, password: acct.password };
    try {
      const res = await fetch(`${API_URL}/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) return setMsg(data.detail || "Failed.");
      saveAuth({ token: data.token, user: data.user });
      setAcct({ class_id: "", name: "", email: "", password: "" });
    } catch {
      setMsg("Cannot reach the backend.");
    }
  }

  async function openNote(id) {
    const res = await fetch(`${API_URL}/notes/${id}`);
    setOpen(await res.json());
  }

  async function upload(e) {
    e.preventDefault();
    setMsg("");
    if (!form.title.trim()) return setMsg("Add a title.");
    const body = new FormData();
    Object.entries(form).forEach(([k, v]) => body.append(k, v));
    if (doc) body.append("document", doc);
    const res = await fetch(`${API_URL}/notes`, { method: "POST", headers, body });
    const data = await res.json();
    if (res.status === 401) {
      saveAuth(null);
      return setMsg(data.detail);
    }
    if (!res.ok) return setMsg(data.detail || "Upload failed.");
    setForm({ title: "", course: "", text: "" });
    setDoc(null);
    setMsg("Uploaded!");
    load("");
  }

  async function remove(id) {
    if (!window.confirm("Delete this note?")) return;
    const res = await fetch(`${API_URL}/notes/${id}`, { method: "DELETE", headers });
    const data = await res.json();
    if (!res.ok) return setMsg(data.detail || "Delete failed.");
    setOpen(null);
    setMsg("Deleted.");
    load("");
  }

  const mine = (ownerId) => auth && auth.user.id === ownerId;

  if (open) {
    return (
      <div className="relative space-y-4 overflow-hidden rounded-3xl bg-white p-6 shadow-xl shadow-indigo-900/10 ring-1 ring-slate-200 sm:p-8">
        <div className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-indigo-600 to-fuchsia-600" />
        <button
          onClick={() => setOpen(null)}
          className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-4 py-1.5 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-100"
        >
          ← Back
        </button>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">{open.title}</h2>
        <p className="flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded-full bg-fuchsia-50 px-3 py-1 font-semibold text-fuchsia-700">{open.course}</span>
          <span className="text-slate-500">by {open.author}</span>
        </p>
        <p className="max-h-96 overflow-auto whitespace-pre-wrap rounded-2xl bg-slate-50 p-4 text-sm leading-relaxed text-slate-700 ring-1 ring-slate-200">
          {open.content}
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => onExam(open.content, "en")}
            className="rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0"
          >
            📝 Quiz me on this
          </button>
          {mine(open.owner_id) && (
            <button
              onClick={() => remove(open.id)}
              className="rounded-xl bg-gradient-to-r from-rose-500 to-red-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-red-500/30 transition hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0"
            >
              🗑 Delete my note
            </button>
          )}
        </div>
        {msg && <p className="text-sm font-medium text-slate-600">{msg}</p>}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {!auth ? (
        <form onSubmit={submitAuth} className="overflow-hidden rounded-3xl bg-white shadow-xl shadow-indigo-900/10 ring-1 ring-slate-200">
          <div className="relative overflow-hidden bg-gradient-to-r from-indigo-950 via-indigo-800 to-fuchsia-800 px-6 py-5 text-white">
            <div className="pointer-events-none absolute -right-10 -top-16 h-40 w-40 rounded-full bg-fuchsia-400/30 blur-3xl" />
            <h2 className="relative text-xl font-bold tracking-tight">📚 Notes Library</h2>
            <p className="relative mt-1 text-sm text-indigo-100/90">
              Log in to share your notes with the IIUC community.
            </p>
          </div>

          <div className="space-y-4 p-5 sm:p-6">
            <div className="flex w-fit gap-1 rounded-xl bg-slate-100 p-1 text-sm ring-1 ring-slate-200">
              {[["login", "Log in"], ["signup", "Register"]].map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => { setMode(id); setMsg(""); }}
                  className={`rounded-lg px-5 py-2 font-medium transition ${
                    mode === id
                      ? "bg-white text-indigo-700 shadow-md"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            {mode === "signup" && (
              <>
                <input className={input} placeholder="Class ID" value={acct.class_id}
                  onChange={(e) => setAcct({ ...acct, class_id: e.target.value })} />
                <input className={input} placeholder="Full name" value={acct.name}
                  onChange={(e) => setAcct({ ...acct, name: e.target.value })} />
              </>
            )}
            <input className={input} type="email" placeholder="Email" value={acct.email}
              onChange={(e) => setAcct({ ...acct, email: e.target.value })} />
            <input className={input} type="password" placeholder="Password (min 6)" value={acct.password}
              onChange={(e) => setAcct({ ...acct, password: e.target.value })} />
            <button className={primaryBtn}>
              {mode === "signup" ? "Register →" : "Log in →"}
            </button>
            <p className="rounded-xl bg-indigo-50 px-4 py-3 text-xs text-indigo-800 ring-1 ring-indigo-100">
              🔓 Log in to upload notes. Reading, searching and exams are open to everyone.
            </p>
            {msg && (
              <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-medium text-red-700">
                ⚠️ {msg}
              </p>
            )}
          </div>
        </form>
      ) : (
        <>
          <div className="flex items-center justify-between rounded-2xl bg-gradient-to-r from-indigo-900 to-fuchsia-900 px-5 py-4 text-sm text-white shadow-xl shadow-indigo-900/30 ring-1 ring-white/10">
            <span className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-base ring-1 ring-white/30">👋</span>
              <span>
                Hi, <b>{auth.user.name}</b>{" "}
                <span className="ml-1 rounded-full bg-white/15 px-2.5 py-0.5 text-xs ring-1 ring-white/25">{auth.user.class_id}</span>
              </span>
            </span>
            <button
              onClick={() => saveAuth(null)}
              className="rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold ring-1 ring-white/30 transition hover:bg-white/25"
            >
              Log out
            </button>
          </div>

          <form onSubmit={upload} className={`${card} space-y-4`}>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600">Contribute</p>
              <h2 className="mt-1 text-xl font-bold text-slate-900">Share your notes</h2>
            </div>
            <input className={input} placeholder="Title (e.g. Photosynthesis)" value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <input className={input} placeholder="Course (e.g. BIO 101)" value={form.course}
              onChange={(e) => setForm({ ...form, course: e.target.value })} />
            <textarea className={input} rows={3} placeholder="Paste notes..." value={form.text}
              onChange={(e) => setForm({ ...form, text: e.target.value })} />
            <input type="file" accept=".pdf,.docx,.txt"
              onChange={(e) => setDoc(e.target.files?.[0] || null)}
              className="block w-full cursor-pointer rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-3 text-sm text-slate-600 transition hover:border-indigo-400 hover:bg-indigo-50/50 file:mr-3 file:cursor-pointer file:rounded-lg file:border-0 file:bg-gradient-to-r file:from-indigo-600 file:to-fuchsia-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:opacity-90" />
            <p className="text-xs text-slate-500">
              Demo only: do not upload personal or private information.
            </p>
            <button className={primaryBtn}>
              ⬆ Upload
            </button>
            {msg && <p className="text-sm font-medium text-slate-600">{msg}</p>}
          </form>
        </>
      )}

      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
        <input className={`${input} !rounded-2xl !py-3 !pl-11 shadow-md shadow-indigo-900/5`} placeholder="Search notes..." value={q}
          onChange={(e) => { setQ(e.target.value); load(e.target.value); }} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {notes.length === 0 && (
          <p className="col-span-full rounded-2xl bg-white p-8 text-center text-sm text-slate-500 ring-1 ring-slate-200">
            No notes yet. Be the first to share.
          </p>
        )}
        {notes.map((n) => (
          <div key={n.id} className="group flex gap-3 rounded-2xl bg-white p-5 shadow-md shadow-indigo-900/5 ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/20 hover:ring-indigo-300">
            <button onClick={() => openNote(n.id)} className="flex-1 text-left">
              <span className="inline-flex rounded-full bg-fuchsia-50 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-fuchsia-700">{n.course}</span>
              <p className="mt-2 font-bold text-slate-900 transition group-hover:text-indigo-700">{n.title}</p>
              <p className="mt-0.5 text-xs text-slate-500">by {n.author}</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 line-clamp-2">{n.snippet}</p>
            </button>
            {mine(n.owner_id) && (
              <button onClick={() => remove(n.id)} className="self-start rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600 transition hover:bg-red-100">
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}