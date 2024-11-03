import { NavLink } from "react-router-dom";
import { ButtonInLink } from "../../components";

import s from "./error.module.scss";

interface IError {
  message: string;
}

export const Error = ({ message }: IError) => {
  return (
    <>
      <div className={s.main}>
        <div className={s.wrong}>404</div>
        <div className={s.message}>{message}</div>
        <NavLink to={"/"}>
          <ButtonInLink appearance="secondary"> На главную </ButtonInLink>
        </NavLink>
      </div>
    </>
  );
};
