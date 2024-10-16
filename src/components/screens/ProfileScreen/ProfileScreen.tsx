import {Image, ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';

import {Text} from 'react-native-paper';

import {useAppSelector} from 'src/hooks/reduxHooks';
import {
  getMobileNumberWithCountryCode,
  isValidProfile,
} from 'src/utils/helpers';
import containers from 'src/styles/containers';
import {getThemedStyles} from 'src/utils/theme';
import {options} from 'src/constants/profile';
import ProfileOption from './ProfileOption';
import Header from 'src/components/molecules/Header';
import {MENU_DOTS} from 'src/constants/icons';
import copies from 'src/constants/copies';
import font from 'src/styles/font';

import profileDefault from 'src/assets/profile/profile-picture-default.png';

const {MY_ACCOUNT} = copies;

const ProfileScreen = () => {
  const profile = useAppSelector(state => state.profileReducer.profile);
  const theme = useAppSelector(state => state.themeReducer.theme);

  if (!isValidProfile(profile)) {
    return <></>;
  }

  return (
    <ScrollView
      style={[getThemedStyles({backgroundColor: theme?.surface})]}
      contentContainerStyle={styles.container}>
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
            {MY_ACCOUNT}
          </Text>
        </View>
      </Header>
      <View style={[styles.bodyContainer, {backgroundColor: theme?.surface}]}>
        <View style={styles.profileContainer}>
          <Image source={profileDefault} style={styles.profileImage} />
          <View style={styles.detailsContainer}>
            <Text variant="titleMedium" style={styles.name}>
              {profile.name}
            </Text>
            <Text variant="bodyMedium" style={styles.phoneNumber}>
              {getMobileNumberWithCountryCode(profile.phone)}
            </Text>
          </View>
        </View>
        {options.map(option => (
          <ProfileOption key={option.id} option={option} />
        ))}
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    paddingBottom: 24,
  },
  headerContainer: {
    borderBottomWidth: 1,
  },
  headerMiddleContainer: {
    flex: 1,
    marginLeft: 16,
  },
  bodyContainer: {
    paddingHorizontal: 16,
  },
  divider: {
    marginTop: 42,
  },
  profileContainer: {
    ...containers.rowCenterStart,
    marginTop: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 80,
  },
  detailsContainer: {
    marginLeft: 16,
  },
  name: {
    ...font.semiBold,
  },
  phoneNumber: {
    ...font.regular,
  },
});
