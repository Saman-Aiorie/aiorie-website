"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const groups = [
  { id: "shortage", label: "Shortages and stock risk" },
  { id: "excess", label: "Excess supply and no demand" },
] as const;

const proposals = [
  {"id": "no-demand", "group": "excess", "part": "MYR-M1", "description": "CNC Machined Bracket", "message": "No Demand Exists", "priority": "Low", "reason": "IFS generated this message in MFG run 407785. Review the current planning facts before updating the proposal.", "order": null, "date": null, "quantity": null, "followup": "Confirm no follow-up is needed, then acknowledge"},
  {"id": "excess-orders", "group": "excess", "part": "MYR-M1", "description": "CNC Machined Bracket", "message": "Excess of Orders", "priority": "Low", "reason": "IFS generated this message in MFG run 407785. Review the current planning facts before updating the proposal.", "order": null, "date": null, "quantity": null, "followup": "Review excess supply and its demand links"},
  {"id": "remove-order", "group": "excess", "part": "MYR-M1", "description": "CNC Machined Bracket", "message": "Remove Order", "priority": "Normal", "reason": "IFS flagged planned shop order 493 for review.", "order": "SO 493 / * / *", "date": "24 Nov 2026", "quantity": null, "followup": "Investigate the linked supply order"},
  {"id": "myr-m2-short", "group": "shortage", "part": "MYR-M2", "description": "Conveyor Drive Mount Assembly", "message": "Available Qty In Stock < Demands", "priority": "High", "reason": "IFS generated this message in MFG run 407785. Review the current planning facts before updating the proposal.", "order": null, "date": null, "quantity": null, "followup": "Verify shortage quantity, required date and available supply"},
  {"id": "myr-m2-need", "group": "shortage", "part": "MYR-M2", "description": "Conveyor Drive Mount Assembly", "message": "Need Orders", "priority": "High", "reason": "IFS generated this message in MFG run 407785. Review the current planning facts before updating the proposal.", "order": null, "date": null, "quantity": null, "followup": "Verify shortage quantity, required date and available supply"},
  {"id": "myr-m3-short", "group": "shortage", "part": "MYR-M3", "description": "Conveyor Idler Bracket Assembly", "message": "Available Qty In Stock < Demands", "priority": "High", "reason": "IFS generated this message in MFG run 407785. Review the current planning facts before updating the proposal.", "order": null, "date": null, "quantity": null, "followup": "Verify shortage quantity, required date and available supply"},
  {"id": "myr-m3-need", "group": "shortage", "part": "MYR-M3", "description": "Conveyor Idler Bracket Assembly", "message": "Need Orders", "priority": "High", "reason": "IFS generated this message in MFG run 407785. Review the current planning facts before updating the proposal.", "order": null, "date": null, "quantity": null, "followup": "Verify shortage quantity, required date and available supply"},
  {"id": "myr-m4-short", "group": "shortage", "part": "MYR-M4", "description": "Conveyor Belt Tensioner Assembly", "message": "Available Qty In Stock < Demands", "priority": "High", "reason": "IFS generated this message in MFG run 407785. Review the current planning facts before updating the proposal.", "order": null, "date": null, "quantity": null, "followup": "Verify shortage quantity, required date and available supply"},
  {"id": "myr-m4-need", "group": "shortage", "part": "MYR-M4", "description": "Conveyor Belt Tensioner Assembly", "message": "Need Orders", "priority": "High", "reason": "IFS generated this message in MFG run 407785. Review the current planning facts before updating the proposal.", "order": null, "date": null, "quantity": null, "followup": "Verify shortage quantity, required date and available supply"},
  {"id": "myr-m5-short", "group": "shortage", "part": "MYR-M5", "description": "Conveyor End Guard Assembly", "message": "Available Qty In Stock < Demands", "priority": "High", "reason": "IFS generated this message in MFG run 407785. Review the current planning facts before updating the proposal.", "order": null, "date": null, "quantity": null, "followup": "Verify shortage quantity, required date and available supply"},
  {"id": "myr-m5-need", "group": "shortage", "part": "MYR-M5", "description": "Conveyor End Guard Assembly", "message": "Need Orders", "priority": "High", "reason": "IFS generated this message in MFG run 407785. Review the current planning facts before updating the proposal.", "order": null, "date": null, "quantity": null, "followup": "Verify shortage quantity, required date and available supply"},
  {"id": "stock-short", "group": "shortage", "part": "MYR-P1", "description": "Steel Blank", "message": "Available Qty In Stock < Demands", "priority": "High", "reason": "IFS generated this message in MFG run 407785. Review the current planning facts before updating the proposal.", "order": null, "date": null, "quantity": null, "followup": "Verify shortage quantity, required date and available supply"},
  {"id": "need-orders", "group": "shortage", "part": "MYR-P1", "description": "Steel Blank", "message": "Need Orders", "priority": "High", "reason": "IFS generated this message in MFG run 407785. Review the current planning facts before updating the proposal.", "order": null, "date": null, "quantity": null, "followup": "Verify shortage quantity, required date and available supply"},
  {"id": "myr-p2-short", "group": "shortage", "part": "MYR-P2", "description": "Laser-Cut Mounting Plate", "message": "Available Qty In Stock < Demands", "priority": "High", "reason": "IFS generated this message in MFG run 407785. Review the current planning facts before updating the proposal.", "order": null, "date": null, "quantity": null, "followup": "Verify shortage quantity, required date and available supply"},
  {"id": "myr-p2-need", "group": "shortage", "part": "MYR-P2", "description": "Laser-Cut Mounting Plate", "message": "Need Orders", "priority": "High", "reason": "IFS generated this message in MFG run 407785. Review the current planning facts before updating the proposal.", "order": null, "date": null, "quantity": null, "followup": "Verify shortage quantity, required date and available supply"},
  {"id": "myr-p3-short", "group": "shortage", "part": "MYR-P3", "description": "M12 Mounting Fastener Kit", "message": "Available Qty In Stock < Demands", "priority": "High", "reason": "IFS generated this message in MFG run 407785. Review the current planning facts before updating the proposal.", "order": null, "date": null, "quantity": null, "followup": "Verify shortage quantity, required date and available supply"},
  {"id": "myr-p3-need", "group": "shortage", "part": "MYR-P3", "description": "M12 Mounting Fastener Kit", "message": "Need Orders", "priority": "High", "reason": "IFS generated this message in MFG run 407785. Review the current planning facts before updating the proposal.", "order": null, "date": null, "quantity": null, "followup": "Verify shortage quantity, required date and available supply"},
  {"id": "myr-p4-over", "group": "excess", "part": "MYR-P4", "description": "Sealed Conveyor Bearing", "message": "Over Supply", "priority": "Normal", "reason": "IFS flagged excess supply on PO 152, line 2. The order line has 24 EA against demand for 8 idler bracket assemblies.", "order": "PO 152 / 2 / 1", "date": "23 Nov 2026", "quantity": null, "followup": "Investigate the linked supply order"},
  {"id": "myr-p4-short", "group": "shortage", "part": "MYR-P4", "description": "Sealed Conveyor Bearing", "message": "Available Qty In Stock < Demands", "priority": "High", "reason": "IFS generated this message in MFG run 407785. Review the current planning facts before updating the proposal.", "order": null, "date": null, "quantity": null, "followup": "Verify shortage quantity, required date and available supply"},
  {"id": "myr-p4-excess", "group": "excess", "part": "MYR-P4", "description": "Sealed Conveyor Bearing", "message": "Excess of Orders", "priority": "Low", "reason": "IFS generated this message in MFG run 407785. Review the current planning facts before updating the proposal.", "order": null, "date": null, "quantity": null, "followup": "Review excess supply and its demand links"},
  {"id": "myr-p5-short", "group": "shortage", "part": "MYR-P5", "description": "Threaded Tensioner Rod", "message": "Available Qty In Stock < Demands", "priority": "High", "reason": "IFS generated this message in MFG run 407785. Review the current planning facts before updating the proposal.", "order": null, "date": null, "quantity": null, "followup": "Verify shortage quantity, required date and available supply"},
  {"id": "myr-p5-need", "group": "shortage", "part": "MYR-P5", "description": "Threaded Tensioner Rod", "message": "Need Orders", "priority": "High", "reason": "IFS generated this message in MFG run 407785. Review the current planning facts before updating the proposal.", "order": null, "date": null, "quantity": null, "followup": "Verify shortage quantity, required date and available supply"},
  {"id": "myr-p6-short", "group": "shortage", "part": "MYR-P6", "description": "Perforated Steel Guard Panel", "message": "Available Qty In Stock < Demands", "priority": "High", "reason": "IFS generated this message in MFG run 407785. Review the current planning facts before updating the proposal.", "order": null, "date": null, "quantity": null, "followup": "Verify shortage quantity, required date and available supply"},
  {"id": "myr-p6-need", "group": "shortage", "part": "MYR-P6", "description": "Perforated Steel Guard Panel", "message": "Need Orders", "priority": "High", "reason": "IFS generated this message in MFG run 407785. Review the current planning facts before updating the proposal.", "order": null, "date": null, "quantity": null, "followup": "Verify shortage quantity, required date and available supply"},
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
  caseReviews?: Partial<Record<Proposal["part"], { note: string; time: string }>>;
};

const storageKey = "aiorie-mrp-mfg-407785-v1";
const initial: DemoState = {
  run: 2, time: "23 Nov 2026, IFS job 407785", overrides: {},
  history: { "no-demand": [{ status: "Applied", note: "Reviewed. No demand exists and no supply change is required.", run: 1, time: "22 Nov 2026, 16:36" }] },
};
const rank = { High: 0, Normal: 1, Low: 2 };
const panel = "rounded-xl border border-slate-200 bg-white shadow-sm";
const button = "rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-[#192e62] hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-blue-600";
const primary = "rounded-lg bg-[#192e62] px-4 py-2 text-sm font-semibold text-white hover:bg-blue-900 focus-visible:ring-2 focus-visible:ring-blue-600";
const field = "rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm";

type Supply = { order: string; quantity: number; due: string; status: "Released" | "Planned" };
type NeedOrdersCase = {
  demand: number;
  due: string;
  requisition: string;
  converted: Supply;
  existing: Supply[];
  nextCheck: string;
  remainingMessages: string[];
};

const needOrdersCases: Partial<Record<string, NeedOrdersCase>> = {
  "MYR-P2": {
    demand: 12, due: "2026-11-23", requisition: "736",
    existing: [{ order: "PO 152", quantity: 4, due: "2026-11-23", status: "Released" }],
    converted: { order: "PO 158", quantity: 8, due: "2026-11-23", status: "Planned" },
    remainingMessages: ["Available Qty In Stock < Demands"],
    nextCheck: "Check physical stock and PO 158 receipt status. IFS also reported a missing standard cost.",
  },
  "MYR-M2": {
    demand: 12, due: "2026-11-23", requisition: "572", existing: [],
    converted: { order: "Shop order 495", quantity: 12, due: "2026-11-24", status: "Planned" },
    remainingMessages: ["Late Order", "Negative Projected Onhand", "Available Qty In Stock < Demands"],
    nextCheck: "Confirm component availability and the earliest feasible date before considering an expedite.",
  },
};

function assessNeedOrders(planning: NeedOrdersCase) {
  const supply = [...planning.existing, planning.converted];
  const onTime = supply.filter(order => order.due <= planning.due);
  const firm = onTime.filter(order => order.status === "Released").reduce((sum, order) => sum + order.quantity, 0);
  const planned = onTime.filter(order => order.status === "Planned").reduce((sum, order) => sum + order.quantity, 0);
  const late = supply.filter(order => order.due > planning.due).reduce((sum, order) => sum + order.quantity, 0);
  const gap = Math.max(0, planning.demand - firm - planned);
  return {
    supply, firm, planned, late, gap,
    recommendation: gap > 0 ? "Review the late supply before adding an order" : "Follow up on the remaining stock warning",
    options: [
      { action: "Convert requisition again", result: "Already converted to " + planning.converted.order + ". Additional supply would duplicate this conversion." },
      { action: "Bring supply forward", result: gap === 0 ? "The recorded receipt dates already cover the required date if planned supply is netted." : "Could close the timing gap. Feasibility depends on the routing, capacity and available components." },
      { action: "Review or escalate", result: planning.nextCheck },
    ],
  };
}

function NeedOrdersReview({ part }: { part: string }) {
  const planning = needOrdersCases[part];
  if (!planning) {
    return <p className="rounded-lg bg-amber-50 p-3 text-sm text-amber-950">Needs planner review. Confirm the open requisition, demand date and existing supply in IFS before choosing a conversion.</p>;
  }
  const result = assessNeedOrders(planning);
  return (
    <section className="space-y-3 rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm" aria-label="Need Orders assessment">
      <h3 className="font-semibold text-[#192e62]">Need Orders assessment</h3>
      <p>This case covers the Need Orders and stock shortage messages for this demand.</p>
      <dl className="grid grid-cols-2 gap-2">
        <div><dt>Demand by {planning.due}</dt><dd className="font-semibold">{planning.demand} EA</dd></div>
        <div><dt>Released supply by due date</dt><dd className="font-semibold">{result.firm} EA</dd></div>
        <div><dt>Planned supply by due date</dt><dd className="font-semibold">{result.planned} EA</dd></div>
        <div><dt>Supply after due date</dt><dd className="font-semibold">{result.late} EA</dd></div>
        <div><dt>Gap if planned supply is netted</dt><dd className="font-semibold">{result.gap} EA</dd></div>
      </dl>
      <ul className="space-y-1">{result.supply.map(order => <li key={order.order}>{order.order} · {order.quantity} EA · {order.due} · {order.status}</li>)}</ul>
      <p className="font-semibold">{result.recommendation}</p>
      <details>
        <summary className="cursor-pointer font-medium text-[#192e62]">Compare planner options</summary>
        <ul className="mt-2 space-y-2">{result.options.map(option => <li key={option.action}><strong>{option.action}</strong><p>{option.result}</p></li>)}</ul>
      </details>
      <div className="rounded-lg bg-white p-3">
        <h4 className="font-semibold">Verified in IFS MRP job 411579</h4>
        <p>Requisition {planning.requisition} converted to {planning.converted.order}. Need Orders cleared.</p>
        <p className="mt-1">Remaining messages</p>
        <ul className="list-inside list-disc">{planning.remainingMessages.map(message => <li key={message}>{message}</li>)}</ul>
      </div>
    </section>
  );
}

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
  const isShortage = selected?.group === "shortage";
  const selectedCase = isShortage && selected ? needOrdersCases[selected.part] : undefined;
  const defaultNote = selectedCase ? assessNeedOrders(selectedCase).recommendation : selected ? selected.followup + ". " + selected.reason : "";
  const stamp = () => new Date().toLocaleString("en-AU", { dateStyle: "medium", timeStyle: "short" });

  function openQueue(group: Group | "all" | null) {
    setQueue(group); setSearch(""); setFilter("All statuses"); setId(null); setNote(null); setFeedback("");
  }

  function queueCaseReview() {
    if (!selected || !selectedCase || state.caseReviews?.[selected.part]) return;
    const entry = { note: assessNeedOrders(selectedCase).recommendation, time: stamp() };
    persist({ ...state, caseReviews: { ...state.caseReviews, [selected.part]: entry } }, "Follow-up queued in this browser.");
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
            <span className="rounded-full bg-blue-50 px-3 py-1 font-medium text-blue-900">Site MFG · IFS snapshot</span>
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
                    <p className="my-3 text-sm text-slate-600">{open.length} of {items.length} pending · {new Set(items.map(p => p.part)).size} parts · {open.filter(reappeared).length} reappeared</p>
                    <ul className="space-y-1 text-sm">{[...new Set(items.map(p => p.message))].map(message => <li key={message}>{message} · {items.filter(p => p.message === message).length}</li>)}</ul>
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
                  {isShortage && <NeedOrdersReview part={selected.part} />}
                  {selectedCase && (state.caseReviews?.[selected.part] ? (
                    <p className="text-sm text-slate-700">Follow-up queued · {state.caseReviews[selected.part]?.time}</p>
                  ) : (
                    <button disabled={!saved} className={primary} onClick={queueCaseReview}>Queue follow-up</button>
                  ))}
                  {!isShortage && <div className="rounded-lg bg-slate-100 p-3 text-sm">
                    <h3 className="font-semibold">{selected.followup}</h3>
                    <p className="mt-1">{selected.reason}</p>
                    <p className="mt-2"><strong>Action Taken</strong> · Action taken</p>
                    {note === null ? <p className="mt-1"><strong>Action Note</strong> · {defaultNote}</p> : <label className="mt-2 block font-medium">Action Note<textarea className={field + " mt-1 block w-full"} rows={3} value={note} onChange={e => setNote(e.target.value)} /></label>}
                  </div>}
                  {!isShortage && status(selected) === "Pending" && <div className="flex flex-wrap gap-2">
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
        <p className="mt-6 text-sm text-slate-600">The queue shows IFS MFG snapshot 407785. The two pilot cases include verified results from job 411579. Follow-up decisions are stored locally.</p>
      </main>
    </div>
  );
}
