import {createSlice, type PayloadAction} from '@reduxjs/toolkit';

import {set} from 'src/storage';
import keys from 'src/storage/keys';
import type {IProduct, ICartProduct} from 'src/types/ordering';
import type {ICartSlice} from 'src/types/redux';

const initialState: ICartSlice = {
  products: {},
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProductQuantity: (state, action: PayloadAction<IProduct>) => {
      const product = action.payload;
      const cartProduct = state.products[product.id];
      if (cartProduct && cartProduct.quantity && cartProduct.details.id) {
        cartProduct.quantity += 1;
      } else {
        const restaurantId = product.restaurant_id;
        const prodsToBeDeleted: string[] = [];
        Object.values(state.products).forEach(prod => {
          if (prod.details.restaurant_id !== restaurantId) {
            prodsToBeDeleted.push(prod.details.id);
          }
        });
        for (const id of prodsToBeDeleted) {
          delete state.products[id];
        }
        state.products[product.id] = {
          quantity: 1,
          details: product,
        };
        set(keys.CART, JSON.stringify(state.products));
      }
    },
    minusProductQuantity: (state, action: PayloadAction<IProduct>) => {
      const product = action.payload;
      const cartProduct = state.products[product.id];
      if (
        cartProduct &&
        cartProduct.quantity &&
        cartProduct.details.id &&
        cartProduct.quantity > 0
      ) {
        cartProduct.quantity -= 1;
      }
      set(keys.CART, JSON.stringify(state.products));
    },
    addProductsFromStorage: (
      state,
      action: PayloadAction<{[key: string]: ICartProduct}>,
    ) => {
      state.products = action.payload;
    },
    clearCart: state => {
      state.products = {};
      set(keys.CART, JSON.stringify(state.products));
    },
  },
});

export const {
  addProductQuantity,
  minusProductQuantity,
  clearCart,
  addProductsFromStorage,
} = cartSlice.actions;
export default cartSlice.reducer;
