"use client";

import {
  useController,
  useFieldArray,
  useFormContext,
  useWatch,
} from "react-hook-form";

import { Plus, Trash2 } from "lucide-react";
import clsx from "clsx";

/* ================= TYPES ================= */

export interface ArrayColumn {
  name: string;
  label: string;
  type:
    | "text"
    | "number"
    | "date"
    | "select";
  min?: number;
  placeholder?: string;
  numericOnly?: boolean;
  options?: {
    label: string;
    value: string;
  }[];
  dependsOn?: {
    field: string;
    value: string | string[];
  };
}

interface ArrayFieldProps {
  name: string;
  label: string;
  columns: ArrayColumn[];
  defaultItem: Record<string, unknown>;
  required?: boolean;
  layout?: "table" | "card";
}

interface ArrayTableRowProps {
  item: { id: string };
  index: number;
  name: string;
  columns: ArrayColumn[];
  remove: (index: number) => void;
}

interface ArrayCardRowProps {
  item: { id: string };
  index: number;
  name: string;
  label: string;
  columns: ArrayColumn[];
  remove: (index: number) => void;
}

/* ================= ARRAY ROW ================= */

function ArrayTableRow({
  item,
  index,
  name,
  columns,
  remove,
}: ArrayTableRowProps) {
  const { control } = useFormContext();

  const watchedRow = useWatch({
    control,
    name: `${name}.${index}`,
  }) as Record<string, unknown>;

  return (
    <tr key={item.id}>
      <td className="px-3 py-2 align-top">
        {index + 1}
      </td>

      {columns.map((column) => {
        if (column.dependsOn) {
          const watchedValue =
            watchedRow?.[
              column.dependsOn.field
            ];

          const isVisible = Array.isArray(
            column.dependsOn.value
          )
            ? column.dependsOn.value.includes(
                String(watchedValue)
              )
            : watchedValue ===
              column.dependsOn.value;

          if (!isVisible) {
            return (
              <td
                key={column.name}
                className="px-3 py-2"
              />
            );
          }
        }

        return (
          <td
            key={column.name}
            className="px-3 py-2 align-top"
          >
            <ArrayInputCell
              name={`${name}.${index}.${column.name}`}
              type={column.type}
              placeholder={column.placeholder}
              numericOnly={column.numericOnly}
              min={column.min}
              options={column.options}
            />
          </td>
        );
      })}

      <td className="px-3 py-2 align-top">
        <button
          type="button"
          onClick={() => remove(index)}
          className="text-danger"
        >
          <Trash2 size={14} />
        </button>
      </td>
    </tr>
  );
}

function ArrayCardRow({
  item,
  index,
  name,
  label,
  columns,
  remove,
}: ArrayCardRowProps) {
  const { control } = useFormContext();

  const watchedRow = useWatch({
    control,
    name: `${name}.${index}`,
  }) as Record<string, unknown>;

  return (
    <div
      key={item.id}
      className="rounded-lg border border-border bg-surface/50 px-5 py-4"
    >
      {/* ================= HEADER ================= */}

      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-semibold">
          {label} #{index + 1}
        </span>

        <button
          type="button"
          onClick={() => remove(index)}
          className="text-xs text-danger flex items-center gap-1"
        >
          <Trash2 size={13} />
          Hapus
        </button>
      </div>

      {/* ================= FIELDS ================= */}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {columns.map((column) => {
          /* ================= CONDITIONAL FIELD ================= */

          if (column.dependsOn) {
            const watchedValue =
              watchedRow?.[
                column.dependsOn.field
              ];

            const isVisible = Array.isArray(
              column.dependsOn.value
            )
              ? column.dependsOn.value.includes(
                  String(watchedValue)
                )
              : watchedValue ===
                column.dependsOn.value;

            if (!isVisible) {
              return null;
            }
          }

          /* ================= FIELD ================= */

          return (
            <div
              key={column.name}
              className="flex flex-col gap-1"
            >
              <label className="text-xs text-foreground/60">
                {column.label}
              </label>

              <ArrayInputCell
                name={`${name}.${index}.${column.name}`}
                type={column.type}
                placeholder={column.placeholder}
                numericOnly={column.numericOnly}
                min={column.min}
                options={column.options}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ================= INPUT CELL ================= */

interface ArrayInputCellProps {
  name: string;
  type: ArrayColumn["type"];
  placeholder?: string;
  numericOnly?: boolean;
  min?: number;
  options?: {
    label: string;
    value: string;
  }[];
}

function ArrayInputCell({
  name,
  type,
  placeholder,
  numericOnly,
  min,
  options,
}: ArrayInputCellProps) {
  const { control } = useFormContext();

  const {
    field: {
      value,
      onChange,
      onBlur,
      name: fieldName,
      ref,
    },
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue:
      type === "number"
        ? undefined
        : "",
  });

  const inputClass = clsx(
    "w-full h-10 rounded-lg border px-3 text-sm outline-none transition",
    error
      ? "border-danger focus:ring-2 focus:ring-danger/30"
      : "border-border focus:ring-2 focus:ring-primary/30"
  );

  /* ================= NUMBER ================= */

  if (type === "number") {
    return (
      <div className="flex flex-col gap-1">
        <input
          ref={ref}
          name={fieldName}
          type="number"
          min={min}
          value={value ?? ""}
          onBlur={onBlur}
          onChange={(e) => {
            const inputValue = e.target.value;

            if (inputValue === "") {
              onChange(undefined);
              return;
            }

            const parsed = Number(inputValue);

            onChange(
              Number.isNaN(parsed)
                ? undefined
                : parsed
            );
          }}
          placeholder={placeholder}
          className={inputClass}
        />

        {error?.message && (
          <p className="text-xs text-danger">
            {error.message}
          </p>
        )}
      </div>
    );
  }

  /* ================= SELECT ================= */

  if (type === "select") {
    return (
      <div className="flex flex-col gap-1">
        <select
          ref={ref}
          name={fieldName}
          value={value ?? ""}
          onChange={onChange}
          onBlur={onBlur}
          className={inputClass}
        >
          <option
            value=""
            disabled
            hidden
          >
            Pilih opsi
          </option>

          {options?.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>

        {error?.message && (
          <p className="text-xs text-danger">
            {error.message}
          </p>
        )}
      </div>
    );
  }

  /* ================= DATE ================= */

  if (type === "date") {
    return (
      <div className="flex flex-col gap-1">
        <input
          ref={ref}
          name={fieldName}
          type="date"
          value={value ?? ""}
          onChange={onChange}
          onBlur={onBlur}
          className={inputClass}
        />

        {error?.message && (
          <p className="text-xs text-danger">
            {error.message}
          </p>
        )}
      </div>
    );
  }

  /* ================= TEXT ================= */

  return (
    <div className="flex flex-col gap-1">
      <input
        ref={ref}
        name={fieldName}
        type="text"
        value={value ?? ""}
        onChange={(e) => {
          let inputValue = e.target.value;

          if (numericOnly) {
            inputValue = inputValue.replace(
              /\D/g,
              ""
            );
          }

          onChange(inputValue);
        }}
        onBlur={onBlur}
        placeholder={placeholder}
        className={inputClass}
      />

      {error?.message && (
        <p className="text-xs text-danger">
          {error.message}
        </p>
      )}
    </div>
  );
}

/* ================= MAIN COMPONENT ================= */

export function ArrayField({
  name,
  label,
  columns,
  defaultItem,
  required,
  layout = "table",
}: ArrayFieldProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const {
    fields,
    append,
    remove,
  } = useFieldArray({
    control,
    name,
  });

  const rootError =
    errors?.[name]?.message as
      | string
      | undefined;

  /* ================= TABLE ================= */

  const renderTable = () => (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th className="px-3 py-2">No</th>

            {columns.map((column) => (
              <th
                key={column.name}
                className="px-3 py-2 text-left"
              >
                {column.label}
              </th>
            ))}

            <th />
          </tr>
        </thead>

        <tbody>
          {fields.map((item, index) => (
            <ArrayTableRow
              key={item.id}
              item={item}
              index={index}
              name={name}
              columns={columns}
              remove={remove}
            />
          ))}
        </tbody>
      </table>
    </div>
  );

  /* ================= CARD ================= */

const renderCards = () => (
  <div className="flex flex-col gap-3">
    {fields.map((item, index) => (
      <ArrayCardRow
        key={item.id}
        item={item}
        index={index}
        name={name}
        label={label}
        columns={columns}
        remove={remove}
      />
    ))}
  </div>
);

  /* ================= RENDER ================= */

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">
        {label}

        {required && (
          <span className="text-danger ml-1">
            *
          </span>
        )}
      </label>

      {layout === "card"
        ? renderCards()
        : renderTable()}

      {rootError && (
        <p className="text-xs text-danger">
          {rootError}
        </p>
      )}

      <button
        type="button"
        onClick={() =>
          append({ ...defaultItem })
        }
        className="text-primary flex items-center gap-1"
      >
        <Plus size={14} />
        Tambah Baris
      </button>
    </div>
  );
}