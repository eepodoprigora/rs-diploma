import * as Yup from "yup";

export const bookingSchema = Yup.object().shape({
  checkInDate: Yup.date()
    .required("Дата заезда обязательна")
    .typeError("Неверный формат даты"),
  checkOutDate: Yup.date()
    .required("Дата выезда обязательна")
    .typeError("Неверный формат даты")
    .min(Yup.ref("checkInDate"), "Дата выезда должна быть позже даты заезда"),
});
