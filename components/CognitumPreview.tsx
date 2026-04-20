"use client";

import { Fragment, useCallback, useEffect, useId, useMemo, useRef, useState } from "react";

const DAYS = 24;
const DAY_W = 28;
const ROW_H = 18;
const ROWS_TOTAL = 40;
const WC_COUNT = 20;

/** Inset from timeline inner left → “now” line sits just after the resource gutter (enterprise APS cue). */
const TIMELINE_PAD_LEFT = 8;

/** Column 0 = anchor day (today when live); all ops start at or after this column. */
const TODAY_INDEX = 0;

const TIMELINE_W = TIMELINE_PAD_LEFT + DAYS * DAY_W;

/** Pixels before pointer move counts as a drag (click vs drag). */
const DRAG_THRESHOLD_PX = 4;

/** Tooltip shows after hover settles — avoids edge flicker and instant pop-in. */
const TOOLTIP_SHOW_DELAY_MS = 200;

/** Near-term wash: first days after “today” column. */
const NEAR_TERM_START = TODAY_INDEX + 1;
const NEAR_TERM_END_EXCLUSIVE = Math.min(DAYS, TODAY_INDEX + 4);

const MONTHS_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] as const;
const DOW_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

/** Deterministic label for a calendar day offset from anchor midnight (client-only usage after mount). */
function formatDayLabel(anchorMidnight: Date, dayIndex: number): { dow: string; md: string } {
  const d = new Date(anchorMidnight);
  d.setDate(d.getDate() + dayIndex);
  return {
    dow: DOW_SHORT[d.getDay()],
    md: `${MONTHS_SHORT[d.getMonth()]} ${d.getDate()}`,
  };
}

/** Stronger enterprise tones — blue / green / orange / teal / purple / slate / cyan / deep blue */
const MO_PALETTE = [
  { fillTop: "#5d8fd4", fillBot: "#3b6fb0", stroke: "#1e4976", fg: "#f8fafc" },
  { fillTop: "#34a67a", fillBot: "#1f7a58", stroke: "#145a42", fg: "#f8fafc" },
  { fillTop: "#ea8a4a", fillBot: "#c45d24", stroke: "#8b3d14", fg: "#fffbeb" },
  { fillTop: "#2fb3a8", fillBot: "#1d8a82", stroke: "#0f5c56", fg: "#f0fdfa" },
  { fillTop: "#9575d9", fillBot: "#6b4fc4", stroke: "#452a9e", fg: "#faf5ff" },
  { fillTop: "#6b7c93", fillBot: "#4a5a6e", stroke: "#2d3848", fg: "#f1f5f9" },
  { fillTop: "#3db8d4", fillBot: "#1f9bb8", stroke: "#0f6b82", fg: "#ecfeff" },
  { fillTop: "#4f7fd1", fillBot: "#2e5599", stroke: "#1a3a6e", fg: "#f8fafc" },
] as const;

const MO_PALETTE_OVERRIDE: Record<string, number> = {
  "MO-10422": 0,
  "MO-10463": 5,
  "MO-10439": 3,
};

type RowDef = {
  id: string;
  kind: "WC" | "LG";
  code: string;
  label: string;
};

/** All layout in whole pixels — computed once at module load (no Math.sin / random / Date). */
type BarT = {
  id: string;
  row: number;
  lane: 0 | 1;
  leftPx: number;
  widthPx: number;
  topPx: number;
  mo: string;
  op?: string;
  chainId?: string;
  chainStep?: number;
  /** Day bucket index 0..DAYS-1 (relative to horizon anchor). */
  tooltipStartIdx: number;
  tooltipEndIdx: number;
};

type LinkT = {
  from: string;
  to: string;
  mo: string;
  /** Precomputed path in px (integers only in string) */
  d: string;
};

function moPaletteIndex(mo: string): number {
  if (mo in MO_PALETTE_OVERRIDE) return MO_PALETTE_OVERRIDE[mo];
  let h = 0;
  for (let i = 0; i < mo.length; i++) h = (h * 31 + mo.charCodeAt(i)) >>> 0;
  return h % MO_PALETTE.length;
}

function padMo(n: number): string {
  return `MO-${String(n).padStart(5, "0")}`;
}

const WC_NAMES = [
  "CNC Mill · A",
  "CNC Mill · B",
  "CNC Lathe · 1",
  "CNC Lathe · 2",
  "Assembly · L1",
  "Assembly · L2",
  "Paint · Booth",
  "Weld · Cell",
  "Press · 400T",
  "Grind · Fin",
  "Deburr",
  "Heat treat",
  "QC · Incoming",
  "QC · Final",
  "Kitting",
  "Pack · Ship",
  "Router · Fab",
  "Saw · Raw",
  "Mill · Proto",
  "EDM · Fine",
];

const LG_NAMES = [
  "Setup · A",
  "Setup · B",
  "Machinists · D",
  "Machinists · N",
  "Assembly · T1",
  "Assembly · T2",
  "Inspectors",
  "Paint crew",
  "Welders",
  "Material handlers",
  "Planner pool",
  "Scheduler",
  "Maintenance",
  "Tool crib",
  "Shipping clerks",
  "Receiving",
  "Engineering support",
  "Rework cell",
  "Training",
  "Float",
];

const ROWS: RowDef[] = (() => {
  const out: RowDef[] = [];
  for (let i = 0; i < WC_COUNT; i++) {
    const n = String(i + 1).padStart(3, "0");
    out.push({
      id: `wc-${n}`,
      kind: "WC",
      code: `WC-${n}`,
      label: WC_NAMES[i % WC_NAMES.length],
    });
  }
  for (let i = 0; i < WC_COUNT; i++) {
    const n = String(i + 1).padStart(3, "0");
    out.push({
      id: `lg-${n}`,
      kind: "LG",
      code: `LG-${n}`,
      label: LG_NAMES[i % LG_NAMES.length],
    });
  }
  return out;
})();

/** Lane 0: 9px bar from top+1; lane 1: 8px bar from top+10 (fits 18px row). */
function barTopPx(row: number, lane: 0 | 1): number {
  return row * ROW_H + (lane === 0 ? 1 : 10);
}

function barHeightPx(lane: 0 | 1): number {
  return lane === 0 ? 9 : 8;
}

function linkPathD(
  a: { leftPx: number; widthPx: number; row: number; lane: 0 | 1 },
  b: { leftPx: number; row: number; lane: 0 | 1 },
): string {
  const x1 = a.leftPx + a.widthPx;
  const y1 = a.row * ROW_H + (a.lane === 0 ? 6 : 14);
  const x2 = b.leftPx;
  const y2 = b.row * ROW_H + (b.lane === 0 ? 6 : 14);
  const midX = Math.round(x1 + (x2 - x1) * 0.45);
  return `M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`;
}

/** Build bars + links once — integer arithmetic only. */
function buildSchedule(): { bars: BarT[]; links: LinkT[] } {
  const bars: BarT[] = [];
  const PAD = TIMELINE_PAD_LEFT;

  const addBar = (b: BarT) => {
    bars.push(b);
  };

  const chainMo = "MO-90001";
  const chainSpecs: {
    id: string;
    row: number;
    lane: 0 | 1;
    startCol: number;
    widthCols: number;
    op: string;
    step: number;
  }[] = [
    { id: "b-chain-0", row: 2, lane: 0, startCol: 0, widthCols: 2, op: "Op10", step: 0 },
    { id: "b-chain-1", row: 5, lane: 0, startCol: 2, widthCols: 3, op: "Op20", step: 1 },
    { id: "b-chain-2", row: 8, lane: 0, startCol: 5, widthCols: 5, op: "Op30", step: 2 },
    { id: "b-chain-3", row: 12, lane: 0, startCol: 10, widthCols: 5, op: "Op40", step: 3 },
  ];

  for (const c of chainSpecs) {
    const leftPx = PAD + c.startCol * DAY_W;
    const widthPx = Math.max(4, c.widthCols * DAY_W);
    const endCol = c.startCol + c.widthCols - 1;
    addBar({
      id: c.id,
      row: c.row,
      lane: c.lane,
      leftPx,
      widthPx,
      topPx: barTopPx(c.row, c.lane),
      mo: chainMo,
      op: c.op,
      chainId: "c1",
      chainStep: c.step,
      tooltipStartIdx: c.startCol,
      tooltipEndIdx: endCol,
    });
  }

  const chainRows = new Set([2, 5, 8, 12]);
  let seq = 0;
  for (let r = 0; r < ROWS_TOTAL; r++) {
    const count = 2 + ((r * 7) % 3);
    for (let k = 0; k < count; k++) {
      if (chainRows.has(r) && k === 0) continue;
      const widthCols = 1 + ((r + k * 5) % 6);
      const maxStartCol = DAYS - widthCols;
      const slotCount = Math.max(1, maxStartCol - TODAY_INDEX + 1);
      const startCol = TODAY_INDEX + ((r * 11 + k * 13) % slotCount);
      const endCol = Math.min(DAYS - 1, startCol + widthCols - 1);
      const lane = ((r + k) % 2) as 0 | 1;
      const moNum = 10000 + ((r * 17 + k * 41) % 9000);
      const leftPx = PAD + startCol * DAY_W;
      const widthPx = Math.max(4, widthCols * DAY_W);
      const op = ((r + k * 3) % 5) > 2 ? `Op${10 * (1 + (k % 4))}` : undefined;
      const id = `b-${seq++}`;
      addBar({
        id,
        row: r,
        lane,
        leftPx,
        widthPx,
        topPx: barTopPx(r, lane),
        mo: padMo(moNum),
        op,
        tooltipStartIdx: startCol,
        tooltipEndIdx: endCol,
      });
    }
  }

  const b804a: BarT = {
    id: "b-80412-a",
    row: 15,
    lane: 0,
    leftPx: PAD + 2 * DAY_W,
    widthPx: 4 * DAY_W - 8,
    topPx: barTopPx(15, 0),
    mo: "MO-80412",
    op: "Op10",
    tooltipStartIdx: 2,
    tooltipEndIdx: 5,
  };
  const b804b: BarT = {
    id: "b-80412-b",
    row: 18,
    lane: 0,
    leftPx: PAD + 6 * DAY_W,
    widthPx: 4 * DAY_W - 6,
    topPx: barTopPx(18, 0),
    mo: "MO-80412",
    op: "Op20",
    tooltipStartIdx: 6,
    tooltipEndIdx: 9,
  };
  addBar(b804a);
  addBar(b804b);

  addBar({
    id: "b-demo-10422",
    row: 0,
    lane: 1,
    leftPx: PAD + 7 * DAY_W + 6,
    widthPx: 2 * DAY_W - 10,
    topPx: barTopPx(0, 1),
    mo: "MO-10422",
    op: "Op20",
    tooltipStartIdx: 7,
    tooltipEndIdx: 9,
  });
  addBar({
    id: "b-demo-10463",
    row: 1,
    lane: 1,
    leftPx: PAD + 11 * DAY_W,
    widthPx: 3 * DAY_W - 4,
    topPx: barTopPx(1, 1),
    mo: "MO-10463",
    op: "Op10",
    tooltipStartIdx: 11,
    tooltipEndIdx: 13,
  });
  addBar({
    id: "b-demo-10439",
    row: 3,
    lane: 1,
    leftPx: PAD + 4 * DAY_W,
    widthPx: 3 * DAY_W - 6,
    topPx: barTopPx(3, 1),
    mo: "MO-10439",
    op: "Op30",
    tooltipStartIdx: 4,
    tooltipEndIdx: 6,
  });

  const links: LinkT[] = [];
  const chainBars = bars.filter((b) => b.chainId === "c1").sort((a, b) => (a.chainStep ?? 0) - (b.chainStep ?? 0));
  for (let i = 0; i < chainBars.length - 1; i++) {
    const a = chainBars[i];
    const b = chainBars[i + 1];
    links.push({
      from: a.id,
      to: b.id,
      mo: chainMo,
      d: linkPathD(a, b),
    });
  }
  links.push({
    from: b804a.id,
    to: b804b.id,
    mo: "MO-80412",
    d: linkPathD(b804a, b804b),
  });

  return { bars, links };
}

const { bars: STATIC_BARS, links: STATIC_LINKS } = buildSchedule();

export function CognitumPreview() {
  const uid = useId().replace(/:/g, "");
  const markerId = `cog-arr-${uid}`;

  /** Local midnight anchor — set after mount so SSR + first paint match (no hydration mismatch). */
  const [horizonAnchor, setHorizonAnchor] = useState<Date | null>(null);
  useEffect(() => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    setHorizonAnchor(t);
  }, []);

  const bars = STATIC_BARS;
  const links = STATIC_LINKS;

  const timelineHeaderCells = useMemo(() => {
    if (!horizonAnchor) {
      return Array.from({ length: DAYS }, () => ({ dow: "—", md: "·" as string }));
    }
    return Array.from({ length: DAYS }, (_, i) => formatDayLabel(horizonAnchor, i));
  }, [horizonAnchor]);

  const horizonSubtitle = useMemo(() => {
    if (!horizonAnchor) return `${DAYS}-day forward horizon`;
    const { md } = formatDayLabel(horizonAnchor, 0);
    return `From ${md} · ${DAYS}-day horizon`;
  }, [horizonAnchor]);

  const moColorIndex = useMemo(() => {
    const m = new Map<string, number>();
    for (const b of bars) {
      if (!m.has(b.mo)) m.set(b.mo, moPaletteIndex(b.mo));
    }
    return m;
  }, [bars]);

  const [selectedMo, setSelectedMo] = useState<string | null>(null);
  /** Shown only after TOOLTIP_SHOW_DELAY_MS; anchor fixed at bar center-bottom when hover starts (no mouse chase). */
  const [barTooltip, setBarTooltip] = useState<{
    bar: BarT;
    anchorLeft: number;
    anchorTop: number;
  } | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const suppressNextClickRef = useRef(false);
  const dragMovedRef = useRef(false);
  const tooltipTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /** Preview-only drag: horizontal offset from schedule data; cleared on pointer up. */
  const [barDrag, setBarDrag] = useState<{
    barId: string;
    startClientX: number;
    offsetX: number;
  } | null>(null);
  const barDragRef = useRef(barDrag);
  barDragRef.current = barDrag;

  useEffect(() => {
    if (!barDrag) return;
    const prevCursor = document.body.style.cursor;
    const prevUserSelect = document.body.style.userSelect;
    document.body.style.cursor = "grabbing";
    document.body.style.userSelect = "none";
    return () => {
      document.body.style.cursor = prevCursor;
      document.body.style.userSelect = prevUserSelect;
    };
  }, [barDrag]);

  useEffect(() => {
    return () => {
      if (tooltipTimerRef.current !== null) {
        clearTimeout(tooltipTimerRef.current);
        tooltipTimerRef.current = null;
      }
    };
  }, []);

  /** Dependency / link emphasis follows selection only — clears when deselected (hover keeps tooltip only). */
  const focusMo = selectedMo;

  const clearTooltipSchedule = useCallback(() => {
    if (tooltipTimerRef.current !== null) {
      clearTimeout(tooltipTimerRef.current);
      tooltipTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    const onDocMouseDown = (e: globalThis.MouseEvent) => {
      if (!panelRef.current?.contains(e.target as Node)) {
        setSelectedMo(null);
      }
    };
    document.addEventListener("mousedown", onDocMouseDown);
    return () => document.removeEventListener("mousedown", onDocMouseDown);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedMo(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const onPanelClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("[data-cog-bar]")) return;
    setSelectedMo(null);
  }, []);

  const depSet = useMemo(() => {
    if (!focusMo) return new Set<string>();
    const related = new Set<string>();
    bars.filter((b) => b.mo === focusMo).forEach((b) => related.add(b.id));
    links.forEach((l) => {
      const fb = bars.find((x) => x.id === l.from);
      const tb = bars.find((x) => x.id === l.to);
      if (fb?.mo === focusMo || tb?.mo === focusMo) {
        related.add(l.from);
        related.add(l.to);
      }
    });
    return related;
  }, [focusMo, bars, links]);

  const visibleLinks = useMemo(() => {
    if (!focusMo) return links;
    return links.filter((l) => {
      const fb = bars.find((b) => b.id === l.from);
      const tb = bars.find((b) => b.id === l.to);
      return fb?.mo === focusMo || tb?.mo === focusMo;
    });
  }, [focusMo, links, bars]);

  const onBarMouseEnter = useCallback(
    (bar: BarT, e: React.MouseEvent<HTMLButtonElement>) => {
      clearTooltipSchedule();
      setBarTooltip(null);
      const rect = e.currentTarget.getBoundingClientRect();
      const anchorLeft = rect.left + rect.width / 2;
      const anchorTop = rect.bottom + 6;
      tooltipTimerRef.current = setTimeout(() => {
        setBarTooltip({ bar, anchorLeft, anchorTop });
        tooltipTimerRef.current = null;
      }, TOOLTIP_SHOW_DELAY_MS);
    },
    [clearTooltipSchedule],
  );

  const onBarMouseLeave = useCallback(() => {
    clearTooltipSchedule();
    setBarTooltip(null);
  }, [clearTooltipSchedule]);

  const endBarDrag = useCallback((e: React.PointerEvent<HTMLButtonElement>, bar: BarT, moved: boolean) => {
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* already released */
    }
    if (moved) {
      suppressNextClickRef.current = true;
      setSelectedMo(bar.mo);
    }
    setBarDrag(null);
    dragMovedRef.current = false;
  }, []);

  const onBarPointerDown = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>, bar: BarT) => {
      if (e.button !== 0) return;
      e.stopPropagation();
      clearTooltipSchedule();
      setBarTooltip(null);
      e.currentTarget.setPointerCapture(e.pointerId);
      dragMovedRef.current = false;
      setBarDrag({ barId: bar.id, startClientX: e.clientX, offsetX: 0 });
    },
    [clearTooltipSchedule],
  );

  const onBarPointerMove = useCallback((e: React.PointerEvent<HTMLButtonElement>, bar: BarT) => {
    setBarDrag((d) => {
      if (!d || d.barId !== bar.id) return d;
      const dx = e.clientX - d.startClientX;
      if (Math.abs(dx) > DRAG_THRESHOLD_PX) dragMovedRef.current = true;
      const minOff = TIMELINE_PAD_LEFT - bar.leftPx;
      const maxOff = TIMELINE_W - bar.widthPx - bar.leftPx;
      const offsetX = Math.round(Math.min(maxOff, Math.max(minOff, dx)));
      return { ...d, offsetX };
    });
  }, []);

  const onBarPointerUp = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>, bar: BarT) => {
      const d = barDragRef.current;
      if (!d || d.barId !== bar.id) return;
      const moved =
        dragMovedRef.current || Math.abs(d.offsetX) >= DRAG_THRESHOLD_PX;
      endBarDrag(e, bar, moved);
    },
    [endBarDrag],
  );

  const onBarPointerCancel = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>, bar: BarT) => {
      const d = barDragRef.current;
      if (!d || d.barId !== bar.id) return;
      endBarDrag(e, bar, false);
    },
    [endBarDrag],
  );

  const kpis = [
    { k: "Utilization", v: "78.4%" },
    { k: "Late Orders", v: "3" },
    { k: "Bottleneck", v: "WC-012" },
  ];

  return (
    <div
      ref={panelRef}
      className="rounded-[28px] border border-slate-200 bg-white p-3 shadow-[0_20px_80px_-20px_rgba(15,23,42,0.18)]"
      onClick={onPanelClick}
    >
      <div className="rounded-[22px] border border-slate-200 bg-slate-50">
        <div className="flex items-start justify-between gap-2 border-b border-slate-200/90 px-3 py-1.5">
          <div className="min-w-0">
            <div className="text-[13px] font-semibold leading-tight tracking-tight text-slate-900">
              Cognitum APS — Schedule
            </div>
            <div className="mt-px text-[11px] leading-tight text-slate-500">
              Finite capacity · {horizonSubtitle} · {bars.length} operations
            </div>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-px">
            <span className="rounded-full bg-blue-100 px-2 py-px text-[10px] font-semibold leading-tight text-blue-700">
              Workbench
            </span>
            <span className="text-[9px] leading-tight text-slate-400">
              {selectedMo ? `Selected ${selectedMo}` : "Hover or click a bar"}
            </span>
          </div>
        </div>

        <div className="max-h-[min(315px,39vh)] overflow-y-auto overflow-x-hidden px-1.5 py-1.5">
          {/* Resource column is outside horizontal scroll; only the timeline region scrolls on X. Vertical scroll is shared via the outer container. */}
          <div className="flex min-h-0 min-w-0 items-stretch overflow-hidden rounded-xl border border-slate-200 bg-white">
            <div className="w-[148px] shrink-0 border-r border-slate-200 bg-slate-50 shadow-[1px_0_0_rgba(15,23,42,0.06)]">
              <div className="sticky top-0 z-[51] flex h-[24px] items-end border-b border-slate-200 bg-slate-100 px-2 pb-0.5">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Resource
                </span>
              </div>
              {ROWS.map((row, i) => (
                <div
                  key={row.id}
                  className={`flex h-[18px] items-center border-b border-slate-100 px-1.5 last:border-b-0 ${
                    i % 2 === 0 ? "bg-white" : "bg-slate-50"
                  }`}
                >
                  <span className="w-[38px] shrink-0 font-mono text-[9px] font-semibold text-slate-500">
                    {row.code}
                  </span>
                  <span className="min-w-0 truncate text-[10px] leading-none text-slate-800">{row.label}</span>
                </div>
              ))}
            </div>

            <div className="min-h-0 min-w-0 flex-1 overflow-x-auto overscroll-x-contain">
              <div style={{ width: TIMELINE_W }} className="relative z-10 bg-white">
              <div
                className="sticky top-0 z-20 flex border-b border-slate-200 bg-slate-100"
                style={{ width: TIMELINE_W, height: 24 }}
              >
                <div
                  className="shrink-0 border-r border-slate-200 bg-slate-100"
                  style={{ width: TIMELINE_PAD_LEFT }}
                  aria-hidden
                />
                {timelineHeaderCells.map((cell, d) => {
                  const isToday = d === TODAY_INDEX;
                  const isNearTerm =
                    d >= NEAR_TERM_START && d < NEAR_TERM_END_EXCLUSIVE && !isToday;
                  return (
                    <div
                      key={d}
                      className={`flex shrink-0 flex-col items-center justify-end pb-px text-center ${
                        isToday
                          ? "bg-blue-50/90"
                          : isNearTerm
                            ? "bg-sky-50/55"
                            : d % 2 === 0
                              ? "bg-white/50"
                              : "bg-slate-50/40"
                      } ${d < DAYS - 1 ? "border-r border-slate-100" : ""}`}
                      style={{ width: DAY_W }}
                    >
                      <span className="text-[9px] font-semibold text-slate-800">{cell.dow}</span>
                      <span className="text-[8px] leading-none text-slate-500">{cell.md}</span>
                    </div>
                  );
                })}
              </div>

              <div className="relative" style={{ width: TIMELINE_W, height: ROWS_TOTAL * ROW_H }}>
                <div className="pointer-events-none absolute inset-0">
                  {Array.from({ length: DAYS }, (_, d) =>
                    d >= NEAR_TERM_START && d < NEAR_TERM_END_EXCLUSIVE ? (
                      <div
                        key={`near-bg-${d}`}
                        className="absolute top-0 bg-sky-50/30"
                        style={{
                          left: TIMELINE_PAD_LEFT + d * DAY_W,
                          width: DAY_W,
                          height: ROWS_TOTAL * ROW_H,
                          zIndex: 0,
                        }}
                      />
                    ) : null,
                  )}
                  {Array.from({ length: DAYS + 1 }, (_, d) => (
                    <div
                      key={d}
                      className="absolute top-0 border-l border-slate-100/90"
                      style={{
                        left: TIMELINE_PAD_LEFT + d * DAY_W,
                        height: ROWS_TOTAL * ROW_H,
                        zIndex: 1,
                      }}
                    />
                  ))}
                  <div
                    className="absolute top-0 z-[5] rounded-full bg-sky-500"
                    style={{
                      left: TIMELINE_PAD_LEFT,
                      width: 2,
                      height: ROWS_TOTAL * ROW_H,
                      boxShadow: "0 0 0 1px rgba(125,211,252,0.45), 0 0 12px rgba(14,165,233,0.35)",
                    }}
                    aria-hidden
                  />
                </div>

                {ROWS.map((_, ri) => (
                  <div
                    key={ri}
                    className={`absolute left-0 right-0 border-b border-slate-100 last:border-b-0 ${
                      ri % 2 === 0 ? "bg-white" : "bg-slate-50"
                    }`}
                    style={{ top: ri * ROW_H, height: ROW_H }}
                  />
                ))}

                <svg
                  className="pointer-events-none absolute left-0 top-0 z-[6] overflow-visible"
                  width={TIMELINE_W}
                  height={ROWS_TOTAL * ROW_H}
                >
                  <defs>
                    {/* Default: muted slate — always readable */}
                    <marker
                      id={`${markerId}-def`}
                      markerWidth="5"
                      markerHeight="5"
                      refX="4"
                      refY="2.5"
                      orient="auto"
                      markerUnits="userSpaceOnUse"
                    >
                      <polygon points="0 0, 5 2.5, 0 5" fill="#64748b" />
                    </marker>
                    {/* Selected chain: enterprise blue */}
                    <marker
                      id={`${markerId}-focus`}
                      markerWidth="6"
                      markerHeight="6"
                      refX="4.8"
                      refY="3"
                      orient="auto"
                      markerUnits="userSpaceOnUse"
                    >
                      <polygon points="0 0, 6 3, 0 6" fill="#1d4ed8" />
                    </marker>
                    {/* Other links while a bar is selected — still visible, de-emphasized */}
                    <marker
                      id={`${markerId}-dim`}
                      markerWidth="4.5"
                      markerHeight="4.5"
                      refX="3.6"
                      refY="2.25"
                      orient="auto"
                      markerUnits="userSpaceOnUse"
                    >
                      <polygon points="0 0, 4.5 2.25, 0 4.5" fill="#94a3b8" />
                    </marker>
                  </defs>
                  {visibleLinks.map((l) => {
                    const a = bars.find((b) => b.id === l.from);
                    const b = bars.find((x) => x.id === l.to);
                    if (!a || !b) return null;
                    const touchesFocus =
                      Boolean(focusMo) &&
                      (a.mo === focusMo || b.mo === focusMo || l.mo === focusMo);
                    const stroke = !focusMo
                      ? "#64748b"
                      : touchesFocus
                        ? "#1d4ed8"
                        : "#94a3b8";
                    const strokeWidth = !focusMo ? 0.72 : touchesFocus ? 1.22 : 0.58;
                    const opacity = !focusMo ? 0.82 : touchesFocus ? 0.96 : 0.46;
                    const markerEnd = !focusMo
                      ? `url(#${markerId}-def)`
                      : touchesFocus
                        ? `url(#${markerId}-focus)`
                        : `url(#${markerId}-dim)`;
                    return (
                      <path
                        key={`${l.from}-${l.to}`}
                        d={l.d}
                        fill="none"
                        stroke={stroke}
                        strokeWidth={strokeWidth}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        opacity={opacity}
                        markerEnd={markerEnd}
                        className="transition-[stroke,stroke-width,opacity] duration-200 ease-out"
                      />
                    );
                  })}
                </svg>

                {bars.map((bar) => {
                  const pi = moColorIndex.get(bar.mo) ?? 0;
                  const pal = MO_PALETTE[pi];
                  const sel = selectedMo && bar.mo === selectedMo;
                  const inFocus = focusMo && (bar.mo === focusMo || depSet.has(bar.id));
                  const muted = focusMo && bar.mo !== focusMo && !depSet.has(bar.id);
                  const bh = barHeightPx(bar.lane);
                  const grad = `linear-gradient(180deg, ${pal.fillTop} 0%, ${pal.fillBot} 100%)`;
                  const isDragging = barDrag?.barId === bar.id;
                  const dragOffsetX = isDragging ? barDrag.offsetX : 0;
                  return (
                    <Fragment key={bar.id}>
                      {isDragging ? (
                        <div
                          className="pointer-events-none absolute z-[7] rounded-[2px] border border-dashed border-slate-400/50 bg-slate-200/40 shadow-[inset_0_1px_2px_rgba(15,23,42,0.06)]"
                          style={{
                            left: bar.leftPx,
                            top: bar.topPx,
                            width: bar.widthPx,
                            height: bh,
                          }}
                          aria-hidden
                        />
                      ) : null}
                      <button
                        type="button"
                        data-cog-bar
                        className={[
                          "absolute rounded-[2px] border text-left outline-none touch-none select-none",
                          isDragging
                            ? [
                                "z-[30] cursor-grabbing",
                                "scale-[1.012] -translate-y-px",
                                "shadow-[0_10px_28px_rgba(15,23,42,0.22),0_2px_6px_rgba(15,23,42,0.12),inset_0_1px_0_rgba(255,255,255,0.32)]",
                                "brightness-[1.02]",
                              ].join(" ")
                            : [
                                "z-[8] cursor-grab active:cursor-grabbing",
                                "transition-[box-shadow,filter] duration-100 ease-out",
                                "shadow-[0_1px_2px_rgba(15,23,42,0.12),inset_0_1px_0_rgba(255,255,255,0.22),inset_0_-1px_0_rgba(15,23,42,0.18)]",
                                "hover:z-[12] hover:brightness-[1.04]",
                                "hover:shadow-[0_4px_14px_rgba(15,23,42,0.15),inset_0_1px_0_rgba(255,255,255,0.28),inset_0_-1px_0_rgba(15,23,42,0.1)]",
                                !sel ? "hover:ring-1 hover:ring-white/20" : "",
                                "active:brightness-[0.98]",
                                "active:shadow-[inset_0_2px_5px_rgba(15,23,42,0.12),0_1px_1px_rgba(15,23,42,0.08)]",
                              ].join(" "),
                          sel
                            ? "ring-2 ring-blue-500/50 ring-offset-1 ring-offset-white hover:ring-blue-500/65 hover:brightness-[1.03]"
                            : inFocus && focusMo
                              ? "ring-1 ring-slate-400/45"
                              : "",
                          muted && !isDragging ? "opacity-[0.36]" : "opacity-100",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                        style={{
                          left: bar.leftPx + dragOffsetX,
                          width: bar.widthPx,
                          top: bar.topPx,
                          height: bh,
                          backgroundImage: grad,
                          borderColor: sel ? "#60a5fa" : pal.stroke,
                          borderWidth: 1,
                          borderStyle: "solid",
                          transition: isDragging ? "none" : undefined,
                        }}
                        onPointerDown={(e) => onBarPointerDown(e, bar)}
                        onPointerMove={(e) => onBarPointerMove(e, bar)}
                        onPointerUp={(e) => onBarPointerUp(e, bar)}
                        onPointerCancel={(e) => onBarPointerCancel(e, bar)}
                        onMouseEnter={(e) => onBarMouseEnter(bar, e)}
                        onMouseLeave={onBarMouseLeave}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (suppressNextClickRef.current) {
                            suppressNextClickRef.current = false;
                            return;
                          }
                          setSelectedMo(bar.mo);
                        }}
                      >
                        <span
                          className="pointer-events-none flex h-full flex-col justify-center overflow-hidden px-0.5 leading-none drop-shadow-[0_1px_0_rgba(0,0,0,0.15)]"
                          style={{ color: pal.fg }}
                        >
                          <span className="truncate text-[7px] font-bold tracking-tight">{bar.mo}</span>
                          {bar.op ? (
                            <span className="truncate text-[6px] font-semibold opacity-90">{bar.op}</span>
                          ) : null}
                        </span>
                      </button>
                    </Fragment>
                  );
                })}
              </div>
            </div>
          </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-px border-t border-slate-200/70 bg-slate-100/80 px-2.5 py-1">
          {kpis.map((x) => (
            <div key={x.k} className="rounded-md bg-slate-50/95 px-1.5 py-1">
              <div className="text-[7px] font-medium uppercase tracking-[0.16em] text-slate-400">{x.k}</div>
              <div className="mt-px text-[10px] font-semibold tabular-nums leading-tight text-slate-900">{x.v}</div>
            </div>
          ))}
        </div>
      </div>

      {barTooltip && (
        <div
          className="pointer-events-none fixed z-[100] w-max max-w-[min(260px,calc(100vw-24px))] rounded-lg border border-slate-200/90 bg-white px-2.5 py-2 text-[10px] text-slate-800 shadow-[0_12px_40px_-12px_rgba(15,23,42,0.2)]"
          style={{
            left: barTooltip.anchorLeft,
            top: barTooltip.anchorTop,
            transform: "translateX(-50%)",
          }}
        >
          <div className="font-semibold text-slate-900">{barTooltip.bar.mo}</div>
          <div className="mt-0.5 text-slate-600">
            {barTooltip.bar.op ?? "—"} · {ROWS[barTooltip.bar.row]?.code ?? ""}
          </div>
          <div className="mt-1 tabular-nums text-slate-500">
            {horizonAnchor
              ? (() => {
                  const s = formatDayLabel(horizonAnchor, barTooltip.bar.tooltipStartIdx);
                  const e = formatDayLabel(horizonAnchor, barTooltip.bar.tooltipEndIdx);
                  return `${s.dow} ${s.md} → ${e.dow} ${e.md}`;
                })()
              : "— → —"}
          </div>
        </div>
      )}
    </div>
  );
}
