import { IHotelFormValues } from "../types";

export const mapHotelForServer = (hotel: IHotelFormValues) => {
  return {
    addressline: hotel.addressline,
    amenities: hotel.amenities,
    code: hotel.code,
    content: hotel.content,
    latitude: hotel.latitude,
    longitude: hotel.longitude,
    photos: hotel.photos,
    price_per_night: hotel.pricePerNight,
    rating_average: hotel.ratingAverage,
    stars: hotel.stars,
    title: hotel.title,
  };
};
