import {ApolloError, useLazyQuery} from '@apollo/client';
import {isEmpty} from 'radash';
import {useState} from 'react';

import {GET_ORDERS} from 'src/services/gql/order';
import type {IOrder} from 'src/types/ordering';
import {handleGqlError} from 'src/utils/services';
import type {IGetOrdersResponse} from 'src/types/apis';

const useGetOrders = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);

  const onGetOrders = (data: IGetOrdersResponse) => {
    const {response: {orders: ordersResponse = []} = {}} = data;
    if (!isEmpty(ordersResponse)) {
      setOrders(ordersResponse);
    }
  };

  const onError = (err: ApolloError) => {
    handleGqlError({location: 'useGetOrder', error: err});
  };

  const [getOrders, {loading}] = useLazyQuery(GET_ORDERS, {
    onCompleted: onGetOrders,
    onError,
  });

  return {
    orders,
    loading,
    getOrders,
  };
};

export default useGetOrders;
