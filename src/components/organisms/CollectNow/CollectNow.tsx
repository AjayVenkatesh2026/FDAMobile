import {Dimensions, FlatList, StyleSheet, View} from 'react-native';
import React from 'react';

import Title from 'src/components/atoms/Title';
import copies from 'src/constants/copies';
import RestaurantCarouselCard from '../RestaurantCarouselCard/RestaurantCarouselCard';
import type {IRestaurant} from 'src/types/ordering';
import {useAppSelector} from 'src/hooks/reduxHooks';

const {width: WINDOW_WIDTH} = Dimensions.get('window');
const itemWidth = Math.floor(WINDOW_WIDTH * 0.48);

const {COLLECT_NOW} = copies;

const renderItem = ({item}: {item: IRestaurant}) => (
  <RestaurantCarouselCard
    restaurant={item}
    showTimings
    bgImageStyles={styles.cardContainerStyles}
    titleStyles={styles.titleStyles}
    descriptionStyles={styles.descriptionStyles}
    taglineStyles={styles.taglineStyles}
    clockIconSize={12}
    contentContainerStyles={styles.contentContainerStyles}
  />
);

const keyExtractor = (item: IRestaurant) => item.id;

const CollectNow = () => {
  const collectNowRestaurants = useAppSelector(
    state => state.restaurantsReducer.collectNow,
  );

  return (
    <View style={styles.container}>
      <Title title={COLLECT_NOW} />
      <FlatList
        data={collectNowRestaurants}
        renderItem={renderItem}
        horizontal
        keyExtractor={keyExtractor}
      />
    </View>
  );
};

export default CollectNow;

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  cardContainerStyles: {
    width: itemWidth,
    height: itemWidth,
  },
  titleStyles: {
    fontSize: 14,
  },
  descriptionStyles: {
    fontSize: 10,
  },
  taglineStyles: {
    fontSize: 10,
  },
  contentContainerStyles: {
    paddingTop: 0,
    paddingBottom: 8,
    paddingHorizontal: 8,
  },
});
