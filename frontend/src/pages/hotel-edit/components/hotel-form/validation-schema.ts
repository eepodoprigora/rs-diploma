import * as yup from "yup";

const latitudeRegex = /^(-?[0-8]?[0-9](\.\d+)?|-?90(\.0+)?)$/;
const longitudeRegex = /^(-?(1[0-7][0-9]|[1-9]?[0-9])(\.\d+)?|-?180(\.0+)?)$/;

export const HotelAddingSchema = yup.object().shape({
  addressline: yup.string().required("Адрес обязателен"),
  latitude: yup
    .string()
    .matches(latitudeRegex, "Широта должна быть числом от -90 до 90")
    .required("Ширина обязательна"),
  longitude: yup
    .string()
    .matches(longitudeRegex, "Долгота должна быть числом от -180 до 180")
    .required("Долгота обязательна"),
  photos: yup
    .array()
    .of(yup.string().url("Некорректный URL").required("Ссылка обязательна"))
    .min(1, "Нужно добавить хотя бы одну ссылку на фото")
    .required("Фото обязательны"),
  stars: yup
    .number()
    .required("Количество звезд обязательно")
    .min(1, "Количество звезд должно быть не меньше 1")
    .max(5, "Количество звезд должно быть не больше 5"),
  title: yup.string().required("Название отеля обязательно"),
  amenities: yup.array().required("Удобства обязательны"),
  code: yup
    .string()
    .matches(
      /^[a-z0-9-]*$/,
      "Допустимы только маленькие латинские буквы, цифры и тире."
    )
    .required("Символьный код обязателен"),
  ratingAverage: yup
    .string()
    .matches(
      /^(10|[1-9](\.\d+)?)$/,
      "Число должно быть от 1 до 10 (через точку)"
    )
    .required("Рейтинг обязателен"),
  pricePerNight: yup
    .number()
    .required("Цена за ночь обязательна")
    .positive("Цена за ночь должна быть положительным числом"),
  content: yup.string().nullable().optional(),
});
