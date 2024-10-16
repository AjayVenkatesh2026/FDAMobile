import {Dimensions, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';

import Carousel, {Pagination} from 'react-native-snap-carousel';

import {carouselItems} from 'src/constants/onboarding';
import OnboardingCarouselItem from './OnboardingCarouselItem';
import type {IOnboardingCarouselItem} from 'src/types/screens/onboarding';

const {width: WINDOW_WIDTH} = Dimensions.get('window');

const renderItem = ({item}: {item: IOnboardingCarouselItem}) => (
  <OnboardingCarouselItem item={item} />
);

const OnboardingCarousel = () => {
  const [idx, setIdx] = useState<number>();

  return (
    <View>
      <Carousel
        horizontal={true}
        sliderWidth={WINDOW_WIDTH}
        itemWidth={WINDOW_WIDTH}
        data={carouselItems}
        renderItem={renderItem}
        onSnapToItem={setIdx}
        autoplay
        autoplayInterval={500}
        lockScrollWhileSnapping={true}
      />
      <Pagination
        dotsLength={carouselItems.length || 0}
        activeDotIndex={idx || 0}
        containerStyle={styles.paginationContainer}
        dotStyle={styles.dotStyle}
        inactiveDotStyle={styles.inactiveDotStyle}
        inactiveDotOpacity={0.8}
        inactiveDotScale={1}
        dotContainerStyle={styles.dotContainer}
      />
    </View>
  );
};

export default OnboardingCarousel;

const styles = StyleSheet.create({
  paginationContainer: {
    marginTop: 36,
  },
  dotStyle: {
    backgroundColor: 'red',
    width: 32,
    height: 8,
    borderRadius: 4,
  },
  inactiveDotStyle: {
    backgroundColor: 'gray',
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dotContainer: {
    marginHorizontal: 3,
  },
});
