import {ApolloError, useMutation} from '@apollo/client';
import {useCallback} from 'react';

import {isEmpty} from 'radash';

import type {IOrderInput} from 'src/types/ordering';
import {handleGqlError} from 'src/utils/services';
import {CREATE_ORDER} from '../gql/order';
import type {ICreateOrderResponse} from 'src/types/apis';

const useCreateOrder = ({onCompleted}: {onCompleted?: Function}) => {
  const onGetOrder = (data: ICreateOrderResponse) => {
    const {response: {orders = []} = {}} = data;
    if (!isEmpty(orders)) {
      if (onCompleted) {
        onCompleted(orders);
      }
    }
  };

  const onError = (err: ApolloError) => {
    handleGqlError({location: 'useCreateOrder', error: err});
  };

  const [createOrderGQL, {loading}] = useMutation(CREATE_ORDER, {
    onCompleted: onGetOrder,
    onError,
  });

  const createOrder = useCallback(
    ({orderPayload}: {orderPayload: IOrderInput}) => {
      createOrderGQL({
        variables: {
          order: [orderPayload],
        },
      });
    },
    [createOrderGQL],
  );

  return {createOrder, loading};
};

export default useCreateOrder;
