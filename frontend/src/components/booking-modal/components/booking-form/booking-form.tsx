import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { bookingSchema } from "../../validation-schema";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "../../../button/button";

import { Dispatch, SetStateAction } from "react";

import s from "./booking-form.module.scss";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { createBookingAsync } from "../../../../store/thunk/bookings";
import { formatDate } from "../../../../utils/format-date";

interface BookingFormValues {
  phone: string;
  checkInDate: Date;
  checkOutDate: Date;
}
interface IBookingForm {
  setIsSubmitted: Dispatch<SetStateAction<boolean>>;
}

export const BookingForm = ({ setIsSubmitted }: IBookingForm) => {
  const dispatch = useAppDispatch();

  const userId = useAppSelector((store) => store.users.authenticatedUser?.id);
  const hotelCode = useAppSelector((store) => store.hotels.selectedHotel?.code);

  const today = new Date();

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<BookingFormValues>({
    defaultValues: {
      phone: "",
      checkInDate: today,
      checkOutDate: today,
    },
    resolver: yupResolver(bookingSchema),
  });
  const checkInDate = watch("checkInDate");

  const onSubmit = (data: BookingFormValues) => {
    reset();

    const { phone, checkInDate, checkOutDate } = data;

    if (userId && hotelCode) {
      dispatch(
        createBookingAsync({
          user: userId,
          hotelCode,
          phone,
          check_in: formatDate(checkInDate.toString()),
          check_out: formatDate(checkOutDate.toString()),
        })
      );
    }
    setIsSubmitted(true);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.bookingForm}>
      <div className={s.block}>
        <label className={s.label}>Номер телефона:</label>
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <input
              type="text"
              placeholder="8 999 999 99 99"
              className={s.input}
              {...field}
              value={field.value}
            />
          )}
        />
        {errors.phone && <p className={s.error}>{errors.phone.message}</p>}
      </div>

      <div className={s.dates}>
        <div className={s.block}>
          <label className={s.label}>Дата заезда:</label>
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
              />
            )}
          />
          {errors.checkInDate && (
            <p className={s.error}>{errors.checkInDate.message}</p>
          )}
        </div>
        <div className={s.block}>
          <label className={s.label}>Дата выезда:</label>
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
              />
            )}
          />
          {errors.checkOutDate && (
            <p className={s.error}>{errors.checkOutDate.message}</p>
          )}
        </div>
      </div>

      <Button type="submit" width="100%" appearance="secondary">
        Забронировать
      </Button>
    </form>
  );
};
