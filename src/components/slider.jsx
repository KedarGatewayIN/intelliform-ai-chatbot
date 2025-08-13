import { forwardRef } from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

const Slider = forwardRef(({ className = "", ...props }, ref) => {
  return (
    <>
      <style>{`
        .slider {
          position: relative;
          display: flex;
          width: 100%;
          touch-action: none;
          user-select: none;
          align-items: center;
        }
        .slider-track {
          position: relative;
          height: 0.75rem;
          width: 100%;
          flex-grow: 1;
          overflow: hidden;
          border-radius: 9999px;
          background: rgba(226, 232, 240, 0.5);
        }
        .slider-range {
          position: absolute;
          height: 100%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 9999px;
        }
        .slider-thumb {
          display: block;
          height: 1.5rem;
          width: 1.5rem;
          border-radius: 9999px;
          border: 3px solid #667eea;
          background: rgba(255, 255, 255, 0.95);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          outline: none;
          cursor: pointer;
          backdrop-filter: blur(10px);
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.2);
        }
        .slider-thumb:focus-visible {
          box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.2);
        }
        .slider-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3);
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
