import {ApolloError, useLazyQuery} from '@apollo/client';

import {isEmpty} from 'radash';

import {useAppDispatch} from 'src/hooks/reduxHooks';
import {GET_RESTAURANTS} from '../gql/restaurants';
import {
  addCollectNowRestaurants,
  addNewRestaurants,
  addRestaurants,
} from 'src/redux/slices/restaurantSlice';
import {translateRestaurantResponseToRestaurant} from 'src/utils/helpers';
import {handleGqlError} from 'src/utils/services';
import {
  getCollectNowRestaurants,
  getNewRestaurants,
} from 'src/utils/restaurant';
import type {IGetRestaurantsResponse} from 'src/types/apis';

const useGetRestaurants = ({onCompleted}: {onCompleted?: Function}) => {
  const dispatch = useAppDispatch();

  const onGetRestaurants = (data: IGetRestaurantsResponse) => {
    const {response: {restaurants = []} = {}} = data;
    const newRestaurants = restaurants.map(
      translateRestaurantResponseToRestaurant,
    );
    if (!isEmpty(newRestaurants)) {
      dispatch(addRestaurants(newRestaurants));
      dispatch(
        addCollectNowRestaurants(getCollectNowRestaurants(newRestaurants)),
      );
      dispatch(addNewRestaurants(getNewRestaurants(newRestaurants)));
    }
    if (onCompleted) {
      onCompleted();
    }
  };

  const onError = (err: ApolloError) => {
    handleGqlError({location: 'useGetRestaurants', error: err});
  };

  const [getRestaurants, {loading}] = useLazyQuery(GET_RESTAURANTS, {
    onCompleted: onGetRestaurants,
    onError,
  });

  return {getRestaurants, loading};
};

export default useGetRestaurants;
