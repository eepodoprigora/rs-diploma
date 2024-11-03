import { Header, Footer, UsersList } from "../../components";
import s from "./users.module.scss";

export const Users = () => {
  return (
    <div className={s.users}>
      <Header />
      <div className={s.main}>
        <div className="container">
          <UsersList />
        </div>
      </div>
      <Footer />
    </div>
  );
};
