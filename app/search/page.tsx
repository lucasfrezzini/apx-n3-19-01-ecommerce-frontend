"use client";

import { Suspense } from "react";
import SearchResults from "./SearchResults";

export default function SearchPage() {
  return (
    <Suspense fallback={
      <>
        <div className="h-8 w-48 bg-foreground animate-pulse mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-primary border-b border-primary mt-[230px] lg:mt-[246px]">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="aspect-[3/4] bg-foreground animate-pulse" />
          ))}
        </div>
      </>
    }>
      <SearchResults />
    </Suspense>
  );
}