import {TSearchType} from 'src/types/global';

const SEARCH_TYPES: Record<TSearchType, TSearchType> = {
  RESTAURANTS: 'RESTAURANTS',
  CATEGORIES: 'CATEGORIES',
  MENU_ITEMS: 'MENU_ITEMS',
};

const SEARCH_TYPE_COPY: Record<TSearchType, string> = {
  RESTAURANTS: 'Search Restaurants',
  CATEGORIES: 'Search Categories',
  MENU_ITEMS: 'Search Dishes',
};

export {SEARCH_TYPES, SEARCH_TYPE_COPY};
