"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { Skeleton } from "./skeleton";

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  pending?: boolean;
}

export function Image({ alt, className, pending, src, ...imgProps }: Props) {
  const [loaded, setLoaded] = useState(false);
  const ready = !pending && loaded;

  return (
    <div className={cn("relative w-full aspect-[16/9]", className)}>
      {!ready && <Skeleton className="w-full aspect-[16/9]" />}
      <img
        {...imgProps}
        alt={alt}
        className={cn(
          "w-full h-auto rounded transition-opacity duration-300",
          ready ? "opacity-100 shadow-md" : "opacity-0 absolute top-0 left-0"
        )}
        onLoad={() => setLoaded(true)}
        src={src || undefined}
      />
      <p
        className={cn(
          "text-md text-muted-foreground font-extralight italic",
          !ready && "animate-pulse"
        )}
        title={alt}
      >
        {alt}
      </p>
    </div>
  );
}
