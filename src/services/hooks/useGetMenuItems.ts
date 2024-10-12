import {ApolloError, useLazyQuery} from '@apollo/client';

import {isEmpty} from 'radash';

import type {IProduct} from 'src/types/ordering';
import {handleGqlError} from 'src/utils/services';
import {GET_MENU_ITEMS} from '../gql/menuItems';
import {useAppDispatch} from 'src/hooks/reduxHooks';
import {addMenuItems} from 'src/redux/slices/menuItemsSlice';

interface IMenuItemsResponse {
  response: {
    __typename: string;
    message: string;
    statusCode: string;
    menuItems: IProduct[];
  };
}

const useGetMenuItems = ({onCompleted}: {onCompleted?: Function}) => {
  const dispatch = useAppDispatch();

  const onGetMenuItems = (data: IMenuItemsResponse) => {
    const {response: {menuItems: menuItemsResponse = []} = {}} = data;
    if (!isEmpty(menuItemsResponse)) {
      dispatch(addMenuItems(menuItemsResponse));
      if (onCompleted) {
        onCompleted(menuItemsResponse);
      }
    }
  };

  const onError = (err: ApolloError) => {
    if (onCompleted) {
      onCompleted([]);
    }
    handleGqlError({location: 'useGetMenuItems', error: err});
  };

  const [getMenuItems, {loading}] = useLazyQuery(GET_MENU_ITEMS, {
    onCompleted: onGetMenuItems,
    onError,
    fetchPolicy: 'no-cache',
  });

  return {getMenuItems, loading};
};

export default useGetMenuItems;
