import {createSlice, type PayloadAction} from '@reduxjs/toolkit';

import type {ICategory} from 'src/types/ordering';

const initialState: {
  categories: ICategory[];
} = {
  categories: [],
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategories: (state, action: PayloadAction<ICategory[]>) => {
      state.categories = action.payload;
    },
    clearCategories: state => {
      state.categories = [];
    },
  },
});

export const {addCategories, clearCategories} = categoriesSlice.actions;
export default categoriesSlice.reducer;
