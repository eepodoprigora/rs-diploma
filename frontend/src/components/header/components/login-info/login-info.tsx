import { NavLink, useNavigate } from "react-router-dom";
import { ROLE } from "../../../../constants";
import { ButtonInLink } from "../../../button-in-link/button-in-link";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { clearSelectedUser } from "../../../../store/reducers";
import { logoutUser } from "../../../../store/thunk/users";
import s from "./login-info.module.scss";

export const LoginInfo = () => {
  const roleId =
    useAppSelector((state) => state.users.authenticatedUser?.roleId) ?? 3;
  const login = useAppSelector((state) => state.users.authenticatedUser?.login);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(clearSelectedUser());
    dispatch(logoutUser());
    navigate("/auth/login");
    sessionStorage.removeItem("userData");
  };

  return (
    <>
      {roleId === ROLE.GUEST ? (
        <div className={s.buttons}>
          <NavLink to="/auth/register">
            <ButtonInLink appearance="primary">Регистрация</ButtonInLink>
          </NavLink>
          <NavLink to="/auth/login">
            <ButtonInLink appearance="primary">Войти</ButtonInLink>
          </NavLink>
        </div>
      ) : (
        <div className={s.actions}>
          {(roleId === ROLE.ADMIN ||
            roleId === ROLE.MODERATOR ||
            roleId === ROLE.READER) && (
            <div className={s.bookings}>
              <NavLink to="/bookings">
                <ButtonInLink appearance="primary">Бронирования</ButtonInLink>
              </NavLink>
            </div>
          )}
          {(roleId === ROLE.ADMIN || roleId === ROLE.MODERATOR) && (
            <div className={s["add-hotel"]}>
              <NavLink to="/hotel/add">
                <ButtonInLink appearance="primary">Добавить отель</ButtonInLink>
              </NavLink>
            </div>
          )}
          {roleId === ROLE.ADMIN && (
            <div className={s.users}>
              <NavLink to="/users">
                <ButtonInLink appearance="primary">Пользователи</ButtonInLink>
              </NavLink>
            </div>
          )}

          <div className={s.login}>{login}</div>
          <div className={s.logout} onClick={onLogout}>
            <span>Выйти</span>
            <img
              width="30"
              height="30"
              src="https://img.icons8.com/ios/50/FAB005/exit--v1.png"
              alt="exit--v1"
            />
          </div>
        </div>
      )}
    </>
  );
};
