"use cliente";

import React, { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
  iconRight?: ReactNode;
  children: ReactNode;
};

const baseStyles =
  "inline-flex items-center justify-center rounded-full transition-all py-1 px-3 hover:cursor-pointer font-bold";
const variants = {
  primary: "bg-primary text-background",
  secondary: "bg-foreground text-primary",
};

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  iconRight,
  children,
  className,
  disabled,
  ...props
}) => {
  return (
    <button
      className={clsx(
        baseStyles,
        variants[variant],
        iconRight && "gap-2 group",
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
      {iconRight}
    </button>
  );
};

export default Button;
