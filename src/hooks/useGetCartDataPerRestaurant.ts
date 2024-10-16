import {useMemo} from 'react';

import {useAppSelector} from './reduxHooks';
import {getCartRestaurantData} from 'src/utils/cart';
import type {ICartData} from 'src/types/ordering';

const useGetCartDataPerRestaurant = ({
  restaurantId,
}: {
  restaurantId: string;
}) => {
  const cartProducts = useAppSelector(state => state.cartReducer.products);
  const restaurants = useAppSelector(
    state => state.restaurantsReducer.restaurants,
  );

  const cartData = useMemo<ICartData>(() => {
    const restaurant = restaurants.find(res => res.id === restaurantId);
    if (restaurant !== undefined) {
      const products = Object.values(cartProducts).filter(
        product =>
          product.quantity > 0 &&
          product.details.restaurant_id === restaurantId &&
          product.details.is_available,
      );

      const groupedProductsByRestaurant = {[restaurantId]: products};
      return getCartRestaurantData({restaurant, groupedProductsByRestaurant});
    }

    return {
      restaurant: null,
      orderData: {
        itemTotal: 0,
        deliveryFee: 0,
        platformFee: 0,
        tax: 0,
        pickupDiscount: 0,
      },
      products: [],
    };
  }, [cartProducts, restaurantId, restaurants]);

  return {
    cartData,
  };
};

export default useGetCartDataPerRestaurant;
