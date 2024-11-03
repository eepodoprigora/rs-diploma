import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { HotelListItem } from "./components";
import { loadHotelsAsync } from "../../store/thunk/hotels";
import { Error } from "../../pages";
import { Loader } from "../loader/loader";
import { PAGE_LIMIT } from "../../constants/page-limit";
import s from "./hotels-list.module.scss";
import { Input } from "../input/input";
import { Button } from "../button/button";

export const HotelsList = () => {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [limit, setLimit] = useState(PAGE_LIMIT);
  const [debouncedSearchPhrase, setDebouncedSearchPhrase] =
    useState(searchPhrase);

  const dispatch = useAppDispatch();
  const { hotels, loading, error, totalCount } = useAppSelector(
    (state) => state.hotels
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchPhrase(searchPhrase);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [searchPhrase]);

  useEffect(() => {
    dispatch(loadHotelsAsync({ limit, searchPhrase: debouncedSearchPhrase }));
  }, [dispatch, limit, debouncedSearchPhrase]);

  const handleShowMore = () => {
    setLimit((prev) => prev + PAGE_LIMIT);
  };

  if (error) {
    return <Error message="Ошибка загрузки отелей" />;
  }

  return loading ? (
    <Loader />
  ) : (
    <>
      <h1 className={s.h1}>Отели и гостиницы в Москве</h1>
      <div className="">
        <Input
          type="text"
          value={searchPhrase}
          placeholder="Поиск по названию отеля"
          onChange={(e) => setSearchPhrase(e.target.value)}
        />
      </div>
      {hotels.length > 0 ? (
        hotels.map((hotel) => <HotelListItem key={hotel.id} {...hotel} />)
      ) : (
        <div className={s["not-found"]}>
          Ничего не найдено, попробуйте изменить поиск
        </div>
      )}
      {hotels.length < totalCount && (
        <div className={s.center}>
          <Button
            appearance="primary"
            type="button"
            width="auto"
            onClick={handleShowMore}>
            Показать больше
          </Button>
        </div>
      )}
    </>
  );
};
