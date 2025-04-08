"use client";

import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";

const ImageCanvas = forwardRef(
  (
    { className, children }: React.ComponentProps<"div">,
    ref: React.Ref<ReactSketchCanvasRef>
  ) => {
    return (
      <div className={cn("relative w-full", className)}>
        {children}

        <div className="absolute inset-0">
          <ReactSketchCanvas
            ref={ref}
            canvasColor="transparent"
            strokeColor="rgb(150, 100, 255)"
            strokeWidth={40}
            style={{
              border: "none",
              cursor: "crosshair",
            }}
          />
        </div>
      </div>
    );
  }
);

ImageCanvas.displayName = "ImageCanvas";

export { ImageCanvas };
