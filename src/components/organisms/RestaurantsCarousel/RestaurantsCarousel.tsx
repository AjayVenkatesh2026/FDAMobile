import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';

import {Button, Text} from 'react-native-paper';

import type {IRestaurant} from 'src/types/ordering';
import RestaurantCarouselCard from '../RestaurantCarouselCard/RestaurantCarouselCard';
import containers from 'src/styles/containers';
import {useAppSelector} from 'src/hooks/reduxHooks';
import font from 'src/styles/font';
import {getThemedStyles} from 'src/utils/theme';
import copies from 'src/constants/copies';

const {RESTAURANTS_NEAR_YOU, SEE_ALL} = copies;

const renderItem = ({item}: {item: IRestaurant}) => (
  <RestaurantCarouselCard restaurant={item} showFavouriteIcon />
);

const keyExtractor = (item: IRestaurant) => item.id;

const RestaurantsCarousel: React.FC = () => {
  const theme = useAppSelector(state => state.themeReducer.theme);
  const restaurants = useAppSelector(
    state => state.restaurantsReducer.restaurants,
  );

  const onPress = () => {};

  return (
    <View>
      <View style={styles.container}>
        <Text
          variant="titleMedium"
          style={[font.bold, getThemedStyles({color: theme?.textHigh})]}>
          {RESTAURANTS_NEAR_YOU}
        </Text>
        <Button onPress={onPress}>
          <Text
            variant="bodyMedium"
            style={[
              font.semiBold,
              getThemedStyles({color: theme?.primaryDefault}),
            ]}>
            {SEE_ALL}
          </Text>
        </Button>
      </View>
      <FlatList
        data={restaurants}
        renderItem={renderItem}
        horizontal
        keyExtractor={keyExtractor}
        style={styles.list}
      />
    </View>
  );
};

export default RestaurantsCarousel;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginTop: 16,
    ...containers.rowCenterBetween,
  },
  list: {
    padding: 16,
  },
});
