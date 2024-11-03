import { IAmenity } from "./amenity-type";
import { IComment } from "./comment-type";

export interface IHotel {
  addressline: string;
  comments: Array<IComment>;
  id: string;
  latitude: string;
  longitude: string;
  photos: Array<string>;
  stars: number;
  title: string;
  amenities: Array<IAmenity>;
  code: string;
  ratingAverage: string;
  pricePerNight: number;
  content?: string;
}
