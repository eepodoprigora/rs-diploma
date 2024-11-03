import s from "./loader.module.scss";

export const Loader = () => {
  return (
    <div className={s["loader-container"]}>
      <div className={s.loader}></div>
    </div>
  );
};
