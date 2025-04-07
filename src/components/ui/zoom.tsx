"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function Zoom({
  children,
  delay = 0,
}: React.PropsWithChildren<{
  delay?: number;
}>) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className={cn(
        "transform-[scale(0)] transition-transform duration-225 ease-[cubic-bezier(0.4, 0, 0.2, 1)]",
        mounted && "transform-[scale(1)]"
      )}
      style={{
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
