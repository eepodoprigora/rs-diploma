export interface IHotelFormValues {
  addressline: string;
  latitude: string;
  longitude: string;
  photos: Array<string>;
  stars: number;
  title: string;
  amenities: Array<string>;
  code: string;
  ratingAverage: string;
  pricePerNight: number;
  content?: string | null;
}
