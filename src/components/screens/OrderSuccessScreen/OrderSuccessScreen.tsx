import {Image, StyleSheet, View} from 'react-native';
import React from 'react';

import {
  type RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {Button, Text} from 'react-native-paper';

import copies from 'src/constants/copies';
import {
  RootStackParamList,
  type OrderStackParamList,
} from 'src/types/navigator';
import {useAppSelector} from 'src/hooks/reduxHooks';
import font from 'src/styles/font';

import successDelivery from 'src/assets/order-success/rabbit-success-1.png';
import successPickup from 'src/assets/order-success/rabbit-success-2.png';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const {
  YOUR_ORDER_IS_CONFIRMED,
  WE_LL_DELIVER_YOUR_ORDER_IMMEDIATELY_DURING_THE_COLLECTION_TIME,
  GET_READY_TO_PICK_UP_YOUR_ORDER_DURING_THE_COLLECTION_TIME,
  CHECK_ORDER_STATUS,
} = copies;

const OrderSuccessScreen = () => {
  const theme = useAppSelector(state => state.themeReducer.theme);
  const {
    params: {orderId = '', isPickup = false},
  } = useRoute<RouteProp<OrderStackParamList, 'OrderSuccess'>>();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const onPress = () => {
    navigation.replace('OrderStack', {
      screen: 'OrderTrackingScreen',
      params: {
        orderId,
        goBackToHome: true,
      },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={isPickup ? successPickup : successDelivery} />
      </View>
      <View style={styles.footerContainer}>
        <Text variant="titleLarge" style={styles.title}>
          {YOUR_ORDER_IS_CONFIRMED}
        </Text>
        <Text variant="bodySmall" style={styles.description}>
          {isPickup
            ? GET_READY_TO_PICK_UP_YOUR_ORDER_DURING_THE_COLLECTION_TIME
            : WE_LL_DELIVER_YOUR_ORDER_IMMEDIATELY_DURING_THE_COLLECTION_TIME}
        </Text>
        <Button
          buttonColor={theme?.primaryDefault}
          textColor={theme?.bgTextHigh}
          style={styles.button}
          onPress={onPress}>
          {CHECK_ORDER_STATUS}
        </Button>
      </View>
    </View>
  );
};

export default OrderSuccessScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    paddingLeft: 34,
    justifyContent: 'flex-end',
  },
  footerContainer: {
    paddingVertical: 40,
    paddingHorizontal: 16,
  },
  button: {
    borderRadius: 8,
    marginVertical: 48,
  },
  title: {
    ...font.bold,
    textAlign: 'center',
    marginVertical: 16,
  },
  description: {
    ...font.medium,
    textAlign: 'center',
  },
});
