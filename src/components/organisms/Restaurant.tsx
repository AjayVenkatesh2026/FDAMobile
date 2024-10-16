import {StyleSheet, View} from 'react-native';
import React from 'react';

import {Button, Card, Text} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import font from 'src/styles/font';
import {getThemedStyles} from 'src/utils/theme';
import {useAppSelector} from 'src/hooks/reduxHooks';
import containers from 'src/styles/containers';
import {STAR} from 'src/constants/icons';
import copies from 'src/constants/copies';
import FDAImage from '../atoms/FDAImage';
import {RootStackParamList} from 'src/types/navigator';
import type {IRestaurantProps} from 'src/types/organisms';

const {MINS} = copies;

const Restaurant: React.FC<IRestaurantProps> = ({
  restaurant,
  onPress,
  style,
  showImage = true,
  mode = 'contained',
}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const theme = useAppSelector(state => state.themeReducer.theme);
  const {name, image, distance, duration = '', rating} = restaurant;
  const description = `${distance} \u2022 ${duration} ${MINS}`;

  const onPressRestaurantCard = () => {
    if (onPress) {
      onPress();
    } else {
      navigation.navigate('ProductStack', {
        screen: 'ProductsScreen',
        params: {
          restaurant,
        },
      });
    }
  };

  return (
    <Card
      style={[styles.mainContainer, style]}
      onPress={onPressRestaurantCard}
      mode={mode}>
      {showImage ? (
        <FDAImage url={image} style={styles.image} resizeMode="cover" />
      ) : null}
      <View style={styles.contentContainer}>
        <View style={containers.rowCenterBetween}>
          <Text
            variant={'titleLarge'}
            style={[font.semiBold, getThemedStyles({color: theme?.textHigh})]}>
            {name}
          </Text>
          <Button
            contentStyle={[
              styles.buttonContent,
              getThemedStyles({backgroundColor: theme?.accentPrimary}),
            ]}
            labelStyle={getThemedStyles({color: theme?.bgTextHigh})}
            icon={STAR}>
            {rating}
          </Button>
        </View>
        <Text
          variant={'bodyMedium'}
          style={[font.regular, getThemedStyles({color: theme?.textMid})]}>
          {description}
        </Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginHorizontal: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
  },
  contentContainer: {
    padding: 12,
  },
  buttonContent: {
    flexDirection: 'row-reverse',
  },
});

export default Restaurant;
