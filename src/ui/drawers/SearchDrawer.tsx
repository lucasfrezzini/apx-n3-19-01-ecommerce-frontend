"use client";

import { useAtom } from "jotai";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { drawerAtom, closeDrawerAtom } from "@/src/store/uiAtoms";

export default function SearchDrawer() {
  const [drawer] = useAtom(drawerAtom);
  const [, closeDrawer] = useAtom(closeDrawerAtom);
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      router.push(`/search?q=${encodeURIComponent(inputValue.trim())}`);
      closeDrawer();
    }
  };

  const handleClose = () => {
    setInputValue("");
    closeDrawer();
  };

  useEffect(() => {
    if (drawer !== "search") {
      setInputValue("");
    }
  }, [drawer]);

  return (
    <aside
      className={`
        fixed z-[65] left-0 w-full
        top-[-49px] pt-[100px]
        bg-background/80 backdrop-blur-xl
        border-b border-primary
        transition-transform duration-300
        ${drawer === "search" ? "translate-y-0" : "-translate-y-full"}
      `}
    >
      <div className="max-w-4xl mx-auto px-[30px] py-10">
        <div className="flex justify-between mb-8">
          <span className="font-bold">Search</span>
          <button onClick={handleClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="flex gap-4">
          <input
            autoFocus
            placeholder="Search products..."
            className="flex-1 border-b border-primary py-4 text-2xl bg-transparent outline-none"
            value={inputValue}
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="px-6 py-4 border border-primary text-primary hover:bg-primary/5 transition-colors"
          >
            Search
          </button>
        </form>
      </div>
    </aside>
  );
}