import {StyleSheet, View} from 'react-native';
import React from 'react';

import {Card, Icon, Text} from 'react-native-paper';

import containers from 'src/styles/containers';
import {GOOGLE_MAPS, STAR} from 'src/constants/icons';
import {useAppSelector} from 'src/hooks/reduxHooks';
import font from 'src/styles/font';
import copies from 'src/constants/copies';
import type {IRestaurantDetailsProps} from 'src/types/screens/restaurant';

const {OPENING_HOURS} = copies;

const RestaurantDetails: React.FC<IRestaurantDetailsProps> = ({
  restaurant,
  containerStyles,
}) => {
  const theme = useAppSelector(state => state.themeReducer.theme);
  const {name, address, distance, openingHours, rating} = restaurant;
  const ratingText = `${rating}/5.0`;

  return (
    <Card
      style={[
        styles.container,
        {backgroundColor: theme?.surface},
        containerStyles,
      ]}>
      <Text
        variant="titleLarge"
        style={[styles.title, {color: theme?.textHigh}]}>
        {name}
      </Text>
      <Text variant="bodyMedium" style={styles.address}>
        {address}
      </Text>
      <View style={styles.timingsContainer}>
        <Text variant="titleSmall" style={styles.timingsTag}>
          {OPENING_HOURS}
        </Text>
        <Text variant="bodySmall" style={styles.timings}>
          {openingHours}
        </Text>
      </View>
      <View style={containers.rowCenterCenter}>
        <View style={containers.rowCenterStart}>
          <Icon size={16} source={GOOGLE_MAPS} color={theme?.primaryDefault} />
          <Text variant="bodyMedium" style={styles.footerText}>
            {distance}
          </Text>
        </View>
        <View style={styles.separator} />
        <View style={containers.rowCenterStart}>
          <Icon size={16} source={STAR} color={theme?.primaryDefault} />
          <Text variant="bodyMedium" style={styles.footerText}>
            {ratingText}
          </Text>
        </View>
      </View>
    </Card>
  );
};

export default RestaurantDetails;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    paddingHorizontal: 60,
    paddingVertical: 16,
  },
  title: {
    ...font.bold,
    textAlign: 'center',
    fontSize: 18,
  },
  address: {
    ...font.regular,
    textAlign: 'center',
    fontSize: 11,
  },
  timingsContainer: {
    ...containers.rowCenterCenter,
    marginVertical: 12,
  },
  timingsTag: {
    ...font.bold,
    textAlign: 'center',
    fontSize: 11,
  },
  timings: {
    ...font.regular,
    textAlign: 'center',
    fontSize: 11,
  },
  footerText: {
    ...font.regular,
    textAlign: 'center',
    fontSize: 12,
    marginLeft: 8,
  },
  separator: {
    marginHorizontal: 6,
  },
});
