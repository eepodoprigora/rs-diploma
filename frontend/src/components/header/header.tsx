import { NavLink } from "react-router-dom";

import logo from "../../images/logo.png";
import s from "./header.module.scss";
import { LoginInfo } from "./components";

export const Header = () => {
  return (
    <header className={s.header}>
      <div className="container">
        <div className={s["header-inner"]}>
          <NavLink to={"/"} className={s.logo}>
            <img className={s["logo-img"]} src={logo} alt="" />
            <span>Путешествия</span>
          </NavLink>
          <LoginInfo />
        </div>
      </div>
    </header>
  );
};
