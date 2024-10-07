import type {NavigatorScreenParams} from '@react-navigation/native';
import {IRestaurant} from '../ordering';

type BottomTabOption = {
  icon: string;
  tabBarLabel: string;
};

type AuthStackParamList = {
  LoginScreen: undefined;
};

type BottomTabParamList = {
  HomeScreen: undefined;
  // OrderHistoryScreen: undefined;
  ProfileScreen: undefined;
  CategoriesScreen: undefined;
  FaviouritesScreen: undefined;
  BasketsScreen: undefined;
};

type ProductStackParamList = {
  ProductsScreen: {
    restaurant: IRestaurant;
  };
  RestaurantScreen: {
    restaurant: IRestaurant;
  };
  SearchScreen: undefined;
};

type OrderStackParamList = {
  CartHomeScreen: undefined;
  OrderDetails: {
    restaurantId: string;
  };
  OrderSuccess: {
    orderId: string;
    isPickup: boolean;
  };
  OrderTrackingScreen: {
    orderId: string;
  };
};

type RootStackParamList = {
  SplashScreen: undefined;
  AuthStack: NavigatorScreenParams<AuthStackParamList>;
  BottomTab: NavigatorScreenParams<BottomTabParamList>;
  ProductStack: NavigatorScreenParams<ProductStackParamList>;
  OrderStack: NavigatorScreenParams<OrderStackParamList>;
  OnboardingScreen: undefined;
};

type RootStackScreens =
  | 'SplashScreen'
  | 'AuthStack'
  | 'BottomTab'
  | 'ProductStack'
  | 'OrderStack'
  | 'OnboardingScreen';

type AuthStackScreens = 'LoginScreen';

type BottomTabScreens =
  | 'HomeScreen'
  | 'ProfileScreen'
  | 'CategoriesScreen'
  | 'FaviouritesScreen'
  | 'BasketsScreen';

type ProductStackScreens =
  | 'ProductsScreen'
  | 'RestaurantScreen'
  | 'SearchScreen';

type OrderStackScreens =
  | 'CartHomeScreen'
  | 'OrderDetails'
  | 'OrderSuccess'
  | 'OrderTrackingScreen';

interface ITab {
  name: BottomTabScreens;
  component: () => React.JSX.Element;
  color?: string;
  options: BottomTabOption;
}

export type {
  AuthStackParamList,
  RootStackParamList,
  BottomTabParamList,
  RootStackScreens,
  AuthStackScreens,
  BottomTabScreens,
  BottomTabOption,
  ProductStackParamList,
  ProductStackScreens,
  OrderStackParamList,
  OrderStackScreens,
  ITab,
};
