import * as yup from "yup";

export const bookingSchema = yup.object().shape({
  phone: yup
    .string()
    .required("Введите номер телефона")
    .matches(
      /^8\d{10}$/,
      "Некорректный номер телефона, должен начинаться с 8, без пробелов, тире и скобок"
    ),
  checkInDate: yup
    .date()
    .nullable()
    .required("Выберите дату заезда")
    .typeError("Некорректная дата заезда")
    .default(null),
  checkOutDate: yup
    .date()
    .nullable()
    .required("Выберите дату выезда")
    .typeError("Некорректная дата выезда")
    .default(null)
    .test(
      "checkOutDate",
      "Дата выезда должна быть позже даты заезда",
      function (value) {
        const { checkInDate } = this.parent;
        return !checkInDate || (value && value > checkInDate);
      }
    ),
});
