import {StyleSheet, View} from 'react-native';
import React from 'react';

import {Icon, Text, TouchableRipple} from 'react-native-paper';

import containers from 'src/styles/containers';
import FDAImage from 'src/components/atoms/FDAImage';
import {BELL_BADGE_OUTLINE} from 'src/constants/icons';
import {useAppSelector} from 'src/hooks/reduxHooks';
import font from 'src/styles/font';
import type {IMysteryBag} from 'src/types/organisms';

const MysteryBag: React.FC<IMysteryBag> = ({mysteryBag}) => {
  const theme = useAppSelector(state => state.themeReducer.theme);
  const {image_url, name, restaurant_name} = mysteryBag;

  return (
    <View style={styles.container}>
      <FDAImage url={image_url} style={styles.image} />
      <View style={styles.contentContainer}>
        <Text variant="titleSmall" style={font.semiBold}>
          {name}
        </Text>
        <Text variant="bodySmall" style={font.regular}>
          {restaurant_name}
        </Text>
      </View>
      <TouchableRipple
        onPress={() => {}}
        style={[styles.button, {backgroundColor: theme?.primaryDefault}]}>
        <Icon source={BELL_BADGE_OUTLINE} color={theme?.bgTextHigh} size={20} />
      </TouchableRipple>
    </View>
  );
};

export default MysteryBag;

const styles = StyleSheet.create({
  container: {
    ...containers.rowCenterCenter,
    paddingHorizontal: 16,
  },
  image: {
    width: 85,
    height: 85,
    borderRadius: 8,
  },
  contentContainer: {
    flex: 1,
    paddingLeft: 16,
    paddingTop: 16,
    height: '100%',
  },
  button: {
    padding: 12,
    borderRadius: 32,
  },
});
