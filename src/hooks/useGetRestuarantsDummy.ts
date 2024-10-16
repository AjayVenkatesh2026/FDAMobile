import {useCallback, useState} from 'react';

import {dummyRestaurantsList} from 'src/constants/dummyData';
import type {IRestaurant} from 'src/types/ordering';

const useGetRestaurantsDummy = () => {
  const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getRestaurants = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setRestaurants(dummyRestaurantsList);
      setLoading(false);
    }, 2000);
  }, []);

  const getMoreRestaurants = useCallback(() => {
    if (restaurants.length > 10) {
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setRestaurants(prevRestaurants => {
        if (prevRestaurants.length < 10 && prevRestaurants.length > 0) {
          const newRestaurants = prevRestaurants
            .slice(0, 3)
            .map((res, idx) => ({
              ...res,
              id: `${prevRestaurants.length + idx + 1}`,
              name: `Restaurant ${prevRestaurants.length + idx + 1}`,
            }));

          return [...prevRestaurants, ...newRestaurants];
        }

        return prevRestaurants;
      });
      setLoading(false);
    }, 2000);
  }, [restaurants.length]);

  return {
    restaurants,
    loading,
    getRestaurants,
    getMoreRestaurants,
  };
};

export default useGetRestaurantsDummy;
