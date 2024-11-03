import { IButtonInLink } from "../../types/button-type";
import s from "./button-in-link.module.scss";

export const ButtonInLink = ({ appearance, children }: IButtonInLink) => {
  return <span className={`${s.button} ${s[appearance]}`}>{children}</span>;
};
