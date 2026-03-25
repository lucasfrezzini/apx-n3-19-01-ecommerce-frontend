"use client";

import Link from "next/link";
import { FC } from "react";

const footerColumns = [
  [
    { label: "Shop", href: "/shop" },
    { label: "New Collection", href: "/collection/new" },
    { label: "Sale", href: "/collection/sale" },
  ],
  [
    { label: "About Us", href: "/about" },
    { label: "Sustainability", href: "/sustainability" },
    { label: "Contact", href: "/contact" },
  ],
  [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Twitter", href: "https://twitter.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
  ],
];

const Footer: FC = () => {
  return (
    <footer className="w-full pl-px border-b border-t border-primary">
      <div className="grid grid-cols-1 md:grid-cols-3 w-full">
        {footerColumns.map((column, i) => (
          <div
            key={i}
            className="
              border-primary
              border-b md:border-b-0
              md:border-r last:md:border-r-0
              p-[30px]
              flex flex-col gap-3
            "
          >
            {column.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="
                  font-bold
                  hover:opacity-60
                  transition-opacity duration-300
                "
              >
                {link.label}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
