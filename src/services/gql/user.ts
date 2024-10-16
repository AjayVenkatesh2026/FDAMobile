import {gql} from '@apollo/client';

const GET_USER = gql`
  query getUserId($userId: String) {
    resposne: get_user(id: $userId) {
      statusCode
      message
      user {
        id
        email
        address
        name
        account_status
        role
        favorites
        phone
        order_history
      }
    }
  }
`;

export {GET_USER};
