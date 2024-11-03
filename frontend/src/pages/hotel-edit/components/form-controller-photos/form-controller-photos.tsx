import { Controller, Control, FieldErrors } from "react-hook-form";
import { IHotelFormValues } from "../../../../types";
import { Button } from "../../../../components";

import s from "../form-controller/form-controller.module.scss";

interface FormControllerPhotosProps {
  control: Control<IHotelFormValues>;
  errors: FieldErrors<IHotelFormValues>;
}

export const FormControllerPhotos: React.FC<FormControllerPhotosProps> = ({
  control,
  errors,
}) => {
  return (
    <div className={s.wrapper}>
      <label className={s.label}>Ссылки на фото</label>
      <Controller
        name="photos"
        control={control}
        render={({ field }) => (
          <div>
            {field.value.map((photo, index) => (
              <div key={index}>
                <div className={s["add-photo"]}>
                  <input
                    name={`photo-${index + 1}`}
                    className={s.input}
                    type="text"
                    value={photo || ""}
                    onChange={(e) => {
                      const updatedPhotos = [...field.value];
                      updatedPhotos[index] = e.target.value; // Обновляем текущее значение
                      field.onChange(updatedPhotos);
                    }}
                  />
                  <Button
                    width="auto"
                    appearance="primary"
                    type="button"
                    onClick={() => {
                      const updatedPhotos = field.value.filter(
                        (_, i) => i !== index
                      );
                      field.onChange(updatedPhotos);
                    }}>
                    Удалить
                  </Button>
                </div>
                {errors.photos &&
                  Array.isArray(errors.photos) &&
                  errors.photos[index] && (
                    <p className={s.error}>{errors.photos[index].message}</p>
                  )}
              </div>
            ))}
            <Button
              appearance="secondary"
              width="auto"
              type="button"
              onClick={() => {
                const lastPhoto = field.value[field.value.length - 1];
                if (lastPhoto === undefined || lastPhoto.trim() !== "") {
                  field.onChange([...field.value, ""]);
                }
              }}>
              Добавить фото
            </Button>
            {errors.photos && !Array.isArray(errors.photos) && (
              <p className={s.error}>{errors.photos.message}</p>
            )}
          </div>
        )}
      />
    </div>
  );
};
