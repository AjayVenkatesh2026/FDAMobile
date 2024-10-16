import {StyleSheet, View} from 'react-native';
import React from 'react';

import {Divider, Icon, Text} from 'react-native-paper';

import Title from 'src/components/atoms/Title';
import copies from 'src/constants/copies';
import {reviews} from 'src/constants/restaurant';
import {useAppSelector} from 'src/hooks/reduxHooks';
import containers from 'src/styles/containers';
import font from 'src/styles/font';
import {STAR} from 'src/constants/icons';
import type {IReview} from 'src/types/screens/restaurant';
import type {IListFooterProps} from 'src/types/screens/restaurant';

const {REVIEWS, BASED_ON_72_RATINGS_OVER_THE_PAST_MONTH, ABOUT_STORE} = copies;

const ListFooter: React.FC<IListFooterProps> = ({restaurant}) => {
  const theme = useAppSelector(state => state.themeReducer.theme);
  const {rating, description} = restaurant;
  const ratingText = `${rating} / 5.0`;

  const renderReview = (item: IReview) => {
    return (
      <View key={item.id} style={containers.rowCenterCenter}>
        <Icon source={item.icon} size={24} color={theme?.primaryDefault} />
        <Text variant="bodySmall" style={styles.reviewText}>
          {item.name}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Reviw Container */}
      <View>
        <Title title={REVIEWS} />
        <View style={styles.reviewsContainers}>
          {reviews.map(renderReview)}
        </View>
        <Divider
          style={[styles.divider, {backgroundColor: theme?.primaryDefault}]}
        />
        <View style={containers.columnCenterCenter}>
          <View style={containers.rowCenterCenter}>
            <View
              style={[
                styles.iconContainer,
                {backgroundColor: theme?.primaryDefault},
              ]}>
              <Icon source={STAR} color={theme?.bgTextHigh} size={22} />
            </View>
            <Text
              variant="titleMedium"
              style={[styles.rating, {color: theme?.textHigh}]}>
              {ratingText}
            </Text>
          </View>
          <Text variant="bodySmall" style={styles.ratingsFooter}>
            {BASED_ON_72_RATINGS_OVER_THE_PAST_MONTH}
          </Text>
        </View>
      </View>
      {/* About Store */}
      <View style={styles.aboutContainer}>
        <Title
          title={ABOUT_STORE}
          showSeeAll={false}
          containerStyles={styles.aboutTitle}
        />
        <Text
          variant="bodyMedium"
          style={[styles.about, {color: theme?.textHigh}]}>
          {description}
        </Text>
      </View>
    </View>
  );
};

export default ListFooter;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  reviewsContainers: {
    ...containers.rowCenterBetween,
    marginTop: 8,
  },
  reviewText: {
    ...font.bold,
    textAlign: 'center',
    fontSize: 8,
    marginLeft: 4,
  },
  divider: {
    width: '50%',
    alignSelf: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  iconContainer: {
    padding: 4,
    borderRadius: 16,
  },
  rating: {
    ...font.bold,
    textAlign: 'center',
    fontSize: 18,
    marginLeft: 16,
  },
  ratingsFooter: {
    ...font.regular,
    textAlign: 'center',
    fontSize: 9,
  },
  aboutContainer: {
    marginVertical: 16,
  },
  aboutTitle: {
    marginBottom: 16,
  },
  about: {
    ...font.regular,
    fontSize: 12,
  },
});
