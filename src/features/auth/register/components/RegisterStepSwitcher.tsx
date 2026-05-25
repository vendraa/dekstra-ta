"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRegister } from "../context/RegisterContext";
import { StepVariants } from "../animations/StepVariants";

import { REGISTER_STEPS } from "../constans/registerStep";

export default function RegisterStepSwitcher() {
  const { state } = useRegister();

  const currentStep = REGISTER_STEPS.find(
    (s) => s.key === state.step
  );

  if (!currentStep) return null;

  const StepComponent = currentStep.component;

  return (
    <AnimatePresence mode="wait" custom={state.direction}>
      <motion.div
        key={state.step}
        custom={state.direction}
        variants={StepVariants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <StepComponent />
      </motion.div>
    </AnimatePresence>
  );
}
