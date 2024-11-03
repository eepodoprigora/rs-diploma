import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { unwrapResult } from "@reduxjs/toolkit";
import { yupResolver } from "@hookform/resolvers/yup";
import { HotelAddingSchema } from "./validation-schema";
import { useAppDispatch } from "../../../../hooks";
import { IHotel, IHotelFormValues } from "../../../../types";
import { FormController } from "../form-controller/form-controller";
import { FormControllerPhotos } from "../form-controller-photos/form-controller-photos";
import {
  addHotelAsync,
  updateHotelAsync,
} from "../../../../store/thunk/hotels";
import { FormControllerAmenities } from "../form-controller-amenities/form-controller-amenities";
import { Button, ButtonInLink } from "../../../../components";
import { NavLink } from "react-router-dom";
import s from "./hotel-form.module.scss";

interface IHotelFormProps {
  hotel?: IHotel | undefined;
}

export const HotelForm: React.FC<IHotelFormProps> = ({ hotel }) => {
  const dispatch = useAppDispatch();
  const [codeFromServer, setCodeFromServer] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const defaultFields = {
    addressline: "",
    latitude: "",
    longitude: "",
    photos: [],
    stars: 0,
    title: "",
    amenities: [],
    code: "",
    ratingAverage: "",
    pricePerNight: 0,
    content: null,
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IHotelFormValues>({
    defaultValues: defaultFields,
    resolver: yupResolver(HotelAddingSchema),
  });

  useEffect(() => {
    if (hotel) {
      reset({
        title: hotel.title,
        addressline: hotel.addressline,
        content: hotel.content || null,
        stars: hotel.stars,
        pricePerNight: hotel.pricePerNight,
        latitude: hotel.latitude || "",
        longitude: hotel.longitude || "",
        photos: hotel.photos || [],
        amenities: hotel.amenities
          ? hotel.amenities.filter(Boolean).map((amenity) => amenity._id)
          : [],
        code: hotel.code || "",
        ratingAverage: hotel.ratingAverage || "",
      });
    } else {
      // Сброс формы в пустые значения при добавлении нового отеля
      reset(defaultFields);
      setIsSubmitted(false);
    }
    // eslint-disable-next-line
  }, [hotel, reset]);

  const onSubmit: SubmitHandler<IHotelFormValues> = async (data) => {
    try {
      let resultAction;
      if (hotel) {
        resultAction = await dispatch(
          updateHotelAsync({ code: hotel.code, hotelData: data })
        );
      } else {
        resultAction = await dispatch(addHotelAsync(data));
        const hotelData = unwrapResult(resultAction);
        setCodeFromServer(hotelData.code);
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
    }
  };

  return (
    <form className={s.hotelForm} onSubmit={handleSubmit(onSubmit)}>
      <div className={s.flex}>
        <FormController
          type="text"
          name="title"
          label="Название отеля"
          errors={errors}
          control={control}
        />
        <FormController
          type="number"
          name="stars"
          label="Количество звезд"
          errors={errors}
          control={control}
        />
      </div>

      <FormController
        type="text"
        name="code"
        label="Символьный код на латинице без пробелов (пример: best-hotel)"
        errors={errors}
        control={control}
      />
      <div className={s.flex}>
        <FormController
          type="text"
          name="ratingAverage"
          label="Средний рейтинг"
          errors={errors}
          control={control}
        />
        <FormController
          type="text"
          name="addressline"
          label="Адрес"
          errors={errors}
          control={control}
        />

        <FormController
          type="number"
          name="pricePerNight"
          label="Цена за ночь (от)"
          errors={errors}
          control={control}
        />
      </div>

      <FormControllerPhotos control={control} errors={errors} />

      <div className={s.flex}>
        <FormController
          type="text"
          name="latitude"
          label="Ширина"
          errors={errors}
          control={control}
        />

        <FormController
          type="text"
          name="longitude"
          label="Долгота"
          errors={errors}
          control={control}
        />
      </div>

      <FormController
        type="text"
        name="content"
        label="Описание"
        errors={errors}
        control={control}
      />
      <FormControllerAmenities control={control} errors={errors} />

      <Button width="100%" appearance="secondary" type="submit">
        {hotel ? "Сохранить" : "Добавить"}
      </Button>
      {isSubmitted && (
        <>
          <div className={s.success}>Данные успешно отправлены!</div>
          <div className={`${s.flex} ${s.center}`}>
            <NavLink to="/">
              <ButtonInLink appearance="primary">На главную</ButtonInLink>
            </NavLink>
            <NavLink
              to={`/hotel/${
                hotel && hotel.code ? hotel.code : codeFromServer
              }`}>
              <ButtonInLink appearance="primary">К карточке отеля</ButtonInLink>
            </NavLink>
          </div>
        </>
      )}
    </form>
  );
};
