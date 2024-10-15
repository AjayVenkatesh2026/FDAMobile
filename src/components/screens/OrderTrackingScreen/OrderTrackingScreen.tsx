import {Image, StyleSheet, View} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';

import {ActivityIndicator, Card, Divider, Icon, Text} from 'react-native-paper';
import {
  type RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';

import Header from 'src/components/molecules/Header';
import type {OrderStackParamList} from 'src/types/navigator';
import {
  CHAT_PROCESSING,
  MAP_MARKER_OUTLINE,
  MENU_DOTS,
  PHONE,
  RECORD_CIRCLE_OUTLINE,
  STAR,
} from 'src/constants/icons';
import font from 'src/styles/font';
import {getFormattedPrice} from 'src/utils/helpers';
import containers from 'src/styles/containers';
import {useAppSelector} from 'src/hooks/reduxHooks';

import dummyMap from 'src/assets/dummy/maps/dummy-map-tracking.png';
import dummyProfile from 'src/assets/dummy/delivery-partner/delivery-partner.png';
import copies from 'src/constants/copies';
import useGetOrder from 'src/services/hooks/useGetOrder';
import {isEmpty} from 'radash';
import type {IOrderResponse} from 'src/types/ordering';
import type {RootStackParamList} from 'src/types/navigator';

const {ORDER_NO} = copies;
const ICON_SIZE = 20;
const STAR_ICON_SIZE = 16;

// TODO: replace with real data
const DELIVERY_SOURCE = {
  line_1: 'East Wing, Lower Ground Floor, Estancia Mall',
  line_2: 'Pasig City, Metro Manila',
};
const DELIVERY_DESTINATION = {
  line_1: '102 , P. Tuazon St., Cubao',
  line_2: 'Quezon City, Metro Manila',
};
const DELIVERY_PARTNER = {
  name: 'Alex F.',
  rating: 4.9,
};

const OrderTrackingScreen = () => {
  const {
    params: {orderId, orderData, goBackToHome = false},
  } = useRoute<RouteProp<OrderStackParamList, 'OrderTrackingScreen'>>();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const theme = useAppSelector(state => state.themeReducer.theme);
  const restaurants = useAppSelector(
    state => state.restaurantsReducer.restaurants,
  );
  const [order, setOrder] = useState<IOrderResponse | null>(
    orderData ? orderData : null,
  );

  const onCompleted = (orderDetails: IOrderResponse) => {
    setOrder(orderDetails);
  };

  const {getOrderById, loading} = useGetOrder({onCompleted});

  useLayoutEffect(() => {
    if (orderId && isEmpty(orderData)) {
      getOrderById({orderId});
    }
  }, [getOrderById, orderData, orderId]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size={'large'} color={theme?.primaryDefault} />
      </View>
    );
  }

  const onPressBack = () => {
    if (goBackToHome) {
      navigation.navigate('BottomTab', {
        screen: 'HomeScreen',
      });
    } else {
      navigation.goBack();
    }
  };

  if (!order) {
    return null;
  }
  const {
    total_amount,
    order_status,
    delivery_address,
    restaurant_id,
    id = '',
  } = order;
  const restaurant = restaurants.find(res => res.id === restaurant_id);
  const {address = ''} = restaurant || {};

  return (
    <View style={styles.container}>
      <Header
        showBack
        onPressBack={onPressBack}
        trailingIcon={MENU_DOTS}
        containerStyles={styles.headerContainer}>
        <Text
          variant="titleMedium"
          style={styles.headerTitle}>{`${ORDER_NO} ${id}`}</Text>
      </Header>
      <Image source={dummyMap} style={styles.mapImage} />
      <Card
        style={[
          styles.orderDetailsContainer,
          {backgroundColor: theme?.surface},
        ]}>
        <View style={containers.rowCenterBetween}>
          <Text
            variant="titleMedium"
            style={[font.semiBold, {color: theme?.textHigh}]}>
            {getFormattedPrice(total_amount)}
          </Text>
          <View
            style={[
              styles.orderStatusContainer,
              {backgroundColor: theme?.positiveBG},
            ]}>
            <Text
              variant="bodyMedium"
              style={[font.regular, {color: theme?.positivePrimary}]}>
              {order_status}
            </Text>
          </View>
        </View>
        <Divider style={styles.divier} />
        <View style={containers.rowStartStart}>
          <View style={styles.addressIconContainer}>
            <Icon
              source={RECORD_CIRCLE_OUTLINE}
              size={ICON_SIZE}
              color={theme?.textLow}
            />
          </View>
          <View style={styles.addressContainer}>
            <Text
              variant="bodyMedium"
              style={[styles.addressLine1, {color: theme?.textHigh}]}>
              {address}
            </Text>
            <Text
              variant="bodySmall"
              style={[font.regular, {color: theme?.textLow}]}>
              {DELIVERY_SOURCE.line_2}
            </Text>
          </View>
        </View>
        <View style={containers.rowStartStart}>
          <View style={styles.addressIconContainer}>
            <Icon
              source={MAP_MARKER_OUTLINE}
              size={ICON_SIZE}
              color={theme?.primaryDefault}
            />
          </View>
          <View style={styles.addressContainer}>
            <Text
              variant="bodyMedium"
              style={[styles.addressLine1, {color: theme?.textHigh}]}>
              {delivery_address}
            </Text>
            <Text
              variant="bodySmall"
              style={[font.regular, {color: theme?.textLow}]}>
              {DELIVERY_DESTINATION.line_2}
            </Text>
          </View>
        </View>
        <View style={styles.deliveryPartnerDetailsContainer}>
          <Image source={dummyProfile} style={styles.partnerImage} />
          <View style={styles.partnerDetails}>
            <Text
              variant="bodyLarge"
              style={[font.regular, {color: theme?.textHigh}]}>
              {DELIVERY_PARTNER.name}
            </Text>
            <View style={containers.rowStartStart}>
              <Icon
                source={STAR}
                color={theme?.starColor}
                size={STAR_ICON_SIZE}
              />
              <Text
                variant="bodyMedium"
                style={[styles.rating, {color: theme?.textLow}]}>
                {DELIVERY_PARTNER.rating}
              </Text>
            </View>
          </View>
          <View
            style={[
              styles.iconContainer,
              {backgroundColor: theme?.borderTertiary},
            ]}>
            <Icon
              source={PHONE}
              size={ICON_SIZE}
              color={theme?.primaryDefault}
            />
          </View>
          <View
            style={[
              styles.iconContainer,
              {backgroundColor: theme?.borderTertiary},
            ]}>
            <Icon
              source={CHAT_PROCESSING}
              size={ICON_SIZE}
              color={theme?.primaryDefault}
            />
          </View>
        </View>
      </Card>
    </View>
  );
};

export default OrderTrackingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    position: 'absolute',
    zIndex: 1,
    width: '100%',
    backgroundColor: 'transparent',
  },
  headerTitle: {
    flex: 1,
    ...font.semiBold,
  },
  mapImage: {
    width: '100%',
    flex: 1,
  },
  orderDetailsContainer: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  orderStatusContainer: {
    paddingVertical: 4,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  divier: {
    marginVertical: 16,
  },
  addressContainer: {
    marginBottom: 8,
  },
  addressIconContainer: {
    marginTop: 8,
    marginRight: 8,
  },
  addressLine1: {
    ...font.regular,
    marginBottom: 4,
  },
  deliveryPartnerDetailsContainer: {
    ...containers.rowStartStart,
    paddingTop: 20,
    paddingBottom: 32,
  },
  partnerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  partnerDetails: {
    flex: 1,
  },
  rating: {
    ...font.regular,
    marginTop: -4,
  },
  iconContainer: {
    padding: 8,
    borderRadius: 40,
    marginRight: 8,
  },
  loaderContainer: {
    ...containers.rowCenterCenter,
    flex: 1,
  },
});
