"use client";

import { useRouter } from "next/navigation";
import ArrowRight from "../../icons/ArrowRight";

export default function GoBack() {
  const router = useRouter();

  return (
    <button
      className="cursor-pointer hidden w-full px-[30px] py-4 md:flex justify-start items-center border-b border-primary hover:bg-foreground transition"
      onClick={() => router.back()}
    >
      <div className="rotate-180">
        <ArrowRight />
      </div>
      <span className="font-bold pl-2">Back</span>
    </button>
  );
}
