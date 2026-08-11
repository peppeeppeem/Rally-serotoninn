/** Format an integer USD amount, e.g. 120 -> "$120.00". */
export function thb(amount: number): string {
  return "$" + amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

/** Alias with the correct name; `thb` kept for call-site compatibility. */
export const usd = thb;

/** Percentage saved between compareAt and price, rounded. */
export function salePct(price: number, compareAt?: number | null): number | null {
  if (!compareAt || compareAt <= price) return null;
  return Math.round(((compareAt - price) / compareAt) * 100);
}

export function orderNumber(seq: number): string {
  return "RM-" + String(1000 + seq).padStart(4, "0");
}
