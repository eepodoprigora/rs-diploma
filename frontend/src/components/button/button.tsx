import { IButtonInLink } from "../../types/button-type";
import s from "../button-in-link/button-in-link.module.scss";

interface IButton extends IButtonInLink {
  disabled?: boolean;
  type: "submit" | "reset" | "button";
  width: string;
  onClick?: () => void;
}

export const Button = ({
  appearance,
  width,
  children,
  disabled,
  type,
  onClick = () => {},
}: IButton) => {
  return (
    <button
      type={type}
      className={`${s.button} ${s[appearance]}`}
      style={{ width: width }}
      disabled={disabled}
      onClick={onClick}>
      {children}
    </button>
  );
};
