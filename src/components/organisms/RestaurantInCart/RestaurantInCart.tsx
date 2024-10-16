import {StyleSheet, View} from 'react-native';
import React, {FC} from 'react';

import {Card, Divider, Icon, Text} from 'react-native-paper';

import RestaurantDetailsCard from 'src/components/molecules/RestaurantDetailsCard';
import ProductsQuantities from 'src/components/molecules/ProductsQuantities';
import containers from 'src/styles/containers';
import {getFormattedPrice} from 'src/utils/helpers';
import {CHEVRON_RIGHT} from 'src/constants/icons';
import {getThemedStyles} from 'src/utils/theme';
import {useAppSelector} from 'src/hooks/reduxHooks';
import copies from 'src/constants/copies';
import type {RestaurantInCartProps} from 'src/types/organisms';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from 'src/types/navigator';

const {ORDER_TOTAL} = copies;

const RestaurantInCart: FC<RestaurantInCartProps> = ({restaurantData}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const theme = useAppSelector(state => state.themeReducer.theme);
  const {restaurant, products, orderData} = restaurantData;
  const {itemTotal} = orderData;
  const productDetails =
    products?.map(prod => ({
      quantity: prod.quantity,
      name: prod.details.name,
      id: prod.details.id,
    })) || [];

  if (!restaurant) {
    return null;
  }

  const onPressCard = () => {
    navigation.navigate('OrderStack', {
      screen: 'OrderDetails',
      params: {
        restaurantId: restaurant.id,
      },
    });
  };

  return (
    <Card style={styles.container} onPress={onPressCard}>
      <View
        style={[
          containers.rowCenterBetween,
          getThemedStyles({backgroundColor: theme?.borderTertiary}),
        ]}>
        <RestaurantDetailsCard
          description={restaurant.address}
          image={restaurant.image}
          name={restaurant.name}
        />
        <View style={styles.iconContainer}>
          <Icon source={CHEVRON_RIGHT} size={22} color={theme?.textHigh} />
        </View>
      </View>
      <Divider />
      <View style={styles.productQuantitiesContainer}>
        <ProductsQuantities items={productDetails} />
      </View>
      <Divider />
      <View style={styles.priceContainer}>
        <Text variant="titleMedium">{ORDER_TOTAL}</Text>
        <Text variant="titleMedium">{getFormattedPrice(itemTotal)}</Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    overflow: 'hidden',
  },
  productQuantitiesContainer: {
    paddingHorizontal: 16,
  },
  priceContainer: {
    ...containers.rowCenterBetween,
    padding: 12,
  },
  iconContainer: {
    marginHorizontal: 12,
  },
});

export default RestaurantInCart;
