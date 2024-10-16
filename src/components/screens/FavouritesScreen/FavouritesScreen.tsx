import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';

import {Text} from 'react-native-paper';

import {MENU_DOTS} from 'src/constants/icons';
import copies from 'src/constants/copies';
import Header from 'src/components/molecules/Header';
import {useAppSelector} from 'src/hooks/reduxHooks';
import font from 'src/styles/font';
import FavouritesCarousel from 'src/components/organisms/FavouritesCarousel/FavouritesCarousel';
import MysteryBag from 'src/components/organisms/MysteryBag/MysteryBag';
import {dummyMysteryBags} from 'src/constants/dummyData';
import Title from 'src/components/atoms/Title';
import type {TMysteryBag} from 'src/types/ordering';
import Separator from 'src/components/atoms/Separator';

const {MY_FAVOURITES, FAVOURITE_MYSTERY_BAGS} = copies;

const renderItem = ({item}: {item: TMysteryBag}) => (
  <MysteryBag mysteryBag={item} />
);

const keyExtractor = (item: TMysteryBag) => item.id;

const renderSeparator = () => <Separator />;

const FavouritesScreen = () => {
  const theme = useAppSelector(state => state.themeReducer.theme);

  return (
    <View style={[styles.container, {backgroundColor: theme?.surface}]}>
      <Header
        trailingIcon={MENU_DOTS}
        containerStyles={[
          styles.headerContainer,
          {borderBottomColor: theme?.borderSecondary},
        ]}>
        <View style={styles.headerMiddleContainer}>
          <Text
            variant="titleMedium"
            style={[font.bold, {color: theme?.textHigh}]}>
            {MY_FAVOURITES}
          </Text>
        </View>
      </Header>
      <View style={styles.boyContainer}>
        <FlatList
          data={dummyMysteryBags}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          ListHeaderComponent={
            <>
              <FavouritesCarousel />
              <Title
                title={FAVOURITE_MYSTERY_BAGS}
                containerStyles={styles.titleContainer}
              />
            </>
          }
          ItemSeparatorComponent={renderSeparator}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    borderBottomWidth: 1,
  },
  headerMiddleContainer: {
    flex: 1,
    marginLeft: 16,
  },
  boyContainer: {
    flex: 1,
  },
  titleContainer: {
    marginTop: 8,
    marginBottom: 4,
    paddingHorizontal: 16,
  },
});

export default FavouritesScreen;
