import {useCallback, useState} from 'react';

import {dummyOrders} from 'src/constants/dummyData';
import type {IOrder} from 'src/types/ordering';

const useGetOrders = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getOrders = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setOrders(dummyOrders);
      setLoading(false);
    }, 2000);
  }, []);

  const getMoreOrders = useCallback(() => {
    if (orders.length >= 10) {
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setOrders((prevOrders = []) => {
        if (prevOrders.length < 10) {
          const newOrders = prevOrders.slice(0, 3).map((res, idx) => ({
            ...res,
            id: `${prevOrders.length + idx + 1}`,
            // restaurant: {
            //   ...res.restaurant,
            //   name: `Restaurant ${prevOrders.length + idx + 1}`,
            // },
          }));

          return [...prevOrders, ...newOrders];
        }

        return prevOrders;
      });
      setLoading(false);
    }, 2000);
  }, [orders.length]);

  return {
    orders,
    loading,
    getOrders,
    getMoreOrders,
  };
};

export default useGetOrders;
