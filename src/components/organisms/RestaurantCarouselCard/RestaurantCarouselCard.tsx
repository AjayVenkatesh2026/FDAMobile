import {ImageBackground, Pressable, StyleSheet, View} from 'react-native';
import React from 'react';

import {Icon, Text, TouchableRipple} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';

import font from 'src/styles/font';
import {getThemedStyles} from 'src/utils/theme';
import {useAppSelector} from 'src/hooks/reduxHooks';
import copies from 'src/constants/copies';
import containers from 'src/styles/containers';
import {CLOCK_OUTLINE, HEART, HEART_OUTLINE} from 'src/constants/icons';
import type {RootStackParamList} from 'src/types/navigator';
import type {IRestaurantCarouselCardProps} from 'src/types/organisms';

import defautImage from 'src/assets/default.png';

const {DOT} = copies;

const RestaurantCarouselCard: React.FC<IRestaurantCarouselCardProps> = ({
  restaurant,
  showTimings = false,
  bgImageStyles = {},
  titleStyles = {},
  descriptionStyles = {},
  taglineStyles = {},
  clockIconSize = 16,
  contentContainerStyles = {},
  showFavouriteIcon = false,
}) => {
  const theme = useAppSelector(state => state.themeReducer.theme);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {image = '', name, distance, tags, rating, openingHours} = restaurant;
  const tagsText = tags.join(` ${DOT} `);
  const description =
    showTimings && openingHours
      ? [openingHours, distance].join(` ${DOT} `)
      : distance;
  // TODO: make isFavourite dynamic
  const isFavourite = false;

  const onPress = () => {
    navigation.navigate('ProductStack', {
      screen: 'RestaurantScreen',
      params: {
        restaurant,
      },
    });
  };

  return (
    <Pressable onPress={onPress}>
      <ImageBackground
        source={image ? {uri: image} : defautImage}
        style={[
          styles.bgImage,
          {borderColor: theme?.borderTertiary},
          bgImageStyles,
        ]}>
        <LinearGradient
          start={{x: 0.5, y: 0}}
          end={{x: 0.5, y: 1}}
          style={styles.container}
          colors={[
            'rgba(0, 0, 0, 0)',
            'rgba(0, 0, 0, 0)',
            'rgba(0, 0, 0, 0)',
            'rgba(0, 0, 0, 0.3)',
          ]}
          locations={[0, 0.5, 0.5, 1]}>
          <View>
            <View
              style={[
                styles.ratingContainer,
                getThemedStyles({backgroundColor: theme?.primaryDefault}),
              ]}>
              <Icon source={'star'} size={16} color={theme?.bgTextHigh} />
              <Text
                variant="titleSmall"
                style={[
                  styles.rating,
                  getThemedStyles({color: theme?.bgTextHigh}),
                ]}>
                {rating}
              </Text>
            </View>
            <View style={[styles.contentContainer, contentContainerStyles]}>
              <View style={styles.leftContentContainer}>
                <Text
                  variant="titleLarge"
                  style={[
                    font.bold,
                    getThemedStyles({color: theme?.bgTextHigh}),
                    titleStyles,
                  ]}>
                  {name}
                </Text>
                {tagsText ? (
                  <Text
                    variant="bodyMedium"
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={[
                      font.regular,
                      getThemedStyles({color: theme?.bgTextHigh}),
                      taglineStyles,
                    ]}>
                    {tagsText}
                  </Text>
                ) : null}
                <View style={containers.rowCenterStart}>
                  {showTimings && openingHours ? (
                    <View style={styles.iconContainer}>
                      <Icon
                        size={clockIconSize}
                        source={CLOCK_OUTLINE}
                        color={theme?.bgTextHigh}
                      />
                    </View>
                  ) : null}
                  <Text
                    variant="bodyMedium"
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={[
                      font.bold,
                      getThemedStyles({color: theme?.bgTextMid}),
                      descriptionStyles,
                    ]}>
                    {description}
                  </Text>
                </View>
              </View>
              {showFavouriteIcon ? (
                <View style={styles.rightContentContainer}>
                  <TouchableRipple
                    onPress={() => {}}
                    style={[
                      styles.heartIconContainer,
                      {backgroundColor: theme?.primaryDefault},
                    ]}>
                    <Icon
                      size={20}
                      source={isFavourite ? HEART : HEART_OUTLINE}
                      color={theme?.bgTextHigh}
                    />
                  </TouchableRipple>
                </View>
              ) : null}
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </Pressable>
  );
};

export default RestaurantCarouselCard;

const styles = StyleSheet.create({
  bgImage: {
    width: 256,
    height: 250,
    resizeMode: 'cover',
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 16,
    borderWidth: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  contentContainer: {
    ...containers.rowStartStart,
    padding: 16,
  },
  ratingContainer: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    paddingHorizontal: 16,
    alignItems: 'center',
    paddingVertical: 2,
  },
  rating: {
    ...font.bold,
    textAlignVertical: 'center',
    includeFontPadding: false,
    marginTop: -2,
    marginLeft: 2,
  },
  iconContainer: {
    marginTop: 4,
    marginRight: 4,
  },
  leftContentContainer: {
    flex: 1,
  },
  rightContentContainer: {
    ...containers.columnCenterCenter,
    alignSelf: 'stretch',
  },
  heartIconContainer: {
    padding: 8,
    borderRadius: 24,
  },
});
