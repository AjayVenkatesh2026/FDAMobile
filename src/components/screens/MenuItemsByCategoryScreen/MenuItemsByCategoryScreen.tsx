import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';

import {Divider, Text} from 'react-native-paper';
import {RouteProp, useRoute} from '@react-navigation/native';

import Header from 'src/components/molecules/Header';
import {ProductStackParamList} from 'src/types/navigator';
import font from 'src/styles/font';
import {useAppSelector} from 'src/hooks/reduxHooks';
import type {IProduct} from 'src/types/ordering';
import RestaurantMenuItem from 'src/components/organisms/RestaurantMenuItem/RestaurantMenuItem';
import EmptySearch from '../SearchScreen/EmptySearch';
import {getMenuItemsByCategoryName} from 'src/utils/helpers';

const renderItem = ({item}: {item: IProduct}) => (
  <RestaurantMenuItem product={item} showCategory showRestaurant />
);

const keyExtractor = (item: IProduct) => item.id;

const renderSeparator = () => <Divider style={styles.divier} />;

const MenuItemsByCategoryScreen = () => {
  const theme = useAppSelector(state => state.themeReducer.theme);
  const menuItems = useAppSelector(state => state.menuItemsReducer.menuItems);
  const {
    params: {category},
  } = useRoute<RouteProp<ProductStackParamList, 'MenuItemsByCategoryScreen'>>();
  const {name} = category;
  const items = getMenuItemsByCategoryName({menuItems, categoryName: name});

  return (
    <View style={[styles.container, {backgroundColor: theme?.surface}]}>
      <Header showBack containerStyles={{backgroundColor: theme?.surface}}>
        <Text
          variant="titleMedium"
          style={[styles.headerTitle, {color: theme?.textHigh}]}>
          {name}
        </Text>
      </Header>
      <FlatList
        data={items}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={renderSeparator}
        ListEmptyComponent={<EmptySearch />}
        style={styles.list}
      />
    </View>
  );
};

export default MenuItemsByCategoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTitle: {
    ...font.bold,
  },
  list: {
    flex: 1,
  },
  listContainer: {
    paddingBottom: 24,
  },
  divier: {
    marginVertical: 8,
  },
});
