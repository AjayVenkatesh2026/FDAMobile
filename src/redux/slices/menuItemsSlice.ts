import {createSlice, type PayloadAction} from '@reduxjs/toolkit';

import type {IProduct} from 'src/types/ordering';

const initialState: {
  menuItems: IProduct[];
} = {
  menuItems: [],
};

const menyItemsSlice = createSlice({
  name: 'menuItems',
  initialState,
  reducers: {
    addMenuItems: (state, action: PayloadAction<IProduct[]>) => {
      state.menuItems = action.payload;
    },
    clearMenuItems: state => {
      state.menuItems = [];
    },
  },
});

export const {addMenuItems, clearMenuItems} = menyItemsSlice.actions;
export default menyItemsSlice.reducer;
