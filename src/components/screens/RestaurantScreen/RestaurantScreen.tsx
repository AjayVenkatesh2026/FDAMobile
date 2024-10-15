import {FlatList, StyleSheet, View} from 'react-native';
import React, {useLayoutEffect} from 'react';

import {RouteProp, useRoute} from '@react-navigation/native';

import {ProductStackParamList} from 'src/types/navigator';
import RestaurantMenuItem from 'src/components/organisms/RestaurantMenuItem/RestaurantMenuItem';
import {useAppSelector} from 'src/hooks/reduxHooks';
import ListHeader from './ListHeader';
import {IProduct} from 'src/types/ordering';
import ListFooter from './ListFooter';
import useGetMenuItemsByRestaurantId from 'src/services/hooks/useGetMenuItemsByRestaurantId';
import {ActivityIndicator, Text} from 'react-native-paper';
import containers from 'src/styles/containers';
import font from 'src/styles/font';
import copies from 'src/constants/copies';
import RestaurantScreenHeader from './RestaurantScreenHeader';

const {SORRY_THERE_ARE_NO_ITEMS_FOR_THIS_RESTAURANT} = copies;

const keyExtractor = (item: IProduct) => item.id;

const RestaurantScreen = () => {
  const {
    params: {restaurant},
  } = useRoute<RouteProp<ProductStackParamList, 'RestaurantScreen'>>();
  const theme = useAppSelector(state => state.themeReducer.theme);
  const {getMenuItems, loading, menuItems} = useGetMenuItemsByRestaurantId({});

  useLayoutEffect(() => {
    getMenuItems({restaurantId: restaurant.id});
  }, [getMenuItems, restaurant.id]);

  const renderItem = ({item}: {item: IProduct}) => (
    <RestaurantMenuItem restaurant={restaurant} product={item} />
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size={'large'} color={theme?.primaryDefault} />
      </View>
    );
  }

  return (
    <>
      <View
        style={[
          styles.headerContainer,
          {
            borderBottomColor: theme?.borderPrimary,
          },
        ]}>
        <RestaurantScreenHeader />
      </View>
      <FlatList
        data={menuItems}
        renderItem={renderItem}
        ListHeaderComponent={<ListHeader restaurant={restaurant} />}
        keyExtractor={keyExtractor}
        style={[styles.container, {backgroundColor: theme?.surface}]}
        ListFooterComponent={<ListFooter restaurant={restaurant} />}
        ListEmptyComponent={
          <Text variant="bodyMedium" style={styles.empty}>
            {SORRY_THERE_ARE_NO_ITEMS_FOR_THIS_RESTAURANT}
          </Text>
        }
      />
    </>
  );
};

export default RestaurantScreen;

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    borderBottomWidth: 1,
  },
  container: {
    flex: 1,
  },
  loaderContainer: {
    ...containers.rowCenterCenter,
    flex: 1,
  },
  empty: {
    padding: 16,
    textAlign: 'center',
    ...font.medium,
  },
});
