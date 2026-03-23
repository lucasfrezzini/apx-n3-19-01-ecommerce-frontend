"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Headings from "@/src/ui/Headings";
import Sparkles from "../icons/Sparkles";

const links = [
  { label: "Show All", href: "/store" },
  { label: "Dining Room", href: "/store/diningroom" },
  { label: "Bedroom", href: "/store/bedroom" },
  { label: "Living Room", href: "/store/livingroom" },
  { label: "Desks", href: "/store/desks" },
];

export default function StoreCategoriesNav() {
  const pathname = usePathname();

  return (
    <div className="w-full flex border-t border-primary justify-center py-10">
      <div className="max-w-4xl grid grid-cols-3 text-center gap-8">
        {links.map((link) => {
          const isActive = pathname === link.href;

          return (
            <Link key={link.href} href={link.href}>
              <Headings
                as="h2"
                variant="bold"
                size="xl"
                className={
                  isActive ? "text-primary/30 flex justify-center" : ""
                }
              >
                {link.label}
                {isActive && <Sparkles stroke="goldenrod" />}
              </Headings>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
