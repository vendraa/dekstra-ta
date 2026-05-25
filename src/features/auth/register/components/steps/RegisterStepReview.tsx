"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TextInput from "@/components/ui/Input/TextInput";
import SelectInput from "@/components/ui/Input/SelectInput";
import { useRegister } from "../../context/RegisterContext";
import { registerUser } from "../../service/register.service";
import ReviewRow from "../ReviewRow";
import DocumentReviewRow from "../DocumentReview";
import Button from "@/components/ui/Button/Button";
import { ConfirmRegisterModal } from "../RegisterConfirmModal";
import { Agama, Gender, RwOption, RtOption } from "../../types/register.types";

type BackendError = Record<string, string[]>;

export default function RegisterStepReview() {
  const { state, dispatch } = useRegister();
  const [agree, setAgree] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const errorList = Object.values(fieldErrors);
  const router = useRouter();
  const [rwOptions, setRwOptions] = useState<{ label: string; value: string }[]>([]);
  const [rtOptions, setRtOptions] = useState<{ label: string; value: string }[]>([]);
  const [loadingRT, setLoadingRT] = useState(false);

  const isNotEmpty = (v: string) => v.trim().length > 0;

  const isEmailValid = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isPhoneValid = (phone: string) =>
    /^[0-9]{10,15}$/.test(phone);

  const isReviewValid =
    isNotEmpty(state.kkNumber) &&
    isNotEmpty(state.nik) &&
    isNotEmpty(state.fullName) &&
    isNotEmpty(state.birthPlace) &&
    isNotEmpty(state.birthDate) &&
    isNotEmpty(state.address) &&
    isPhoneValid(state.phone) &&
    isEmailValid(state.email) &&
    state.kkFile.file &&
    state.ktpFile.file;

  function isBackendError(error: unknown): error is BackendError {
    return typeof error === "object" && error !== null;
  }

  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleSubmit = async () => {
    dispatch({ type: "SUBMIT_START" });

    try {
      await registerUser(state);
      dispatch({ type: "SUBMIT_SUCCESS" });

  sessionStorage.setItem("register_completed", "true");
  sessionStorage.setItem("register_email", state.email);
  setTimeout(() => {
    router.push("/register/pending");
  }, 50);

    } catch (err: unknown) {
      const mappedErrors: Record<string, string> = {};

      if (isBackendError(err)) {
        Object.entries(err).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            mappedErrors[key] = value[0];
          } else if (typeof value === "string") {
            mappedErrors[key] = value;
          }
        });
        setFieldErrors(mappedErrors);
      }

      dispatch({
        type:    "SUBMIT_ERROR",
        payload: "Periksa kembali data Anda",
      });

    } finally {
      setConfirmOpen(false);
    }
  };

  useEffect(() => {
    async function fetchRW() {
      const res  = await fetch("/api/wilayah/rw");
      const data = await res.json() as RwOption[];

      setRwOptions(
        data.map((rw) => ({
          label: `RW ${rw.kode_rw}`,
          value: String(rw.kode_rw),
        }))
      );
    }

    fetchRW();
  }, []);

  useEffect(() => {
    async function fetchRT() {

      if (!state.rw) {
        setRtOptions([]);
        return;
      }

      setLoadingRT(true);

      const res  = await fetch(`/api/wilayah/rt?rw=${state.rw}`);
      const data = await res.json() as RtOption[];

      setRtOptions(
        data.map((rt) => ({
          label: `RT ${rt.kode_rt}`,
          value: String(rt.id),
        }))
      );

      setLoadingRT(false);
    }

    fetchRT();
  }, [state.rw]);

  return (
    <div className="flex flex-col gap-10">
      {/* DATA DASAR */}
      <section className="flex flex-col gap-6">
        <h2 className="text-sm font-heading font-semibold text-foreground">
          Informasi Dasar
        </h2>

        <div className="flex flex-col gap-5">
          <ReviewRow label="Nomor Kartu Keluarga (KK)">
            <TextInput
              value={state.kkNumber}
              onChange={(value) =>
                dispatch({
                  type: "SET_FIELD",
                  field: "kkNumber",
                  value,
                })
              }
            />
          </ReviewRow>

          <ReviewRow label="Nomor Induk Kependudukan (NIK)">
            <TextInput
              value={state.nik}
              onChange={(value) =>
                dispatch({
                  type: "SET_FIELD",
                  field: "nik",
                  value,
                })
              }
            />
          </ReviewRow>

          <ReviewRow label="Nama Lengkap">
            <TextInput
              value={state.fullName}
              onChange={(value) =>
                dispatch({
                  type: "SET_FIELD",
                  field: "fullName",
                  value,
                })
              }
            />
          </ReviewRow>

          <ReviewRow label="Tempat Lahir">
            <TextInput
              value={state.birthPlace}
              onChange={(value) =>
                dispatch({
                  type: "SET_FIELD",
                  field: "birthPlace",
                  value,
                })
              }
            />
          </ReviewRow>

          <ReviewRow label="Tanggal Lahir">
            <TextInput
              type="date"
              value={state.birthDate}
              onChange={(value) =>
                dispatch({
                  type: "SET_FIELD",
                  field: "birthDate",
                  value,
                })
              }
            />
          </ReviewRow>

          <ReviewRow label="Jenis Kelamin">
            <SelectInput
              value={state.gender !== null ? String(state.gender) : ""}
              options={[
                { label: "Laki-laki", value: String(Gender.LAKI_LAKI) },
                { label: "Perempuan", value: String(Gender.PEREMPUAN) },
              ]}
              onChange={(value) =>
                dispatch({
                  type: "SET_FIELD",
                  field: "gender",
                  value: value ? (Number(value) as Gender) : null,
                })
              }
            />
          </ReviewRow>

          <ReviewRow label="Agama">
            <SelectInput
              value={state.agama !== null ? String(state.agama) : ""}
              options={[
                { label: "Islam", value: String(Agama.ISLAM) },
                { label: "Kristen", value: String(Agama.KRISTEN) },
                { label: "Katolik", value: String(Agama.KATOLIK) },
                { label: "Hindu", value: String(Agama.HINDU) },
                { label: "Buddha", value: String(Agama.BUDDHA) },
                { label: "Konghucu", value: String(Agama.KONGHUCU) },
                { label: "Kepercayaan", value: String(Agama.KEPERCAYAAN) },
              ]}
              onChange={(value) =>
                dispatch({
                  type: "SET_FIELD",
                  field: "agama",
                  value: value ? (Number(value) as Agama) : null,
                })
              }
            />
          </ReviewRow>

          <ReviewRow label="Alamat Lengkap">
            <textarea
              className="w-full rounded-lg border border-border bg-surface px-4 py-2 text-sm"
              rows={3}
              value={state.address}
              onChange={(e) =>
                dispatch({
                  type: "SET_FIELD",
                  field: "address",
                  value: e.target.value,
                })
              }
            />
          </ReviewRow>

          <ReviewRow label="RW">
            <SelectInput
              value={state.rw}
              options={rwOptions}
              onChange={(value) => {
                dispatch({ type: "SET_FIELD", field: "rw", value });

                // reset RT (WAJIB)
                dispatch({ type: "SET_FIELD", field: "rt", value: "" });
              }}
            />
          </ReviewRow>

          <ReviewRow label="RT">
            <SelectInput
              placeholder={
                !state.rw
                  ? "Pilih RW terlebih dahulu"
                  : loadingRT
                  ? "Memuat RT..."
                  : "Pilih RT"
              }
              value={state.rt}
              options={state.rw ? rtOptions : []}
              onChange={(value) =>
                dispatch({ type: "SET_FIELD", field: "rt", value })
              }
              disabled={!state.rw || loadingRT}
            />
          </ReviewRow>
        </div>

        <hr className="my-6 border-t border-border/60" />

        <h2 className="text-sm font-heading font-semibold text-foreground">
          Informasi Akun
        </h2>

        <div className="flex flex-col gap-5">
          <ReviewRow label="Nomor Telepon">
            <TextInput
              value={state.phone}
              onChange={(value) =>
                dispatch({
                  type: "SET_FIELD",
                  field: "phone",
                  value,
                })
              }
            />
          </ReviewRow>

          <ReviewRow label="Email">
            <TextInput
              value={state.email}
              onChange={(value) =>
                dispatch({
                  type: "SET_FIELD",
                  field: "email",
                  value,
                })
              }
            />
          </ReviewRow>
        </div>

        <hr className="my-6 border-t border-border/60" />

        <h2 className="text-sm font-heading font-semibold text-foreground">
          Dokumen Pendukung
        </h2>

        <div className="flex flex-col gap-8">

          <DocumentReviewRow
            label="Kartu Keluarga (KK)"
            uploadLabel="Foto Kartu Keluarga (KK)"
            uploadTitle="Unggah Dokumen Kartu Keluarga"
            displayFormats={["Unggah dokumen dengan format JPG, JPEG, PNG"]}

            value={state.kkFile}

            onChange={(value) =>
              dispatch({
                type: "SET_FIELD",
                field: "kkFile",
                value,
              })
            }

            onRemove={() =>
              dispatch({
                type: "SET_FIELD",
                field: "kkFile",
                value: { file: null, previewUrl: undefined },
              })
            }
          />

          <DocumentReviewRow
            label="Kartu Tanda Penduduk (KTP)"
            uploadLabel="Foto KTP"
            uploadTitle="Unggah Dokumen KTP"
            displayFormats={["Unggah dokumen dengan format JPG, JPEG, PNG"]}

            value={state.ktpFile}

            onChange={(value) =>
              dispatch({
                type: "SET_FIELD",
                field: "ktpFile",
                value,
              })
            }

            onRemove={() =>
              dispatch({
                type: "SET_FIELD",
                field: "ktpFile",
                value: { file: null, previewUrl: undefined },
              })
            }
          />
        </div>
      </section>

      {/* PERNYATAAN */}
      <div className="rounded-xl border border-border bg-surface p-4">
        <label className="flex items-start gap-3 text-sm text-foreground text-justify">
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            className="mt-1"
          />
          <span>
            Saya menyatakan bahwa seluruh data yang saya isikan
            adalah benar dan dapat dipertanggungjawabkan.
          </span>
        </label>
      </div>

      {errorList.length > 0 && (
        <div className="rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-700">
          <p className="font-semibold mb-2">
            Terjadi kesalahan:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            {errorList.map((err, index) => (
              <li key={index}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      {/* ACTION */}
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
          disabled={!agree || !isReviewValid}
          className="flex-2 bg-primary text-white hover:opacity-90
                    disabled:opacity-50 disabled:cursor-not-allowed"
          fullWidth
          onClick={() => setConfirmOpen(true)} 
        >
          DAFTAR
        </Button>

        <ConfirmRegisterModal
          open={confirmOpen}
          onClose={() => setConfirmOpen(false)}
          onConfirm={handleSubmit}
          isLoading={state.isSubmitting}
        />
      </div>
    </div>
  );
}
