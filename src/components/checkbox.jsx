import { forwardRef } from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

const Checkbox = forwardRef(({ className = "", ...props }, ref) => {
  return (
    <>
      <style>{`
        .checkbox {
          height: 1.25rem;
          width: 1.25rem;
          flex-shrink: 0;
          border-radius: 6px;
          border: 2px solid #667eea;
          background: rgba(255, 255, 255, 0.9);
          outline: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(10px);
        }
        .checkbox:focus-visible {
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
        }
        .checkbox:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
        }
        .checkbox:disabled {
          cursor: not-allowed;
          opacity: 0.5;
        }
        .checkbox[data-state="checked"] {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-color: #667eea;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
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
