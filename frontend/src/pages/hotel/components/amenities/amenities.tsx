import { H2 } from "../../../../components/h2/h2";
import { IAmenity } from "../../../../types/amenity-type";

import s from "./amenities.module.scss";

interface IAmenities {
  amenities: IAmenity[];
}

export const Amenities = ({ amenities }: IAmenities) => {
  return (
    <section className={s.amenities}>
      <H2>Удобства и услуги</H2>
      <ul>
        {amenities.map((item) => (
          <li key={item._id} className={s.amenity}>
            {item.name}
          </li>
        ))}
      </ul>
    </section>
  );
};
