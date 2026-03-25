import { atom } from "jotai";

export type DrawerType = "menu" | "cart" | "search" | "auth" | null;

export const drawerAtom = atom<DrawerType>(null);

export const openMenuAtom = atom(null, (get, set) => {
  set(drawerAtom, "menu");
});

export const openCartAtom = atom(null, (get, set) => {
  set(drawerAtom, "cart");
});

export const openSearchAtom = atom(null, (get, set) => {
  set(drawerAtom, "search");
});

export const openAuthAtom = atom(null, (get, set) => {
  set(drawerAtom, "auth");
});

export const closeDrawerAtom = atom(null, (get, set) => {
  set(drawerAtom, null);
});
