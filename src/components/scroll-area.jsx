import React, { forwardRef } from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";

const ScrollArea = forwardRef(({ className = "", children, ...props }, ref) => {
  return (
    <>
      <style>{`
        .scroll-area {
          position: relative; /* relative */
          overflow: hidden;  /* overflow-hidden */
        }
        .scroll-area-viewport {
          height: 100%; /* h-full */
          width: 100%;  /* w-full */
          border-radius: inherit; /* rounded-[inherit] */
        }
        .scroll-bar {
          display: flex; /* flex */
          touch-action: none; /* touch-none */
          user-select: none; /* select-none */
          transition: background-color 0.15s; /* transition-colors */
        }
        .scroll-bar-vertical {
          height: 100%;
          width: 0.625rem; /* w-2.5 */
          border-left: 1px solid transparent; /* border-l border-l-transparent */
          padding: 1px; /* p-[1px] */
        }
        .scroll-bar-horizontal {
          height: 0.625rem; /* h-2.5 */
          flex-direction: column;
          border-top: 1px solid transparent; /* border-t border-t-transparent */
          padding: 1px; /* p-[1px] */
        }
        .scroll-thumb {
          position: relative; /* relative */
          flex: 1; /* flex-1 */
          border-radius: 9999px; /* rounded-full */
          background-color: rgb(229, 231, 235); /* bg-border */
        }
      `}</style>

      <ScrollAreaPrimitive.Root
        ref={ref}
        className={`scroll-area ${className}`}
        {...props}
      >
        <ScrollAreaPrimitive.Viewport className="scroll-area-viewport">
          {children}
        </ScrollAreaPrimitive.Viewport>
        <ScrollBar />
        <ScrollAreaPrimitive.Corner />
      </ScrollAreaPrimitive.Root>
    </>
  );
});
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

const ScrollBar = forwardRef(
  ({ className = "", orientation = "vertical", ...props }, ref) => {
    const orientationClass =
      orientation === "vertical"
        ? "scroll-bar-vertical"
        : "scroll-bar-horizontal";

    return (
      <ScrollAreaPrimitive.ScrollAreaScrollbar
        ref={ref}
        orientation={orientation}
        className={`scroll-bar ${orientationClass} ${className}`}
        {...props}
      >
        <ScrollAreaPrimitive.ScrollAreaThumb className="scroll-thumb" />
      </ScrollAreaPrimitive.ScrollAreaScrollbar>
    );
  }
);
ScrollBar.displayName =
  ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

export { ScrollArea, ScrollBar };
