"use client";

import { useState, useEffect } from "react";
import TextInput from "@/components/ui/Input/TextInput";
import TextAreaInput from "@/components/ui/Input/TextAreaInput";
import SelectInput from "@/components/ui/Input/SelectInput";
import AuthFooterLink from "@/components/auth/AuthFooterLink";
import { useRegister } from "../../context/RegisterContext";
import Button from "@/components/ui/Button/Button";
import { validateIdentity, type IdentityErrors } from "../../validations/step-identity.validation";
import { Agama, Gender, RwOption, RtOption } from "../../types/register.types";

export default function RegisterStepIdentity() {
  const { state, dispatch } = useRegister();
  const [rwOptions, setRwOptions] = useState<{ label: string; value: string }[]>([]);
  const [rtOptions, setRtOptions] = useState<{ label: string; value: string }[]>([]);
  const [loadingRT, setLoadingRT] = useState(false);

  const [ errors, setErrors ] = useState<IdentityErrors>({});

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

  function handleNext() {
    const validationErrors = validateIdentity({
      kkNumber: state.kkNumber,
      nik: state.nik,
      fullName: state.fullName,
      gender: state.gender,
      birthPlace: state.birthPlace,
      birthDate: state.birthDate,
      agama: state.agama,
      address: state.address,
      rt: state.rt,
      rw: state.rw,
    });

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    dispatch({ type: "NEXT_STEP" });
  }

  return (
    <div className="flex flex-col gap-10">
      {/* Form */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <TextInput
          label="Nomor Kartu Keluarga (KK)"
          placeholder="Isi dengan 16 digit Nomor KK Anda"
          value={state.kkNumber}
          onChange={(value) =>
            dispatch({
              type: "SET_FIELD",
              field: "kkNumber",
              value,
            })
          }
          error={errors.kkNumber}
          required
        />

        <TextInput
          label="Nomor Induk Kependudukan (NIK)"
          placeholder="Isi dengan 16 digit NIK Anda"
          value={state.nik}
          onChange={(value) =>
            dispatch({
              type: "SET_FIELD",
              field: "nik",
              value,
            })
          }
          error={errors.nik}
          required
        />

        <TextInput
          label="Nama Lengkap"
          placeholder="Masukkan Nama Lengkap sesuai KTP Anda"
          value={state.fullName}
          onChange={(value) =>
            dispatch({ type: "SET_FIELD", field: "fullName", value })
          }
          error={errors.fullName}
          required
        />

        <SelectInput
          label="Jenis Kelamin"
          placeholder="Pilih Jenis Kelamin"

          value={state.gender !== null ? String(state.gender) : ""}
          options={[
            { label: "Laki-laki", value: String(Gender.LAKI_LAKI) },
            { label: "Perempuan", value: String(Gender.PEREMPUAN)  },
          ]}
          onChange={(value) =>
            dispatch({
              type:  "SET_FIELD",
              field: "gender",

              value: value ? (Number(value) as Gender) : null,
            })
          }
          error={errors.gender}
          required
        />

        <TextInput
          label="Tempat Lahir"
          placeholder="Masukkan Tempat Lahir sesuai KTP Anda"
          value={state.birthPlace}
          onChange={(value) =>
            dispatch({ type: "SET_FIELD", field: "birthPlace", value })
          }
          error={errors.birthPlace}
          required
        />

        <TextInput
          label="Tanggal Lahir"
          type="date"
          value={state.birthDate}
          onChange={(value) =>
            dispatch({ type: "SET_FIELD", field: "birthDate", value })
          }
          error={errors.birthDate}
          required
        />

        <SelectInput
          label="Agama"
          placeholder="Pilih Agama Anda"
          value={state.agama !== null ? String(state.agama) : ""}
          options={[
            { label: "Islam",       value: String(Agama.ISLAM)       },
            { label: "Kristen",     value: String(Agama.KRISTEN)     },
            { label: "Katolik",     value: String(Agama.KATOLIK)     },
            { label: "Hindu",       value: String(Agama.HINDU)       },
            { label: "Buddha",      value: String(Agama.BUDDHA)      },
            { label: "Konghucu",    value: String(Agama.KONGHUCU)    },
            { label: "Kepercayaan Terhadap Tuhan Yang Maha Esa", value: String(Agama.KEPERCAYAAN) },
          ]}
          onChange={(value) =>
            dispatch({
              type:  "SET_FIELD",
              field: "agama",
              value: value ? (Number(value) as Agama) : null,
            })
          }
          error={errors.agama}
          required
        />

        <div className="md:col-span-2">
          <TextAreaInput
            label="Alamat Lengkap"
            placeholder="Masukkan Alamat Lengkap sesuai KTP Anda"
            value={state.address}
            onChange={(value) =>
              dispatch({ type: "SET_FIELD", field: "address", value })
            }
            error={errors.address}
            required
          />
        </div>

        {/* RW */}
        <SelectInput
          label="RW"
          placeholder="Pilih RW"
          value={state.rw}
          options={rwOptions}
          onChange={(value) => {
            dispatch({ type: "SET_FIELD", field: "rw", value });
            
            dispatch({ type: "SET_FIELD", field: "rt", value: "" });
          }}
          error={errors.rw}
          required
        />

        {/* RT */}
        <SelectInput
          label="RT"
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
          error={errors.rt}
          disabled={!state.rw || loadingRT}
          required
        />
      </div>

      {/* Action Group */}
      <div className="flex flex-col">
        <Button 
          onClick={handleNext}
          className="bg-primary text-white hover:opacity-90"
        >
            LANJUT
        </Button>

        <AuthFooterLink
          text="Sudah punya akun?"
          linkLabel="Masuk"
          href="/login"
        />
      </div>
    </div>
  );
}
