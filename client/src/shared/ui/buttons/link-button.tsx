import { Link } from "react-router-dom";
import { LegacyRef, ReactNode, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps {
  to: string;
  children?: ReactNode;
  className?: string;
}

export const LinkButton = forwardRef(function PageLayout(
  { to, children, className }: ButtonProps,
  ref: LegacyRef<HTMLButtonElement>
) {
  return (
    <Link to={to}>
      <button
        ref={ref}
        className={twMerge(
          "absolute left-1/2 -translate-x-1/2 bottom-[36px] bg-[#D7E3FE] dark:bg-[#060E24] rounded-2xl py-2 px-4 text-[48px] hover:dark:bg-[#040B1D] text-[#686868]",
          className
        )}
      >
        {children}
      </button>
    </Link>
  );
});
