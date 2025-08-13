import React, { forwardRef } from "react";

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
      border-radius: 0.375rem;
      font-size: 0.875rem;
      font-weight: 500;
      transition: background-color 0.15s, color 0.15s, opacity 0.15s;
      outline: none;
      cursor: pointer;
      line-height: 1.25rem;
    }
    .btn:disabled {
      pointer-events: none;
      opacity: 0.5;
    }

    /* Variants */
    .btn-default {
      background-color: rgb(59, 130, 246);
      color: white;
    }
    .btn-default:hover {
      background-color: rgba(59, 130, 246, 0.9);
    }

    .btn-green {
      background-color: rgb(34, 197, 94);
      color: white;
    }
    .btn-green:hover {
      background-color: rgba(34, 197, 94, 0.9);
    }

    .btn-destructive {
      background-color: rgb(239, 68, 68);
      color: white;
    }
    .btn-destructive:hover {
      background-color: rgba(239, 68, 68, 0.9);
    }

    .btn-outline {
      border: 1px solid rgb(209, 213, 219);
      background-color: white;
      color: black;
    }
    .btn-outline:hover {
      background-color: rgb(243, 244, 246);
    }

    .btn-secondary {
      background-color: rgb(229, 231, 235);
      color: black;
    }
    .btn-secondary:hover {
      background-color: rgba(229, 231, 235, 0.8);
    }

    .btn-ghost {
      background-color: transparent;
      color: black;
    }
    .btn-ghost:hover {
      background-color: rgb(243, 244, 246);
    }

    .btn-link {
      background-color: transparent;
      color: rgb(59, 130, 246);
      text-decoration: none;
    }
    .btn-link:hover {
      text-decoration: underline;
    }

    /* Sizes */
    .btn-default.btn-default,
    .btn.btn-default {
      height: 2.5rem;
      padding: 0.5rem 1rem;
    }
    .btn-sm {
      height: 2.25rem;
      padding: 0 0.75rem;
      border-radius: 0.375rem;
    }
    .btn-lg {
      height: 2.75rem;
      padding: 0 2rem;
      border-radius: 0.375rem;
    }
    .btn-icon {
      height: 2.5rem;
      width: 2.5rem;
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
