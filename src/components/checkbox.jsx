import React, { forwardRef } from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

const Checkbox = forwardRef(({ className = "", ...props }, ref) => {
  return (
    <>
      <style>{`
        .checkbox {
          height: 1rem;
          width: 1rem;
          flex-shrink: 0;
          border-radius: 0.25rem;
          border: 1px solid rgb(59, 130, 246);
          background-color: white;
          outline: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background-color 0.15s, border-color 0.15s, opacity 0.15s;
        }
        .checkbox:focus-visible {
          box-shadow: 0 0 0 2px rgb(147, 197, 253);
        }
        .checkbox:disabled {
          cursor: not-allowed;
          opacity: 0.5;
        }
        .checkbox[data-state="checked"] {
          background-color: rgb(59, 130, 246);
          color: white;
        }
        .checkbox-indicator {
          display: flex;
          align-items: center;
          justify-content: center;
          color: currentColor;
        }
      `}</style>

      <CheckboxPrimitive.Root
        ref={ref}
        className={`checkbox ${className}`}
        {...props}
      >
        <CheckboxPrimitive.Indicator className="checkbox-indicator">
          <Check style={{ height: "1rem", width: "1rem" }} />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    </>
  );
});

Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
