import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch } from "../../hooks";
import { useState } from "react";
import { useResetForm } from "../../hooks";
import { Button, Input } from "../../components";
import { loginUser } from "../../store/thunk/users";
import s from "./login.module.scss";
import { NavLink, useNavigate } from "react-router-dom";

interface ILoginFormValues {
  email: string;
  password: string;
}

const loginFormSchema = yup.object().shape({
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
});

export const Login = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<ILoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(loginFormSchema),
  });

  useResetForm(reset);

  const onSubmit: SubmitHandler<ILoginFormValues> = async ({
    email,
    password,
  }) => {
    try {
      const user = await dispatch(loginUser({ email, password })).unwrap();
      sessionStorage.setItem("userData", JSON.stringify(user));
      navigate("/");
    } catch (error: any) {
      setServerError(error);
    }
  };

  const formError = errors?.email?.message || errors?.password?.message;
  const errorMessage = formError || serverError;

  const emailValue = watch("email");
  const passwordValue = watch("password");

  return (
    <div className={s.main}>
      <div className="">
        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
          <h1 className={s.h1}>Авторизация</h1>
          <Input
            type="text"
            placeholder="Введите email"
            value={emailValue}
            onChange={(e) => {
              setValue("email", e.target.value);
              setServerError(null);
            }}
          />
          <Input
            type="password"
            placeholder="Введите пароль"
            value={passwordValue}
            onChange={(e) => {
              setValue("password", e.target.value);
              setServerError(null);
            }}
          />
          <Button
            width="100%"
            appearance="secondary"
            disabled={!!formError}
            type="submit">
            Войти
          </Button>
          {errorMessage && <div className={s.error}>{errorMessage}</div>}
        </form>
        <div className={s.register}>
          <span> Нет аккаунта?</span>
          <NavLink className={s.link} to="/auth/register">
            Зарегистрироваться
          </NavLink>
        </div>
        <NavLink to="/" className={s["to-main"]}>
          На главную
        </NavLink>
      </div>
    </div>
  );
};
