import {gql} from '@apollo/client';

const GET_RESTAURANTS = gql`
  query getRestaurants {
    response: get_restaurants {
      statusCode
      message
      restaurants {
        address
        commission_rate
        contact_details
        cuisine_type
        description
        id
        image_url
        menu
        name
        operating_hours
        rating
        total_earnings
        user_id
      }
    }
  }
`;

export {GET_RESTAURANTS};
