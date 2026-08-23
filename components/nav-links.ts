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

/** Homepage section anchors (Services, About, Contact, etc.). */
export function sectionHref(segment: string, onHomepage: boolean) {
  return onHomepage ? `#${segment}` : `/#${segment}`;
}

/** Dedicated AIORIE Labs product pages — always route-based, never hash links. */
export function productHref(segment: string) {
  return `/${segment}`;
}

export function isLabsSubmenu(
  item: NavItem,
): item is { label: "AIORIE Labs"; submenu: NavLink[] } {
  return "submenu" in item;
}
