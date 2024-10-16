import {Dimensions, StyleSheet, View} from 'react-native';
import React from 'react';

import RestaurantDetails from './RestaurantDetails';
import copies from 'src/constants/copies';
import Title from 'src/components/atoms/Title';
import FDAImage from 'src/components/atoms/FDAImage';
import type {IListHeaderProps} from 'src/types/screens/restaurant';

const {MENU_ITEMS} = copies;

const {height: WINDOW_HEIGHT} = Dimensions.get('window');
const imageHeight = Math.floor(WINDOW_HEIGHT * 0.3);

const ListHeader: React.FC<IListHeaderProps> = ({restaurant}) => {
  const {image} = restaurant;

  return (
    <View>
      <FDAImage url={image} style={styles.bgImage} />
      {/* <LinearGradient
          start={{x: 0.5, y: 0}}
          end={{x: 0.5, y: 1}}
          style={styles.container}
          colors={[
            'rgba(0, 0, 0, 0.3)',
            'rgba(0, 0, 0, 0)',
            'rgba(0, 0, 0, 0)',
            'rgba(0, 0, 0, 0)',
          ]}
          locations={[0, 0.5, 0.5, 1]}
        /> */}
      {/* </LinearGradient> */}
      <View style={styles.cardContainer}>
        <RestaurantDetails restaurant={restaurant} />
      </View>
      <Title title={MENU_ITEMS} containerStyles={styles.titleStyles} />
    </View>
  );
};

export default ListHeader;

const styles = StyleSheet.create({
  bgImage: {
    height: imageHeight,
    resizeMode: 'cover',
  },
  cardContainer: {
    marginTop: -80,
  },
  titleStyles: {
    paddingHorizontal: 16,
    marginTop: 8,
  },
});
