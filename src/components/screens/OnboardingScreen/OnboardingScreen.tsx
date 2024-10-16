import {StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';

import {Button, Text} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {useAppSelector} from 'src/hooks/reduxHooks';
import copies from 'src/constants/copies';
import containers from 'src/styles/containers';
import font from 'src/styles/font';
import {getThemedStyles} from 'src/utils/theme';
import OnboardingCarousel from './OnboardingCarousel';
import type {RootStackParamList} from 'src/types/navigator';
import {set} from 'src/storage';
import keys from 'src/storage/keys';

const {NEXT} = copies;

const OnboardingScreen = () => {
  const theme = useAppSelector(state => state.themeReducer.theme);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const timeout = setTimeout(() => {
      set(keys.HAS_SEEN_ONBOARDING, true);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const onPressNext = () => {
    navigation.navigate('AuthStack', {
      screen: 'LoginScreen',
    });
  };

  return (
    <View style={styles.container}>
      <OnboardingCarousel />
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          buttonColor={theme?.primaryDefault}
          textColor={theme?.bgTextHigh}
          onPress={onPressNext}
          style={styles.buttonStyles}>
          <Text
            variant="bodyMedium"
            style={[font.medium, getThemedStyles({color: theme?.bgTextHigh})]}>
            {NEXT}
          </Text>
        </Button>
      </View>
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    ...containers.columnStretchCenter,
  },
  buttonStyles: {
    marginHorizontal: 28,
    borderRadius: 0,
  },
});
