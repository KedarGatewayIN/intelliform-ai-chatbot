"use client";

import { forwardRef } from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

const Select = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;

const SelectTrigger = forwardRef(
  ({ className = "", children, ...props }, ref) => (
    <>
      <style>{`
      .select-trigger {
        display: flex;
        height: 2.75rem;
        width: 100%;
        align-items: center;
        justify-content: space-between;
        border-radius: 12px;
        border: 2px solid rgba(226, 232, 240, 0.5);
        background: rgba(255, 255, 255, 0.9);
        padding: 0.75rem 1rem;
        font-size: 0.9375rem;
        line-height: 1.25rem;
        outline: none;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        font-weight: 500;
        backdrop-filter: blur(10px);
      }
      .select-trigger[data-placeholder] {
        color: #9ca3af;
      }
      .select-trigger:focus {
        border-color: #667eea;
        box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
        background: rgba(255, 255, 255, 1);
      }
      .select-trigger:hover {
        border-color: #667eea;
      }
      .select-trigger:disabled {
        cursor: not-allowed;
        opacity: 0.5;
      }
      .select-trigger > span {
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    `}</style>
      <SelectPrimitive.Trigger
        ref={ref}
        className={`select-trigger ${className}`}
        {...props}
      >
        {children}
        <SelectPrimitive.Icon asChild>
          <ChevronDown
            style={{ height: "1.25rem", width: "1.25rem", opacity: 0.5 }}
          />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
    </>
  )
);
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = forwardRef(({ className = "", ...props }, ref) => (
  <>
    <style>{`
      .select-scroll-btn {
        display: flex;
        cursor: default;
        align-items: center;
        justify-content: center;
        padding: 0.25rem 0;
      }
    `}</style>
    <SelectPrimitive.ScrollUpButton
      ref={ref}
      className={`select-scroll-btn ${className}`}
      {...props}
    >
      <ChevronUp style={{ height: "1rem", width: "1rem" }} />
    </SelectPrimitive.ScrollUpButton>
  </>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = forwardRef(
  ({ className = "", ...props }, ref) => (
    <SelectPrimitive.ScrollDownButton
      ref={ref}
      className={`select-scroll-btn ${className}`}
      {...props}
    >
      <ChevronDown style={{ height: "1rem", width: "1rem" }} />
    </SelectPrimitive.ScrollDownButton>
  )
);
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName;

const SelectContent = forwardRef(
  ({ className = "", children, position = "popper", ...props }, ref) => (
    <>
      <style>{`
      .select-content {
        position: relative;
        z-index: 50;
        max-height: var(--radix-select-content-available-height);
        min-width: 8rem;
        overflow-y: auto;
        overflow-x: hidden;
        border-radius: 12px;
        border: 1px solid rgba(255, 255, 255, 0.3);
        background: rgba(255, 255, 255, 0.95);
        color: #374151;
        box-shadow: 0 20px 40px rgba(0,0,0,0.15);
        transform-origin: var(--radix-select-content-transform-origin);
        backdrop-filter: blur(20px);
      }
      .select-content[data-state="open"] {
        animation: fadeIn 0.2s ease-out, zoomIn 0.2s ease-out;
      }
      .select-content[data-state="closed"] {
        animation: fadeOut 0.15s ease-in, zoomOut 0.15s ease-in;
      }
      @keyframes fadeIn { from {opacity:0} to {opacity:1} }
      @keyframes fadeOut { from {opacity:1} to {opacity:0} }
      @keyframes zoomIn { from {transform:scale(0.95)} to {transform:scale(1)} }
      @keyframes zoomOut { from {transform:scale(1)} to {transform:scale(0.95)} }
      .select-viewport {
        padding: 0.5rem;
      }
    `}</style>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          ref={ref}
          className={`select-content ${className}`}
          position={position}
          {...props}
        >
          <SelectScrollUpButton />
          <SelectPrimitive.Viewport className="select-viewport">
            {children}
          </SelectPrimitive.Viewport>
          <SelectScrollDownButton />
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </>
  )
);
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = forwardRef(({ className = "", ...props }, ref) => (
  <>
    <style>{`
      .select-label {
        padding-top: 0.375rem;
        padding-bottom: 0.375rem;
        padding-left: 2rem;
        padding-right: 0.5rem;
        font-size: 0.875rem;
        font-weight: 600;
        color: #64748b;
      }
    `}</style>
    <SelectPrimitive.Label
      ref={ref}
      className={`select-label ${className}`}
      {...props}
    />
  </>
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = forwardRef(({ className = "", children, ...props }, ref) => (
  <>
    <style>{`
      .select-item {
        position: relative;
        display: flex;
        width: 100%;
        cursor: default;
        user-select: none;
        align-items: center;
        border-radius: 8px;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        padding-left: 2rem;
        padding-right: 0.75rem;
        font-size: 0.875rem;
        outline: none;
        transition: all 0.2s ease;
        font-weight: 500;
      }
      .select-item:focus {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
      }
      .select-item:hover {
        background: rgba(102, 126, 234, 0.1);
        color: #374151;
      }
      .select-item[data-disabled] {
        pointer-events: none;
        opacity: 0.5;
      }
      .select-item-indicator {
        position: absolute;
        left: 0.5rem;
        display: flex;
        height: 0.875rem;
        width: 0.875rem;
        align-items: center;
        justify-content: center;
      }
    `}</style>
    <SelectPrimitive.Item
      ref={ref}
      className={`select-item ${className}`}
      {...props}
    >
      <span className="select-item-indicator">
        <SelectPrimitive.ItemIndicator>
          <Check style={{ height: "1rem", width: "1rem" }} />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  </>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = forwardRef(({ className = "", ...props }, ref) => (
  <>
    <style>{`
      .select-separator {
        margin: 0.25rem 0;
        height: 1px;
        background: rgba(226, 232, 240, 0.5);
      }
    `}</style>
    <SelectPrimitive.Separator
      ref={ref}
      className={`select-separator ${className}`}
      {...props}
    />
  </>
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
