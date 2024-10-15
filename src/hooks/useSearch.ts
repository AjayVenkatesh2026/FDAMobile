import {useCallback, useState} from 'react';
import {SEARCH_TYPES} from 'src/constants/search';

import {debounce} from 'radash';

import {TSearchType} from 'src/types/global';
import {IProduct} from 'src/types/ordering';
import {useAppSelector} from './reduxHooks';

const useSearch = () => {
  const [response, setResponse] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const menuItems = useAppSelector(state => state.menuItemsReducer.menuItems);

  const search = useCallback(
    ({
      searchQuery,
      searchType,
      ignoreSearchQuery = false,
    }: {
      searchQuery: string;
      searchType: TSearchType;
      ignoreSearchQuery?: boolean;
    }) => {
      setLoading(false);
      let field: 'restaurant_name' | 'category' | 'name' | '' = '';
      if (searchType === SEARCH_TYPES.RESTAURANTS) {
        field = 'restaurant_name';
      } else if (searchType === SEARCH_TYPES.CATEGORIES) {
        field = 'category';
      } else if (searchType === SEARCH_TYPES.MENU_ITEMS) {
        field = 'name';
      }
      if (field && (searchQuery || ignoreSearchQuery)) {
        const res = menuItems.filter(menuItem =>
          menuItem[field].toLowerCase().includes(searchQuery.toLowerCase()),
        );
        setResponse(res);
      }
      setLoading(false);
    },
    [menuItems],
  );

  const debouncedSearch = debounce({delay: 300}, search);

  return {response, debouncedSearch, loading};
};

export default useSearch;
