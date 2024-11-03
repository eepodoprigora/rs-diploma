export interface HotelForBooking {
  _id: string;
  title: string;
  code: string;
}

export interface UserForBooking {
  _id: string;
  email: string;
}

export interface IBooking {
  hotel: HotelForBooking;
  user: UserForBooking;
  phone: string;
  check_in: string;
  check_out: string;
  id: string;
}
