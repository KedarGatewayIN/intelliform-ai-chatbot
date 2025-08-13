import { forwardRef } from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";

const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverContent = forwardRef(
  ({ className = "", align = "center", sideOffset = 4, ...props }, ref) => {
    return (
      <>
        <style>{`
          .popover-content {
            z-index: 50;
            width: 18rem; /* w-72 */
            border-radius: 0.375rem; /* rounded-md */
            border: 1px solid rgb(229, 231, 235);
            background-color: white; /* bg-popover */
            padding: 1rem; /* p-4 */
            color: black; /* text-popover-foreground */
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            outline: none;
            transform-origin: var(--radix-popover-content-transform-origin);
          }

          /* Animation states */
          .popover-content[data-state="open"] {
            animation: fadeIn 0.15s ease-out, zoomIn 0.15s ease-out;
          }
          .popover-content[data-state="closed"] {
            animation: fadeOut 0.15s ease-in, zoomOut 0.15s ease-in;
          }

          /* Slide animations for sides */
          .popover-content[data-side="bottom"] {
            animation: slideInFromTop 0.15s ease-out;
          }
          .popover-content[data-side="top"] {
            animation: slideInFromBottom 0.15s ease-out;
          }
          .popover-content[data-side="left"] {
            animation: slideInFromRight 0.15s ease-out;
          }
          .popover-content[data-side="right"] {
            animation: slideInFromLeft 0.15s ease-out;
          }

          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
          }
          @keyframes zoomIn {
            from { transform: scale(0.95); }
            to { transform: scale(1); }
          }
          @keyframes zoomOut {
            from { transform: scale(1); }
            to { transform: scale(0.95); }
          }
          @keyframes slideInFromTop {
            from { transform: translateY(-0.5rem); }
            to { transform: translateY(0); }
          }
          @keyframes slideInFromBottom {
            from { transform: translateY(0.5rem); }
            to { transform: translateY(0); }
          }
          @keyframes slideInFromLeft {
            from { transform: translateX(-0.5rem); }
            to { transform: translateX(0); }
          }
          @keyframes slideInFromRight {
            from { transform: translateX(0.5rem); }
            to { transform: translateX(0); }
          }
        `}</style>

        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content
            ref={ref}
            align={align}
            sideOffset={sideOffset}
            className={`popover-content ${className}`}
            {...props}
          />
        </PopoverPrimitive.Portal>
      </>
    );
  }
);

PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent };
