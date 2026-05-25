export const StepVariants = {
  enter: (direction: "NEXT" | "PREV") => ({
    x: direction === "NEXT" ? 40 : -40,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: "NEXT" | "PREV") => ({
    x: direction === "NEXT" ? -40 : 40,
    opacity: 0,
  }),
};
