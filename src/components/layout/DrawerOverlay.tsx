"use client";

import { useAtom } from "jotai";
import { drawerAtom, closeDrawerAtom } from "@/store/uiAtoms";

export default function DrawerOverlay() {
  const [drawer] = useAtom(drawerAtom);
  const [, closeDrawer] = useAtom(closeDrawerAtom);

  return (
    <div
      onClick={closeDrawer}
      className={`
        fixed inset-0 z-[55] bg-black/40 backdrop-blur-sm
        transition-opacity duration-300
        ${drawer ? "opacity-100" : "opacity-0 pointer-events-none"}
      `}
    />
  );
}
