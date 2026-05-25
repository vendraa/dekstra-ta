"use client";

import { useState } from "react";
import TextInput from "@/components/ui/Input/TextInput";
import PasswordInput from "@/components/ui/Input/PasswordInput";
import { useLogin } from "../hooks/useLogin";
import Link from "next/link";
import Button from "@/components/ui/Button/Button";
import { validateLogin, LoginErrors } from "../utils/login-validation";

export default function LoginForm() {
  const { submitLogin, loading, error } = useLogin();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<LoginErrors>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateLogin({
      identifier,
      password,
    });

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    submitLogin({ identifier, password });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Global Error */}
      {error && (
        <p className="text-sm text-danger text-center">
          {error}
        </p>
      )}

      {/* Identifier */}
      <TextInput
        label="NIK / Email"
        placeholder="Masukkan NIK atau email Anda"
        value={identifier}
        onChange={(val) => {
          setIdentifier(val);

          if (errors.identifier) {
            setErrors((prev) => ({
              ...prev,
              identifier: undefined,
            }));
          }
        }}
        error={errors.identifier}
      />

      {/* Password */}
      <div className="flex flex-col gap-1">
        <PasswordInput
          label="Kata Sandi"
          placeholder="Masukkan kata sandi Anda"
          value={password}
          onChange={(val) => {
            setPassword(val);

            if (errors.password) {
              setErrors((prev) => ({
                ...prev,
                password: undefined,
              }));
            }
          }}
          error={errors.password}
        />

        <div className="text-right">
          <Link
            href="/forgot-password"
            className="text-xs text-foreground opacity-50 hover:underline"
          >
            Lupa Kata Sandi?
          </Link>
        </div>
      </div>

      {/* Submit */}
      <Button
        type="submit"
        loading={loading}
        fullWidth
        disabled={loading}
        className="bg-primary text-white font-bold hover:opacity-90"
      >
        MASUK
      </Button>
    </form>
  );
}