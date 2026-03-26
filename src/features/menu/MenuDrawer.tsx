"use client";

import { useAtom } from "jotai";
import { drawerAtom, closeDrawerAtom } from "@/store/uiAtoms";
import Link from "next/link";
import Headings from "@/components/common/Headings";
import ArrowRight from "@/src/icons/ArrowRight";

export default function MenuDrawer() {
  const [drawer] = useAtom(drawerAtom);
  const [, closeDrawer] = useAtom(closeDrawerAtom);

  return (
    <aside
      className={`
				fixed top-0 left-0 z-[65] h-screen w-[320px]
				bg-background/80 backdrop-blur-xl
				border-r border-primary
				flex flex-col
				transition-transform duration-300
				${drawer === "menu" ? "translate-x-0" : "-translate-x-full"}
			`}
    >
      <div className="flex justify-between p-[30px]">
        <span className="font-bold">Menu</span>
        <button onClick={closeDrawer}>✕</button>
      </div>

      <nav className="flex flex-col divide-y divide-primary font-bold">
        <Link
          onClick={closeDrawer}
          href="/"
          className="
						flex items-center justify-between
						w-full px-[30px] py-3 first:border-t
						hover:bg-foreground
						transition-colors duration-300
					"
        >
          <span className="font-bold">Home</span>
          <ArrowRight />
        </Link>

        <Link
          onClick={closeDrawer}
          href="/store"
          className="
						flex items-center justify-between
						w-full px-[30px] py-3
						hover:bg-foreground
						transition-colors duration-300
					"
        >
          <span className="font-bold">Shop</span>
          <ArrowRight />
        </Link>

        <Link
          onClick={closeDrawer}
          href="/about"
          className="
						flex items-center justify-between
						w-full px-[30px] py-3
						hover:bg-foreground
						transition-colors duration-300
					"
        >
          <span className="font-bold">About</span>
          <ArrowRight />
        </Link>

        <Link
          onClick={closeDrawer}
          href="/contact"
          className="
						flex items-center justify-between
						w-full px-[30px] py-3 border-b
						hover:bg-foreground
						transition-colors duration-300
					"
        >
          <span className="font-bold">Contact</span>
          <ArrowRight />
        </Link>
      </nav>
      <div className="mt-auto p-[30px] border-t border-primary text-sm">
        <Headings as={"h4"} variant="bold" size="md">
          © {new Date().getFullYear()} KŌRA
        </Headings>
      </div>
    </aside>
  );
}
