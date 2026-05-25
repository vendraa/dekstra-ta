import { FC } from "react";

export interface AuthCardProps {
  children: React.ReactNode;
}

const AuthCard: FC<AuthCardProps> = ({ children }) => {
  return (
    <div
      className={`
        w-full max-w-105
        rounded-3xl
        bg-white
        px-8 py-10
        shadow-card
      `}
    >
      {children}
    </div>
  );
};

export default AuthCard;
