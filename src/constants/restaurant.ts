import {IReview} from 'src/types/screens/restaurant';
import {HOME_VARIANT_OUTLINE, SILVERWARE, SILVERWARE_FORK_KNIFE} from './icons';
import copies from './copies';

const {FRIENDLY_STAFF, DELICIOUS_FOOD, GREAT_AMOUNT_OF_FOOD} = copies;

const reviews: IReview[] = [
  {
    id: '1',
    icon: HOME_VARIANT_OUTLINE,
    name: FRIENDLY_STAFF,
  },
  {
    id: '2',
    icon: SILVERWARE_FORK_KNIFE,
    name: DELICIOUS_FOOD,
  },
  {
    id: '3',
    icon: SILVERWARE,
    name: GREAT_AMOUNT_OF_FOOD,
  },
];

export {reviews};
