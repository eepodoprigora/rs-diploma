import { Header, HotelsList, Footer } from "../../components";

import s from "./main.module.scss";

export const Main = () => {
  return (
    <div className={`${s.app}`}>
      <Header />
      <main className={s.main}>
        <div className="container">
          <HotelsList />
        </div>
      </main>
      <Footer />
    </div>
  );
};
