import { useMemo } from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  hidden?: boolean;
  variant?: "primary" | "secondary";
};

export const Button = ({ children, onClick, className, hidden, variant = "primary" }: ButtonProps) => {
  if (hidden) return null;

  const bgColors = {
    primary: "bg-yellow-400 hover:bg-yellow-500",
    secondary: "bg-gray-400 hover:bg-gray-500",
  };

  const buttonVarint = useMemo(() => bgColors[variant], [variant]);

  return (
    <button className={`text-center px-4 w-max font-bold cursor-pointer p-2 border-4 transition-all hover:border-gray-700 text-2xl rounded-full text-black ${buttonVarint} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};