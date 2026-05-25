import { RegisterState, RegisterStep } from "../types/register.types";
import { initialRegisterState } from "./register.initial";

const REGISTER_STEPS: RegisterStep[] = [
  "PERSONAL IDENTITY",
  "ACCOUNT",
  "DOCUMENT UPLOAD",
  "REVIEW",
];

function getNextStep(current: RegisterStep): RegisterStep {
  const index = REGISTER_STEPS.indexOf(current);
  return REGISTER_STEPS[index + 1] ?? current;
}

function getPrevStep(current: RegisterStep): RegisterStep {
  const index = REGISTER_STEPS.indexOf(current);
  return REGISTER_STEPS[index - 1] ?? current;
}

export type RegisterAction<K extends keyof RegisterState = keyof RegisterState> =
  | {
      type: "SET_FIELD";
      field: K;
      value: RegisterState[K];
    }
  | { type: "NEXT_STEP" }
  | { type: "PREV_STEP" }
  | { type: "RESET" }
  | { type: "SUBMIT_START" }
  | { type: "SUBMIT_SUCCESS" }
  | { type: "SUBMIT_ERROR"; payload: string }


export function registerReducer(
  state: RegisterState,
  action: RegisterAction
): RegisterState {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        [action.field]: action.value,
      };

    case "NEXT_STEP":
      return {
        ...state,
        step: getNextStep(state.step),
        direction: "NEXT",
      };

    case "PREV_STEP":
      return {
        ...state,
        step: getPrevStep(state.step),
        direction: "PREV"
      };

    case "RESET":
      return initialRegisterState;

    case "SUBMIT_START":
      return {
        ...state,
        isSubmitting: true,
        submitError: null,
      };

    case "SUBMIT_SUCCESS":
      return {
        ...state,
        isSubmitting: false,
        step: "OTP", // 👉 lanjut ke step berikutnya
      };

    case "SUBMIT_ERROR":
      return {
        ...state,
        isSubmitting: false,
        submitError: action.payload,
      };

    default:
      return state;
  }
}

