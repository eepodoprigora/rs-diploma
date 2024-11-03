import { IRole } from "../../../../types";
import { useState } from "react";

import s from "./user-list-item.module.scss";
import { useAppDispatch } from "../../../../hooks";
import { deleteUserAsync, editUserAsync } from "../../../../store/thunk/users";

interface UsersListItemProps {
  id: string;
  email: string | null;
  roleId: number;
  registeredAt: string;
  roles: IRole[];
}

export const UsersListItem = ({
  id: userId,
  email,
  roleId,
  registeredAt,
  roles,
}: UsersListItemProps) => {
  const [selectedRoleId, setSelectedRoleId] = useState(roleId);
  const [initialRoleId, setInitialRoleId] = useState(roleId);

  const dispatch = useAppDispatch();

  const date = new Date(registeredAt).toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const isSaveButtonDisabled = selectedRoleId === initialRoleId;

  const onRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRoleId(Number(event.target.value));
  };

  const onRoleSave = (userId: string, newUserRoleId: number) => {
    dispatch(editUserAsync({ userId, roleId: newUserRoleId }))
      .unwrap()
      .then(() => {
        setInitialRoleId(newUserRoleId);
      });
  };

  const onDeleteUser = (userId: string) => {
    const isConfirmed = window.confirm(
      "Вы уверены, что хотите удалить пользователя?"
    );
    if (isConfirmed) {
      dispatch(deleteUserAsync(userId));
    }
  };

  return (
    <li className={s["users-item"]}>
      <ul className={s["users-row"]}>
        <li>{email}</li>
        <li>{date}</li>
        <li>
          <select
            className={s.select}
            value={selectedRoleId}
            onChange={onRoleChange}>
            {roles.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </li>
        <li className={s.actions}>
          <button
            className={s.change}
            disabled={isSaveButtonDisabled}
            onClick={() => onRoleSave(userId, selectedRoleId)}>
            <img
              width="28"
              height="28"
              src="https://img.icons8.com/color/48/available-updates.png"
              alt="available-updates"
            />
          </button>
          <button className={s.block} onClick={() => onDeleteUser(userId)}>
            <img
              width="28"
              height="28"
              src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-block-modern-dating-flaticons-lineal-color-flat-icons.png"
              alt="external-block-modern-dating-flaticons-lineal-color-flat-icons"
            />
          </button>
        </li>
      </ul>
    </li>
  );
};
