import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';

import {ActivityIndicator, Button, Text} from 'react-native-paper';
import {isEmpty} from 'radash';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';

import Header from 'src/components/molecules/Header';
import copies from 'src/constants/copies';
import {MENU_DOTS} from 'src/constants/icons';
import containers from 'src/styles/containers';
import {useAppSelector} from 'src/hooks/reduxHooks';
import DistributionDetails from './DistributionDetails';
import {getCartRestaurant} from 'src/utils/cart';
import MyBasket from './MyBasket';
import PaymentBreakdown from './PaymentBreakdown';
import PaymentMethods from 'src/components/organisms/PaymentMethods/PaymentMethods';
import type {RootStackParamList} from 'src/types/navigator';
import usePlaceOrder from 'src/hooks/usePlaceOrder';
import {IOrderResponse} from 'src/types/ordering';

const {CHECKOUT, DELIVERY, PICKUP, EMPTY_BASKET} = copies;

const BasketsScreen = () => {
  const [isPickup, setIsPickup] = useState<boolean>(false);
  const theme = useAppSelector(state => state.themeReducer.theme);
  const restaurants = useAppSelector(
    state => state.restaurantsReducer.restaurants,
  );
  const cart = useAppSelector(state => state.cartReducer.products);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const cartRestaurant = getCartRestaurant(cart, restaurants);

  const onCompleted = (data: IOrderResponse) => {
    // TODO: remove hard coded order id 18ea888b-8fad-40ed-9f3b-d7c86902900a
    const {id = '18ea888b-8fad-40ed-9f3b-d7c86902900a'} = data;

    navigation.navigate('OrderStack', {
      screen: 'OrderSuccess',
      params: {
        orderId: id,
        isPickup,
      },
    });
  };

  const {placeOrder, loading} = usePlaceOrder({
    restaurantId: cartRestaurant?.id,
    onCompleted,
  });

  const onPressDelivery = () => {
    setIsPickup(false);
  };

  const onPressPickup = () => {
    setIsPickup(true);
  };

  const onPressCheckout = () => {
    placeOrder();
  };

  return (
    <View style={[styles.container, {backgroundColor: theme?.surface}]}>
      <Header
        trailingIcon={MENU_DOTS}
        containerStyles={[
          styles.headerContainer,
          {borderBottomColor: theme?.borderSecondary},
        ]}>
        <View style={styles.headerMiddleContainer}>
          <Text variant="titleMedium">{CHECKOUT}</Text>
        </View>
      </Header>
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size={'large'} color={theme?.primaryDark} />
        </View>
      ) : isEmpty(cartRestaurant) || cartRestaurant === undefined ? (
        <View style={styles.emptyContainer}>
          <Text variant="bodyMedium" style={{color: theme?.textMid}}>
            {EMPTY_BASKET}
          </Text>
        </View>
      ) : (
        <>
          <ScrollView style={styles.container}>
            <View style={styles.buttonsContainer}>
              <Button
                mode="outlined"
                onPress={onPressDelivery}
                style={[styles.button, {borderColor: theme?.primaryDefault}]}
                buttonColor={isPickup ? theme?.surface : theme?.primaryDefault}
                textColor={
                  isPickup ? theme?.primaryDefault : theme?.bgTextHigh
                }>
                {DELIVERY}
              </Button>
              <View style={styles.separator} />
              <Button
                mode="outlined"
                onPress={onPressPickup}
                textColor={isPickup ? theme?.surface : theme?.primaryDefault}
                buttonColor={isPickup ? theme?.primaryDefault : theme?.surface}
                style={[styles.button, {borderColor: theme?.primaryDefault}]}>
                {PICKUP}
              </Button>
            </View>
            <DistributionDetails
              isPickup={isPickup}
              restaurant={cartRestaurant}
            />
            <MyBasket restaurant={cartRestaurant} />
            <PaymentBreakdown
              restaurantId={cartRestaurant.id}
              isPickup={isPickup}
            />
            <PaymentMethods />
          </ScrollView>
          <View
            style={[
              styles.checkoutButtonContainer,
              {borderColor: theme?.borderPrimary},
            ]}>
            <Button
              style={styles.checkoutButton}
              buttonColor={theme?.primaryDefault}
              onPress={onPressCheckout}
              textColor={theme?.bgTextHigh}>
              {CHECKOUT}
            </Button>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    borderBottomWidth: 1,
  },
  headerMiddleContainer: {
    flex: 1,
    marginLeft: 16,
  },
  buttonsContainer: {
    ...containers.rowCenterStart,
    paddingHorizontal: 16,
    marginTop: 16,
  },
  separator: {
    marginHorizontal: 4,
  },
  button: {
    flex: 1,
    borderRadius: 8,
  },
  emptyContainer: {
    flex: 1,
    ...containers.rowCenterCenter,
  },
  checkoutButtonContainer: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderTopWidth: 1,
  },
  checkoutButton: {
    borderRadius: 8,
  },
  loaderContainer: {
    ...containers.rowCenterCenter,
    flex: 1,
  },
});

export default BasketsScreen;
