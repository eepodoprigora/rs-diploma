import { ReactNode } from "react";
import s from "./h2.module.scss";

interface IH2 {
  children: ReactNode;
}

export const H2 = ({ children }: IH2) => {
  return <h2 className={s.h2}>{children}</h2>;
};
