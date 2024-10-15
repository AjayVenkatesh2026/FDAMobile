import {Dimensions, FlatList, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import {
  ActivityIndicator,
  Button,
  Divider,
  Searchbar,
} from 'react-native-paper';

import copies from 'src/constants/copies';
import {useAppSelector} from 'src/hooks/reduxHooks';
import {CLOSE} from 'src/constants/icons';
import containers from 'src/styles/containers';
import {SEARCH_TYPE_COPY, SEARCH_TYPES} from 'src/constants/search';
import EmptySearch from './EmptySearch';
import type {TSearchType} from 'src/types/global';
import type {IProduct} from 'src/types/ordering';
import useSearch from 'src/hooks/useSearch';
import RestaurantMenuItem from 'src/components/organisms/RestaurantMenuItem/RestaurantMenuItem';

const {width: WINDOW_WIDTH} = Dimensions.get('window');
const imageWidth = WINDOW_WIDTH - 32;

const {CATEGORIES, RESTAURANTS, DISHES} = copies;

const renderItem = ({item}: {item: IProduct}) => (
  <RestaurantMenuItem product={item} showCategory showRestaurant />
);

const keyExtractor = (item: IProduct) => item.id;

const renderSeparator = () => <Divider style={styles.divier} />;

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchType, setSearchType] = useState<TSearchType>(
    SEARCH_TYPES.MENU_ITEMS,
  );
  const theme = useAppSelector(state => state.themeReducer.theme);
  const {response, debouncedSearch, loading} = useSearch();

  useEffect(() => {
    debouncedSearch({searchQuery, searchType});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, searchType]);

  const onPressMenuItems = () => {
    setSearchType(SEARCH_TYPES.MENU_ITEMS);
  };

  const onPressRestaurants = () => {
    setSearchType(SEARCH_TYPES.RESTAURANTS);
  };

  const onPressCategories = () => {
    setSearchType(SEARCH_TYPES.CATEGORIES);
  };

  const onSubmitEditing = () => {
    if (searchQuery) {
      debouncedSearch({searchQuery, searchType});
    }
  };

  const onClearIconPress = () => {
    setSearchQuery('');
    debouncedSearch({searchQuery: '', searchType, ignoreSearchQuery: true});
  };

  return (
    <View style={[styles.container, {backgroundColor: theme?.surface}]}>
      <View
        style={[styles.headerContainer, {borderColor: theme?.borderTertiary}]}>
        <Searchbar
          value={searchQuery}
          placeholder={SEARCH_TYPE_COPY[searchType]}
          onChangeText={setSearchQuery}
          autoFocus
          onSubmitEditing={onSubmitEditing}
          clearIcon={CLOSE}
          onClearIconPress={onClearIconPress}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <Button
          mode="outlined"
          onPress={onPressMenuItems}
          style={[styles.button, {borderColor: theme?.primaryDefault}]}
          textColor={
            searchType === SEARCH_TYPES.MENU_ITEMS
              ? theme?.surface
              : theme?.primaryDefault
          }
          labelStyle={styles.buttonLabel}
          buttonColor={
            searchType === SEARCH_TYPES.MENU_ITEMS
              ? theme?.primaryDefault
              : theme?.surface
          }>
          {DISHES}
        </Button>
        <View style={styles.separator} />
        <Button
          mode="outlined"
          onPress={onPressRestaurants}
          style={[styles.button, {borderColor: theme?.primaryDefault}]}
          textColor={
            searchType === SEARCH_TYPES.RESTAURANTS
              ? theme?.surface
              : theme?.primaryDefault
          }
          labelStyle={styles.buttonLabel}
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
          labelStyle={styles.buttonLabel}
          style={[styles.button, {borderColor: theme?.primaryDefault}]}>
          {CATEGORIES}
        </Button>
      </View>
      <FlatList
        data={response}
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
  divier: {
    marginVertical: 8,
  },
  buttonLabel: {
    marginHorizontal: 0,
  },
});
