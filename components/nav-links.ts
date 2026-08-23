export type NavLink = {
  label: string;
  segment: string;
};

export type NavItem =
  | NavLink
  | {
      label: "AIORIE Labs";
      submenu: NavLink[];
    };

export const NAV_ITEMS: NavItem[] = [
  { label: "Services", segment: "services" },
  { label: "Industries", segment: "industries" },
  {
    label: "AIORIE Labs",
    submenu: [
      { label: "Cognitum APS", segment: "cognitum-aps" },
      { label: "Cognitum QMAN", segment: "cognitum-qman" },
    ],
  },
  { label: "About", segment: "about" },
  { label: "Contact", segment: "contact" },
];

export const LABS_SUBMENU = [
  { label: "Cognitum APS", segment: "cognitum-aps" },
  { label: "Cognitum QMAN", segment: "cognitum-qman" },
] as const;

export function navHref(segment: string, home: boolean) {
  return home ? `#${segment}` : `/#${segment}`;
}

export function isLabsSubmenu(
  item: NavItem,
): item is { label: "AIORIE Labs"; submenu: NavLink[] } {
  return "submenu" in item;
}
