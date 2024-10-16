import {DUMMY_BILL_BREAKDOWN} from 'src/constants/dummyData';
import type {ICartData, ICartProduct, IRestaurant} from 'src/types/ordering';

const {DELIVERY_CHARGE, PLATFORM_FEE, TAX, PICKUP_DISCOUNT} =
  DUMMY_BILL_BREAKDOWN;

const getCartRestaurantData = ({
  restaurant,
  groupedProductsByRestaurant,
}: {
  restaurant: IRestaurant;
  groupedProductsByRestaurant: {[key: string]: ICartProduct[] | undefined};
}): ICartData => {
  const restaurantProducts = groupedProductsByRestaurant[restaurant.id] || [];
  const productsTotal = restaurantProducts.reduce(
    (acc, product) => acc + product.details.price * product.quantity,
    0,
  );

  return {
    restaurant,
    products: restaurantProducts,
    orderData: {
      itemTotal: productsTotal,
      deliveryFee: DELIVERY_CHARGE,
      platformFee: PLATFORM_FEE,
      tax: TAX,
      pickupDiscount: PICKUP_DISCOUNT,
    },
  };
};

const getProductTotalAllRestaurants = (cart: {
  [key: string]: ICartProduct;
}): number => {
  const products = Object.values(cart);

  return products.reduce(
    (acc, product) => acc + product.details.price * product.quantity,
    0,
  );
};

const getCartRestaurant = (
  cart: {
    [key: string]: ICartProduct;
  },
  restaurants: IRestaurant[],
) => {
  const restaurantId = Object.values(cart)?.[0]?.details?.restaurant_id;

  return restaurants.find(res => res.id === restaurantId);
};

export {
  getCartRestaurantData,
  getProductTotalAllRestaurants,
  getCartRestaurant,
};
