import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateBookingRef(date: Date = new Date()): string {
  const datePart = date.toISOString().slice(0, 10).replace(/-/g, "");
  const rand = Math.random().toString(16).slice(2, 6).toUpperCase();
  return `YK-${datePart}-${rand}`;
}

/** Converts a PH mobile number (e.g. "0917-816-7129") to a viber.me link with country code. */
export function toViberMeLink(mobile: string): string {
  const digits = mobile.replace(/\D/g, "");
  const ph = digits.startsWith("0") ? "63" + digits.slice(1) : digits;
  return `https://viber.me/${ph}`;
}
