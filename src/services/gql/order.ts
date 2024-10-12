import {gql} from '@apollo/client';

const GET_ORDER = gql`
  query getOrderById($orderId: String) {
    response: get_order_by_id(id: $orderId) {
      statusCode
      message
      order {
        id
        user_id
        restaurant_id
        order_items {
          name
          price
          quantity
          id
        }
        delivery_address
        total_amount
        vendor_earnings
        admin_commission
        order_status
        order_placed_at
        order_completed_at
      }
    }
  }
`;

const CREATE_ORDER = gql`
  mutation createOrder($order: [OrderInput]) {
    response: create_order(order: $order) {
      statusCode
      message
      orders {
        id
        user_id
        restaurant_id
        order_items {
          name
          price
          quantity
          id
        }
        delivery_address
        total_amount
        vendor_earnings
        admin_commission
        order_status
        order_placed_at
        order_completed_at
      }
    }
  }
`;

export {GET_ORDER, CREATE_ORDER};
