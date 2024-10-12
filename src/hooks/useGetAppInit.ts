import {useCallback} from 'react';
import useGetCategories from 'src/services/hooks/useGetCategories';
import useGetMenuItems from 'src/services/hooks/useGetMenuItems';
import useGetRestaurants from 'src/services/hooks/useGetRestaurants';

const useGetAppInit = () => {
  const {getCategories, loading: isCategoriesLoading} = useGetCategories({});
  const {getRestaurants, loading: isRestaurantsLoading} = useGetRestaurants({});
  const {getMenuItems} = useGetMenuItems({});

  const getInitData = useCallback(() => {
    getCategories();
    getRestaurants();
    getMenuItems();
  }, [getCategories, getMenuItems, getRestaurants]);

  return {
    getInitData,
    loading: isCategoriesLoading || isRestaurantsLoading,
  };
};

export default useGetAppInit;
