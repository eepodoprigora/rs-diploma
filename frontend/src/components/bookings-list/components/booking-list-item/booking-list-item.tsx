import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../../hooks";
import DatePicker from "react-datepicker";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";

import {
  deleteBookingAsync,
  editBooking,
} from "../../../../store/thunk/bookings";
import { HotelForBooking, UserForBooking } from "../../../../types";
import { formatDate, parseDate } from "../../../../utils";
import { bookingSchema } from "./validation-schema";
import s from "./booking-list-item.module.scss";

interface IBookingListProps {
  id: string;
  hotel: HotelForBooking;
  user: UserForBooking;
  phone: string;
  check_in: string;
  check_out: string;
  isAdminOrModerator: boolean;
}

interface IFormInputs {
  checkInDate: Date;
  checkOutDate: Date;
}

interface UpdatedBooking {
  check_in: string;
  check_out: string;
}

export const BookingsListItem = ({
  id,
  isAdminOrModerator,
  hotel,
  user,
  phone,
  check_in,
  check_out,
}: IBookingListProps) => {
  const [checkInDateState, setCheckInDateState] = useState<Date | null>(
    parseDate(check_in)
  );
  const [checkOutDateState, setCheckOutDateState] = useState<Date | null>(
    parseDate(check_out)
  );
  const dispatch = useAppDispatch();

  const defaultV = {
    checkInDate: parseDate(check_in),
    checkOutDate: parseDate(check_out),
  };

  useEffect(() => {
    setCheckInDateState(parseDate(check_in));
    setCheckOutDateState(parseDate(check_out));
  }, [check_in, check_out]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(bookingSchema),
    defaultValues: defaultV,
  });

  const onSubmit = async (data: IFormInputs) => {
    const { checkInDate, checkOutDate } = data;
    try {
      const updatedBooking = await dispatch(
        editBooking({
          id,
          check_in: formatDate(checkInDate.toString()),
          check_out: formatDate(checkOutDate.toString()),
          phone,
        })
      );

      if (updatedBooking.type === "bookings/edit/fulfilled") {
        const bookingData = updatedBooking.payload as UpdatedBooking;

        // Устанавливаем новые значения для состояния
        setCheckInDateState(parseDate(bookingData.check_in));
        setCheckOutDateState(parseDate(bookingData.check_out));
      }
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
    }
  };
  const onDeleteBooking = (id: string) => {
    dispatch(deleteBookingAsync(id));
  };
  return (
    <li className={s["bookings-item"]}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ul className={s["bookings-row"]}>
          {isAdminOrModerator && <li>{user.email}</li>}
          <li>{hotel.title}</li>
          <li>
            <Controller
              name="checkInDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  selected={checkInDateState}
                  onChange={(date) => {
                    setCheckInDateState(date);
                    field.onChange(date);
                  }}
                  className={s.input}
                  placeholderText="Выберите дату заезда"
                  dateFormat="dd.MM.yyyy"
                  minDate={new Date()}
                  popperPlacement="bottom"
                  portalId="root-portal"
                />
              )}
            />
            {errors.checkInDate && (
              <p className={s.error}>{errors.checkInDate.message}</p>
            )}
          </li>
          <li>
            <Controller
              name="checkOutDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  selected={checkOutDateState}
                  onChange={(date) => {
                    setCheckOutDateState(date);
                    field.onChange(date);
                  }}
                  className={s.input}
                  placeholderText="Выберите дату выезда"
                  dateFormat="dd.MM.yyyy"
                  minDate={
                    checkInDateState
                      ? new Date(
                          checkInDateState.getFullYear(),
                          checkInDateState.getMonth(),
                          checkInDateState.getDate() + 1
                        )
                      : new Date()
                  }
                  popperPlacement="bottom"
                  portalId="root-portal"
                />
              )}
            />
            {errors.checkOutDate && (
              <p className={s.error}>{errors.checkOutDate.message}</p>
            )}
          </li>

          <li className={s.actions}>
            <button className={s.change}>
              <img
                width="28"
                height="28"
                src="https://img.icons8.com/color/48/available-updates.png"
                alt="available-updates"
              />
            </button>
            <button className={s.block} onClick={() => onDeleteBooking(id)}>
              <img
                width="28"
                height="28"
                src="https://img.icons8.com/ios-filled/50/FA5252/delete--v1.png"
                alt="delete--v1"
              />
            </button>
          </li>
        </ul>
      </form>
    </li>
  );
};
