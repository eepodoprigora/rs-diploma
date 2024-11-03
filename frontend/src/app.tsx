import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import {
  Bookings,
  Login,
  Main,
  Hotel,
  Registration,
  Users,
  HotelEdit,
  Error,
} from "./pages";
import { useAppDispatch } from "./hooks";
import { getUserFromSessionStorage } from "./utils";
import { setUser } from "./store/reducers";

export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const user = getUserFromSessionStorage();
    if (user) {
      dispatch(setUser(user)); // Устанавливаем пользователя в состояние
    }
  }, [dispatch]);
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/hotel/add" element={<HotelEdit />} />
      <Route path="/hotel/:code" element={<Hotel />} />
      <Route path="/hotel/:code/edit" element={<HotelEdit />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Registration />} />
      <Route path="/bookings" element={<Bookings />} />
      <Route path="/users" element={<Users />} />
      <Route path="*" element={<Error message="Страница не найдена" />} />
    </Routes>
  );
};
