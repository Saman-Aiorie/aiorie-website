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

export const needOrdersCases: Partial<Record<string, NeedOrdersCase>> = {
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

export function assessNeedOrders(planning: NeedOrdersCase) {
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

export function eligibleFollowUps(planning: NeedOrdersCase) {
  const review = { id: "planner_review", label: "Ask the planner to review the remaining warnings" };
  if (assessNeedOrders(planning).gap > 0) {
    return [
      { id: "check_expedite", label: "Check components and capacity to see if the existing shop order can finish earlier" },
      review,
    ];
  }
  return [
    { id: "check_receipt", label: "Check stock and receipt progress against the existing purchase order" },
    review,
  ];
}
