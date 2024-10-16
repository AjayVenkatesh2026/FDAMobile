import {IOnboardingCarouselItem} from 'src/types/screens/onboarding';
import copies from './copies';

import illustration1 from 'src/assets/onboarding/Illustration1.png';
import illustration2 from 'src/assets/onboarding/Illustration2.png';
import illustration3 from 'src/assets/onboarding/Illustration3.png';

const {
  ORDER_FAST,
  ORDER_YOUR_FOOD,
  A_GOOD_MEAL_CAN_TURN_ANY_DAY_AROUND_ORDER_NOW_FOR_DELICIOUS_CRAVINGS,
  EASY_PAYMENT,
  SAFE_ONLINE_PAYMENT,
  AS_PART_OF_SECURE_PAYMENT,
  FAST_DELIVERY,
  DELIVERY_AT_YOUT_DOORSTEP,
  WE_PROVIDE_DOOR_TO_DOOR_SERVICE,
} = copies;

const carouselItems: IOnboardingCarouselItem[] = [
  {
    title: ORDER_YOUR_FOOD,
    tag: ORDER_FAST,
    description:
      A_GOOD_MEAL_CAN_TURN_ANY_DAY_AROUND_ORDER_NOW_FOR_DELICIOUS_CRAVINGS,
    image: illustration1,
  },
  {
    title: SAFE_ONLINE_PAYMENT,
    tag: EASY_PAYMENT,
    description: AS_PART_OF_SECURE_PAYMENT,
    image: illustration2,
  },
  {
    title: DELIVERY_AT_YOUT_DOORSTEP,
    tag: FAST_DELIVERY,
    description: WE_PROVIDE_DOOR_TO_DOOR_SERVICE,
    image: illustration3,
  },
];

export {carouselItems};
