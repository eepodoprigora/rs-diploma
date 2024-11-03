import s from "./input.module.scss";
import { forwardRef, ChangeEvent } from "react";

interface IInput {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Input = forwardRef<HTMLInputElement, IInput>(
  ({ type, placeholder, onChange, ...props }, ref) => {
    return (
      <input
        className={s.input}
        placeholder={placeholder}
        type={type}
        ref={ref}
        onChange={onChange}
        {...props}
      />
    );
  }
);
