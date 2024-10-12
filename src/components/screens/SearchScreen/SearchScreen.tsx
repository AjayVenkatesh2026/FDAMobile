import {Dimensions, FlatList, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';

import {ActivityIndicator, Button, Searchbar} from 'react-native-paper';

import copies from 'src/constants/copies';
import {useAppSelector} from 'src/hooks/reduxHooks';
import {CLOSE} from 'src/constants/icons';
import containers from 'src/styles/containers';
import {SEARCH_TYPES} from 'src/constants/search';
import RestaurantCarouselCard from 'src/components/organisms/RestaurantCarouselCard/RestaurantCarouselCard';
import Separator from 'src/components/atoms/Separator';
import useGetRestaurantsDummy from 'src/hooks/useGetRestuarantsDummy';
import EmptySearch from './EmptySearch';
import type {TSearchType} from 'src/types/global';
import type {IRestaurant} from 'src/types/ordering';

const {width: WINDOW_WIDTH} = Dimensions.get('window');
const imageWidth = WINDOW_WIDTH - 32;

const {SEARCH, CATEGORIES, RESTAURANTS} = copies;

const renderItem = ({item}: {item: IRestaurant}) => (
  <RestaurantCarouselCard
    restaurant={item}
    showFavouriteIcon
    bgImageStyles={styles.restaurantCardContainer}
  />
);

const keyExtractor = (item: IRestaurant) => item.id;

const renderSeparator = () => <Separator />;

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchType, setSearchType] = useState<TSearchType>(
    SEARCH_TYPES.RESTAURANTS,
  );
  const theme = useAppSelector(state => state.themeReducer.theme);
  const {loading, restaurants, getMoreRestaurants, getRestaurants} =
    useGetRestaurantsDummy();

  const onEndReached = () => {
    if (searchQuery) {
      getMoreRestaurants();
    }
  };

  const onPressRestaurants = () => {
    setSearchType(SEARCH_TYPES.RESTAURANTS);
  };

  const onPressCategories = () => {
    setSearchType(SEARCH_TYPES.CATEGORIES);
  };

  const onSubmitEditing = () => {
    if (searchQuery) {
      getRestaurants();
    }
  };

  return (
    <View style={[styles.container, {backgroundColor: theme?.surface}]}>
      <View
        style={[styles.headerContainer, {borderColor: theme?.borderTertiary}]}>
        <Searchbar
          value={searchQuery}
          placeholder={SEARCH}
          onChangeText={setSearchQuery}
          autoFocus
          onSubmitEditing={onSubmitEditing}
          clearIcon={CLOSE}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <Button
          mode="outlined"
          onPress={onPressRestaurants}
          style={[styles.button, {borderColor: theme?.primaryDefault}]}
          textColor={
            searchType === SEARCH_TYPES.RESTAURANTS
              ? theme?.surface
              : theme?.primaryDefault
          }
          buttonColor={
            searchType === SEARCH_TYPES.RESTAURANTS
              ? theme?.primaryDefault
              : theme?.surface
          }>
          {RESTAURANTS}
        </Button>
        <View style={styles.separator} />
        <Button
          mode="outlined"
          onPress={onPressCategories}
          textColor={
            searchType === SEARCH_TYPES.CATEGORIES
              ? theme?.surface
              : theme?.primaryDefault
          }
          buttonColor={
            searchType === SEARCH_TYPES.CATEGORIES
              ? theme?.primaryDefault
              : theme?.surface
          }
          style={[styles.button, {borderColor: theme?.primaryDefault}]}>
          {CATEGORIES}
        </Button>
      </View>
      <FlatList
        data={restaurants}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={renderSeparator}
        ListFooterComponent={
          loading ? (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size={'large'} color={theme?.primaryDark} />
            </View>
          ) : null
        }
        onEndReached={onEndReached}
        ListEmptyComponent={!loading ? <EmptySearch /> : null}
        style={styles.list}
      />
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
  },
  buttonsContainer: {
    ...containers.rowCenterStart,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  separator: {
    marginHorizontal: 4,
  },
  button: {
    flex: 1,
    borderRadius: 8,
  },
  loaderContainer: {
    paddingVertical: 32,
  },
  list: {
    flex: 1,
  },
  listContainer: {
    paddingBottom: 24,
  },
  restaurantCardContainer: {
    marginHorizontal: 16,
    width: imageWidth,
  },
});
