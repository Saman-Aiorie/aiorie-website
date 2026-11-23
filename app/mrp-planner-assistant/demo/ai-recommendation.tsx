"use client";

import { useState } from "react";

type Recommendation = { actionId: string; action: string; rationale: string; evidenceToCheck: string; source?: "replay" };
type Execution = { status: string; result: string };
const verificationResults: Record<string, Execution> = {
  check_expedite: {
    status: "Timing gap confirmed",
    result: "Shop order 495 covers 12 EA one day late. Component availability and capacity need verification before moving the order.",
  },
  check_receipt: {
    status: "Receipt follow-up recorded",
    result: "Existing purchase orders cover 12 EA on the recorded dates, with 8 EA still planned. Physical receipt remains unverified.",
  },
  planner_review: {
    status: "Exception recorded",
    result: "The verified MRP messages remain open. The case needs additional IFS evidence before a supply change is feasible.",
  },
};

const replay: Record<string, Recommendation> = {
  "MYR-M2": {
    actionId: "check_expedite",
    action: "Check whether shop order 495 can finish earlier",
    rationale: "The existing order covers all 12 EA, but it is due one day after demand. Another order would duplicate supply without fixing the timing gap.",
    evidenceToCheck: "Component availability, routing capacity and the earliest feasible completion date.",
    source: "replay",
  },
  "MYR-P2": {
    actionId: "check_receipt",
    action: "Check stock and receipt progress against PO 158",
    rationale: "The existing orders cover the requirement on their recorded dates, and Need Orders cleared. The stock warning remains because a planned receipt is not physical stock.",
    evidenceToCheck: "Physical stock and the actual receipt or confirmed delivery status of PO 158.",
    source: "replay",
  },
};

export function AiRecommendation({ part }: { part: string }) {
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [execution, setExecution] = useState<Execution | null>(null);

  async function recommend() {
    setLoading(true);
    setError("");
    try {
      const key = "aiorie-mrp-ai-411579:" + part;
      const saved = localStorage.getItem(key);
      if (saved) {
        const prior = JSON.parse(saved);
        setRecommendation(prior.recommendation);
        setExecution(prior.execution);
        return;
      }
      const response = await fetch("/api/mrp-recommendation?part=" + encodeURIComponent(part), { cache: "no-store" });
      const body = await response.json();
      const data = response.status === 503 ? replay[part] : body;
      if ((!response.ok && response.status !== 503) || !data) {
        throw new Error(body.error ?? "AI recommendations are temporarily unavailable.");
      }
      const result = verificationResults[data.actionId];
      if (!result) throw new Error("The recommended action is unavailable for this case.");
      setRecommendation(data);
      setExecution(result);
      try {
        localStorage.setItem("aiorie-mrp-ai-411579:" + part, JSON.stringify({ recommendation: data, execution: result }));
      } catch {
        setError("The prototype ran the check, but browser storage is unavailable.");
      }
    } catch (failure) {
      setError(failure instanceof Error ? failure.message : "AI recommendations are temporarily unavailable.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-2 rounded-lg border border-[#c2cfe5] bg-white p-3">
      <h4 className="font-semibold text-[#1a376d]">AI planning recommendation</h4>
      <button type="button" disabled={loading} onClick={recommend}
        className="rounded-md bg-[#1a376d] px-3 py-2 text-white hover:bg-[#142c58] disabled:opacity-60">
        {loading ? "Evaluating options…" : recommendation ? "View execution result" : "Run AI planner"}
      </button>
      {error && <p role="status" className="text-amber-900">{error}</p>}
      {execution && (
        <div className="rounded-md bg-[#f4f2f4] p-2 text-sm" aria-live="polite">
          <p className="font-semibold">Prototype execution · {execution.status}</p>
          <p>{execution.result}</p>
        </div>
      )}
      {recommendation && (
        <div className="space-y-1" aria-live="polite">
          <p className="text-xs text-[#3e484d]">{recommendation.source === "replay" ? "Saved pilot recommendation" : "Live AI recommendation"}</p>
          <p className="font-semibold">{recommendation.action}</p>
          <p>{recommendation.rationale}</p>
          <p><strong>Evidence to check:</strong> {recommendation.evidenceToCheck}</p>
        </div>
      )}
    </div>
  );
}
