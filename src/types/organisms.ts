import type {StyleProp, ViewStyle, ImageStyle, TextStyle} from 'react-native';

import type {
  ICartData,
  IProduct,
  IRestaurant,
  TMysteryBag,
  IPaymentMethod,
} from './ordering';

interface RestaurantInCartProps {
  restaurantData: ICartData;
}

interface IQuantitySelectorProps {
  product: IProduct;
}

interface IRestaurantProps {
  restaurant: IRestaurant;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  showImage?: boolean;
  mode?: 'outlined' | 'contained' | 'elevated' | undefined;
}

interface IProductProps {
  product: IProduct;
}

interface IMysteryBag {
  mysteryBag: TMysteryBag;
}

interface IPaymentMethodProps {
  paymentMethod: IPaymentMethod;
  onPress?: (id: IPaymentMethod) => void;
  selectedMethodId: string;
}

interface IRestaurantCarouselCardProps {
  restaurant: IRestaurant;
  showTimings?: boolean;
  bgImageStyles?: StyleProp<ImageStyle>;
  titleStyles?: StyleProp<TextStyle>;
  descriptionStyles?: StyleProp<TextStyle>;
  taglineStyles?: StyleProp<TextStyle>;
  clockIconSize?: number;
  contentContainerStyles?: StyleProp<ViewStyle>;
  showFavouriteIcon?: boolean;
}

interface IRestaurantMenuItemProps {
  product: IProduct;
  restaurant?: IRestaurant;
  showTimings?: boolean;
  showCategory?: boolean;
  showRestaurant?: boolean;
}

export type {
  RestaurantInCartProps,
  IQuantitySelectorProps,
  IRestaurantProps,
  IProductProps,
  IMysteryBag,
  IPaymentMethodProps,
  IRestaurantCarouselCardProps,
  IRestaurantMenuItemProps,
};
