"use client";

import { useRef, useState, useEffect } from "react";
import ArrowRight from "../icons/ArrowRight";
import Headings from "./Headings";

interface Props {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
}

export default function ProductAccordionItem({
  title,
  children,
  isOpen,
  onClick,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      setHeight(isOpen ? ref.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div className="first:border-t border-primary">
      <button
        onClick={onClick}
        className={`
          w-full px-[30px] py-4
          flex items-center justify-between 
          hover:bg-foreground/70
          transition-colors duration-300 cursor-pointer
          ${isOpen ? "bg-foreground/70 border-b" : ""}
        `}
      >
        <Headings variant="bold" size="md">
          {title}
        </Headings>

        <div
          className={`
            transition-transform duration-500
            ${isOpen ? "rotate-90" : "rotate-270"}
          `}
        >
          <ArrowRight />
        </div>
      </button>

      <div
        style={{ height }}
        className="
          overflow-hidden
          transition-all duration-500
          ease-[cubic-bezier(.22,1,.36,1)]
        "
      >
        <div
          ref={ref}
          className="
            p-[30px] 
            text-sm text-muted-foreground
            opacity-0 translate-y-2
            data-[open=true]:opacity-100
            data-[open=true]:translate-y-0
            transition-all duration-500
          "
          data-open={isOpen}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
