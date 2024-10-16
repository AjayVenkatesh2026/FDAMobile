import type {
  IOrder,
  IOrderResponse,
  ICategory,
  IProduct,
  IRestaurantResponse,
  IProfile,
} from './ordering';

interface IGetOrdersResponse {
  response: {
    __typename: string;
    message: string;
    statusCode: string;
    orders: IOrder[];
  };
}

interface ICreateOrderResponse {
  response: {
    __typename: string;
    message: string;
    statusCode: string;
    orders: IOrderResponse[];
  };
}

interface ICategoriesResponse {
  resposne: {
    __typename: string;
    message: string;
    statusCode: string;
    categories: ICategory[];
  };
}

interface IMenuItemsResponse {
  response: {
    __typename: string;
    message: string;
    statusCode: string;
    menuItems: IProduct[];
  };
}

interface IOrderByIdResponse {
  response: {
    __typename: string;
    message: string;
    statusCode: string;
    order: IOrderResponse;
  };
}

interface IGetRestaurantsResponse {
  response: {
    __typename: string;
    message: string;
    statusCode: string;
    restaurants: IRestaurantResponse[];
  };
}

interface IGetUserResponse {
  resposne: {
    __typename: string;
    message: string;
    statusCode: string;
    user: IProfile;
  };
}

interface ILoginResposne {
  user_login: {
    __typename: string;
    message: string;
    statusCode: string;
    token: string;
    user: IProfile;
  };
}

export type {
  IGetOrdersResponse,
  ICreateOrderResponse,
  ICategoriesResponse,
  IMenuItemsResponse,
  IOrderByIdResponse,
  IGetRestaurantsResponse,
  IGetUserResponse,
  ILoginResposne,
};
