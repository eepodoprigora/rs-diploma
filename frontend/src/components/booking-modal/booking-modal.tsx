import React, { useState } from "react";

import { H2 } from "../h2/h2";
import { BookingForm } from "./components/booking-form/booking-form";

import s from "./booking-modal.module.scss";
import { setIsModalOpened } from "../../store/reducers";
import { Button } from "../button/button";
import { useAppDispatch } from "../../hooks";

interface BookingModalProps {
  isOpen: boolean;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const dispatch = useAppDispatch();

  const handleCloseModal = () => {
    setIsSubmitted(false);
    dispatch(setIsModalOpened(false));
  };

  if (!isOpen) return null;
  return (
    <div className={s.modal}>
      <div className={s.overlay} onClick={handleCloseModal}></div>
      <div className={s.content} onClick={(e) => e.stopPropagation()}>
        <div className={s.top}>
          <button className={s["close-button"]} onClick={handleCloseModal}>
            &times;
          </button>
          <H2>Бронирование отеля</H2>
        </div>
        {isSubmitted ? (
          <div className={s.success}>
            <div className={s["success-text"]}>
              Ваша заявка принята, ожидайте звонка в ближайшее время!
            </div>
            <Button
              onClick={handleCloseModal}
              type="button"
              appearance="secondary"
              width="auto">
              Хорошо
            </Button>
          </div>
        ) : (
          <BookingForm setIsSubmitted={setIsSubmitted} />
        )}
      </div>
    </div>
  );
};
