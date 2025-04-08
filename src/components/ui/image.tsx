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
      {title && (
        <ImageTitle loading={!ready} title={title}>
          {title}
        </ImageTitle>
      )}
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
    </div>
  );
}

type ImageTitleProps = React.ComponentProps<"p"> & {
  loading?: boolean;
};

export function ImageTitle({
  className,
  children,
  loading = false,
  title,
}: ImageTitleProps) {
  return (
    <p
      className={cn(
        "w-full text-md text-left text-muted-foreground font-extralight italic",
        loading && "animate-pulse",
        className
      )}
      title={title}
    >
      {children}
    </p>
  );
}
