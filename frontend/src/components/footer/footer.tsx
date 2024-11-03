import { useAppSelector } from "../../hooks";

import { BookingModal } from "../booking-modal/booking-modal";
import s from "./footer.module.scss";
export const Footer = () => {
  const { isModalOpened } = useAppSelector((state) => state.app);

  return (
    <>
      <footer className={s.footer}>
        <div className="container">
          <div className={s.content}>
            Содержание настоящего сайта, включая любую информацию и результаты
            интеллектуальной деятельности, защищено законодательством Российской
            Федерации и международными соглашениями. Любое использование,
            копирование, воспроизведение или распространение любой размещённой
            на настоящем сайте информации, материалов и/или их частей не
            допускается без предварительного получения согласия правообладателя.
            Сайт носит исключительно информационный характер и ни при каких
            условиях не является публичной офертой, определяемой положениями
            статьи 437 Гражданского кодекса Российской Федерации.
          </div>
        </div>
      </footer>
      <BookingModal isOpen={isModalOpened} />
    </>
  );
};
