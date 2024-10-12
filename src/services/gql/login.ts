import {gql} from '@apollo/client';

const USER_LOGIN = gql`
  query userLogin($mobileNumber: String!, $otp: String!) {
    user_login(login_id: $mobileNumber, otp: $otp) {
      message
      statusCode
      token
      user {
        id
        account_status
        address
        email
        favorites
        name
        order_history
        phone
        role
      }
    }
  }
`;

export {USER_LOGIN};
