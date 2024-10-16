import {StyleSheet} from 'react-native';
import React, {type FC} from 'react';

import {Icon, TouchableRipple} from 'react-native-paper';

import {BASKET_OUTLINE} from 'src/constants/icons';
import {useAppSelector} from 'src/hooks/reduxHooks';
import {getThemedStyles} from 'src/utils/theme';

const CartButton: FC = () => {
  const theme = useAppSelector(state => state.themeReducer.theme);
  // const cart = useAppSelector(state => state.cartReducer.products);
  // const productTotal = getProductTotalAllRestaurants(cart);
  // const hasCartProducts = productTotal > 0;
  // const copy = hasCartProducts ? getFormattedPrice(productTotal) : CART;

  const onPress = () => {
    // navigation.navigate('OrderStack', {
    //   screen: 'CartHomeScreen',
    // });
  };

  return (
    <TouchableRipple
      style={[
        styles.container,
        getThemedStyles({borderColor: theme?.borderSecondary}),
      ]}
      onPress={onPress}>
      <Icon source={BASKET_OUTLINE} color={theme?.textHigh} size={20} />
    </TouchableRipple>
  );
};

export default CartButton;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderRadius: 24,
    borderWidth: 1,
  },
});
