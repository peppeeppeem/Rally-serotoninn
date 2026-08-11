"use client";

import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";

export type CartItem = {
  productId: string;
  slug: string;
  name: string;
  colorway: string;
  hex: string;
  price: number;
  quantity: number;
};

type CartCtx = {
  items: CartItem[];
  count: number;
  subtotal: number;
  add: (item: Omit<CartItem, "quantity">, qty?: number) => void;
  setQty: (productId: string, colorway: string, qty: number) => void;
  remove: (productId: string, colorway: string) => void;
  clear: () => void;
  open: boolean;
  setOpen: (v: boolean) => void;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "rally-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem(KEY, JSON.stringify(items));
  }, [items, ready]);

  function add(item: Omit<CartItem, "quantity">, qty = 1) {
    setItems((prev) => {
      const i = prev.findIndex((x) => x.productId === item.productId && x.colorway === item.colorway);
      if (i >= 0) {
        const next = [...prev];
        next[i] = { ...next[i], quantity: next[i].quantity + qty };
        return next;
      }
      return [...prev, { ...item, quantity: qty }];
    });
    setOpen(true);
  }

  function setQty(productId: string, colorway: string, qty: number) {
    setItems((prev) =>
      prev
        .map((x) => (x.productId === productId && x.colorway === colorway ? { ...x, quantity: qty } : x))
        .filter((x) => x.quantity > 0)
    );
  }

  function remove(productId: string, colorway: string) {
    setItems((prev) => prev.filter((x) => !(x.productId === productId && x.colorway === colorway)));
  }

  function clear() {
    setItems([]);
  }

  const count = useMemo(() => items.reduce((s, x) => s + x.quantity, 0), [items]);
  const subtotal = useMemo(() => items.reduce((s, x) => s + x.price * x.quantity, 0), [items]);

  return (
    <Ctx.Provider value={{ items, count, subtotal, add, setQty, remove, clear, open, setOpen }}>
      {children}
    </Ctx.Provider>
  );
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
