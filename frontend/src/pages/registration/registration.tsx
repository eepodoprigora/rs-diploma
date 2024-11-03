import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch } from "../../hooks";
import { useState } from "react";
import { useResetForm } from "../../hooks";
import { Button, Input } from "../../components";
import { registerUser } from "../../store/thunk/users";
import s from "./registration.module.scss";
import { NavLink, useNavigate } from "react-router-dom";

// Определяем тип данных формы
interface IRegFormValues {
  email: string;
  password: string;
  passcheck: string;
}

// Схема валидации с Yup
const regFormSchema = yup.object().shape({
  email: yup
    .string()
    .required("Заполните email")
    .email("Неверный формат email"),
  password: yup
    .string()
    .required("Заполните пароль")
    .matches(/^[\w#%]+$/, "Неверно заполнен пароль")
    .min(6, "Неверно заполнен пароль. Минимум 6 символа")
    .max(30, "Неверно заполнен пароль. Максимум 30 символов"),
  passcheck: yup
    .string()
    .oneOf([yup.ref("password")], "Пароли не совпадают")
    .required("Заполните повторно пароль"),
});

export const Registration = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<IRegFormValues>({
    defaultValues: {
      email: "",
      password: "",
      passcheck: "",
    },
    resolver: yupResolver(regFormSchema),
  });

  useResetForm(reset);

  const onSubmit: SubmitHandler<IRegFormValues> = async ({
    email,
    password,
  }) => {
    try {
      const user = await dispatch(registerUser({ email, password })).unwrap();
      sessionStorage.setItem("userData", JSON.stringify(user));
      navigate("/");
    } catch (error: any) {
      setServerError(error);
    }
  };

  // Проверяем, есть ли ошибки валидации формы
  const formError =
    errors?.email?.message ||
    errors?.password?.message ||
    errors?.passcheck?.message;

  const errorMessage = formError || serverError;

  const emailValue = watch("email");
  const passwordValue = watch("password");
  const passcheckValue = watch("passcheck");

  return (
    <div className={s.main}>
      <div className="">
        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
          <h1 className={s.h1}>Регистрация</h1>
          <Input
            type="text"
            value={emailValue}
            placeholder="Введите email"
            {...register("email", {
              onChange: (e) => {
                setValue("email", e.target.value);
                setServerError(null);
              },
            })}
          />
          <Input
            type="password"
            value={passwordValue}
            placeholder="Введите пароль"
            {...register("password", {
              onChange: (e) => {
                setValue("password", e.target.value);
                setServerError(null);
              },
            })}
          />
          <Input
            type="password"
            value={passcheckValue}
            placeholder="Повторно введите пароль"
            {...register("passcheck", {
              onChange: (e) => {
                setValue("passcheck", e.target.value);
                setServerError(null);
              },
            })}
          />
          <Button
            width="100%"
            appearance="secondary"
            disabled={!!formError}
            type="submit">
            Зарегистрироваться
          </Button>
          {errorMessage && <div className={s.error}>{errorMessage}</div>}
        </form>
        <div className={s.login}>
          <span> Есть аккаунт?</span>
          <NavLink className={s.link} to="/auth/login">
            Войти
          </NavLink>
        </div>
        <NavLink to="/" className={s["to-main"]}>
          На главную
        </NavLink>
      </div>
    </div>
  );
};
