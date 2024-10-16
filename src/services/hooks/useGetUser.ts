import {ApolloError, useLazyQuery} from '@apollo/client';

import {isEmpty} from 'radash';

import {useAppDispatch} from 'src/hooks/reduxHooks';
import {GET_USER} from '../gql/user';
import {getDecodedToken} from 'src/utils/helpers';
import {updateProfile} from 'src/redux/slices/profileSlice';
import {useCallback} from 'react';
import {handleGqlError} from 'src/utils/services';
import type {IGetUserResponse} from 'src/types/apis';

const useGetUser = ({onCompleted}: {onCompleted?: Function}) => {
  const dispatch = useAppDispatch();

  const onGetProfile = (data: IGetUserResponse) => {
    const {resposne: {user} = {}} = data;
    if (!isEmpty(user) && user) {
      dispatch(updateProfile(user));
    }
    if (onCompleted) {
      onCompleted();
    }
  };

  const onError = (err: ApolloError) => {
    handleGqlError({location: 'useGetUser', error: err});
  };

  const [getUserGQL, {loading}] = useLazyQuery(GET_USER, {
    onCompleted: onGetProfile,
    onError,
  });

  const getUser = useCallback(() => {
    const token = getDecodedToken();
    if (token.id) {
      getUserGQL({
        variables: {
          userId: token.id,
        },
      });
    }
  }, [getUserGQL]);

  return {getUser, loading};
};

export default useGetUser;
