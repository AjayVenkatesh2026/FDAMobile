import HomeScreen from 'src/components/screens/HomeScreen/HomeScreen';
import ProfileScreen from 'src/components/screens/ProfileScreen/ProfileScreen';
import type {ITab} from 'src/types/navigator';
import {ACCOUNT, CART_OUTLINE, HEART_OUTLINE, HOME, TEXT_SEARCH} from './icons';
import CategoriesScreen from 'src/components/screens/CategoriesScreen/CategoriesScreen';
import FavouritesScreen from 'src/components/screens/FavouritesScreen/FavouritesScreen';
import BasketsScreen from 'src/components/screens/BasketsScreen/BasketsScreen';

const tabs: ITab[] = [
  {
    name: 'HomeScreen',
    component: HomeScreen,
    options: {
      icon: HOME,
      tabBarLabel: 'Home',
    },
  },
  {
    name: 'CategoriesScreen',
    component: CategoriesScreen,
    options: {
      icon: TEXT_SEARCH,
      tabBarLabel: 'Browse',
    },
  },
  {
    name: 'FaviouritesScreen',
    component: FavouritesScreen,
    options: {
      icon: HEART_OUTLINE,
      tabBarLabel: 'Favourites',
    },
  },

  {
    name: 'BasketsScreen',
    component: BasketsScreen,
    options: {
      icon: CART_OUTLINE,
      tabBarLabel: 'Baskets',
    },
  },
  {
    name: 'ProfileScreen',
    component: ProfileScreen,
    options: {
      icon: ACCOUNT,
      tabBarLabel: 'Profile',
    },
  },
];

export {tabs};
