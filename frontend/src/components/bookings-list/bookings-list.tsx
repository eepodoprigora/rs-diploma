import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Loader } from "../loader/loader";

import s from "./bookings-list.module.scss";
import { Error } from "../../pages";
import { getBookingsAsync } from "../../store/thunk/bookings";
import { IBooking } from "../../types";
import { BookingsListItem } from "./components";
import { checkAccess } from "../../utils";
import { ROLE } from "../../constants";
import { NavLink } from "react-router-dom";
import { ButtonInLink } from "../button-in-link/button-in-link";

export const BookingsList = () => {
  const [userBookings, setUserBookings] = useState<IBooking[]>([]);
  const dispatch = useAppDispatch();

  const userId = useAppSelector((state) => state.users.authenticatedUser?.id);
  const authenticatedUser = useAppSelector(
    (state) => state.users.authenticatedUser
  );
  const { bookings, loading, error } = useAppSelector(
    (state) => state.bookings
  );

  const isAdminOrModerator =
    authenticatedUser?.roleId !== undefined &&
    checkAccess([ROLE.ADMIN, ROLE.MODERATOR], authenticatedUser.roleId);

  useEffect(() => {
    dispatch(getBookingsAsync());
  }, [dispatch]);

  useEffect(() => {
    if (userId) {
      const filteredBookings = bookings.filter(
        (item) => item.user._id === userId
      );

      if (isAdminOrModerator) {
        setUserBookings(bookings);
      } else {
        setUserBookings(filteredBookings);
      }
    }
  }, [bookings, userId, isAdminOrModerator]);

  if (error) {
    return <Error message="Невозможно получить список броней" />;
  }

  return loading ? (
    <Loader />
  ) : (
    <div className={s["bookings-list"]}>
      <h1 className={s.h1}>Список забронированных отелей</h1>
      {userBookings.length > 0 ? (
        <div className={s.table}>
          <ul className={s["bookings-headers"]}>
            {isAdminOrModerator && <li>Пользователь</li>}
            <li>Отель</li>
            <li>Дата заезда</li>
            <li>Дата выезда</li>
            <li></li>
          </ul>
          <ul>
            {userBookings.map((booking) => (
              <BookingsListItem
                key={booking.id}
                isAdminOrModerator={isAdminOrModerator}
                {...booking}
              />
            ))}
          </ul>
        </div>
      ) : (
        <div className={s["not-found"]}>
          <div className={s["not-found-text"]}>Ничего не нашлось</div>
          <NavLink to="/">
            <ButtonInLink appearance="secondary">
              Посмотреть отели на главной
            </ButtonInLink>
          </NavLink>
        </div>
      )}
    </div>
  );
};
