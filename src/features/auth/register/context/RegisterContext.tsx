"use client";

import {
  createContext,
  useContext,
  useReducer,
  ReactNode,
} from "react";
import { RegisterState } from "../types/register.types";
import { initialRegisterState } from "./register.initial";
import { registerReducer, RegisterAction } from "./register.reducer";

interface RegisterContextValue {
  state: RegisterState;
  dispatch: React.Dispatch<RegisterAction>;
}

const RegisterContext = createContext<RegisterContextValue | undefined>(
  undefined
);

export function RegisterProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(
    registerReducer,
    initialRegisterState
  );

  return (
    <RegisterContext.Provider value={{ state, dispatch }}>
      {children}
    </RegisterContext.Provider>
  );
}

export function useRegister() {
  const context = useContext(RegisterContext);

  if (!context) {
    throw new Error(
      "useRegister must be used within RegisterProvider"
    );
  }

  return context;
}
