"use client";

import { getFormBySlug } from "../form-registry";
import { FormContent } from "./form-content";

interface DynamicFormProps {
  slug: string;
}

export function DynamicForm({ slug }: DynamicFormProps) {
  const formConfig = getFormBySlug(slug);

  if (!formConfig) {
    return <p className="text-danger">Form tidak ditemukan.</p>;
  }

  return <FormContent slug={slug} config={formConfig} />;
}