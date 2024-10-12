import {gql} from '@apollo/client';

const GET_MENU_ITEMS_BY_RESTAURANT_ID = gql`
  query getMenuItemsByRestaurantId($restaurantId: String!) {
    response: get_menu_items_by_restaurant_id(restaurant_id: $restaurantId) {
      statusCode
      message
      menuItems: menu_items {
        id
        restaurant_id
        restaurant_name
        name
        description
        price
        category
        category_id
        is_available
        image_url
        rating
        quantity
      }
    }
  }
`;

const GET_MENU_ITEMS = gql`
  query getMenuItems {
    response: get_menu_items {
      statusCode
      message
      menuItems: menu_items {
        id
        restaurant_id
        restaurant_name
        name
        description
        price
        category
        category_id
        is_available
        image_url
        rating
        quantity
      }
    }
  }
`;

export {GET_MENU_ITEMS_BY_RESTAURANT_ID, GET_MENU_ITEMS};
