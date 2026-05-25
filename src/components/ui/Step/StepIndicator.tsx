"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

export type StepItem = {
  key: string;
  label: string;
};

type StepIndicatorProps = {
  steps: StepItem[];
  currentStep: string;
  className?: string;
};

export default function StepIndicator({
  steps,
  currentStep,
  className,
}: StepIndicatorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [stepPositions, setStepPositions] = useState<number[]>([]);

  const isFewSteps = steps.length <= 2;
  const currentIndex = steps.findIndex((s) => s.key === currentStep);

  useEffect(() => {
    if (!containerRef.current) return;

    const updateMetrics = () => {
      const container = containerRef.current;
      if (!container) return;

      const circles = container.querySelectorAll("[data-step-circle]");
      if (!circles.length) return;

      const containerRect = container.getBoundingClientRect();

      const positions = Array.from(circles).map((circle) => {
        const rect = circle.getBoundingClientRect();
        return rect.left + rect.width / 2 - containerRect.left;
      });

      setStepPositions(positions);
    };

    updateMetrics();
    const timeout = setTimeout(updateMetrics, 100);

    window.addEventListener("resize", updateMetrics);
    return () => {
      window.removeEventListener("resize", updateMetrics);
      clearTimeout(timeout);
    };
  }, [steps]);

  const backgroundLeft = stepPositions[0] || 0;
  const backgroundWidth =
    stepPositions.length > 1
      ? stepPositions[stepPositions.length - 1] - stepPositions[0]
      : 0;

  const activeWidth =
    currentIndex >= 0 && stepPositions[currentIndex]
      ? stepPositions[currentIndex] - stepPositions[0]
      : 0;

  return (
    <div className={clsx("mb-10", className)}>
      <div
        ref={containerRef}
        className="relative mx-auto max-w-3xl px-3 sm:px-6 overflow-x-auto"
      >
        {/* Background line */}
        {backgroundWidth > 0 && (
          <div
            className="absolute top-4 h-0.5 bg-muted/40"
            style={{
              left: backgroundLeft,
              width: backgroundWidth,
            }}
          />
        )}

        {/* Active line */}
        {stepPositions.length > 0 && (
          <motion.div
            className="absolute top-4 h-0.5 bg-primary"
            initial={false}
            animate={{ width: activeWidth }}
            style={{ left: backgroundLeft }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          />
        )}

        {/* Steps */}
        <div
          className={clsx(
            "relative z-10 flex min-w-max",
            isFewSteps
              ? "justify-center gap-8 sm:gap-16"
              : "justify-between gap-4 sm:gap-0"
          )}
        >
          {steps.map((step, index) => {
            const active = index <= currentIndex;

            return (
              <div
                key={step.key}
                className="flex flex-col items-center shrink-0 max-w-22.5 sm:max-w-none"
              >
                <div
                  data-step-circle
                  className={clsx(
                    "flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition",
                    active
                      ? "bg-primary text-white"
                      : "bg-muted text-foreground/40"
                  )}
                >
                  {index + 1}
                </div>

                <span
                  className={clsx(
                    "mt-2 text-center text-[10px] sm:text-xs font-medium leading-tight wrap-break-word",
                    active ? "text-primary" : "text-muted"
                  )}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}