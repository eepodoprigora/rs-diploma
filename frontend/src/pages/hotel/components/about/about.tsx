import { H2 } from "../../../../components/h2/h2";
import { IHotel } from "../../../../types";
import s from "./about.module.scss";

interface IAbout extends Pick<IHotel, "content"> {}

export const About = ({ content }: IAbout) => {
  const cleanedContent = content ? content.replace(/\n/g, "<br />") : "";

  return (
    <section className={s.about}>
      <H2>Про отель</H2>
      <p
        className={s.content}
        dangerouslySetInnerHTML={{ __html: cleanedContent }}
      />
    </section>
  );
};
