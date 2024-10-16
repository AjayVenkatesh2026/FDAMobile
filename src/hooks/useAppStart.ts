import {useEffect} from 'react';

import {StackActions, useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {getBoolean} from 'src/storage';

import screenNames from 'src/constants/screenNames';
import {TEST_LOGGED_IN} from 'config';
import {useAppDispatch} from './reduxHooks';
import keys from 'src/storage/keys';
import type {RootStackParamList} from 'src/types/navigator';
import {isValidToken} from 'src/utils/helpers';
import useGetUser from 'src/services/hooks/useGetUser';

const {loginStackScreenNames} = screenNames;

const useAppStart = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();
  const onCompleted = () => {
    navigation.dispatch(StackActions.replace('BottomTab'));
  };

  const {getUser} = useGetUser({onCompleted});

  useEffect(() => {
    const hasSeenOnboarding = getBoolean(keys.HAS_SEEN_ONBOARDING);

    if (!hasSeenOnboarding) {
      navigation.navigate('OnboardingScreen');
    } else {
      if (TEST_LOGGED_IN || isValidToken()) {
        getUser();
      } else {
        navigation.dispatch(
          StackActions.replace('AuthStack', {
            screen: loginStackScreenNames.LoginScreen,
          }),
        );
      }
    }
  }, [dispatch, getUser, navigation]);
};

export default useAppStart;
