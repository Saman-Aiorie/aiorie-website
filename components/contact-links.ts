/** Override with NEXT_PUBLIC_CALENDLY_URL in `.env.local` if the booking link changes. */
const DEFAULT_CALENDLY_URL = "https://calendly.com/saman-aiorie/30min";

export const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL &&
  /^https?:\/\//i.test(process.env.NEXT_PUBLIC_CALENDLY_URL)
    ? process.env.NEXT_PUBLIC_CALENDLY_URL
    : DEFAULT_CALENDLY_URL;

export const CONTACT_EMAIL = "saman@aiorie.com";

export function mailtoHref(subject: string) {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;
}
