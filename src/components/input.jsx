import { forwardRef } from "react"

const Input = forwardRef(({ className = "", type = "text", ...props }, ref) => {
  return (
    <>
      <style>{`
        .input {
          display: flex;
          height: 2.75rem;
          width: 100%;
          border-radius: 12px;
          border: 2px solid rgba(226, 232, 240, 0.5);
          background: rgba(255, 255, 255, 0.9);
          padding: 0.75rem 1rem;
          font-size: 0.9375rem;
          line-height: 1.5rem;
          color: #374151;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          font-weight: 500;
          backdrop-filter: blur(10px);
        }
        @media (min-width: 768px) {
          .input {
            font-size: 0.875rem;
          }
        }
        .input::placeholder {
          color: #9ca3af;
          font-weight: 400;
        }
        .input:focus-visible {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
          background: rgba(255, 255, 255, 1);
        }
        .input:disabled {
          cursor: not-allowed;
          opacity: 0.5;
        }
        /* File input styling */
        .input[type="file"] {
          padding: 0.75rem 1rem;
        }
        .input[type="file"]::file-selector-button {
          border: none;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          font-size: 0.8125rem;
          font-weight: 600;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          margin-right: 0.75rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .input[type="file"]::file-selector-button:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        }
      `}</style>

      <input ref={ref} type={type} className={`input ${className}`} {...props} />
    </>
  )
})

Input.displayName = "Input"

export { Input }
