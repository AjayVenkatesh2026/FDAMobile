import {StyleSheet, View, FlatList} from 'react-native';
import React, {useEffect} from 'react';

import {ActivityIndicator, Text} from 'react-native-paper';

import Header from 'src/components/molecules/Header';
import {useAppSelector} from 'src/hooks/reduxHooks';
import copies from 'src/constants/copies';
import font from 'src/styles/font';
import {getThemedStyles} from 'src/utils/theme';
import OrderCard from 'src/components/organisms/OrderCard';
import useGetOrders from 'src/hooks/useGetOrders';
import containers from 'src/styles/containers';
import type {IOrder} from 'src/types/ordering';

const {YOUR_ORDERS} = copies;

const renderItem = ({item}: {item: IOrder}) => <OrderCard order={item} />;

const keyExtractor = (item: IOrder) => item.id;

const itemSeparator = () => <View style={styles.separator} />;

const OrderHistoryScreen = () => {
  const theme = useAppSelector(state => state.themeReducer.theme);
  const {loading, orders, getOrders} = useGetOrders();

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  return (
    <View style={styles.container}>
      <Header
        showBack
        containerStyles={getThemedStyles({backgroundColor: theme?.highlight})}>
        <Text
          variant="titleMedium"
          style={[styles.title, getThemedStyles({color: theme?.textHigh})]}>
          {YOUR_ORDERS}
        </Text>
      </Header>
      <FlatList
        data={orders}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.listContainer}
        onEndReachedThreshold={0.7}
        ItemSeparatorComponent={itemSeparator}
        ListFooterComponent={
          loading ? (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size={'large'} color={theme?.primaryDark} />
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default OrderHistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    ...font.semiBold,
    fontSize: 18,
  },
  listContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  separator: {
    height: 16,
  },
  loaderContainer: {
    ...containers.rowCenterCenter,
    paddingVertical: 16,
  },
});
