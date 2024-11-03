import { configureStore } from "@reduxjs/toolkit";
import {
  appReducer,
  bookingReducer,
  userReducer,
  hotelsReducer,
  rolesReducer,
  IAppState,
  IHotelsState,
  IUsersState,
  IBookingState,
} from "./reducers";

export interface IRootState {
  app: IAppState;
  hotels: IHotelsState;
  users: IUsersState;
  bookings: IBookingState;
}

export const store = configureStore({
  reducer: {
    app: appReducer,
    hotels: hotelsReducer,
    users: userReducer,
    roles: rolesReducer,
    bookings: bookingReducer,
  },
});

// Типы для dispatch и состояния Store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
