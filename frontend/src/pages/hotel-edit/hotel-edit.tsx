import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { HotelForm } from "./components";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Button, Footer, Header, Loader } from "../../components";
import {
  loadHotelByCodeAsync,
  removeHotelAsync,
} from "../../store/thunk/hotels";
import { IHotel } from "../../types";
import { clearError } from "../../store/reducers";
import { Error } from "../error/error";
import { checkAccess } from "../../utils";
import { ROLE } from "../../constants";
import s from "./hotel-edit.module.scss";

export const HotelEdit = () => {
  const { code } = useParams<{ code: string }>();
  const [hotel, setHotel] = useState<IHotel | undefined>();
  const [isDeleted, setIsDeleted] = useState(false);
  const dispatch = useAppDispatch();

  const authenticatedUser = useAppSelector(
    (state) => state.users.authenticatedUser
  );

  const isAdminOrModerator =
    authenticatedUser?.roleId !== undefined &&
    checkAccess([ROLE.ADMIN, ROLE.MODERATOR], authenticatedUser.roleId);

  const stateHotelsHotel = useAppSelector((state) =>
    state.hotels.hotels.find((h) => h.code === code)
  );

  const { loading, error } = useAppSelector((state) => state.hotels);

  useEffect(() => {
    if (!code) {
      dispatch(clearError());
      setHotel(undefined);
      setIsDeleted(false);
      return;
    }

    if (isDeleted) return;

    if (stateHotelsHotel) {
      setHotel(stateHotelsHotel);
    } else {
      const fetchHotel = async () => {
        const response = await dispatch(loadHotelByCodeAsync(code));
        if (response.payload) {
          setHotel(response.payload);
        }
      };
      fetchHotel();
    }
  }, [isDeleted, stateHotelsHotel, code, dispatch]);

  if ((error && code) || isDeleted) {
    return <Error message={error || "Отель был удалён или не найден"} />;
  }

  if (loading) {
    return <Loader />;
  }
  if (!isAdminOrModerator) {
    return <Error message="Доступ запрещен" />;
  }

  const onHotelDelete = async () => {
    if (hotel && code) {
      const isConfirmed = window.confirm(
        `Вы уверены, что хотите удалить отель ${hotel.title}?`
      );
      if (isConfirmed) {
        const response = await dispatch(removeHotelAsync(code));
        if (response.meta.requestStatus === "fulfilled") {
          setIsDeleted(true);
          setHotel(undefined);
        }
      }
    }
  };

  return (
    <div className={s.wrapper}>
      <Header />
      <div className={s.main}>
        <div className="container">
          <div className={s.flex}>
            <h1 className={s.h1}>
              {hotel && !isDeleted
                ? "Редактировать отель"
                : "Добавить новый отель"}
            </h1>
            {hotel && (
              <Button
                appearance="primary"
                type="button"
                width="auto"
                onClick={onHotelDelete}>
                Удалить карточку отеля
              </Button>
            )}
          </div>
          <HotelForm hotel={hotel} />
        </div>
      </div>
      <Footer />
    </div>
  );
};
