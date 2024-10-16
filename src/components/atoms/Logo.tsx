import {Image, StyleSheet} from 'react-native';
import React from 'react';

import logo from 'src/assets/logo.png';
const Logo = () => {
  return <Image source={logo} style={styles.image} />;
};

export default Logo;

const styles = StyleSheet.create({
  image: {
    width: 170,
    height: 170,
  },
});
