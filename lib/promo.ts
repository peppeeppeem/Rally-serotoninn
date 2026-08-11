export type Promo = { code: string; label: string; kind: "pct" | "fixed"; value: number };

export const PROMOS: Record<string, Promo> = {
  WELCOME10: { code: "WELCOME10", label: "10% off — first order", kind: "pct", value: 10 },
  RALLY15: { code: "RALLY15", label: "15% off — members", kind: "pct", value: 15 },
  MOVEMENT: { code: "MOVEMENT", label: "$15 off", kind: "fixed", value: 15 },
};

export const FREE_SHIP_THRESHOLD = 150;
export const SHIPPING_FLAT = 12;

export function applyPromo(subtotal: number, code?: string | null): number {
  if (!code) return 0;
  const p = PROMOS[code.toUpperCase()];
  if (!p) return 0;
  if (p.kind === "pct") return Math.round((subtotal * p.value) / 100);
  return Math.min(p.value, subtotal);
}

export function shippingFor(subtotal: number): number {
  return subtotal >= FREE_SHIP_THRESHOLD ? 0 : SHIPPING_FLAT;
}
