import { forwardRef } from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";

const RadioGroup = forwardRef(({ className = "", ...props }, ref) => {
  return (
    <>
      <style>{`
        .radio-group {
          display: grid;
          gap: 0.75rem;
        }
        .radio-group-item {
          aspect-ratio: 1 / 1;
          height: 1.25rem;
          width: 1.25rem;
          border-radius: 9999px;
          border: 2px solid #667eea;
          color: #667eea;
          background: rgba(255, 255, 255, 0.9);
          outline: none;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          backdrop-filter: blur(10px);
        }
        .radio-group-item:focus-visible {
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
        }
        .radio-group-item:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
        }
        .radio-group-item:disabled {
          cursor: not-allowed;
          opacity: 0.5;
        }
        .radio-group-item[data-state="checked"] {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-color: #667eea;
          color: white;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
        }
        .radio-group-indicator {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .radio-group-indicator-icon {
          height: 0.75rem;
          width: 0.75rem;
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
