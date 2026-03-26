import React, { ElementType } from "react";
import clsx from "clsx";

type HeadingProps = {
  as?: ElementType;
  variant?: "bold" | "normal";
  size?: "md" | "lg" | "xl";
  className?: string;
  children: React.ReactNode;
};

const baseStyles = "";
const variants = {
  bold: "font-bold",
  normal: "",
};
const sizes = {
  md: "text-base", //16
  lg: "text-lg", //18
  xl: "text-2xl lg:text-4xl", //60
};

const Headings: React.FC<HeadingProps> = ({
  as: Component = "h1",
  variant = "normal",
  size = "lg",
  className,
  children,
  ...props
}) => {
  return (
    <Component
      className={clsx(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Headings;
