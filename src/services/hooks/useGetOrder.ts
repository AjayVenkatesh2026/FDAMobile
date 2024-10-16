import {ApolloError, useLazyQuery} from '@apollo/client';
import {useCallback} from 'react';

import {isEmpty} from 'radash';

import {handleGqlError} from 'src/utils/services';
import {GET_ORDER} from '../gql/order';
import type {IOrderByIdResponse} from 'src/types/apis';

const useGetOrder = ({onCompleted}: {onCompleted?: Function}) => {
  const onGetOrder = (data: IOrderByIdResponse) => {
    const {response: {order = []} = {}} = data;
    if (!isEmpty(order)) {
      if (onCompleted) {
        onCompleted(order);
      }
    }
  };

  const onError = (err: ApolloError) => {
    handleGqlError({location: 'useGetOrder', error: err});
  };

  const [getOrder, {loading}] = useLazyQuery(GET_ORDER, {
    onCompleted: onGetOrder,
    onError,
  });

  const getOrderById = useCallback(
    ({orderId = ''}) => {
      getOrder({
        variables: {
          orderId,
        },
      });
    },
    [getOrder],
  );

  return {getOrderById, loading};
};

export default useGetOrder;
