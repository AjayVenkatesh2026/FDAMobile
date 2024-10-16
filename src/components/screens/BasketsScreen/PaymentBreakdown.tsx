import {StyleSheet, View} from 'react-native';
import React from 'react';

import {Divider, Text} from 'react-native-paper';

import copies from 'src/constants/copies';
import {useAppSelector} from 'src/hooks/reduxHooks';
import font from 'src/styles/font';
import KeyValue from 'src/components/atoms/KeyValue';
import {getFormattedPrice} from 'src/utils/helpers';
import useGetCartDataPerRestaurant from 'src/hooks/useGetCartDataPerRestaurant';
import type {IPaymentBreakdownProps} from 'src/types/screens/baskets';

const {
  PAYMENT,
  ITEM_TOTAL,
  DELIVERY_FEE,
  PICKUP_DISCOUNT,
  TO_PAY,
  PLATFORM_FEE,
} = copies;

const PaymentBreakdown: React.FC<IPaymentBreakdownProps> = ({
  restaurantId,
  isPickup = false,
}) => {
  const theme = useAppSelector(state => state.themeReducer.theme);
  const {
    cartData: {
      orderData: {itemTotal, deliveryFee, pickupDiscount, platformFee},
    },
  } = useGetCartDataPerRestaurant({restaurantId});
  const grandTotal =
    itemTotal + (isPickup ? -pickupDiscount : deliveryFee) + platformFee;

  return (
    <View style={styles.container}>
      <Text
        variant="titleLarge"
        style={[styles.title, {color: theme?.textHigh}]}>
        {PAYMENT}
      </Text>
      <KeyValue
        name={ITEM_TOTAL}
        value={getFormattedPrice(itemTotal)}
        keyStyles={[styles.keyStyles, {color: theme?.textMid}]}
        valueStyles={[styles.valueStyles, {color: theme?.textHigh}]}
      />
      {isPickup ? (
        <KeyValue
          name={PICKUP_DISCOUNT}
          value={`-${getFormattedPrice(pickupDiscount)}`}
          keyStyles={[styles.keyStyles, {color: theme?.textMid}]}
          valueStyles={[styles.valueStyles, {color: theme?.primaryDefault}]}
        />
      ) : (
        <KeyValue
          name={DELIVERY_FEE}
          value={getFormattedPrice(deliveryFee)}
          keyStyles={[styles.keyStyles, {color: theme?.textMid}]}
          valueStyles={[styles.valueStyles, {color: theme?.textHigh}]}
        />
      )}
      <KeyValue
        name={PLATFORM_FEE}
        value={getFormattedPrice(platformFee)}
        keyStyles={[styles.keyStyles, {color: theme?.textMid}]}
        valueStyles={[styles.valueStyles, {color: theme?.textHigh}]}
      />
      <Divider
        style={[styles.divider, {backgroundColor: theme?.borderPrimary}]}
      />
      <KeyValue
        name={TO_PAY}
        value={getFormattedPrice(grandTotal)}
        keyStyles={[styles.toPay, {color: theme?.textHigh}]}
        valueStyles={[styles.valueStyles, {color: theme?.textHigh}]}
      />
    </View>
  );
};

export default PaymentBreakdown;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginTop: 8,
  },
  title: {
    ...font.bold,
    fontSize: 20,
    marginBottom: 8,
  },
  keyStyles: {
    ...font.regular,
    fontSize: 16,
  },
  valueStyles: {
    ...font.bold,
    fontSize: 14,
  },
  toPay: {
    ...font.bold,
    fontSize: 16,
  },
  divider: {
    marginVertical: 4,
  },
});
