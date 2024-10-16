import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';

import {Text} from 'react-native-paper';

import containers from 'src/styles/containers';
import {useAppSelector} from 'src/hooks/reduxHooks';
import type {IPaymentMethodProps} from 'src/types/organisms';

const PaymentMethod: React.FC<IPaymentMethodProps> = ({
  paymentMethod,
  onPress,
  selectedMethodId = '',
}) => {
  const theme = useAppSelector(state => state.themeReducer.theme);
  const {name, image, id} = paymentMethod;
  const isSelected = id === selectedMethodId;

  const onPressPaymentMethod = () => {
    if (onPress) {
      onPress(paymentMethod);
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPressPaymentMethod}>
      <View
        style={[
          styles.imageContainer,
          {backgroundColor: theme?.paymentMethodBackground},
          isSelected
            ? [
                {
                  borderColor: theme?.primaryDefault,
                  backgroundColor: theme?.surface,
                },
                styles.selectedImageContainer,
              ]
            : {},
        ]}>
        <Image source={image} style={styles.image} />
      </View>
      <Text variant="bodyMedium" style={styles.name}>
        {name}
      </Text>
    </TouchableOpacity>
  );
};

export default PaymentMethod;

const styles = StyleSheet.create({
  container: {
    width: 80,
  },
  imageContainer: {
    ...containers.rowCenterCenter,
    width: 80,
    height: 64,
    borderRadius: 12,
  },
  selectedImageContainer: {
    borderWidth: 2,
    borderRadius: 8,
  },
  image: {},
  name: {
    fontSize: 12,
    textAlign: 'center',
  },
});
