import {StyleSheet, View} from 'react-native';
import React from 'react';

import {useAppSelector} from 'src/hooks/reduxHooks';
import RestaurantMenuItem from 'src/components/organisms/RestaurantMenuItem/RestaurantMenuItem';
import Title from 'src/components/atoms/Title';
import copies from 'src/constants/copies';
import type {IMyBasketProps} from 'src/types/screens/baskets';

const {MY_BASKET, ADD_ITEMS} = copies;

const MyBasket: React.FC<IMyBasketProps> = ({restaurant}) => {
  const cart = useAppSelector(state => state.cartReducer.products);
  const products = Object.values(cart)
    .filter(prd => prd.quantity > 0 && prd.details.is_available)
    .map(prd => prd.details);

  return (
    <View>
      <Title
        title={MY_BASKET}
        rightText={ADD_ITEMS}
        containerStyles={styles.titleContainer}
        titleStyles={styles.title}
      />
      {products.map(product => (
        <RestaurantMenuItem
          key={product.id}
          product={product}
          restaurant={restaurant}
          showTimings={false}
          showCategory
        />
      ))}
    </View>
  );
};

export default MyBasket;

const styles = StyleSheet.create({
  titleContainer: {
    marginHorizontal: 16,
    marginTop: 8,
  },
  title: {
    fontSize: 20,
  },
});
