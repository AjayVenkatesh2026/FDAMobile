import {ApolloError, useLazyQuery} from '@apollo/client';

import {isEmpty} from 'radash';

import {useAppDispatch} from 'src/hooks/reduxHooks';
import {GET_CATEGORIES} from '../gql/categories';
import {addCategories} from 'src/redux/slices/categoriesSlice';
import {handleGqlError} from 'src/utils/services';
import type {ICategoriesResponse} from 'src/types/apis';

const useGetCategories = ({onCompleted}: {onCompleted?: Function}) => {
  const dispatch = useAppDispatch();

  const onGetCategories = (data: ICategoriesResponse) => {
    const {resposne: {categories = []} = {}} = data;
    if (!isEmpty(categories)) {
      dispatch(addCategories(categories));
    }
    if (onCompleted) {
      onCompleted();
    }
  };

  const onError = (err: ApolloError) => {
    handleGqlError({location: 'useGetCategories', error: err});
  };

  const [getCategories, {loading}] = useLazyQuery(GET_CATEGORIES, {
    onCompleted: onGetCategories,
    onError,
  });

  return {getCategories, loading};
};

export default useGetCategories;
