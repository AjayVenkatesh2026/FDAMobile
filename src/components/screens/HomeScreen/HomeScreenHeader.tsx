import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

import {Icon, TouchableRipple} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import Header from 'src/components/molecules/Header';
import font from 'src/styles/font';
import {useAppSelector} from 'src/hooks/reduxHooks';
import {isValidProfile} from 'src/utils/helpers';
import {getThemedStyles} from 'src/utils/theme';
import {
  BELL_OUTLINE,
  MAGNIFY,
  MAP_MARKER_OUTLINE,
  MICROPHONE_OUTLINE,
} from 'src/constants/icons';
import copies from 'src/constants/copies';
import containers from 'src/styles/containers';
import {RootStackParamList} from 'src/types/navigator';

import defaultAvatar from 'src/assets/default-avatar.png';

const {SEARCH, DELIVER_TO} = copies;

const HomeScreenHeader = () => {
  const theme = useAppSelector(state => state.themeReducer.theme);
  const profile = useAppSelector(state => state.profileReducer.profile);
  const {address} = isValidProfile(profile) ? profile : {};
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const onPressSearch = () => {
    navigation.navigate('ProductStack', {
      screen: 'SearchScreen',
    });
  };

  return (
    <View
      style={[
        styles.container,
        getThemedStyles({
          backgroundColor: theme?.surface,
        }),
      ]}>
      <Header
        showCart
        trailingIcon={BELL_OUTLINE}
        trailingIconStyles={[
          styles.trailingIconStyles,
          getThemedStyles({borderColor: theme?.borderSecondary}),
        ]}
        containerStyles={[
          getThemedStyles({
            backgroundColor: theme?.surface,
          }),
        ]}>
        <Image source={defaultAvatar} style={styles.image} />
        <View style={styles.contentContainer}>
          <Text
            style={[styles.title, getThemedStyles({color: theme?.textLow})]}>
            {DELIVER_TO}
          </Text>
          <View style={containers.rowCenterStart}>
            <Icon source={MAP_MARKER_OUTLINE} size={18} />
            <Text
              style={[
                styles.address,
                getThemedStyles({color: theme?.textHigh}),
              ]}
              numberOfLines={1}
              ellipsizeMode="tail">
              {address}
            </Text>
          </View>
        </View>
      </Header>
      <View style={styles.searchBarContainer}>
        <TouchableRipple onPress={onPressSearch}>
          <View
            style={[
              styles.search,
              getThemedStyles({backgroundColor: theme?.searchBackground}),
            ]}>
            <Icon source={MAGNIFY} size={20} color={theme?.textHigh} />
            <Text
              style={[
                styles.searchText,
                getThemedStyles({color: theme?.textLow}),
              ]}>
              {SEARCH}
            </Text>
            <Icon
              source={MICROPHONE_OUTLINE}
              size={20}
              color={theme?.textHigh}
            />
          </View>
        </TouchableRipple>
      </View>
    </View>
  );
};

export default HomeScreenHeader;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  contentContainer: {
    flex: 1,
    ...containers.columnStretchBetween,
  },
  title: {
    ...font.regular,
    fontSize: 14,
  },
  address: {
    ...font.bold,
    flex: 1,
    fontSize: 15,
    marginLeft: 8,
  },
  trailingIconStyles: {
    borderWidth: 1,
    alignSelf: 'center',
  },
  searchBarContainer: {
    paddingVertical: 16,
  },
  image: {
    width: 48,
    height: 48,
    marginRight: 8,
  },
  search: {
    ...containers.rowCenterStart,
    padding: 16,
    borderRadius: 10,
  },
  searchText: {
    ...font.regular,
    flex: 1,
    marginLeft: 8,
    textAlignVertical: 'center',
    fontSize: 16,
    includeFontPadding: false,
  },
});
