import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';

import {Text} from 'react-native-paper';

import font from 'src/styles/font';
import copies from 'src/constants/copies';
import {useAppSelector} from 'src/hooks/reduxHooks';
import PaymentMethod from './PaymentMethod';
import {PAYMENT_METHODS} from 'src/constants/checkout';
import containers from 'src/styles/containers';
import type {IPaymentMethod} from 'src/types/ordering';

const {PAYMENT_METHOD} = copies;

const PaymentMethods = () => {
  const theme = useAppSelector(state => state.themeReducer.theme);
  const [selectedPaymentMethodId, setSelectedPaymentMethodId] =
    useState<string>(PAYMENT_METHODS[0].id);

  const onChangePaymentMethod = (method: IPaymentMethod) => {
    setSelectedPaymentMethodId(method.id);
  };

  return (
    <View style={styles.container}>
      <Text
        variant="titleLarge"
        style={[styles.title, {color: theme?.textHigh}]}>
        {PAYMENT_METHOD}
      </Text>
      <View style={containers.rowStartAround}>
        {PAYMENT_METHODS.map(method => (
          <PaymentMethod
            paymentMethod={method}
            key={method.id}
            selectedMethodId={selectedPaymentMethodId}
            onPress={onChangePaymentMethod}
          />
        ))}
      </View>
    </View>
  );
};

export default PaymentMethods;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 48,
  },
  title: {
    ...font.bold,
    fontSize: 20,
    marginVertical: 16,
  },
});
