import type {TProfileOption} from 'src/types/global';
import {
  CHEVRON_RIGHT,
  ACCOUNT,
  MAP_MARKER_OUTLINE,
  CREDIT_CARD,
  TAG_HEART_OUTLINE,
  BELL_BADGE_OUTLINE,
  EMAIL_OPEN_OUTLINE,
  STORE_OUTLINE,
  HELP_CIRCLE_OUTLINE,
  FREQUENTLY_ASKED_QUESTIONS,
  LOCATION_EXIT,
  FORMAT_LIST_BULLETED,
  HISTORY,
} from './icons';
import copies from './copies';
import {clearAll} from 'src/storage';
import {clearRedux} from 'src/utils/helpers';

const {
  ACCOUNT_DETAILS,
  ADDRESS,
  PAYMENT_DETAILS,
  REWARDS_AND_LOYALITY,
  NOTIFICATIONS,
  RECOMMEND_A_STORE,
  SIGN_UP_YOUR_STORE,
  HELP_WITH_AN_ORDER,
  FAQ,
  TERMS_AND_SERVICE,
  LOGOUT,
  USER_PROFILE,
  COMMUNITY,
  SUPPORT,
  YOUR_ORDERS,
} = copies;

const options: TProfileOption[] = [
  {
    id: 'user-profile',
    type: 'Title',
    name: USER_PROFILE,
  },
  {
    id: 'account-details',
    type: 'Option',
    icon: ACCOUNT,
    name: ACCOUNT_DETAILS,
    onClick: ({}) => {},
    trailingIcon: CHEVRON_RIGHT,
  },
  {
    id: 'your-orders',
    type: 'Option',
    icon: HISTORY,
    name: YOUR_ORDERS,
    onClick: ({navigation}) => {
      if (navigation) {
        navigation.navigate('OrderStack', {
          screen: 'OrderHistory',
        });
      }
    },
    trailingIcon: CHEVRON_RIGHT,
  },
  {
    id: 'address',
    type: 'Option',
    icon: MAP_MARKER_OUTLINE,
    name: ADDRESS,
    onClick: () => {},
    trailingIcon: CHEVRON_RIGHT,
  },
  {
    id: 'payment-details',
    type: 'Option',
    icon: CREDIT_CARD,
    name: PAYMENT_DETAILS,
    onClick: ({}) => {},
    trailingIcon: CHEVRON_RIGHT,
  },
  {
    id: 'rewards-and-loyality',
    type: 'Option',
    icon: TAG_HEART_OUTLINE,
    name: REWARDS_AND_LOYALITY,
    onClick: ({}) => {},
    trailingIcon: CHEVRON_RIGHT,
  },
  {
    id: NOTIFICATIONS,
    type: 'Option',
    icon: BELL_BADGE_OUTLINE,
    name: NOTIFICATIONS,
    onClick: ({}) => {},
    trailingIcon: CHEVRON_RIGHT,
  },
  {
    id: 'community',
    type: 'Title',
    name: COMMUNITY,
  },
  {
    id: 'recommend-a-store',
    type: 'Option',
    icon: EMAIL_OPEN_OUTLINE,
    name: RECOMMEND_A_STORE,
    onClick: ({}) => {},
    trailingIcon: CHEVRON_RIGHT,
  },
  {
    id: 'sign-up-your-store',
    type: 'Option',
    icon: STORE_OUTLINE,
    name: SIGN_UP_YOUR_STORE,
    onClick: ({}) => {},
    trailingIcon: CHEVRON_RIGHT,
  },
  {
    id: 'support',
    type: 'Title',
    name: SUPPORT,
  },
  {
    id: 'help-with-an-order',
    type: 'Option',
    icon: HELP_CIRCLE_OUTLINE,
    name: HELP_WITH_AN_ORDER,
    onClick: ({}) => {},
    trailingIcon: CHEVRON_RIGHT,
  },
  {
    id: 'faq',
    type: 'Option',
    icon: FREQUENTLY_ASKED_QUESTIONS,
    name: FAQ,
    onClick: ({}) => {},
    trailingIcon: CHEVRON_RIGHT,
  },
  {
    id: 'terms-and-service',
    type: 'Option',
    icon: FORMAT_LIST_BULLETED,
    name: TERMS_AND_SERVICE,
    onClick: ({}) => {},
    trailingIcon: CHEVRON_RIGHT,
  },
  {
    id: 'logout',
    type: 'Option',
    icon: LOCATION_EXIT,
    name: LOGOUT,
    onClick: ({navigation, dispatch}) => {
      clearAll();
      if (navigation) {
        navigation.replace('AuthStack', {
          screen: 'LoginScreen',
        });
      }
      if (dispatch) {
        clearRedux(dispatch);
      }
    },
    trailingIcon: CHEVRON_RIGHT,
    iconColor: 'primaryDefault',
  },
];

export {options};
