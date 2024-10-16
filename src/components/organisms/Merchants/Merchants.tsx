import {FlatList, Image, StyleSheet, View} from 'react-native';
import React from 'react';

import {Button, Text} from 'react-native-paper';

import {dummyMerchants} from 'src/constants/dummyData';
import type {IMerchant} from 'src/types/ordering';
import {useAppSelector} from 'src/hooks/reduxHooks';
import containers from 'src/styles/containers';
import font from 'src/styles/font';
import {getThemedStyles} from 'src/utils/theme';
import copies from 'src/constants/copies';

const {FEATURED_MERCHANTS, SEE_ALL} = copies;

const renderItem = ({item}: {item: IMerchant}) => (
  <Image source={item.image} style={styles.image} />
);

const keyExtractor = (item: IMerchant) => item.id;

const Merchants = () => {
  const theme = useAppSelector(state => state.themeReducer.theme);

  const onPress = () => {};

  return (
    <View style={styles.container}>
      <View style={containers.rowCenterBetween}>
        <Text
          variant="titleMedium"
          style={[font.bold, getThemedStyles({color: theme?.textHigh})]}>
          {FEATURED_MERCHANTS}
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
        data={dummyMerchants}
        renderItem={renderItem}
        horizontal
        keyExtractor={keyExtractor}
        style={styles.list}
      />
    </View>
  );
};

export default Merchants;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  image: {
    margin: 16,
    width: 120,
    height: 120,
    borderRadius: 8,
  },
  list: {
    padding: 16,
  },
});
