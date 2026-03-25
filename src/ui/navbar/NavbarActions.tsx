"use client";

import { useState, useRef, useEffect } from "react";
import { useAtom } from "jotai";
import {
  openMenuAtom,
  openCartAtom,
  openSearchAtom,
  openAuthAtom,
} from "@/src/store/uiAtoms";
import { cartCountAtom } from "@/src/store/cartAtoms";
import { userAtom, logoutAtom, tokenAtom } from "@/src/store/authAtoms";
import Link from "next/link";

type Props = {
  variant: "menu" | "actions";
};

export default function NavbarActions({ variant }: Props) {
  const [, openMenu] = useAtom(openMenuAtom);
  const [, openCart] = useAtom(openCartAtom);
  const [, openSearch] = useAtom(openSearchAtom);
  const [, openAuth] = useAtom(openAuthAtom);
  const [, logout] = useAtom(logoutAtom);
  const [count] = useAtom(cartCountAtom);
  const [user] = useAtom(userAtom);
  const [token] = useAtom(tokenAtom);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleUserClick = () => {
    if (user) {
      setDropdownOpen(!dropdownOpen);
    } else {
      openAuth();
    }
  };

  const handleLogout = () => {
    setDropdownOpen(false);
    logout();
  };

  if (variant === "menu") {
    return (
      <button onClick={openMenu} className="md:hidden" aria-label="Menu">
        <svg width="21" height="15" viewBox="0 0 21 15">
          <rect width="21" height="1.5" rx=".75" />
          <rect x="8" y="6" width="13" height="1.5" rx=".75" />
          <rect x="6" y="13" width="15" height="1.5" rx=".75" />
        </svg>
      </button>
    );
  }

  return (
    <div className="flex items-center gap-6">
      <button onClick={openSearch} aria-label="Search">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </button>

      <button onClick={openCart} className="relative" aria-label="Cart">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6 text-primary hover:text-primary/70"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
          />
        </svg>

        {count > 0 && (
          <span className="absolute -top-2 left-4 rounded-full bg-red-500 p-0.5 px-1.5 text-xs text-red-50">
            {count}
          </span>
        )}
      </button>

      <div className="relative size-6" ref={dropdownRef}>
        <button
          onClick={handleUserClick}
          className="relative"
          aria-label={user ? "Account" : "Login"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
        </button>

        {dropdownOpen && user && (
          <div className="absolute right-0 mt-2 w-56 bg-background border border-primary shadow-lg z-50">
            <div className="p-4 border-b border-primary">
              <p className="font-bold text-sm truncate">
                {user.name || "User"}
              </p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>
            <div className="py-2">
              <Link
                href="/profile"
                className="block px-4 py-2 text-sm hover:bg-primary/10 transition-colors"
                onClick={() => setDropdownOpen(false)}
              >
                My Profile
              </Link>
              <Link
                href="/orders"
                className="block px-4 py-2 text-sm hover:bg-primary/10 transition-colors"
                onClick={() => setDropdownOpen(false)}
              >
                My Orders
              </Link>
              <Link
                href="/favorites"
                className="block px-4 py-2 text-sm hover:bg-primary/10 transition-colors"
                onClick={() => setDropdownOpen(false)}
              >
                My Favorites
              </Link>
            </div>
            <div className="border-t border-primary py-2">
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-primary/10 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
