import {gql} from '@apollo/client';

const GET_CATEGORIES = gql`
  query getCategories {
    resposne: get_categories {
      categories {
        id
        image_url
        name
      }
      message
      statusCode
    }
  }
`;

export {GET_CATEGORIES};
