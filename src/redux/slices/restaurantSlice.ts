import {createSlice, type PayloadAction} from '@reduxjs/toolkit';

import type {IRestaurant} from 'src/types/ordering';

const initialState: {
  restaurants: IRestaurant[];
  collectNow: IRestaurant[];
  newRestaurants: IRestaurant[];
} = {
  restaurants: [],
  collectNow: [],
  newRestaurants: [],
};

const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState,
  reducers: {
    addRestaurants: (state, action: PayloadAction<IRestaurant[]>) => {
      const resIds = state.restaurants.map(res => res.id);
      const restaurantsNotInRedux = action.payload.filter(
        res => !resIds.includes(res.id),
      );
      state.restaurants.push(...restaurantsNotInRedux);
    },
    addRestaurant: (state, action: PayloadAction<IRestaurant>) => {
      const currRestaurantIndex = state.restaurants.findIndex(
        restaurant => restaurant.id === action.payload.id,
      );
      if (currRestaurantIndex < 0) {
        state.restaurants.push(action.payload);
      }
    },
    addCollectNowRestaurants: (state, action: PayloadAction<IRestaurant[]>) => {
      state.collectNow.push(...action.payload);
    },
    addNewRestaurants: (state, action: PayloadAction<IRestaurant[]>) => {
      state.newRestaurants.push(...action.payload);
    },
    removeRestaurant: (state, action: PayloadAction<IRestaurant>) => {
      state.restaurants = state.restaurants.filter(
        restaurant => restaurant.id !== action.payload.id,
      );
    },
    clearRestaurants: state => {
      state.restaurants = [];
      state.collectNow = [];
      state.newRestaurants = [];
    },
  },
});

export const {
  addRestaurant,
  addRestaurants,
  addCollectNowRestaurants,
  addNewRestaurants,
  removeRestaurant,
  clearRestaurants,
} = restaurantSlice.actions;
export default restaurantSlice.reducer;
