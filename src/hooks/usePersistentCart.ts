import {useLayoutEffect} from 'react';

import {useAppDispatch} from './reduxHooks';
import {get} from 'src/storage';
import keys from 'src/storage/keys';
import {addProductsFromStorage} from 'src/redux/slices/cartSlice';

const usePersistentCart = () => {
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    const data = get(keys.CART);
    if (typeof data === 'string' && data) {
      try {
        const jsonData = JSON.parse(data) || {};
        dispatch(addProductsFromStorage(jsonData));
      } catch (err) {
        console.warn(
          'Error adding cart data from storgage',
          JSON.stringify(err),
        );
      }
    }
  }, [dispatch]);
};

export default usePersistentCart;
