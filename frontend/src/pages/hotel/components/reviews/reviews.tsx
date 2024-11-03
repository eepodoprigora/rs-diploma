import { useState } from "react";
import { Input } from "../../../../components";
import { H2 } from "../../../../components/h2/h2";
import { useAppDispatch } from "../../../../hooks";
import {
  createCommentAsync,
  removeCommentAsync,
} from "../../../../store/thunk/comments";
import { IComment, IUser } from "../../../../types";

import s from "./reviews.module.scss";

interface IReviews {
  reviews: IComment[];
  hotelCode: string;
  isAdminOrModerator: boolean;
  authenticatedUser: IUser | null;
}

export const Reviews = ({
  reviews,
  hotelCode,
  isAdminOrModerator,
  authenticatedUser,
}: IReviews) => {
  const dispatch = useAppDispatch();
  const [comment, setComment] = useState("");

  const onCommentSend = () => {
    if (comment.trim()) {
      dispatch(
        createCommentAsync({
          hotelCode,
          content: comment,
        })
      );
      setComment("");
    }
  };

  const onCommentRemove = (commentId: string) => {
    const isConfirmed = window.confirm(
      "Вы уверены, что хотите удалить комментарий?"
    );
    if (isConfirmed) {
      dispatch(removeCommentAsync({ hotelCode, commentId }));
    }
  };

  return (
    <section className={s.reviews}>
      <H2>Отзывы</H2>
      {authenticatedUser && (
        <div className={s["add-comment"]}>
          <Input
            placeholder="Добавить отзыв..."
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <div className={s.send} onClick={onCommentSend}>
            <img
              width="26"
              height="26"
              src="https://img.icons8.com/ios-filled/50/FAB005/paper-plane.png"
              alt="paper-plane"
            />
          </div>
        </div>
      )}

      {reviews.length > 0 ? (
        <ul>
          {reviews.map((item, index) => {
            const publishedDate = new Date(item.publishedAt);
            const formattedDate = publishedDate.toLocaleDateString("ru-RU", {
              day: "numeric",
              month: "long",
            });
            return (
              <li key={index} className={s.review}>
                <div className={s.avatar}>
                  <img
                    width="30"
                    height="30"
                    src="https://img.icons8.com/ios-filled/50/22C3E6/user-male-circle.png"
                    alt="user-male-circle"
                  />
                </div>
                <div className={s.content}>
                  <div className={s["comment-top"]}>
                    <span className={s.author}>{item.author}</span>
                    <span>{formattedDate}</span>
                  </div>
                  {item.content}
                </div>
                {isAdminOrModerator && (
                  <div
                    className={s.delete}
                    onClick={() => onCommentRemove(item.id)}>
                    <img
                      width="128"
                      height="128"
                      src="https://img.icons8.com/pastel-glyph/128/FA5252/trash.png"
                      alt="trash"
                    />
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      ) : (
        <div>Пока нет отзывов</div>
      )}
    </section>
  );
};
