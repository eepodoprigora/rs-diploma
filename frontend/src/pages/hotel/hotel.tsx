import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { checkAccess } from "../../utils";
import { ROLE } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Footer, Header, Loader } from "../../components";
import { TopBlock, Slider, Map, About, Amenities, Reviews } from "./components";
import { loadHotelByCodeAsync } from "../../store/thunk/hotels";
import { clearSelectedHotel } from "../../store/reducers";
import { Error } from "../error/error";

import s from "./hotel.module.scss";

export const Hotel = () => {
  const params = useParams<{ code: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { selectedHotel, loading, error } = useAppSelector(
    (state) => state.hotels
  );

  const authenticatedUser = useAppSelector(
    (state) => state.users.authenticatedUser
  );

  const isAdminOrModerator =
    authenticatedUser?.roleId !== undefined &&
    checkAccess([ROLE.ADMIN, ROLE.MODERATOR], authenticatedUser.roleId);

  useEffect(() => {
    if (params.code) {
      dispatch(loadHotelByCodeAsync(params.code));
    }
    return () => {
      dispatch(clearSelectedHotel());
    };
  }, [dispatch, params.code]);

  if (error) {
    return <Error message={error} />;
  }

  if (loading) {
    return <Loader />;
  }

  if (!selectedHotel) {
    return <Error message="Отель не найден." />;
  }

  return (
    <>
      <Header />
      <main className={s.main}>
        <div className="container">
          <div className={s.back} onClick={() => navigate("/")}>
            <img
              width="32"
              height="32"
              src="https://img.icons8.com/windows/32/FFFFFF/long-arrow-left.png"
              alt="long-arrow-left"
            />
            &nbsp;Назад
          </div>
          <TopBlock
            isAdminOrModerator={isAdminOrModerator}
            authenticatedUser={authenticatedUser}
            title={selectedHotel.title || ""}
            stars={selectedHotel.stars || 0}
            ratingAverage={selectedHotel.ratingAverage || "0"}
            comments={selectedHotel.comments || []}
            addressline={selectedHotel.addressline || ""}
            pricePerNight={selectedHotel.pricePerNight}
            code={selectedHotel.code}
          />
          <div className={s["slider-map"]}>
            <div className={s.slider}>
              <Slider images={selectedHotel.photos || []} />
            </div>
            <div className={s.map}>
              <Map
                latitude={selectedHotel.latitude || ""}
                longitude={selectedHotel.longitude || ""}
              />
            </div>
          </div>
          <About content={selectedHotel.content || ""} />
          {selectedHotel.amenities.length > 0 && (
            <Amenities amenities={selectedHotel.amenities || []} />
          )}
          <Reviews
            isAdminOrModerator={isAdminOrModerator}
            authenticatedUser={authenticatedUser}
            hotelCode={selectedHotel.code}
            reviews={selectedHotel.comments}
          />
        </div>
      </main>
      <Footer />
    </>
  );
};
