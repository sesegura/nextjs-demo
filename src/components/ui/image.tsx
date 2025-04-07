"use client";

import { cn } from "@/lib/utils";
import { Skeleton } from "./skeleton";
import { useState } from "react";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  pending?: boolean;
}

export function Image({
  className,
  pending,
  src,
  title,
  ...imgProps
}: ImageProps) {
  const [loaded, setLoaded] = useState(src?.startsWith("data:image") || false);
  const ready = !pending && loaded;

  return (
    <div className={cn("relative w-full aspect-square", className)}>
      {!ready && <Skeleton className="w-full aspect-square" />}
      <img
        {...imgProps}
        className={cn(
          "w-full h-auto rounded transition-opacity duration-300",
          ready ? "opacity-100 shadow-md" : "opacity-0 absolute top-0 left-0"
        )}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        src={src || undefined}
      />
      {title && <ImageTitle className="mt-4" loading={!ready} title={title} />}
    </div>
  );
}

type ImageTitleProps = React.ComponentProps<"div"> & {
  loading: boolean;
  title: string;
};

function ImageTitle({ className, loading, title }: ImageTitleProps) {
  return (
    <p
      className={cn(
        "text-md text-muted-foreground font-extralight italic",
        loading && "animate-pulse",
        className
      )}
      title={title}
    >
      {title}
    </p>
  );
}
