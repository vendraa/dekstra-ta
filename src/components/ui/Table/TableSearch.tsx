"use client";

import { useTable } from "./TableContext";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";

export function TableSearch() {
  const { table } = useTable();
  const [value, setValue] = useState("");

  useEffect(() => {
    const delay = setTimeout(() => {
      table.setGlobalFilter(value);
    }, 400);

    return () => clearTimeout(delay);
  }, [value, table]);

  return (
    <div className="relative w-64">
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground opacity-40"
        size={18}
      />
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Cari data..."
        className={`border border-gray-300 rounded-lg px-9 py-2 text-sm w-full 
                   bg-white
                   focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                   placeholder:text-muted-foreground/50
                   transition`}
      />
    </div>
  );
}