import {StyleSheet, View} from 'react-native';
import React from 'react';

import {Button, Icon, Text} from 'react-native-paper';

import {IRestaurant} from 'src/types/ordering';
import containers from 'src/styles/containers';
import {useAppSelector} from 'src/hooks/reduxHooks';
import {getThemedStyles} from 'src/utils/theme';
import font from 'src/styles/font';
import {DISTRIBUTION_DETAILS, DISTRIBUTION_TYPES} from 'src/constants/checkout';
import copies from 'src/constants/copies';

interface IDistributionDetailsProps {
  isPickup?: boolean;
  restaurant: IRestaurant;
}

const {TO} = copies;

// TODO: make these dynamic / get from api
const expectedStartTime = '3:00 pm';
const expectedEndTime = '3:30 pm';
const ICON_SIZE = 18;

const DistributionDetails: React.FC<IDistributionDetailsProps> = ({
  isPickup = false,
  restaurant,
}) => {
  const theme = useAppSelector(state => state.themeReducer.theme);
  const profile = useAppSelector(state => state.profileReducer.profile);
  const data =
    DISTRIBUTION_DETAILS[
      isPickup ? DISTRIBUTION_TYPES.PICKUP : DISTRIBUTION_TYPES.DELIVERY
    ];
  const addressCopy = isPickup ? restaurant?.address : profile.address;

  const distributionText = `${data.distributionText} ${expectedStartTime} ${TO} ${expectedEndTime}`;

  const onPress = () => {};

  return (
    <View style={styles.container}>
      {/* Title */}
      <View style={containers.rowCenterBetween}>
        <View style={containers.rowCenterCenter}>
          <Icon
            source={data.titleIcon}
            size={ICON_SIZE}
            color={theme?.textHigh}
          />
          <Text
            variant="titleMedium"
            style={[styles.title, getThemedStyles({color: theme?.textHigh})]}>
            {data.title}
          </Text>
        </View>
        <Button onPress={onPress}>
          <Text
            variant="bodySmall"
            style={[
              font.semiBold,
              getThemedStyles({color: theme?.primaryDefault}),
            ]}>
            {data.rightButtonText}
          </Text>
        </Button>
      </View>
      <View style={styles.addressContainer}>
        <Icon
          source={data.addressIcon}
          size={ICON_SIZE}
          color={theme?.textHigh}
        />
        <Text variant="bodyMedium" style={styles.address}>
          {addressCopy}
        </Text>
      </View>
      <View style={styles.distributionContainer}>
        <Icon
          source={data.clockIcon}
          size={ICON_SIZE}
          color={theme?.textHigh}
        />
        <Text
          variant="bodyMedium"
          style={[styles.distributionText, {color: theme?.primaryDefault}]}>
          {distributionText}
        </Text>
      </View>
    </View>
  );
};

export default DistributionDetails;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginTop: 8,
  },
  title: {
    ...font.bold,
    marginLeft: 8,
  },
  addressContainer: {
    ...containers.rowCenterStart,
    marginVertical: 8,
  },
  address: {
    ...font.regular,
    flex: 1,
    marginLeft: 8,
  },
  distributionContainer: {
    ...containers.rowCenterStart,
    marginVertical: 8,
  },
  distributionText: {
    ...font.bold,
    flex: 1,
    marginLeft: 8,
  },
});
