"use client";

import { FC } from "react";
import Link from "next/link";
import FeaturedProductCard from "../product/FeatureProductCard";
import ArrowRight from "../../icons/ArrowRight";
import Headings from "../common/Headings";

const categories = [
  { label: "Living Room", href: "/store/livingroom" },
  { label: "Bedroom", href: "/store/bedroom" },
  { label: "Dining Room", href: "/store/diningroom" },
  { label: "Desks", href: "/store/desks" },
];

const SectionHero: FC = () => {
  return (
    <section className="w-full mt-[49px] md:h-[calc(100dvh-49px)] border-b border-primary">
      <div className="grid grid-cols-1 md:grid-cols-3 h-full">
        {/* LEFT COLUMN */}
        <div className="md:col-span-1 flex flex-col min-h-0 border-b md:border-b-0 md:border-r border-primary">
          <Headings
            variant="bold"
            size="xl"
            className="max-w-md py-12 px-8 md:p-[30px]"
          >
            Discover your next favorite master piece
          </Headings>

          <div className="mt-auto divide-y divide-primary">
            {categories.map((cat) => (
              <Link
                key={cat.label}
                href={cat.href}
                className="
                  flex items-center justify-between
                  w-full px-[30px] py-3 first:border-t
                  hover:bg-foreground
                  transition-colors duration-300
                "
              >
                <span className="font-bold">{cat.label}</span>
                <ArrowRight />
              </Link>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="md:col-span-2 p-[30px] min-h-0">
          <FeaturedProductCard
            imageSrc="https://www.mocka.com.au/cdn/shop/files/T04438_LowRes_01.jpg"
            href="/store"
            btnText="Discover All"
            color
          />
        </div>
      </div>
    </section>
  );
};

export default SectionHero;
