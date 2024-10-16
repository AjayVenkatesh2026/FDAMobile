import type {StyleProp, ViewStyle} from 'react-native';

import type {IRestaurant} from '../ordering';

interface IReview {
  id: string;
  icon: string;
  name: string;
}

interface IListFooterProps {
  restaurant: IRestaurant;
}

interface IListHeaderProps {
  restaurant: IRestaurant;
}

interface IRestaurantDetailsProps {
  restaurant: IRestaurant;
  containerStyles?: StyleProp<ViewStyle>;
}

export type {
  IReview,
  IListFooterProps,
  IListHeaderProps,
  IRestaurantDetailsProps,
};
