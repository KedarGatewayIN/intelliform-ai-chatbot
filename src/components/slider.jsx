import React, { forwardRef } from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

const Slider = forwardRef(({ className = "", ...props }, ref) => {
  return (
    <>
      <style>{`
        .slider {
          position: relative; /* relative */
          display: flex; /* flex */
          width: 100%; /* w-full */
          touch-action: none; /* touch-none */
          user-select: none; /* select-none */
          align-items: center; /* items-center */
        }
        .slider-track {
          position: relative; /* relative */
          height: 0.5rem; /* h-2 */
          width: 100%; /* w-full */
          flex-grow: 1; /* grow */
          overflow: hidden; /* overflow-hidden */
          border-radius: 9999px; /* rounded-full */
          background-color: rgb(229, 231, 235); /* bg-secondary */
        }
        .slider-range {
          position: absolute; /* absolute */
          height: 100%; /* h-full */
          background-color: rgb(59, 130, 246); /* bg-primary */
        }
        .slider-thumb {
          display: block; /* block */
          height: 1.25rem; /* h-5 */
          width: 1.25rem; /* w-5 */
          border-radius: 9999px; /* rounded-full */
          border: 2px solid rgb(59, 130, 246); /* border-primary */
          background-color: white; /* bg-background */
          transition: background-color 0.15s, border-color 0.15s;
          outline: none; /* focus-visible:outline-none */
        }
        .slider-thumb:focus-visible {
          box-shadow: 0 0 0 2px rgb(147, 197, 253); /* ring-2 ring-ring */
        }
        .slider-thumb:disabled {
          pointer-events: none;
          opacity: 0.5;
        }
      `}</style>

      <SliderPrimitive.Root
        ref={ref}
        className={`slider ${className}`}
        {...props}
      >
        <SliderPrimitive.Track className="slider-track">
          <SliderPrimitive.Range className="slider-range" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb className="slider-thumb" />
      </SliderPrimitive.Root>
    </>
  );
});
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
