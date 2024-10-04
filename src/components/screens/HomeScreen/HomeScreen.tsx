import {StyleSheet, View, FlatList} from 'react-native';
import React, {useEffect} from 'react';

import {ActivityIndicator} from 'react-native-paper';

import HomeScreenHeader from './HomeScreenHeader';
import Restaurant from 'src/components/organisms/Restaurant';
import useGetRestaurants from 'src/hooks/useGetRestuarants';
import type {IRestaurant} from 'src/types/ordering';
import containers from 'src/styles/containers';
import {useAppSelector} from 'src/hooks/reduxHooks';
import {getThemedStyles} from 'src/utils/theme';
import Banners from 'src/components/molecules/Banners';
import {banners} from 'src/constants/dummyData';

const renderItem = ({item}: {item: IRestaurant}) => (
  <Restaurant restaurant={item} />
);

const keyExtractor = (item: IRestaurant) => item.id;

const renderSeparator = () => <View style={styles.separator} />;

const HomeScreen = () => {
  const theme = useAppSelector(state => state.themeReducer.theme);
  const {loading, restaurants, getMoreRestaurants, getRestaurants} =
    useGetRestaurants();

  useEffect(() => {
    getRestaurants();
  }, [getRestaurants]);

  const onEndReached = () => {
    getMoreRestaurants();
  };

  return (
    <View
      style={[
        styles.container,
        getThemedStyles({backgroundColor: theme?.surface}),
      ]}>
      <HomeScreenHeader />
      <Banners banners={banners} />
      <FlatList
        data={restaurants}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onEndReachedThreshold={0.7}
        onEndReached={onEndReached}
        contentContainerStyle={styles.listContainer}
        style={styles.list}
        ListFooterComponent={
          loading ? (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size={'large'} color={theme?.primaryDark} />
            </View>
          ) : null
        }
        ItemSeparatorComponent={renderSeparator}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loaderContainer: {
    ...containers.rowCenterCenter,
    paddingVertical: 16,
  },
  listContainer: {
    paddingTop: 16,
    paddingBottom: 32,
  },
  list: {
    flex: 1,
  },
  separator: {
    height: 16,
  },
});
