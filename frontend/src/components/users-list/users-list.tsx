import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { getUsersAsync } from "../../store/thunk/users";
import { getRolesAsync } from "../../store/thunk/roles";
import { Error } from "../../pages/error/error";
import { Loader } from "../loader/loader";
import { UsersListItem } from "./components";
import { checkAccess } from "../../utils";
import { ROLE } from "../../constants";

import s from "./users-list.module.scss";

export const UsersList = () => {
  const dispatch = useAppDispatch();

  const { users, loading, error } = useAppSelector((state) => state.users);
  const roles = useAppSelector((state) => state.roles.roles);

  const authenticatedUser = useAppSelector(
    (state) => state.users.authenticatedUser
  );

  const isAdmin =
    authenticatedUser?.roleId !== undefined &&
    checkAccess([ROLE.ADMIN], authenticatedUser.roleId);

  useEffect(() => {
    dispatch(getUsersAsync());
    dispatch(getRolesAsync());
  }, [dispatch]);

  if (!isAdmin) {
    return <Error message="Доступ запрещен" />;
  }

  if (error) {
    return <Error message="Невозможно получить список пользователей" />;
  }

  return loading ? (
    <Loader />
  ) : (
    <div className={s["users-list"]}>
      <h1 className={s.h1}>Список пользователей</h1>
      <div className={s.table}>
        <ul className={s["users-headers"]}>
          <li>Почта</li>
          <li>Дата регистрации</li>
          <li>Роль</li>
          <li></li>
        </ul>
        <ul>
          {users.map((user) => (
            <UsersListItem
              id={user.id}
              key={user.id}
              email={user.email}
              roleId={user.roleId}
              registeredAt={user.registeredAt}
              roles={roles}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};
