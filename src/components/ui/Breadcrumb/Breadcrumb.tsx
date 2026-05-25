import { Home, ChevronRight } from "lucide-react";
import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items:     BreadcrumbItem[];
  homeHref?: string; 
  homeLabel?: string; 
}

export function Breadcrumb({
  items,
  homeHref  = "/",
  homeLabel = "Home",
}: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-1.5 text-sm -mt-4">
      <Link
        href={homeHref}
        className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
      >
        <Home size={14} />
        <span>{homeLabel}</span>
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <span key={index} className="flex items-center gap-1.5">
            <ChevronRight size={13} className="text-muted-foreground/50" />
            {isLast || !item.href ? (
              <span className="font-medium text-foreground">{item.label}</span>
            ) : (
              <Link
                href={item.href}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}