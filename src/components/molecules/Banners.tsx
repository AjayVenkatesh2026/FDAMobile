import {Dimensions, StyleSheet, View, Image} from 'react-native';
import React, {useState} from 'react';

import Carousel, {Pagination} from 'react-native-snap-carousel';
import {Text} from 'react-native-paper';

import {carouselItems} from 'src/constants/onboarding';
import type {IBanner} from 'src/types/ordering';
import type {IBannersProps} from 'src/types/molecules';
import copies from 'src/constants/copies';
import font from 'src/styles/font';
import {useAppSelector} from 'src/hooks/reduxHooks';
import {getThemedStyles} from 'src/utils/theme';

const {width: WINDOW_WIDTH} = Dimensions.get('window');

const {SPECIAL_OFFERS} = copies;

const renderItem = ({item}: {item: IBanner}) => (
  <Image source={item.source} key={item.id} style={styles.image} />
);

const Banners: React.FC<IBannersProps> = ({banners = []}) => {
  const [idx, setIdx] = useState<number>();
  const theme = useAppSelector(state => state.themeReducer.theme);

  return (
    <View>
      <Text
        variant="titleMedium"
        style={[styles.title, getThemedStyles({color: theme?.textHigh})]}>
        {SPECIAL_OFFERS}
      </Text>
      <Carousel
        horizontal={true}
        sliderWidth={WINDOW_WIDTH}
        itemWidth={WINDOW_WIDTH}
        data={banners}
        renderItem={renderItem}
        onSnapToItem={setIdx}
      />
      <Pagination
        dotsLength={carouselItems.length || 0}
        activeDotIndex={idx || 0}
        containerStyle={styles.paginationContainer}
        dotStyle={[styles.dotStyle, {backgroundColor: theme?.primaryDefault}]}
        inactiveDotStyle={[
          styles.inactiveDotStyle,
          {backgroundColor: theme?.textDisabled},
        ]}
        inactiveDotOpacity={0.8}
        inactiveDotScale={1}
        dotContainerStyle={styles.dotContainer}
      />
    </View>
  );
};

export default Banners;

const styles = StyleSheet.create({
  title: {
    ...font.bold,
    marginLeft: 16,
    marginBottom: 8,
  },
  paginationContainer: {
    marginTop: 0,
    paddingVertical: 8,
  },
  dotStyle: {
    width: 32,
    height: 8,
    borderRadius: 4,
  },
  inactiveDotStyle: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dotContainer: {
    marginHorizontal: 3,
  },
  image: {
    width: '100%',
    height: WINDOW_WIDTH * 0.467,
    borderRadius: 12,
    resizeMode: 'contain',
  },
});
