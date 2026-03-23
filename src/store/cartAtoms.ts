import { atom } from "jotai";

export type CartProduct = {
  id: string;
  name: string;
  price: number;
  image: string;
};

export type CartItem = CartProduct & {
  quantity: number;
};

/* ---------------- CART STATE ---------------- */

export const cartAtom = atom<CartItem[]>([]);

/* ---------------- LOCALSTORAGE VERSION ---------------- */

const STORAGE_VERSION = "v1";
const CART_KEY = `cart:${STORAGE_VERSION}`;

/* ---------------- LOAD LOCALSTORAGE ---------------- */

export const hydrateCartAtom = atom(null, (get, set) => {
  if (typeof window === "undefined") return;
  
  try {
    const stored = localStorage.getItem(CART_KEY);
    if (stored) {
      set(cartAtom, JSON.parse(stored));
    }
  } catch (error) {
    console.error("Failed to hydrate cart:", error);
    localStorage.removeItem(CART_KEY);
  }
});

/* ---------------- SAVE ---------------- */

const persist = (cart: CartItem[]) => {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error("Failed to persist cart:", error);
  }
};

/* ---------------- ADD ---------------- */

export const addToCartAtom = atom(null, (get, set, product: CartProduct) => {
  const cart = get(cartAtom);

  const existing = cart.find((i) => i.id === product.id);

  let newCart;

  if (existing) {
    newCart = cart.map((i) =>
      i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
    );
  } else {
    newCart = [...cart, { ...product, quantity: 1 }];
  }

  set(cartAtom, newCart);
  persist(newCart);
});

/* ---------------- REMOVE ---------------- */

export const removeFromCartAtom = atom(null, (get, set, id: string) => {
  const cart = get(cartAtom).filter((item) => item.id !== id);

  set(cartAtom, cart);
  persist(cart);
});

/* ---------------- UPDATE QTY ---------------- */

export const updateQtyAtom = atom(
  null,
  (get, set, payload: { id: string; quantity: number }) => {
    const cart = get(cartAtom).map((item) =>
      item.id === payload.id ? { ...item, quantity: payload.quantity } : item
    );

    set(cartAtom, cart);
    persist(cart);
  }
);

/* ---------------- DERIVED ---------------- */

export const cartTotalAtom = atom((get) =>
  get(cartAtom).reduce((acc, item) => acc + item.price * item.quantity, 0)
);

export const cartCountAtom = atom((get) =>
  get(cartAtom).reduce((acc, item) => acc + item.quantity, 0)
);
