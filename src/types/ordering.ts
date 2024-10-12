import {ImageSourcePropType} from 'react-native';
import {TDateISO} from './date';

interface IAddress {
  landmark: string;
  line_1: string;
  line_2: string;
  pin_code: string;
  latitude?: string;
  longitude?: string;
}
interface IProfile {
  account_status: string;
  address: string;
  email: string;
  favorites: string[];
  id: string;
  name: string;
  order_history: string[];
  phone: string;
  role: string;
}

interface IRestaurant {
  id: string;
  image: string;
  distance: string;
  duration?: number;
  name: string;
  rating: number;
  address: string;
  tags: string[];
  openingHours: string;
  description: string;
}

interface IProduct {
  category: string;
  description: string;
  id: string;
  image_url: string;
  is_available: boolean;
  name: string;
  price: number;
  rating: number;
  restaurant_id: string;
  restaurant_name: string;
  category_id: string;
}

interface IOrderRestaurant {
  id: string;
  image: string;
  name: string;
  address: string;
  distance?: string;
  duration?: number;
  rating?: number;
}

interface IOrderProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface IOrderPayment {
  id: string;
  payment_method: string;
}

type OrderStatus = 'Pending' | 'Cancelled' | 'In Progress' | 'Delivered';

interface ICartProduct {
  details: IProduct;
  quantity: number;
}

interface IBillBreakdown {
  itemTotal: number;
  deliveryFee: number;
  tax: number;
  platformFee: number;
  pickupDiscount: number;
}

interface ICartData {
  restaurant: IRestaurant | null;
  products?: ICartProduct[];
  orderData: IBillBreakdown;
}

interface IOrder {
  id: string;
  order_status: OrderStatus;
  order_total: number;
  delivered_at: TDateISO;
  taxes: number;
  delivery_fee: number;
  restaurant: IOrderRestaurant;
  products: IOrderProduct[];
  payment: IOrderPayment;
}

interface IBanner {
  id: string;
  source: ImageSourcePropType;
}

interface ICategory {
  id: string;
  image_url: string;
  name: string;
}

interface IMerchant {
  id: string;
  image: ImageSourcePropType;
  name: string;
}

interface IPaymentMethod {
  id: string;
  image: ImageSourcePropType;
  name: string;
}

type TMysteryBag = Pick<
  IProduct,
  'id' | 'restaurant_name' | 'name' | 'image_url' | 'restaurant_id'
>;

interface IOrderResponse {
  id: string;
  user_id: string;
  restaurant_id: string;
  order_items: {
    name: string;
    price: number;
    quantity: number;
    id: string;
  };
  delivery_address: string;
  total_amount: number;
  vendor_earnings: number;
  admin_commission: number;
  order_status: string;
  order_placed_at: TDateISO;
  order_completed_at: TDateISO;
}

interface IRestaurantResponse {
  menu: string[];
  user_id: string;
  commission_rate: number;
  rating: number;
  total_earnings: number;
  operating_hours: string;
  contact_details: string;
  cuisine_type: string;
  address: string;
  description: string;
  id: string;
  name: string;
}

interface IOrderInput {
  admin_commission: number;
  delivery_address: string;
  order_completed_at?: TDateISO;
  order_items: IOrderProduct[];
  order_placed_at?: TDateISO;
  order_status?: string;
  restaurant_id: string;
  total_amount: number;
  type?: string;
  user_id: string;
  vendor_earnings: number;
}

export type {
  IProfile,
  IAddress,
  IRestaurant,
  IOrder,
  IOrderProduct,
  IProduct,
  ICartProduct,
  ICartData,
  IBillBreakdown,
  IBanner,
  ICategory,
  IMerchant,
  IPaymentMethod,
  TMysteryBag,
  IRestaurantResponse,
  IOrderResponse,
  IOrderInput,
};
