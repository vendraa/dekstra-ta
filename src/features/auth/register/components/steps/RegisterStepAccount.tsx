"use client";

import { useState } from "react";
import TextInput from "@/components/ui/Input/TextInput";
import PasswordInput from "@/components/ui/Input/PasswordInput";
import { useRegister } from "../../context/RegisterContext";
import Button from "@/components/ui/Button/Button";
import { validateAccount, isStrongPassword, type AccountErrors } from "../../validations/step-account.validation";

export default function RegisterStepAccount() {
  const { state, dispatch } = useRegister();
  const [errors, setErrors] = useState<AccountErrors>({});

  function handleNext() {
    const validationErrors = validateAccount({
      phone: state.phone,
      email: state.email,
      password: state.password,
      confirmPassword: state.confirmPassword,
    });

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    dispatch({ type: "NEXT_STEP" });
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TextInput
          label="Nomor Telepon"
          placeholder="Contoh: 081234567890"
          value={state.phone}
          type="tel"
          onChange={(value) =>
            dispatch({ type: "SET_FIELD", field: "phone", value })
          }
          error={errors.phone}
          required
        />

        <TextInput
          label="Email"
          placeholder="Contoh: nama@email.com"
          value={state.email}
          type="email"
          onChange={(value) =>
            dispatch({ type: "SET_FIELD", field: "email", value })
          }
          error={errors.email}
          required
        />

        <div className="flex flex-col gap-1">
          <PasswordInput
            label="Kata Sandi"
            placeholder="Buat Kata Sandi Anda"
            value={state.password}
            onChange={(value) =>
              dispatch({ type: "SET_FIELD", field: "password", value })
            }
            error={errors.password}
            required
          />

          <div className="ml-1 mt-1 text-xs space-y-1 opacity-60">
            <p
              className={
                state.password.length >= 8
                  ? "text-success"
                  : "text-muted-foreground"
              }
            >
              {state.password.length >= 8 ? "✓" : "*"} Minimal 8 karakter
            </p>

            <p
              className={
                isStrongPassword(state.password)
                  ? "text-success"
                  : "text-muted-foreground"
              }
            >
              {isStrongPassword(state.password) ? "✓" : "*"} Terdiri dari Huruf besar, kecil,
              dan angka
            </p>
          </div>
        </div>

        <PasswordInput
          label="Konfirmasi Kata Sandi"
          placeholder="Masukkan ulang kata sandi"
          value={state.confirmPassword}
          onChange={(value) =>
            dispatch({ type: "SET_FIELD", field: "confirmPassword", value })
          }
          error={errors.confirmPassword}
          required
        />
      </div>

      <div className="flex gap-4 pt-4">
        <Button
          type="button"
          onClick={() => dispatch({ type: "PREV_STEP" })}
          fullWidth
          className="flex-1 bg-muted text-foreground hover:bg-surface"
        >
          KEMBALI
        </Button>

        <Button
          onClick={handleNext}
          fullWidth
          className="flex-2 bg-primary text-white hover:opacity-90"
        >
          LANJUT
        </Button>
      </div>
    </div>
  );
}
