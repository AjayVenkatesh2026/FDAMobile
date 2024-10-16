import {random, shuffle} from 'radash';
import {jwtDecode} from 'jwt-decode';

import type {
  IProfile,
  IAddress,
  IRestaurantResponse,
  IRestaurant,
  IProduct,
} from 'src/types/ordering';
import copies from 'src/constants/copies';
import {get} from 'src/storage';
import storageKeys from 'src/storage/keys';
import {dummyTags} from 'src/constants/dummyData';
import {IJwtPaylod} from 'src/types/global';
import {AppDispatch} from 'src/redux/store';
import {clearRestaurants} from 'src/redux/slices/restaurantSlice';
import {clearCategories} from 'src/redux/slices/categoriesSlice';
import {clearCart} from 'src/redux/slices/cartSlice';
import {clearProfile} from 'src/redux/slices/profileSlice';

const {PESO} = copies;

const isValidProfile = (profile: any): profile is IProfile => {
  if (typeof profile === 'object') {
    const keys = Object.keys(profile);

    return (
      keys.length > 0 &&
      keys.includes('name') &&
      keys.includes('phone') &&
      !!profile.name &&
      !!profile.phone
    );
  }

  return false;
};

const getInitials = ({name}: {name: string}) => {
  return name
    .split(' ')
    .map(s => s[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

const getMergedAddress = ({address}: {address?: IAddress | {}}) => {
  const {line_1 = '', line_2 = ''} = address as IAddress;
  let mergedAddress = '';
  if (address && Object.keys(address).length > 0) {
    if (line_1 && typeof line_1 === 'string') {
      mergedAddress += line_1;
    }
    if (line_2) {
      mergedAddress += line_2;
    }
  }

  return mergedAddress;
};

const isValidHttpUrl = (string: string) => {
  var pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i',
  ); // fragment locator
  return !!pattern.test(string);
};

const getFormattedPrice = (price: number) => {
  return `${PESO}${price.toFixed(2)}`;
};

const getMobileNumberWithCountryCode = (phoneNumber: string) => {
  return `+63 ${phoneNumber}`;
};

const getToken = (): string => {
  return `${get(storageKeys.TOKEN)}` || '';
};

const getDecodedToken = (): IJwtPaylod => {
  const token = getToken();
  if (token) {
    return jwtDecode<IJwtPaylod>(token);
  }

  return {};
};

const isValidToken = (): boolean => {
  const token = getDecodedToken();
  if (token.exp) {
    // exp is in seconds since epoch while Date.now return in milliseconds
    return token.exp * 1000 > Date.now();
  }

  return false;
};

const translateRestaurantResponseToRestaurant = (
  restaurant: IRestaurantResponse,
) => {
  const res: IRestaurant = {
    address: restaurant.address,
    description: restaurant.description,
    image: restaurant.image_url,
    distance: `${random(1, 4)} km`,
    id: restaurant.id,
    name: restaurant.name,
    openingHours: restaurant.operating_hours,
    rating: restaurant.rating,
    tags: shuffle(dummyTags).slice(1, random(0, 3)),
    duration: random(10, 30),
  };

  return res;
};

const clearRedux = (dispatch: AppDispatch) => {
  dispatch(clearRestaurants());
  dispatch(clearCategories());
  dispatch(clearCart());
  dispatch(clearProfile());
};

const getMenuItemsByCategoryName = ({
  menuItems = [],
  categoryName = '',
}: {
  menuItems: IProduct[];
  categoryName: string;
}): IProduct[] => {
  return menuItems.filter(item =>
    item.category.toLowerCase().includes(categoryName.toLowerCase()),
  );
};

export {
  getInitials,
  isValidProfile,
  getMergedAddress,
  isValidHttpUrl,
  getFormattedPrice,
  getMobileNumberWithCountryCode,
  getToken,
  translateRestaurantResponseToRestaurant,
  isValidToken,
  getDecodedToken,
  clearRedux,
  getMenuItemsByCategoryName,
};
