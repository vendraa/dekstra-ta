"use client";

import { FormProvider, useFormState, useWatch } from "react-hook-form";

import StepIndicator  from "@/components/ui/Step/StepIndicator";
import Button         from "@/components/ui/Button/Button";

import { ConditionalField }               from "./components/conditional-field";
import { renderField, fieldWrapperClass } from "./components/field-renderer";
import { SubmitStep }                     from "./components/submit-step";
import { DocumentUploadStep } from "./components/document-upload/document-upload-step";
import { useDynamicForm }                 from "./hooks/use-dynamic-form";

import { FieldDefinition }   from "./types/form.types";
import { FormRegistryEntry } from "../form-registry";

interface FormContentProps {
  slug:   string;
  config: FormRegistryEntry;
}

function SubmitButton({ isPending }: { isPending: boolean }) {
  const { isSubmitting } = useFormState();
  const [isCheckedKebenaran, isCheckedProses] = useWatch({
    name: ["pernyataan_kebenaran_data", "pernyataan_proses_data"],
  });

  const isAllChecked = isCheckedKebenaran === true && isCheckedProses === true;

  return (
    <Button
      type="submit"
      fullWidth
      className="bg-primary text-white"
      disabled={isSubmitting || isPending || !isAllChecked}
    >
      {isSubmitting || isPending ? "Mengirim..." : "Ajukan Surat"}
    </Button>
  );
}

export function FormContent({ slug, config }: FormContentProps) {
  const { sections, schema } = config;
  
  const {
    methods,
    steps,
    currentStepIndex,
    currentSection,
    isFirstStep,
    isLastStep,
    isPending,
    documents,
    setDocuments,
    handleNext,
    handleBack,
    onValidSubmit,
    goToStep,
  } = useDynamicForm({ slug, sections, schema });

  const contentSteps = steps.slice(0, steps.length - 1);
  const isDocumentStep = currentStepIndex === sections.length - 2;

  return (
    <>
      <StepIndicator steps={steps} currentStep={String(currentStepIndex)} />

      <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(
              onValidSubmit,
              (errors) => {
                console.error("FORM ERROR:", errors);
              }
            )}
          >
          <div className="space-y-5">
            <div className="border-b pb-2">
              <h2 className="text-lg font-semibold">{currentSection.title}</h2>
            </div>

            {isLastStep ? (
              <SubmitStep steps={contentSteps} onGoToStep={goToStep} />
            ) : isDocumentStep ? (
              <DocumentUploadStep
                documents={documents} 
                onChange={setDocuments}
              />
            ) : (
              <>
                {currentSection.fields && currentSection.fields.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {currentSection.fields.map((field: FieldDefinition) => {
                      if (field.dependsOn) {
                        return (
                          <ConditionalField
                            key={field.name}
                            field={field}
                            renderField={(f) => (
                              <div className={fieldWrapperClass(f)}>
                                {renderField(f)}
                              </div>
                            )}
                          />
                        );
                      }
                      return (
                        <div key={field.name} className={fieldWrapperClass(field)}>
                          {renderField(field)}
                        </div>
                      );
                    })}
                  </div>
                )}

                {currentSection.groups && currentSection.groups.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {currentSection.groups.map((group, i) => (
                      <div key={i} className="flex flex-col gap-5">
                        {group.fields.map((field: FieldDefinition) => {
                          if (field.dependsOn) {
                            return (
                              <ConditionalField
                                key={field.name}
                                field={field}
                                renderField={renderField}
                              />
                            );
                          }
                          return (
                            <div key={field.name}>{renderField(field)}</div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>

          {/* ── NAVIGATION ── */}
          <div className="flex flex-col md:flex-row gap-3 pt-4">
            <Button
              type="button"
              onClick={isFirstStep ? () => window.history.back() : handleBack}
              className="bg-danger text-white"
              fullWidth
            >
              Kembali
            </Button>

            {!isLastStep ? (
              <Button
                type="button"
                onClick={handleNext}
                className="bg-primary text-white"
                fullWidth
              >
                Selanjutnya
              </Button>
            ) : (
              <SubmitButton isPending={isPending} />
            )}
          </div>
        </form>
      </FormProvider>
    </>
  );
}