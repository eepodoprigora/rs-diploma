import { Controller, Control, FieldErrors, Path } from "react-hook-form";
import { IHotelFormValues } from "../../../../types";

import s from "./form-controller.module.scss";

interface FormControllerProps {
  label: string;
  name: Path<IHotelFormValues>;
  errors: FieldErrors<IHotelFormValues>;
  control: Control<IHotelFormValues>;
  type: string;
}

export const FormController: React.FC<FormControllerProps> = ({
  label,
  name,
  errors,
  control,
  type,
}) => {
  const normalizeFieldValue = (value: any) => {
    return value !== null && typeof value !== "object" ? value : "";
  };

  const renderInputField = (field: any) => {
    switch (name) {
      case "content":
        return (
          <textarea
            className={s.textarea}
            {...field}
            value={normalizeFieldValue(field.value)}
          />
        );
      default:
        return (
          <input
            type={type}
            className={s.input}
            {...field}
            value={normalizeFieldValue(field.value)}
          />
        );
    }
  };

  return (
    <div className={s.wrapper}>
      <label className={s.label}>{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => renderInputField(field)}
      />
      {errors[name as keyof FieldErrors<IHotelFormValues>] && (
        <p className={s.error}>
          {errors[name as keyof FieldErrors<IHotelFormValues>]?.message}
        </p>
      )}
    </div>
  );
};
