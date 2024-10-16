import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';

import {cluster} from 'radash';

import Title from 'src/components/atoms/Title';
import copies from 'src/constants/copies';
import containers from 'src/styles/containers';
import NewOnHeroMeals from 'src/components/organisms/NewOnHeroMeals/NewOnHeroMeals';
import CollectNow from 'src/components/organisms/CollectNow/CollectNow';
import type {ICategory} from 'src/types/ordering';
import CategoryItem from 'src/components/molecules/CategoriesList/CategoryItem';
import {useAppSelector} from 'src/hooks/reduxHooks';

const {CATEGORIES} = copies;

const renderCategory = (item: ICategory) => (
  <CategoryItem category={item} key={item.id} />
);

const ListContent = () => {
  const categories = useAppSelector(
    state => state.categoriesReducer.categories,
  );
  const cats = cluster(categories, 4).slice(0, 2);

  return (
    <ScrollView style={styles.bodyContainer}>
      <Title title={CATEGORIES} />
      {cats.map(data => {
        const ids = data.map(cat => cat.id).join('-');

        return (
          <View key={ids} style={styles.rowContainer}>
            {data.map(renderCategory)}
          </View>
        );
      })}
      <NewOnHeroMeals />
      <CollectNow />
      {/* TODO: impleement groceries section */}
    </ScrollView>
  );
};

export default ListContent;

const styles = StyleSheet.create({
  bodyContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  rowContainer: {
    ...containers.rowCenterBetween,
  },
});
