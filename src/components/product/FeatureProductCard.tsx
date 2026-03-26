"use client";

import { FC, useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/common/Button";
import ArrowRight from "@/src/icons/ArrowRight";

interface FeaturedProductCardProps {
  imageSrc: string;
  href: string;
  alt?: string;
  btnText?: string;
  color?: boolean;
}

const FeaturedProductCard: FC<FeaturedProductCardProps> = ({
  imageSrc,
  href,
  alt = "Featured product",
  btnText = "Discover",
  color = false,
}) => {
  const [isHover, setIsHover] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [ripple, setRipple] = useState<{ x: number; y: number } | null>(null);

  const containerRef = useRef<HTMLAnchorElement>(null);
  const pressTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  // ======================
  // DESKTOP CURSOR FOLLOW
  // ======================

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isTouch) return;

    const rect = e.currentTarget.getBoundingClientRect();

    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // ======================
  // MOBILE INTERACTIONS
  // ======================

  const handleTouchStart = (e: React.TouchEvent<HTMLAnchorElement>) => {
    if (!isTouch) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const touch = e.touches[0];

    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    setRipple({ x, y });

    // long press zoom
    pressTimer.current = setTimeout(() => {
      setIsPressed(true);
    }, 150);
  };

  const handleTouchEnd = () => {
    if (!isTouch) return;

    setIsPressed(false);

    if (pressTimer.current) {
      clearTimeout(pressTimer.current);
    }

    setTimeout(() => setRipple(null), 300);
  };

  return (
    <Link
      ref={containerRef}
      href={href}
      className={`
        relative block w-full h-full overflow-hidden group aspect-square
        ${isTouch ? "" : "cursor-none"}
      `}
      onMouseEnter={() => !isTouch && setIsHover(true)}
      onMouseLeave={() => !isTouch && setIsHover(false)}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* IMAGE */}
      <Image
        src={imageSrc}
        alt={alt}
        width={1080}
        height={1080}
        className={`
          w-full h-full object-cover
          aspect-square
          transition-all duration-500 ease-out
          group-hover:scale-110
          ${isPressed ? "scale-110" : ""}
          brightness-90 contrast-110
          group-hover:brightness-100 group-hover:contrast-100
          ${color ? "" : "grayscale group-hover:grayscale-0"}
        `}
      />

      {/* RIPPLE EFFECT MOBILE */}
      {ripple && (
        <span
          className="absolute pointer-events-none rounded-full bg-white/30 animate-ping"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 120,
            height: 120,
            transform: "translate(-50%, -50%)",
          }}
        />
      )}

      {/* DESKTOP CURSOR BUTTON */}
      {!isTouch && (
        <div
          className={`
            pointer-events-none 
            absolute top-0 left-0 
            transition-all duration-300 ease-out
            ${
              isHover
                ? "opacity-100 scale-100 blur-0"
                : "opacity-0 scale-75 blur-sm"
            }
          `}
          style={{
            transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)`,
          }}
        >
          <Button variant="secondary" iconRight={<ArrowRight />}>
            {btnText}
          </Button>
        </div>
      )}

      {/* MOBILE CENTER BUTTON */}
      {isTouch && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="active:scale-95 transition-transform duration-150">
            <Button variant="secondary" iconRight={<ArrowRight />}>
              {btnText}
            </Button>
          </div>
        </div>
      )}
    </Link>
  );
};

export default FeaturedProductCard;
