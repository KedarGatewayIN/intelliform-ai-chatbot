import React, { forwardRef } from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";

const RadioGroup = forwardRef(({ className = "", ...props }, ref) => {
  return (
    <>
      <style>{`
        .radio-group {
          display: grid;
          gap: 0.5rem; /* gap-2 */
        }
        .radio-group-item {
          aspect-ratio: 1 / 1; /* aspect-square */
          height: 1rem; /* h-4 */
          width: 1rem; /* w-4 */
          border-radius: 9999px; /* rounded-full */
          border: 1px solid rgb(59, 130, 246); /* border-primary */
          color: rgb(59, 130, 246); /* text-primary */
          background-color: white; /* default background */
          outline: none;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: box-shadow 0.15s, opacity 0.15s;
        }
        .radio-group-item:focus-visible {
          box-shadow: 0 0 0 2px rgb(147, 197, 253); /* ring-2 ring-ring */
        }
        .radio-group-item:disabled {
          cursor: not-allowed;
          opacity: 0.5;
        }
        .radio-group-indicator {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .radio-group-indicator-icon {
          height: 0.625rem; /* h-2.5 */
          width: 0.625rem; /* w-2.5 */
          fill: currentColor;
          color: currentColor;
        }
      `}</style>

      <RadioGroupPrimitive.Root
        ref={ref}
        className={`radio-group ${className}`}
        {...props}
      />
    </>
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = forwardRef(({ className = "", ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={`radio-group-item ${className}`}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="radio-group-indicator">
        <Circle className="radio-group-indicator-icon" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
