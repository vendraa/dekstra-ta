import RegisterStepIdentity from "../components/steps/RegisterStepIdentity";
import RegisterStepAccount from "../components/steps/RegisterStepAccount";
import RegisterStepPersonal from "../components/steps/RegisterStepDocumentUpload";
import RegisterStepReview from "../components/steps/RegisterStepReview";

export const REGISTER_STEPS = [
  {
    key: "PERSONAL IDENTITY",
    label: "Data Pribadi",
    component: RegisterStepIdentity,
  },
  {
    key: "ACCOUNT",
    label: "Buat Akun",
    component: RegisterStepAccount,
  },
  {
    key: "DOCUMENT UPLOAD",
    label: "Unggah Dokumen",
    component: RegisterStepPersonal,
  },
  {
    key: "REVIEW",
    label: "Review",
    component: RegisterStepReview,
  },
];