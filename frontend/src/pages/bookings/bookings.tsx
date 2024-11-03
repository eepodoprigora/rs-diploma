import { Header, Footer, BookingsList } from "../../components";
import s from "./bookings.module.scss";

export const Bookings = () => {
  return (
    <div className={s.users}>
      <Header />
      <div className={s.main}>
        <div className="container">
          <BookingsList />
        </div>
      </div>
      <Footer />
    </div>
  );
};
