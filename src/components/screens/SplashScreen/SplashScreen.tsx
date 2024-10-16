import {Image, StyleSheet, View} from 'react-native';
import React from 'react';

import containers from 'src/styles/containers';
import {getThemedStyles} from 'src/utils/theme';
import {useAppSelector} from 'src/hooks/reduxHooks';
import Logo from 'src/components/atoms/Logo';

import rabbit from 'src/assets/rabbit-splash-screen.png';

const SplashScreen = () => {
  const theme = useAppSelector(state => state.themeReducer.theme);

  return (
    <View
      style={[
        styles.container,
        getThemedStyles({backgroundColor: theme?.primaryDefault}),
      ]}>
      <View style={styles.textContainer}>
        <Logo />
      </View>
      <Image source={rabbit} style={styles.rabbitImage} />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    ...containers.columnCenterCenter,
    flex: 1,
  },
  textContainer: {
    flex: 1,
    ...containers.columnCenterCenter,
    width: '40%',
  },
  rabbitImage: {
    width: 358,
    height: 358,
  },
});
