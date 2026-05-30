"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Plus,
  Clock,
} from "lucide-react";
import clsx from "clsx";

const ICONS = {
  home: Home,
  plus: Plus,
  clock: Clock,
};

export type TabIcon =
  | "home"
  | "plus"
  | "clock";

export interface Tab {
  label: string;
  href: string;
  icon?: TabIcon;
  content?: ReactNode;
}

interface CardWithTabsProps {
  tabs: Tab[];
  children?: ReactNode;
  className?: string;
  contentClassName?: string;
}

export default function CardWithTabs({
  tabs,
  children,
  className,
  contentClassName,
}: CardWithTabsProps) {
  const pathname = usePathname();
  const activeIndex = tabs.findIndex((tab) => pathname === tab.href);

  return (
    <div className={clsx("w-full", className)}>

      <div className="flex items-end overflow-visible px-4 sm:px-8 gap-1">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;
          const Icon = tab.icon
            ? ICONS[tab.icon]
            : undefined;

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={clsx(
                "relative flex-1 flex items-center justify-center gap-1.5 sm:gap-2",
                "px-2 py-2.5 sm:px-5 sm:py-3",
                "text-xs sm:text-sm font-medium",
                "whitespace-nowrap rounded-t-2xl transition-colors duration-200",
                isActive
                  ? "cwt-tab-active bg-white text-primary z-20"
                  : "text-foreground/50 hover:text-primary z-10"
              )}
            >
              {Icon && (
                <Icon
                  size={14}
                  className="shrink-0 sm:w-3.75 sm:h-3.75"
                />
              )}
              <span className={clsx(Icon ? "hidden sm:inline" : "inline")}>
                {tab.label}
              </span>
              {Icon && (
                <span className="inline sm:hidden truncate max-w-15">
                  {tab.label.split(" ")[0]}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      <div
        className={clsx(
          "relative z-10 bg-white shadow-card rounded-2xl",
          contentClassName
        )}
      >
        {/* Padding card lebih kecil di mobile */}
        <div className="p-4 sm:p-8">
          {tabs[activeIndex]?.content ?? children}
        </div>
      </div>

    </div>
  );
}