import { forwardRef } from "react";

const Button = forwardRef(
  (
    { variant = "default", size = "default", asChild = false, ...props },
    ref
  ) => {
    const Comp = asChild ? "span" : "button";
    const classes = `btn btn-${variant} btn-${size}`;
    return (
      <>
        <style>{`
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      white-space: nowrap;
      border-radius: 12px;
      font-size: 0.875rem;
      font-weight: 600;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      outline: none;
      cursor: pointer;
      line-height: 1.25rem;
      border: none;
      position: relative;
      overflow: hidden;
    }
    .btn:disabled {
      pointer-events: none;
      opacity: 0.5;
    }
    .btn:before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
      transition: left 0.5s;
    }
    .btn:hover:before {
      left: 100%;
    }

    /* Variants */
    .btn-default {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
    }
    .btn-default:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
    }

    .btn-green {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: white;
      box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
    }
    .btn-green:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(16, 185, 129, 0.4);
    }

    .btn-destructive {
      background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
      color: white;
      box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3);
    }
    .btn-destructive:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(239, 68, 68, 0.4);
    }

    .btn-outline {
      border: 2px solid rgba(102, 126, 234, 0.3);
      background: rgba(255, 255, 255, 0.9);
      color: #667eea;
      backdrop-filter: blur(10px);
    }
    .btn-outline:hover {
      background: rgba(102, 126, 234, 0.1);
      border-color: #667eea;
      transform: translateY(-1px);
    }

    .btn-secondary {
      background: rgba(241, 245, 249, 0.8);
      color: #374151;
      border: 1px solid rgba(226, 232, 240, 0.5);
      backdrop-filter: blur(10px);
    }
    .btn-secondary:hover {
      background: rgba(226, 232, 240, 0.9);
      transform: translateY(-1px);
    }

    .btn-ghost {
      background: transparent;
      color: #374151;
    }
    .btn-ghost:hover {
      background: rgba(243, 244, 246, 0.8);
      transform: translateY(-1px);
    }

    .btn-link {
      background: transparent;
      color: #667eea;
      text-decoration: none;
      font-weight: 500;
    }
    .btn-link:hover {
      text-decoration: underline;
      color: #4f46e5;
    }

    /* Sizes */
    .btn-default.btn-default,
    .btn.btn-default {
      height: 2.75rem;
      padding: 0 1.5rem;
      font-size: 0.875rem;
    }
    .btn-sm {
      height: 2.25rem;
      padding: 0 1rem;
      border-radius: 10px;
      font-size: 0.8125rem;
    }
    .btn-lg {
      height: 3rem;
      padding: 0 2rem;
      border-radius: 14px;
      font-size: 1rem;
    }
    .btn-icon {
      height: 2.75rem;
      width: 2.75rem;
      padding: 0;
    }
  `}</style>
        <Comp ref={ref} className={classes} {...props} />
      </>
    );
  }
);

Button.displayName = "Button";

export { Button };
