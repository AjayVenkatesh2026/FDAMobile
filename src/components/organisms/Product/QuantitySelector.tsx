import {StyleSheet, View} from 'react-native';
import React from 'react';

import {IconButton, Text} from 'react-native-paper';

import containers from 'src/styles/containers';
import {MINUS, PLUS} from 'src/constants/icons';
import {useAppDispatch, useAppSelector} from 'src/hooks/reduxHooks';
import font from 'src/styles/font';
import {
  addProductQuantity,
  minusProductQuantity,
} from 'src/redux/slices/cartSlice';
import type {IQuantitySelectorProps} from 'src/types/organisms';

const QuantitySelector: React.FC<IQuantitySelectorProps> = ({product}) => {
  const theme = useAppSelector(state => state.themeReducer.theme);
  const cartProduct = useAppSelector(
    state => state.cartReducer.products[product.id],
  );
  const quantity = cartProduct?.quantity || 0;
  const dispatch = useAppDispatch();
  const isMinusDisabled = quantity <= 0;

  const onPressMinus = () => {
    dispatch(minusProductQuantity(product));
  };

  const onPressPlus = () => {
    dispatch(addProductQuantity(product));
  };

  return (
    <View style={[containers.rowCenterCenter]}>
      <IconButton
        icon={MINUS}
        size={16}
        disabled={isMinusDisabled}
        iconColor={theme?.bgTextHigh}
        containerColor={
          isMinusDisabled ? theme?.textDisabled : theme?.primaryDark
        }
        style={styles.minus}
        onPress={onPressMinus}
      />
      <Text variant="bodyMedium" style={styles.quantity}>
        {quantity}
      </Text>
      <IconButton
        icon={PLUS}
        size={16}
        iconColor={theme?.bgTextHigh}
        containerColor={theme?.primaryDark}
        style={styles.minus}
        onPress={onPressPlus}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  minus: {
    borderRadius: 4,
    padding: 0,
  },
  quantity: {
    ...font.bold,
    minWidth: 16,
    textAlign: 'center',
    marginHorizontal: 4,
  },
});

export default QuantitySelector;
