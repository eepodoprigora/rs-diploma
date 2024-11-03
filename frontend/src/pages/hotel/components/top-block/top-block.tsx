import { NavLink } from "react-router-dom";
import { Button, ButtonInLink } from "../../../../components";
import { IHotel, IUser } from "../../../../types";
import { getReviewWord } from "../../../../utils";
import { useAppDispatch } from "../../../../hooks";
import { setIsModalOpened } from "../../../../store/reducers";

import s from "./top-block.module.scss";

interface ITopBlock
  extends Pick<
    IHotel,
    | "title"
    | "stars"
    | "ratingAverage"
    | "comments"
    | "addressline"
    | "pricePerNight"
    | "code"
  > {
  isAdminOrModerator: boolean;
  authenticatedUser: IUser | null;
}

export const TopBlock = ({
  title,
  stars,
  ratingAverage,
  comments,
  addressline,
  pricePerNight,
  isAdminOrModerator,
  authenticatedUser,
  code,
}: ITopBlock) => {
  const dispatch = useAppDispatch();
  const handleOpenModal = () => dispatch(setIsModalOpened(true));
  return (
    <section>
      <div className={s["top-main"]}>
        <h1 className={s.h1}>
          {title} {stars}*&nbsp; &mdash; &nbsp;
        </h1>
        <div className={s.price}>
          <span>от&nbsp;</span>
          <span>{pricePerNight}&nbsp;₽</span>
        </div>
        {authenticatedUser && (
          <Button
            width="auto"
            type="button"
            appearance="secondary"
            onClick={handleOpenModal}>
            Забронировать
          </Button>
        )}
        <div className={s.actions}>
          {isAdminOrModerator && (
            <NavLink to={`/hotel/${code}/edit`}>
              <ButtonInLink appearance="primary">Редактировать</ButtonInLink>
            </NavLink>
          )}
        </div>
      </div>

      <div className={s["top-details"]}>
        <img
          width="16"
          height="16"
          src="https://img.icons8.com/emoji/48/star-emoji.png"
          alt="star-emoji"
        />
        <span className={s.rating}>{ratingAverage} </span>
        <span className={s.dot}>•</span>
        <span className={s.reviews}>
          {comments.length}&nbsp;{getReviewWord(comments.length)}
        </span>
        <span className={s.dot}>•</span>
        <span>{addressline}</span>
      </div>
    </section>
  );
};
