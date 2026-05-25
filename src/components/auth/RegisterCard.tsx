// components/layouts/RegisterCard.tsx
import { FC, ReactNode } from "react";

interface RegisterCardProps {
  children: ReactNode;
}

const RegisterCard: FC<RegisterCardProps> = ({ children }) => {
  return (
    <div
      className={`
        w-full
        max-w-6xl
        rounded-3xl
        bg-white
        px-10 py-12
        shadow-card
      `}
    >
      {children}
    </div>
  );
};

export default RegisterCard;
