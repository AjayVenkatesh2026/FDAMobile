import {StyleSheet, View} from 'react-native';
import React from 'react';

import {IconButton} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';

import containers from 'src/styles/containers';
import {
  ARROW_LEFT,
  BASKET_OUTLINE,
  HEART_OUTLINE,
  MENU_DOTS,
} from 'src/constants/icons';
import {useAppSelector} from 'src/hooks/reduxHooks';
import type {RootStackParamList} from 'src/types/navigator';

const RestaurantScreenHeader = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const theme = useAppSelector(state => state.themeReducer.theme);

  const onPressBasket = () => {
    navigation.navigate('BottomTab', {
      screen: 'BasketsScreen',
    });
  };

  const onPressBack = () => {
    navigation.goBack();
  };

  return (
    <View style={containers.rowCenterStart}>
      <IconButton
        icon={ARROW_LEFT}
        onPress={onPressBack}
        iconColor={theme?.textHigh}
      />
      <View style={styles.occupy} />
      <IconButton
        icon={BASKET_OUTLINE}
        onPress={onPressBasket}
        iconColor={theme?.textHigh}
      />
      <IconButton icon={HEART_OUTLINE} iconColor={theme?.textHigh} />
      <IconButton icon={MENU_DOTS} iconColor={theme?.textHigh} />
    </View>
  );
};

export default RestaurantScreenHeader;

const styles = StyleSheet.create({
  occupy: {
    flex: 1,
  },
});
