"use client";

import { ReactNode, useState } from "react";
import { Filter, RotateCcw, Check, X } from "lucide-react";
import { useTable } from "../TableContext";
import { ColumnFiltersState } from "@tanstack/react-table";

import Modal from "../../Modal/Modal";
import Button from "../../Button/Button";

type RenderFilters = (
  draft: ColumnFiltersState,
  setDraft: React.Dispatch<React.SetStateAction<ColumnFiltersState>>
) => ReactNode;

interface Props {
  children: ReactNode | RenderFilters;
}

export function TableFilterButton({ children }: Props) {
  const { table, columnFilters } = useTable<unknown>();

  const [open, setOpen] = useState(false);

  const [draftFilters, setDraftFilters] =
    useState<ColumnFiltersState>(columnFilters);

  const hasFilter = columnFilters.length > 0;

  const handleOpen = () => {
    setDraftFilters(columnFilters);
    setOpen(true);
  };

  const handleApply = () => {
    table.setColumnFilters(draftFilters);
    setOpen(false);
  };

  const handleReset = () => {
    setDraftFilters([]);
    table.resetColumnFilters();
    setOpen(false);
  };

  const handleClose = () => setOpen(false);

  return (
    <>
      <button
        onClick={handleOpen}
        className={`flex items-center gap-2 border border-border rounded-lg px-3 py-2 text-sm transition-colors
        ${hasFilter ? "bg-primary text-white border-primary" : "bg-white text-foreground"}`}
      >
        <Filter size={16} className={hasFilter ? "opacity-80" : "opacity-40"} />
        <span className={hasFilter ? "opacity-100" : "opacity-50"}>
          Filter
        </span>

        {hasFilter && (
          <span className="ml-1 min-w-5 h-5 flex items-center justify-center text-xs font-bold bg-white text-primary px-1.5 rounded-full">
            {columnFilters.length}
          </span>
        )}
      </button>

      <Modal open={open} onClose={handleClose}>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="font-heading font-bold text-foreground">
                Filter Data
              </h2>
            </div>
            <button
              onClick={handleClose}
              className="p-1.5 rounded-full hover:bg-surface transition-colors text-foreground/40 hover:text-foreground shrink-0"
            >
              <X size={18} />
            </button>
          </div>

          <div className="space-y-4">
            {typeof children === "function"
              ? (children as RenderFilters)(draftFilters, setDraftFilters)
              : children}
          </div>

          <div className="flex justify-end gap-3 pt-6">
            <Button
              onClick={handleReset}
              disabled={!hasFilter}
              size="md"
              icon={<RotateCcw size={16} />}
              className="border border-border bg-muted text-foreground"
            >
              Reset Filter
            </Button>

            <Button
              onClick={handleApply}
              size="md"
              icon={<Check size={16} />}
              className="bg-primary text-white"
            >
              Apply Filter
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}