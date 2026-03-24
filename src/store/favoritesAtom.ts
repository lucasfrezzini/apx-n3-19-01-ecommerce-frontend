import { atom } from "jotai";

const STORAGE_VERSION = "v1";
const FAVORITES_KEY = `favorites:${STORAGE_VERSION}`;

export const favoritesAtom = atom<string[]>([]);

export const hydrateFavoritesAtom = atom(null, (get, set) => {
  if (typeof window === "undefined") return;

  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    if (stored) {
      set(favoritesAtom, JSON.parse(stored));
    }
  } catch (error) {
    console.error("Failed to hydrate favorites:", error);
    localStorage.removeItem(FAVORITES_KEY);
  }
});

const persist = (favorites: string[]) => {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error("Failed to persist favorites:", error);
  }
};

export const toggleFavoriteAtom = atom(null, (get, set, productId: string) => {
  const favorites = get(favoritesAtom);
  const newFavorites = favorites.includes(productId)
    ? favorites.filter((id) => id !== productId)
    : [...favorites, productId];

  set(favoritesAtom, newFavorites);
  persist(newFavorites);
});

export const isFavoriteAtom = atom((get) => (productId: string) => {
  const favorites = get(favoritesAtom);
  return favorites.includes(productId);
});
