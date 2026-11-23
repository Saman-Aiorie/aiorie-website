"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const groups = [
  { id: "shortage", label: "Shortages and stock risk" },
  { id: "excess", label: "Excess supply and no demand" },
] as const;

const proposals = [
  { id: "no-demand", group: "excess", part: "MYR-M1", description: "CNC Machined Bracket", message: "No Demand Exists", priority: "Low", reason: "The current plan shows no demand for this part.", order: null, date: null, quantity: null, followup: "Acknowledge as reviewed" },
  { id: "excess-orders", group: "excess", part: "MYR-M1", description: "CNC Machined Bracket", message: "Excess of Orders", priority: "Low", reason: "Open supply exceeds the requirement.", order: "SO 10482", date: "11 Dec 2026", quantity: null, followup: "Investigate the supply order" },
  { id: "remove-order", group: "excess", part: "MYR-M1", description: "CNC Machined Bracket", message: "Remove Order", priority: "Normal", reason: "Review the supply order and its demand links before deciding what to do.", order: "SO 10495", date: null, quantity: null, followup: "Investigate the supply order" },
  { id: "stock-short", group: "shortage", part: "MYR-P1", description: "Steel Blank", message: "Available Qty In Stock < Demands", priority: "High", reason: "The sample demand due 27 Nov has a projected shortage of 350 units.", order: null, date: "27 Nov 2026", quantity: 350, followup: "Verify shortage quantity and required date" },
  { id: "need-orders", group: "shortage", part: "MYR-P1", description: "Steel Blank", message: "Need Orders", priority: "High", reason: "The sample demand due 29 Nov has an uncovered requirement of 500 units.", order: null, date: "29 Nov 2026", quantity: 500, followup: "Verify shortage quantity and required date" },
] as const;

type Proposal = (typeof proposals)[number];
type Group = (typeof groups)[number]["id"];
type Priority = Proposal["priority"];
type Decision = { status: "Applied" | "Skipped"; note: string; run: number; time: string };
type DemoState = {
  run: number;
  time: string;
  overrides: Partial<Record<Proposal["id"], Priority>>;
  history: Partial<Record<Proposal["id"], Decision[]>>;
};

const storageKey = "aiorie-mrp-demo-v1";
const initial: DemoState = {
  run: 2, time: "23 Nov 2026, 08:21", overrides: {},
  history: { "no-demand": [{ status: "Applied", note: "Reviewed. No demand exists and no supply change is required.", run: 1, time: "22 Nov 2026, 16:36" }] },
};
const rank = { High: 0, Normal: 1, Low: 2 };
const panel = "rounded-xl border border-slate-200 bg-white shadow-sm";
const button = "rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-[#192e62] hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-blue-600";
const primary = "rounded-lg bg-[#192e62] px-4 py-2 text-sm font-semibold text-white hover:bg-blue-900 focus-visible:ring-2 focus-visible:ring-blue-600";
const field = "rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm";

export default function MrpPlannerDemo() {
  const [saved, setSaved] = useState<DemoState | null>(null);
  const [queue, setQueue] = useState<Group | "all" | null>(null);
  const [id, setId] = useState<Proposal["id"] | null>(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All statuses");
  const [note, setNote] = useState<string | null>(null);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const load = () => {
      try {
        const raw = localStorage.getItem(storageKey);
        setSaved(raw ? JSON.parse(raw) as DemoState : initial);
      } catch {
        setSaved(initial);
      }
    };
    const frame = requestAnimationFrame(load);
    return () => cancelAnimationFrame(frame);
  }, []);

  const state = saved ?? initial;

  function persist(next: DemoState, message: string) {
    setSaved(next);
    try {
      localStorage.setItem(storageKey, JSON.stringify(next));
      setFeedback(message);
    } catch {
      setFeedback(message + " Browser storage is unavailable.");
    }
  }

  const priority = (p: Proposal) => state.overrides[p.id] ?? p.priority;
  const status = (p: Proposal) => state.history[p.id]?.find(d => d.run === state.run)?.status ?? "Pending";
  const reappeared = (p: Proposal) => status(p) === "Pending" && !!state.history[p.id]?.some(d => d.status === "Applied" && d.run < state.run);
  const pending = proposals.filter(p => status(p) === "Pending");
  const visible = proposals.filter(p => (queue === "all" || p.group === queue)
    && (filter === "All statuses" || status(p) === filter)
    && (p.part + " " + p.message + " " + p.description).toLowerCase().includes(search.trim().toLowerCase()))
    .sort((a, b) => rank[priority(a)] - rank[priority(b)]);
  const selected = visible.find(p => p.id === id) ?? visible[0];
  const defaultNote = selected ? selected.followup + ". " + selected.reason : "";
  const stamp = () => new Date().toLocaleString("en-AU", { dateStyle: "medium", timeStyle: "short" });

  function openQueue(group: Group | "all" | null) {
    setQueue(group); setSearch(""); setFilter("All statuses"); setId(null); setNote(null); setFeedback("");
  }

  function decide(decision: Decision["status"]) {
    if (!selected || status(selected) !== "Pending") return;
    const entry: Decision = { status: decision, note: decision === "Skipped" ? "" : note ?? defaultNote, run: state.run, time: stamp() };
    persist({ ...state, history: { ...state.history, [selected.id]: [entry, ...(state.history[selected.id] ?? [])] } }, decision === "Applied" ? "Saved in demo." : "Proposal skipped for this run.");
    setNote(null);
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-4">
          <div>
            <Link href="/mrp-planner-assistant" className="text-sm font-semibold text-[#192e62] hover:underline">← MRP Planner Assistant</Link>
            <h1 className="mt-1 text-2xl font-semibold">{queue ? "MRP Proposal Review" : "MRP Planning Lobby"}</h1>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span className="rounded-full bg-blue-50 px-3 py-1 font-medium text-blue-900">Site MFG · Demo data</span>
            <span>Run #{state.run} · {state.time}</span>
            <button disabled={!saved} className={button} onClick={() => { setNote(null); persist({ ...state, run: state.run + 1, time: stamp() }, "MRP rerun simulated. Previous decisions are in the history."); }}>Simulate MRP rerun</button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-7">
        <div role="status" className="mb-3 text-sm text-[#192e62]">{feedback}</div>
        {!queue ? (
          <>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xl font-semibold">Workload for site MFG</h2>
              <button className={primary} onClick={() => openQueue("all")}>View all proposals</button>
            </div>
            <dl className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
              {[
                ["Pending proposals", pending.length],
                ["High priority pending", pending.filter(p => priority(p) === "High").length],
                ["Affected parts", new Set(pending.map(p => p.part)).size],
                ["Reappeared after MRP", pending.filter(reappeared).length],
              ].map(([label, value]) => <div key={label} className={panel + " p-4"}><dt className="text-sm text-slate-600">{label}</dt><dd className="mt-1 text-2xl font-semibold text-[#192e62]">{value}</dd></div>)}
            </dl>
            <div className="grid gap-4 md:grid-cols-2">
              {groups.map(group => {
                const items = proposals.filter(p => p.group === group.id);
                const open = items.filter(p => status(p) === "Pending");
                return (
                  <button key={group.id} onClick={() => openQueue(group.id)} className={panel + " border-t-4 border-t-[#192e62] p-5 text-left hover:bg-blue-50/60 focus-visible:ring-2 focus-visible:ring-blue-600"}>
                    <h3 className="text-lg font-semibold">{group.label}</h3>
                    <p className="my-3 text-sm text-slate-600">{open.length} of {items.length} pending · {items[0].part} · {open.filter(reappeared).length} reappeared</p>
                    <ul className="space-y-1 text-sm">{items.map(p => <li key={p.id}>{p.message}</li>)}</ul>
                    <span className="mt-4 block text-sm font-semibold text-blue-800">Open queue →</span>
                  </button>
                );
              })}
            </div>
          </>
        ) : (
          <>
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <button className={button} onClick={() => openQueue(null)}>← Lobby</button>
              <select aria-label="Message group" className={field} value={queue} onChange={e => openQueue(e.target.value as Group | "all")}>
                <option value="all">All groups</option>
                {groups.map(g => <option key={g.id} value={g.id}>{g.label}</option>)}
              </select>
              <input aria-label="Search proposals" placeholder="Search part or message" className={field} value={search} onChange={e => { setSearch(e.target.value); setNote(null); }} />
              <select aria-label="Review status" className={field} value={filter} onChange={e => { setFilter(e.target.value); setNote(null); }}>
                {["All statuses", "Pending", "Applied", "Skipped"].map(item => <option key={item}>{item}</option>)}
              </select>
              <span className="text-sm text-slate-600">{visible.length} shown</span>
            </div>
            <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
              <div className={panel + " overflow-x-auto"}>
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100 text-slate-700"><tr>{["Part and message", "Priority", "Review status"].map(h => <th key={h} scope="col" className="px-4 py-3">{h}</th>)}</tr></thead>
                  <tbody>
                    {visible.map(p => (
                      <tr key={p.id} className={"border-t border-slate-200 " + (selected?.id === p.id ? "bg-blue-50" : "")}>
                        <td className="p-4"><button aria-pressed={selected?.id === p.id} className="text-left font-semibold text-[#192e62] hover:underline" onClick={() => { setId(p.id); setNote(null); setFeedback(""); }}>{p.part}<span className="block font-normal">{p.message}</span></button></td>
                        <td className="p-4"><select disabled={!saved} aria-label={"Priority for " + p.message} className={field} value={state.overrides[p.id] ?? ""} onChange={e => {
                          const overrides = { ...state.overrides };
                          if (e.target.value) overrides[p.id] = e.target.value as Priority;
                          else delete overrides[p.id];
                          persist({ ...state, overrides }, "Queue priority updated.");
                        }}><option value="">Suggested: {p.priority}</option>{Object.keys(rank).map(value => <option key={value}>{value}</option>)}</select></td>
                        <td className="p-4">{status(p)}{reappeared(p) && <span className="block text-xs font-medium text-amber-800">Reappeared</span>}</td>
                      </tr>
                    ))}
                    {!visible.length && <tr><td colSpan={3} className="p-5 text-slate-600">No proposals match these filters.</td></tr>}
                  </tbody>
                </table>
              </div>
              {selected && (
                <aside className={panel + " space-y-4 p-5"} aria-label="Proposal details">
                  <div><h2 className="text-xl font-semibold">{selected.part} · {selected.description}</h2><p className="text-sm text-slate-600">{selected.message}</p></div>
                  {reappeared(selected) && <p className="rounded-lg bg-amber-50 p-3 text-sm text-amber-900">Previously reviewed · Reappeared after MRP</p>}
                  <dl className="grid grid-cols-2 gap-3 text-sm">
                    {[
                      ["Simulated IFS status", status(selected) === "Applied" ? "Action taken" : "Action not taken"],
                      ["App review status", status(selected)],
                      ["Order reference", selected.order ?? "—"],
                      ["Required date", selected.date ?? "—"],
                      ["Shortage quantity", selected.quantity === null ? "—" : selected.quantity + " units"],
                      ["Queue priority", priority(selected)],
                    ].map(([label, value]) => <div key={label}><dt className="text-slate-600">{label}</dt><dd className="font-semibold">{value}</dd></div>)}
                  </dl>
                  <div className="rounded-lg bg-slate-100 p-3 text-sm">
                    <h3 className="font-semibold">{selected.followup}</h3>
                    <p className="mt-1">{selected.reason}</p>
                    <p className="mt-2"><strong>Action Taken</strong> · Action taken</p>
                    {note === null ? <p className="mt-1"><strong>Action Note</strong> · {defaultNote}</p> : <label className="mt-2 block font-medium">Action Note<textarea className={field + " mt-1 block w-full"} rows={3} value={note} onChange={e => setNote(e.target.value)} /></label>}
                  </div>
                  {status(selected) === "Pending" && <div className="flex flex-wrap gap-2">
                    <button disabled={!saved} className={primary} onClick={() => decide("Applied")}>{note === null ? "Apply" : "Save and apply"}</button>
                    <button className={button} onClick={() => setNote(note === null ? defaultNote : null)}>{note === null ? "Edit and apply" : "Cancel edit"}</button>
                    <button disabled={!saved} className={button} onClick={() => decide("Skipped")}>Skip</button>
                  </div>}
                  <div className="border-t border-slate-200 pt-3 text-sm">
                    <h3 className="font-semibold">Decision history</h3>
                    <ul className="mt-2 space-y-2">
                      {(state.history[selected.id] ?? []).map(d => <li key={d.run}><strong>{d.status}</strong> · Run #{d.run} · {d.time}{d.note && <p className="break-words text-slate-600">{d.note}</p>}</li>)}
                    </ul>
                    {!state.history[selected.id]?.length && <p className="text-slate-600">No decisions recorded.</p>}
                  </div>
                </aside>
              )}
            </div>
          </>
        )}
        <p className="mt-6 text-sm text-slate-600">Sample planning data. Demo decisions are stored in this browser. No live IFS connection.</p>
      </main>
    </div>
  );
}
