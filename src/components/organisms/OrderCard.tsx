import {StyleSheet, View} from 'react-native';
import React from 'react';

import {Card, Divider, Text} from 'react-native-paper';
import {format} from 'date-fns';

import type {IOrder} from 'src/types/ordering';
import {useAppSelector} from 'src/hooks/reduxHooks';
import containers from 'src/styles/containers';
import font from 'src/styles/font';
import {getThemedStyles} from 'src/utils/theme';
import {ddLLLhhmmbb} from 'src/constants/date';
import copies from 'src/constants/copies';
import {getFormattedPrice} from 'src/utils/helpers';
import RestaurantDetailsCard from '../molecules/RestaurantDetailsCard';
import ProductsQuantities from '../molecules/ProductsQuantities';

const {ORDER_PLACED_ON} = copies;

const OrderCard = ({order}: {order: IOrder}) => {
  const theme = useAppSelector(state => state.themeReducer.theme);
  const {delivered_at, order_status, order_total, products, restaurant} = order;
  const {image, address, name} = restaurant;
  const {line_2} = address;
  const onPressCard = () => {};

  return (
    <Card
      onPress={onPressCard}
      style={getThemedStyles({backgroundColor: theme?.surface})}>
      <RestaurantDetailsCard image={image} name={name} description={line_2} />
      <View style={styles.middleContainer}>
        <ProductsQuantities items={products} />
        <Divider
          style={getThemedStyles({backgroundColor: theme?.borderSecondary})}
        />
      </View>
      <View style={styles.footerContainer}>
        <View style={styles.orderDetailsContainer}>
          <Text
            variant={'bodySmall'}
            style={font.regular}>{`${ORDER_PLACED_ON} ${format(
            delivered_at,
            ddLLLhhmmbb,
          )}`}</Text>
          <Text variant={'bodySmall'} style={styles.orderStatus}>
            {order_status}
          </Text>
        </View>
        <Text variant={'titleSmall'} style={font.semiBold}>
          {getFormattedPrice(order_total)}
        </Text>
      </View>
    </Card>
  );
};

export default OrderCard;

const styles = StyleSheet.create({
  middleContainer: {
    paddingHorizontal: 12,
  },
  footerContainer: {
    ...containers.rowCenterStart,
    padding: 12,
  },
  orderDetailsContainer: {
    flex: 1,
  },
  orderStatus: {
    ...font.regular,
    marginTop: 4,
  },
});
