import { useEffect, useState } from "react";
import { Controller, Control, FieldErrors } from "react-hook-form";
import { IAmenity, IHotelFormValues } from "../../../../types";

import s from "../form-controller/form-controller.module.scss";

interface FormControllerAmenitiesProps {
  control: Control<IHotelFormValues>;
  errors: FieldErrors<IHotelFormValues>;
}

export const FormControllerAmenities: React.FC<
  FormControllerAmenitiesProps
> = ({ control, errors }) => {
  const [amenities, setAmenities] = useState<IAmenity[]>([]);

  useEffect(() => {
    const fetchAmenities = async () => {
      const response = await fetch("/api/hotels/amenities");
      const data: IAmenity[] = await response.json();
      const initialAmenities = data.map((amenity) => ({
        ...amenity,
        selected: false,
      }));
      setAmenities(initialAmenities);
    };

    fetchAmenities();
  }, []);

  return (
    <div className={s["checkboxes-wrapper"]}>
      <label className={s.label}>Удобства</label>
      <div className={s.checkboxes}>
        {amenities.map((amenity, index) => (
          <div key={amenity._id}>
            <Controller
              name="amenities"
              control={control}
              render={({ field }) => (
                <div className={s["checkbox-wrapper"]}>
                  <input
                    className={s.checkbox}
                    type="checkbox"
                    name={"amenity-" + index + 1}
                    id={"amenity-" + index + 1}
                    checked={field.value?.includes(amenity._id) ?? false}
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      const currentAmenities = field.value ?? [];
                      const updatedAmenities = isChecked
                        ? [...currentAmenities, amenity._id]
                        : currentAmenities.filter((id) => id !== amenity._id);

                      field.onChange(updatedAmenities);
                    }}
                  />
                  <label htmlFor={"amenity-" + index + 1}>{amenity.name}</label>
                </div>
              )}
            />
          </div>
        ))}
      </div>
      {errors.amenities && (
        <p className={s.error}>{errors.amenities.message}</p>
      )}
    </div>
  );
};
