import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';

import {Button, Text} from 'react-native-paper';

import type {ICategory} from 'src/types/ordering';
import CategoryItem from './CategoryItem';
import copies from 'src/constants/copies';
import font from 'src/styles/font';
import {useAppSelector} from 'src/hooks/reduxHooks';
import {getThemedStyles} from 'src/utils/theme';
import containers from 'src/styles/containers';

const {CATEGORIES, SEE_ALL} = copies;

const renderItem = ({item}: {item: ICategory}) => (
  <CategoryItem category={item} />
);

const keyExtractor = (item: ICategory) => item.id;

const separator = () => <View style={styles.separator} />;

const CategoriesList = () => {
  const theme = useAppSelector(state => state.themeReducer.theme);
  const categories = useAppSelector(
    state => state.categoriesReducer.categories,
  );

  const onPress = () => {};

  return (
    <View style={styles.container}>
      <View style={containers.rowCenterBetween}>
        <Text
          variant="titleMedium"
          style={[font.bold, getThemedStyles({color: theme?.textHigh})]}>
          {CATEGORIES}
        </Text>
        <Button onPress={onPress}>
          <Text
            variant="bodyMedium"
            style={[
              font.semiBold,
              getThemedStyles({color: theme?.primaryDefault}),
            ]}>
            {SEE_ALL}
          </Text>
        </Button>
      </View>
      <FlatList
        data={categories.slice(0, 8)}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={separator}
        horizontal
        style={styles.flatList}
      />
    </View>
  );
};

export default CategoriesList;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  separator: {
    marginHorizontal: 8,
  },
  flatList: {
    flexGrow: 0,
  },
});
