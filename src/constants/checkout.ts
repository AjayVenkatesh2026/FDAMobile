import copies from './copies';
import {CAR_PICKUP, CLOCK_OUTLINE, HOME, MAP_MARKER_OUTLINE} from './icons';
import type {IPaymentMethod} from 'src/types/ordering';

import cashOnDelivery from 'src/assets/payment-methods/cash-on-delivery.png';
import visa from 'src/assets/payment-methods/visa.png';
import mastercard from 'src/assets/payment-methods/master-card.png';
import gCash from 'src/assets/payment-methods/g-cash.png';

const {
  SHIP_TO,
  PICKUP_AT,
  CHANGE,
  VIEW_MAP,
  DELIVERY_EXPECTED_BETWEEN,
  PICKUP_TODAY_FROM,
  CASH_ON_DELIVERY,
  VISA,
  MASTERCARD,
  GCASH,
} = copies;

const DISTRIBUTION_TYPES = {
  DELIVERY: 'DELIVERY',
  PICKUP: 'PICKUP',
};

const DISTRIBUTION_DETAILS = {
  [DISTRIBUTION_TYPES.DELIVERY]: {
    titleIcon: HOME,
    title: SHIP_TO,
    rightButtonText: CHANGE,
    addressIcon: MAP_MARKER_OUTLINE,
    clockIcon: CLOCK_OUTLINE,
    distributionText: DELIVERY_EXPECTED_BETWEEN,
  },
  [DISTRIBUTION_TYPES.PICKUP]: {
    titleIcon: CAR_PICKUP,
    title: PICKUP_AT,
    rightButtonText: VIEW_MAP,
    addressIcon: MAP_MARKER_OUTLINE,
    clockIcon: CLOCK_OUTLINE,
    distributionText: PICKUP_TODAY_FROM,
  },
};

const PAYMENT_METHODS: IPaymentMethod[] = [
  {
    id: 'cash-on-delivery',
    image: cashOnDelivery,
    name: CASH_ON_DELIVERY,
  },
  {
    id: 'visa',
    image: visa,
    name: VISA,
  },
  {
    id: 'mastercard',
    image: mastercard,
    name: MASTERCARD,
  },
  {
    id: 'gcash',
    image: gCash,
    name: GCASH,
  },
];

export {DISTRIBUTION_DETAILS, DISTRIBUTION_TYPES, PAYMENT_METHODS};
