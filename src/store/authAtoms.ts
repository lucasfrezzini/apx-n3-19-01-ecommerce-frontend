import { atom } from "jotai";
import { apiClient, User } from "../../apiClient";

const AUTH_KEY = "auth:v1";

export const tokenAtom = atom<string | null>(null);
export const userAtom = atom<User | null>(null);
export const authLoadingAtom = atom(false);

export const hydrateAuthAtom = atom(null, async (get, set) => {
  if (typeof window === "undefined") return;

  try {
    const stored = localStorage.getItem(AUTH_KEY);
    if (stored) {
      const { token } = JSON.parse(stored);
      if (token) {
        set(tokenAtom, token);
        const result = await apiClient.getMe(token);
        if (result.success) {
          set(userAtom, result.user);
        } else {
          localStorage.removeItem(AUTH_KEY);
          set(tokenAtom, null);
        }
      }
    }
  } catch (error) {
    console.error("Failed to hydrate auth:", error);
    localStorage.removeItem(AUTH_KEY);
  }
});

export const sendCodeAtom = atom(null, async (get, set, email: string) => {
  set(authLoadingAtom, true);
  try {
    const result = await apiClient.sendCode(email);
    return result;
  } finally {
    set(authLoadingAtom, false);
  }
});

export const verifyCodeAtom = atom(
  null,
  async (get, set, payload: { email: string; code: string }) => {
    set(authLoadingAtom, true);
    try {
      const result = await apiClient.verifyCode(payload.email, payload.code);
      if (result.success) {
        const token = result.token;
        set(tokenAtom, token);
        localStorage.setItem(AUTH_KEY, JSON.stringify({ token }));
        const userResult = await apiClient.getMe(token);
        if (userResult.success) {
          set(userAtom, userResult.user);
        }
      }
      return result;
    } finally {
      set(authLoadingAtom, false);
    }
  },
);

export const logoutAtom = atom(null, (get, set) => {
  set(tokenAtom, null);
  set(userAtom, null);
  localStorage.removeItem(AUTH_KEY);
});
