import {Dimensions, StyleSheet, View} from 'react-native';
import React from 'react';

import {Text} from 'react-native-paper';
import {Rating} from 'react-native-ratings';
import {useRoute, type RouteProp} from '@react-navigation/native';

import {useAppSelector} from 'src/hooks/reduxHooks';
import {getThemedStyles} from 'src/utils/theme';
import containers from 'src/styles/containers';
import FDAImage from 'src/components/atoms/FDAImage';
import font from 'src/styles/font';
import {getFormattedPrice} from 'src/utils/helpers';
import QuantitySelector from './QuantitySelector';
import type {ProductStackParamList} from 'src/types/navigator';
import type {IProductProps} from 'src/types/organisms';

const {width: WINDOW_WIDTH} = Dimensions.get('window');
const imageWidth = Math.floor(WINDOW_WIDTH * 0.3);

const Product: React.FC<IProductProps> = ({product}) => {
  const theme = useAppSelector(state => state.themeReducer.theme);
  const {
    params: {restaurant},
  } = useRoute<RouteProp<ProductStackParamList, 'ProductsScreen'>>();
  const {
    name = '',
    image_url = '',
    description,
    rating,
    price,
    // num_of_ratings,
  } = product;

  return (
    <View
      style={[
        styles.container,
        getThemedStyles({backgroundColor: theme?.surface}),
      ]}>
      <View style={styles.productDetailsContainer}>
        <Text variant="titleMedium" style={[font.bold, styles.title]}>
          {name}
        </Text>
        <View style={containers.rowCenterCenter}>
          <Rating
            readonly
            startingValue={rating}
            imageSize={12}
            ratingBackgroundColor={theme?.surface}
          />
          {/* <Text
            variant="bodySmall"
            style={[
              font.medium,
              getThemedStyles({color: theme?.textLow}),
              styles.ratingText,
            ]}>
            {num_of_ratings} {RATINGS}
          </Text> */}
        </View>
        <Text variant="titleSmall" style={[font.semiBold, styles.price]}>
          {getFormattedPrice(price)}
        </Text>
        <Text
          variant="bodySmall"
          style={[
            font.regular,
            styles.description,
            getThemedStyles({color: theme?.textLow}),
          ]}
          numberOfLines={3}
          ellipsizeMode="tail">
          {description}
        </Text>
      </View>
      <View>
        <FDAImage url={image_url} style={styles.image} />
        <QuantitySelector product={product} restaurant={restaurant} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...containers.rowStretchCenter,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  productDetailsContainer: {
    flex: 1,
    ...containers.columnStartStart,
  },
  title: {
    marginBottom: 8,
  },
  image: {
    width: imageWidth,
    height: imageWidth,
    borderRadius: 12,
  },
  ratingText: {
    marginLeft: 12,
  },
  price: {
    marginTop: 8,
  },
  description: {
    marginTop: 4,
  },
});

export default Product;
