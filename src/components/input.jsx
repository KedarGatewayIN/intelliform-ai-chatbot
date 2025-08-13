import React, { forwardRef } from "react";

const Input = forwardRef(({ className = "", type = "text", ...props }, ref) => {
  return (
    <>
      <style>{`
        .input {
          display: flex;
          height: 2.5rem;
          width: 100%;
          border-radius: 0.375rem;
          border: 1px solid rgb(209, 213, 219);
          background-color: white;
          padding: 0.5rem 0.75rem;
          font-size: 1rem;
          line-height: 1.5rem;
          color: black;
          transition: box-shadow 0.15s, border-color 0.15s, opacity 0.15s;
        }
        @media (min-width: 768px) {
          .input {
            font-size: 0.875rem;
          }
        }
        .input::placeholder {
          color: rgb(107, 114, 128);
        }
        .input:focus-visible {
          outline: none;
          box-shadow: 0 0 0 2px rgb(147, 197, 253);
        }
        .input:disabled {
          cursor: not-allowed;
          opacity: 0.5;
        }
        /* File input styling */
        .input[type="file"] {
          padding: 0.5rem 0.75rem;
        }
        .input[type="file"]::file-selector-button {
          border: none;
          background-color: transparent;
          font-size: 0.875rem;
          font-weight: 500;
          color: black;
          margin-right: 0.5rem;
          cursor: pointer;
        }
      `}</style>

      <input
        ref={ref}
        type={type}
        className={`input ${className}`}
        {...props}
      />
    </>
  );
});

Input.displayName = "Input";

export { Input };
