import {shuffle, unique} from 'radash';

import type {IRestaurant} from 'src/types/ordering';

const getCollectNowRestaurants = (restaurants: IRestaurant[]) => {
  return shuffle(unique(restaurants, res => res.id)).slice(0, 3);
};

const getNewRestaurants = (restaurants: IRestaurant[]) => {
  return shuffle(unique(restaurants, res => res.id)).slice(0, 3);
};

export {getCollectNowRestaurants, getNewRestaurants};
