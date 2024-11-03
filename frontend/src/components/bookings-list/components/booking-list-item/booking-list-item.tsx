import { useAppDispatch } from "../../../../hooks";
import {
  deleteBookingAsync,
  editBooking,
} from "../../../../store/thunk/bookings";
import { HotelForBooking, UserForBooking } from "../../../../types";
import DatePicker from "react-datepicker";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";

import s from "./booking-list-item.module.scss";
import { formatDate } from "../../../../utils/format-date";

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
  const dispatch = useAppDispatch();

  const bookingSchema = Yup.object().shape({
    checkInDate: Yup.date()
      .required("Дата заезда обязательна")
      .typeError("Неверный формат даты"),
    checkOutDate: Yup.date()
      .required("Дата выезда обязательна")
      .typeError("Неверный формат даты")
      .min(Yup.ref("checkInDate"), "Дата выезда должна быть позже даты заезда"),
  });

  const parseDate = (dateString: string): Date => {
    const [day, month, year] = dateString.split(".").map(Number);
    return new Date(year, month - 1, day);
  };

  const defaultV = {
    checkInDate: parseDate(check_in),
    checkOutDate: parseDate(check_out),
  };

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(bookingSchema),
    defaultValues: defaultV,
  });

  const checkInDate = watch("checkInDate");
  watch("checkOutDate");

  const onSubmit = async (data: any) => {
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
        reset({
          checkInDate: parseDate(bookingData.check_in),
          checkOutDate: parseDate(bookingData.check_out),
        });
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
                  selected={field.value}
                  onChange={(date) => field.onChange(date)}
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
                  selected={field.value}
                  onChange={(date) => field.onChange(date)}
                  className={s.input}
                  placeholderText="Выберите дату выезда"
                  dateFormat="dd.MM.yyyy"
                  minDate={checkInDate || new Date()}
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
