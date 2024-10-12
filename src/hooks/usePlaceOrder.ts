import {useCallback} from 'react';

// import {isEmpty} from 'radash';

import useCreateOrder from 'src/services/hooks/useCreateOrder';
import useGetCartDataPerRestaurant from './useGetCartDataPerRestaurant';
import {IOrderInput, IOrderProduct, IOrderResponse} from 'src/types/ordering';
import {useAppDispatch, useAppSelector} from './reduxHooks';
import {TDateISO} from 'src/types/date';
import {clearCart} from 'src/redux/slices/cartSlice';

const usePlaceOrder = ({
  onCompleted,
  restaurantId = '',
}: {
  onCompleted?: Function;
  restaurantId?: string;
}) => {
  const {id, address} = useAppSelector(state => state.profileReducer.profile);
  const cartProducts = useAppSelector(state => state.cartReducer.products);
  const dispatch = useAppDispatch();
  const {cartData} = useGetCartDataPerRestaurant({restaurantId});
  const {
    orderData: {itemTotal = 0, deliveryFee, platformFee},
  } = cartData;
  const onOrderCompleted = (data: IOrderResponse[]) => {
    // if (!isEmpty(data) && data[0]?.id) {
    dispatch(clearCart());
    if (onCompleted) {
      onCompleted(data[0]);
    }
    // }
  };
  const {createOrder, loading} = useCreateOrder({
    onCompleted: onOrderCompleted,
  });

  const placeOrder = useCallback(() => {
    if (!restaurantId) {
      return;
    }
    const adminComission = platformFee;
    const totalAmount = itemTotal + deliveryFee + platformFee;
    const vendorEarnings = totalAmount - adminComission;

    const orderItems: IOrderProduct[] = Object.values(cartProducts)
      .filter(
        prod =>
          prod.quantity > 0 &&
          prod.details.is_available &&
          prod.details.restaurant_id === restaurantId,
      )
      .map(prod => ({
        id: prod.details.id,
        name: prod.details.name,
        price: prod.details.price,
        quantity: prod.quantity,
      }));

    const orderPayload: IOrderInput = {
      admin_commission: adminComission,
      delivery_address: address,
      order_items: orderItems,
      restaurant_id: restaurantId,
      total_amount: totalAmount,
      vendor_earnings: vendorEarnings,
      order_status: 'PENDING',
      order_placed_at: new Date().toISOString() as TDateISO,
      user_id: id,
      type: 'order',
    };

    createOrder({orderPayload});
  }, [
    address,
    cartProducts,
    createOrder,
    deliveryFee,
    id,
    itemTotal,
    platformFee,
    restaurantId,
  ]);

  return {
    placeOrder,
    loading,
  };
};

export default usePlaceOrder;
