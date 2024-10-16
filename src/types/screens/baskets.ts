import type {IRestaurant} from '../ordering';

interface IDistributionDetailsProps {
  isPickup?: boolean;
  restaurant: IRestaurant;
}

interface IMyBasketProps {
  restaurant: IRestaurant;
}

interface IPaymentBreakdownProps {
  restaurantId: string;
  isPickup: boolean;
}

export type {IDistributionDetailsProps, IMyBasketProps, IPaymentBreakdownProps};
