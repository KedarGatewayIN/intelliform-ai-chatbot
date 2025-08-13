import React, { forwardRef } from "react";
import * as LabelPrimitive from "@radix-ui/react-label";

const Label = forwardRef(({ className = "", ...props }, ref) => {
  return (
    <>
      <style>{`
        .label {
          font-size: 0.875rem; /* text-sm */
          font-weight: 500;   /* font-medium */
          line-height: 1.25rem; /* leading-none in Tailwind */
        }
        .peer:disabled ~ .label {
          cursor: not-allowed;
          opacity: 0.7;
        }
      `}</style>

      <LabelPrimitive.Root
        ref={ref}
        className={`label ${className}`}
        {...props}
      />
    </>
  );
});

Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
