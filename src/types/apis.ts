import type {IOrder} from './ordering';

interface IGetOrdersResponse {
  response: {
    __typename: string;
    message: string;
    statusCode: string;
    orders: IOrder[];
  };
}

export type {IGetOrdersResponse};
