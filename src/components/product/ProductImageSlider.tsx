"use client";

import { FC, useState, useRef } from "react";
import Image from "next/image";
import ArrowRight from "@/src/icons/ArrowRight";

interface Props {
  images: string[];
}

const ProductImageSlider: FC<Props> = ({ images }) => {

  const [index, setIndex] = useState(0);
  const touchStart = useRef<number | null>(null);

  const prev = () => {
    setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  };

  const next = () => {
    setIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart.current === null) return;

    const diff = touchStart.current - e.changedTouches[0].clientX;

    if (diff > 50) next();
    if (diff < -50) prev();

    touchStart.current = null;
  };

  return (
    <div
      className="relative w-full h-full overflow-hidden group bg-black  aspect-square lg:aspect-auto"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Images */}
      {images.map((src, i) => (
        <Image
          key={i}
          src={src}
          alt=""
          fill
          priority={i === 0}
          className={`
            object-cover absolute inset-0
            transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)]
            ${
              i === index
                ? "opacity-100 scale-100"
                : "opacity-0 scale-110 pointer-events-none"
            }
            grayscale group-hover:grayscale-0
            brightness-90 contrast-110
            group-hover:brightness-100 group-hover:contrast-100
          `}
        />
      ))}

      {/* Arrows */}
      <button
        onClick={prev}
        className="
          absolute left-6 top-1/2 -translate-y-1/2
          z-10 opacity-0 group-hover:opacity-100
          transition duration-300 cursor-pointer
        "
      >
        <div className="rotate-180">
          <ArrowRight />
        </div>
      </button>

      <button
        onClick={next}
        className="
          absolute right-6 top-1/2 -translate-y-1/2
          z-10 opacity-0 group-hover:opacity-100
          transition duration-300 cursor-pointer
          
        "
      >
        <ArrowRight />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`
              h-0.5 w-8 transition-all duration-500
              ${i === index ? "bg-white w-12" : "bg-white/40"}
            `}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductImageSlider;
