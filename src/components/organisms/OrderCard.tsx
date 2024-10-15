import {StyleSheet, ToastAndroid, View} from 'react-native';
import React from 'react';

import {Card, Divider, Text} from 'react-native-paper';
import {format} from 'date-fns';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';

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
import type {RootStackParamList} from 'src/types/navigator';

const {ORDER_PLACED_ON} = copies;

const OrderCard = ({order}: {order: IOrder}) => {
  const theme = useAppSelector(state => state.themeReducer.theme);
  const restaurants = useAppSelector(
    state => state.restaurantsReducer.restaurants,
  );
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {
    order_placed_at,
    order_status,
    total_amount,
    order_items,
    restaurant_id,
  } = order;
  const {
    image = '',
    address = '',
    name = '',
  } = restaurants.find(res => res.id === restaurant_id) || {};
  const onPressCard = () => {
    if (order_status !== 'COMPLETED') {
      navigation.navigate('OrderStack', {
        screen: 'OrderTrackingScreen',
        params: {
          orderData: order,
        },
      });
    } else {
      ToastAndroid.show('Order Completd!', 500);
    }
  };

  return (
    <Card
      onPress={onPressCard}
      style={getThemedStyles({backgroundColor: theme?.surface})}>
      <RestaurantDetailsCard image={image} name={name} description={address} />
      <View style={styles.middleContainer}>
        <ProductsQuantities items={order_items} />
        <Divider
          style={getThemedStyles({backgroundColor: theme?.borderSecondary})}
        />
      </View>
      <View style={styles.footerContainer}>
        <View style={styles.orderDetailsContainer}>
          <Text
            variant={'bodySmall'}
            style={font.regular}>{`${ORDER_PLACED_ON} ${format(
            order_placed_at,
            ddLLLhhmmbb,
          )}`}</Text>
          <Text variant={'bodySmall'} style={styles.orderStatus}>
            {order_status}
          </Text>
        </View>
        <Text variant={'titleSmall'} style={font.semiBold}>
          {getFormattedPrice(total_amount)}
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
