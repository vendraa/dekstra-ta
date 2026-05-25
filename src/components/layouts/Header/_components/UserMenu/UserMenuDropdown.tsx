import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import InitialAvatar from "../../../../ui/Avatar/InitialAvatar";

interface DropdownItem {
  label: string;
  onClick: () => void;
  icon?: React.ReactElement;
  variant?: "default" | "danger";
}

interface UserMenuDropdownProps {
  isOpen: boolean;
  triggerRef: React.RefObject<HTMLDivElement | null>;
  items: DropdownItem[];
  userName: string;
  userEmail?: string;
  avatarUrl?: string;
  avatarSize?: number;
}

export default function UserMenuDropdown({
  isOpen,
  triggerRef,
  items,
  userName,
  userEmail,
  avatarUrl,
  avatarSize = 32,
}: UserMenuDropdownProps) {
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });
  const [render, setRender] = useState(isOpen);

  useEffect(() => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const dropdownWidth = Math.max(rect.width + 50, 250);
      let left = rect.right + window.scrollX - dropdownWidth;
      if (left < 8) left = 8;
      if (left + dropdownWidth > window.innerWidth) {
        left = window.innerWidth - dropdownWidth - 8;
      }
      setPosition({
        top: rect.bottom + window.scrollY,
        left,
        width: dropdownWidth,
      });
    }
  }, [triggerRef, isOpen]);

  useEffect(() => {
    let id: NodeJS.Timeout;
    if (isOpen) {
      id = setTimeout(() => setRender(true), 0);
    }
    return () => clearTimeout(id);
  }, [isOpen]);

  const handleAnimationEnd = () => {
    if (!isOpen) setRender(false);
  };

  if (!render) return null;

  return createPortal(
    <div
      style={{
        position: "absolute",
        top: position.top,
        left: position.left,
        width: position.width,
      }}
      className={`bg-white rounded-xl shadow-lg border border-border z-9999 mt-3 overflow-hidden transform transition-all duration-200 origin-top
        ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
      onTransitionEnd={handleAnimationEnd}
    >
      {/* Header: Avatar + Nama + Email */}
      <div className="flex items-center gap-2.5 px-4 py-3 border-b border-border">
        <div className="shrink-0">
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt={`${userName} Avatar`}
              width={avatarSize}
              height={avatarSize}
              className="rounded-full object-cover"
            />
          ) : (
            <InitialAvatar name={userName} size={avatarSize} />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-foreground truncate leading-tight">
            {userName}
          </p>
          {userEmail && (
            <p className="text-[11px] text-foreground/50 truncate leading-tight">
              {userEmail}
            </p>
          )}
        </div>
      </div>

      {/* Dropdown items */}
      <div className="py-1">
        {items.map((item, idx) => (
          <button
            key={idx}
            onClick={item.onClick}
            className={`w-full flex items-center gap-2.5 px-4 py-2 text-xs transition-colors
              ${item.variant === "danger"
                ? "text-danger hover:bg-red-50"
                : "text-foreground/70 hover:bg-surface hover:text-foreground"
              }`}
          >
            {item.icon && (
              <span className="w-3.5 h-3.5 shrink-0">{item.icon}</span>
            )}
            {item.label}
          </button>
        ))}
      </div>
    </div>,
    document.body
  );
}