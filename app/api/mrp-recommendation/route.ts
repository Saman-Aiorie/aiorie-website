import { assessNeedOrders, eligibleFollowUps, needOrdersCases } from "../../mrp-planner-assistant/demo/need-orders";

export async function GET(request: Request) {
  const part = new URL(request.url).searchParams.get("part");
  if (part !== "MYR-M2" && part !== "MYR-P2") {
    return Response.json({ error: "Choose one of the two MFG pilot cases." }, { status: 400 });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "AI recommendations are unavailable in this deployment." }, { status: 503 });
  }

  const planning = needOrdersCases[part]!;
  const { options, ...assessment } = assessNeedOrders(planning);
  const allowed = eligibleFollowUps(planning);

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: { Authorization: "Bearer " + apiKey, "Content-Type": "application/json" },
      signal: AbortSignal.timeout(15_000),
      body: JSON.stringify({
        model: process.env.MRP_OPENAI_MODEL ?? "gpt-4.1-mini",
        store: false,
        max_output_tokens: 350,
        instructions: [
          "You are an IFS MRP planning assistant. Select one allowed follow-up and explain the trade-off in two short sentences.",
          "Use only the supplied case evidence. Clearly distinguish released supply, planned receipts and physical stock.",
          "Need Orders cleared in the verified rerun. Explain the remaining issue and never recommend duplicate supply or claim an order was changed.",
          "Name the missing evidence to check next. Rescheduling feasibility is unknown until verified.",
        ].join(" "),
        input: JSON.stringify({ part, verifiedMrpJob: 411579, planning, assessment, options, allowed }),
        text: {
          format: {
            type: "json_schema",
            name: "mrp_recommendation",
            strict: true,
            schema: {
              type: "object",
              properties: {
                actionId: { type: "string", enum: allowed.map(action => action.id) },
                rationale: { type: "string" },
                evidenceToCheck: { type: "string" },
              },
              required: ["actionId", "rationale", "evidenceToCheck"],
              additionalProperties: false,
            },
          },
        },
      }),
    });
    if (!response.ok) throw new Error("Model request failed");
    const result = await response.json();
    const content = result.output?.find((item: { type: string }) => item.type === "message")?.content;
    const output = content?.find((item: { type: string }) => item.type === "output_text")?.text;
    if (result.status !== "completed" || typeof output !== "string") throw new Error("Model response incomplete");
    const parsed = JSON.parse(output);
    const action = allowed.find(candidate => candidate.id === parsed?.actionId);
    if (!action || typeof parsed.rationale !== "string" || !parsed.rationale.trim()
      || typeof parsed.evidenceToCheck !== "string" || !parsed.evidenceToCheck.trim()) {
      throw new Error("Model response invalid");
    }
    return Response.json({
      actionId: action.id,
      action: action.label,
      rationale: parsed.rationale,
      evidenceToCheck: parsed.evidenceToCheck,
    }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return Response.json({ error: "The AI recommendation could not be generated. Try again." }, { status: 502 });
  }
}
