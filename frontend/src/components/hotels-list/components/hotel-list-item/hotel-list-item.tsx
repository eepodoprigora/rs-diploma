import { NavLink } from "react-router-dom";
import { Button } from "../../../button/button";
import { IHotel } from "../../../../types";
import { getReviewWord } from "../../../../utils";
import s from "./hotel-list-item.module.scss";

export const HotelListItem = ({
  title,
  stars,
  photos,
  code,
  ratingAverage,
  comments,
  pricePerNight,
}: IHotel) => {
  return (
    <section className={s.card}>
      <NavLink to={`/hotel/${code}`} className={s["card-wrapper"]}>
        <div className={s.left}>
          <img className={s.img} src={`${photos[0]}`} alt="" />
        </div>
        <div className={s.right}>
          <div className={s["right-main"]}>
            <h2 className={s.title}>
              {title}&nbsp;
              {stars}*
            </h2>
            <div className={s["right-main-sec"]}>
              <span className={s.rating}>{ratingAverage}</span>
              <div className="">
                <span>{comments.length}</span>
                <span className={s.reviews}>
                  {getReviewWord(comments.length)}
                </span>
              </div>
              <span>• Гостиница</span>
            </div>
          </div>
          <div className={s["right-sec"]}>
            <div className={s.price}>
              <span className={s.from}>от&nbsp;</span>
              <span className={s["price-num"]}>
                {pricePerNight.toLocaleString("ru")}&nbsp;₽
              </span>
            </div>
            <span className={s["per-day"]}>Цена за ночь</span>
            <Button width="auto" type="button" appearance="secondary">
              Выбрать
            </Button>
          </div>
        </div>
      </NavLink>
    </section>
  );
};
