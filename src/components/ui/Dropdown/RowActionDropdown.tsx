"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { MoreVertical } from "lucide-react";
import clsx from "clsx";
import { DropdownAction } from "./types/row-action-types";

type Props = {
  actions: DropdownAction[];
};

export default function RowActionDropdown({ actions }: Props) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();

      setPosition({
        top: rect.bottom + window.scrollY + 4,
        left: rect.right + window.scrollX - 176, 
      });
    }
  }, [open]);

  // 🔹 Close saat klik luar
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <button
        ref={triggerRef}
        onClick={() => setOpen((prev) => !prev)}
        className="p-2 rounded-md hover:bg-surface transition"
      >
        <MoreVertical size={16} />
      </button>

      {open &&
        createPortal(
          <div
            ref={dropdownRef}
            style={{
              position: "absolute",
              top: position.top,
              left: position.left,
            }}
            className="w-44 bg-white rounded-lg shadow-lg border border-border z-9999"
          >
            {actions.map((action, index) => (
              <button
                key={index}
                disabled={action.disabled}
                onClick={() => {
                  setOpen(false);
                  action.onClick();
                }}
                className={clsx(
                  "flex items-center gap-2 w-full px-3 py-2 text-sm text-left transition",
                  action.variant === "danger"
                    ? "text-red-600 hover:bg-red-50"
                    : "hover:bg-surface",
                  action.disabled && "opacity-50 cursor-not-allowed"
                )}
              >
                {action.icon}
                {action.label}
              </button>
            ))}
          </div>,
          document.body
        )}
    </>
  );
}