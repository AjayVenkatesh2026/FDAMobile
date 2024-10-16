import type {
  // IAddress,
  IRestaurant,
  IOrder,
  IProduct,
  IBanner,
  ICategory,
  IMerchant,
  TMysteryBag,
} from 'src/types/ordering';

import banner1 from 'src/assets/banners/banner-1.png';
import banner2 from 'src/assets/banners/banner-2.png';
import banner3 from 'src/assets/banners/banner-3.png';
import mer1 from 'src/assets/merchants/saladstop.png';
import mer2 from 'src/assets/merchants/robinsons.png';
import mer3 from 'src/assets/merchants/the-french.png';
import mer4 from 'src/assets/merchants/army-navy.png';
import mer5 from 'src/assets/merchants/krispy-kreme.png';

// const dummyAddress: IAddress = {
//   landmark: "Near St. John's Library",
//   line_1: 'Luxary Residence, 5nd Floor, 504, 4560 Creek Rd',
//   line_2: 'Lewiston, New York, United States',
//   pin_code: '14092',
//   latitude: '43.194012',
//   longitude: '-79.022338',
// };

const dummyImageUrl =
  'https://images.unsplash.com/photo-1603122876935-13e7f40c3984?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

const dummyRestaurantsList: IRestaurant[] = [
  {
    id: '1',
    image:
      'https://images.unsplash.com/photo-1603122876935-13e7f40c3984?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    distance: '1 km',
    duration: 20,
    name: 'Restaurant 1',
    rating: 4.7,
    address: 'dummyAddress',
    tags: ['Salad Bags', 'Healthy'],
    openingHours: '09:00 am - 11:00 pm',
    description:
      'Dolor in velit labore irure ut ullamco sint eu sint nulla duis irure. Ullamco qui enim tempor consectetur laborum anim sunt ad eiusmod consectetur aliquip. Aliqua minim reprehenderit pariatur ut aute incididunt mollit ea. Quis veniam enim labore ut dolore et Lorem Lorem nostrud cupidatat. Amet ullamco mollit eu ad ullamco. Aliquip proident eu laboris magna enim excepteur eu consectetur adipisicing mollit est do cillum. In ex id magna dolor ad ipsum officia elit qui.',
  },
  {
    id: '2',
    image:
      'https://images.unsplash.com/photo-1603122876935-13e7f40c3984?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    distance: '1 km',
    duration: 20,
    name: 'Restaurant 2',
    rating: 4.7,
    address: 'dummyAddress',
    tags: ['Pastries Bags', 'Top Deals'],
    openingHours: '09:00 am - 11:00 pm',
    description: 'Reprehenderit quis tempor ullamco sit eu commodo incididunt.',
  },
  {
    id: '3',
    image:
      'https://images.unsplash.com/photo-1603122876935-13e7f40c3984?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    distance: '1 km',
    duration: 20,
    name: 'Restaurant 3',
    rating: 4.7,
    address: 'dummyAddress',
    tags: [],
    openingHours: '09:00 am - 11:00 pm',
    description: '',
  },
];

const dummyOrders: IOrder[] = [
  {
    id: '1',
    order_status: 'COMPLETED',
    total_amount: 406.08,
    order_placed_at: '2024-09-22T15:57:35.598Z',
    order_completed_at: '2024-09-22T15:57:35.598Z',
    restaurant_id: 'ee158e5c-1304-40c9-91c8-63b789863598',
    order_items: [
      {
        id: 'prod-1',
        quantity: 1,
        name: 'Chicken Fried Rice',
        price: 190,
      },
      {
        id: 'prod-2',
        quantity: 1,
        name: 'Chicken Manchuria',
        price: 190,
      },
    ],
    admin_commission: 6,
    vendor_earnings: 0,
    delivery_address: '',
    user_id: '',
  },
  {
    id: '2',
    order_status: 'COMPLETED',
    total_amount: 406.08,
    order_placed_at: '2024-09-22T15:57:35.598Z',
    order_completed_at: '2024-09-22T15:57:35.598Z',
    restaurant_id: 'ee158e5c-1304-40c9-91c8-63b789863598',
    order_items: [
      {
        id: 'prod-1',
        quantity: 1,
        name: 'Egg Fried Rice',
        price: 190,
      },
      {
        id: 'prod-2',
        quantity: 1,
        name: 'Veg Manchuria',
        price: 190,
      },
    ],
    admin_commission: 6,
    vendor_earnings: 0,
    delivery_address: '',
    user_id: '',
  },
];

// const dummyProducts: IProduct[] = [
//   {
//     id: 'prod-1',
//     name: 'Chicken Biryanai',
//     price: 280,
//     description: 'Qui elit non sit duis veniam duis consectetur sit.',
//     rating: 3.5,
//     num_of_ratings: 200,
//     restaurant_id: '1',
//     image:
//       'https://images.unsplash.com/photo-1603122876935-13e7f40c3984?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//   },
//   {
//     id: 'prod-2',
//     name: 'Chicken 65',
//     price: 280,
//     description:
//       'Ex magna occaecat magna eiusmod ipsum cupidatat labore adipisicing aliquip reprehenderit quis anim anim veniam. Dolor duis enim deserunt amet aliquip dolore officia ipsum cillum nulla. Et eu tempor voluptate incididunt aute proident incididunt nostrud non sint. Anim labore cillum eiusmod ut labore.',
//     rating: 4.3,
//     num_of_ratings: 1200,
//     restaurant_id: '2',
//     image:
//       'https://images.unsplash.com/photo-1603122876935-13e7f40c3984?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//   },
// ];

const DUMMY_BILL_BREAKDOWN = {
  DELIVERY_CHARGE: 25,
  PLATFORM_FEE: 6,
  TAX: 0,
  PICKUP_DISCOUNT: 49,
};

const banners: IBanner[] = [
  {
    id: 'banner-1',
    source: banner1,
  },
  {
    id: 'banner-2',
    source: banner2,
  },
  {
    id: 'banner-3',
    source: banner3,
  },
];

const categories: ICategory[] = [
  {
    id: 'cat-1',
    image_url:
      'https://5.imimg.com/data5/SA/HH/BP/SELLER-15290474/food-packaging-paper-bags.jpg',
    name: 'Available now',
  },
  {
    id: 'cat-2',
    image_url:
      'https://5.imimg.com/data5/SA/HH/BP/SELLER-15290474/food-packaging-paper-bags.jpg',
    name: 'Near me',
  },
  {
    id: 'cat-3',
    image_url:
      'https://5.imimg.com/data5/SA/HH/BP/SELLER-15290474/food-packaging-paper-bags.jpg',
    name: 'Top Deals',
  },
  {
    id: 'cat-4',
    image_url:
      'https://5.imimg.com/data5/SA/HH/BP/SELLER-15290474/food-packaging-paper-bags.jpg',
    name: 'Groceries',
  },
  {
    id: 'cat-5',
    image_url:
      'https://5.imimg.com/data5/SA/HH/BP/SELLER-15290474/food-packaging-paper-bags.jpg',
    name: 'Best Reviews',
  },
  {
    id: 'cat-6',
    image_url:
      'https://5.imimg.com/data5/SA/HH/BP/SELLER-15290474/food-packaging-paper-bags.jpg',
    name: 'Meals',
  },
  {
    id: 'cat-7',
    image_url:
      'https://5.imimg.com/data5/SA/HH/BP/SELLER-15290474/food-packaging-paper-bags.jpg',
    name: 'Pastries',
  },
  {
    id: 'cat-8',
    image_url:
      'https://5.imimg.com/data5/SA/HH/BP/SELLER-15290474/food-packaging-paper-bags.jpg',
    name: 'Healthy',
  },
];

const dummyMerchants: IMerchant[] = [
  {
    id: 'mer-1',
    image: mer1,
    name: 'SaladStop!',
  },
  {
    id: 'mer-2',
    image: mer2,
    name: 'Robinsons Supermarket!',
  },
  {
    id: 'mer-3',
    image: mer3,
    name: 'The French',
  },
  {
    id: 'mer-4',
    image: mer4,
    name: 'Army Navy',
  },
  {
    id: 'mer-5',
    image: mer5,
    name: 'Krispy Kreme!',
  },
];

const dummyNewOnHeroMeals: IRestaurant[] = [
  {
    id: 'res-1',
    image:
      'https://images.unsplash.com/photo-1603122876935-13e7f40c3984?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    distance: '3 km',
    duration: 20,
    name: 'Shangri-La Hotel',
    rating: 4.0,
    address: 'dummyAddress',
    tags: ['Afternoon Tea Pasty Box'],
    openingHours: '09:00 am - 11:00 pm',
    description: '',
  },
  {
    id: 'res-2',
    image:
      'https://images.unsplash.com/photo-1603122876935-13e7f40c3984?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    distance: '1.5 km',
    duration: 20,
    name: 'ButterBoy',
    rating: 4.2,
    address: 'dummyAddress',
    tags: ['Bakery Box'],
    openingHours: '09:00 am - 11:00 pm',
    description: '',
  },
  {
    id: 'res-3',
    image:
      'https://images.unsplash.com/photo-1603122876935-13e7f40c3984?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    distance: '1.5 km',
    duration: 20,
    name: 'Kenny Rogers',
    rating: 4.6,
    address: 'dummyAddress',
    tags: ['Meat Bag'],
    openingHours: '09:00 am - 11:00 pm',
    description: '',
  },
];

const dummyCollectNow: IRestaurant[] = [
  {
    id: 'res-collect-1',
    image:
      'https://images.unsplash.com/photo-1603122876935-13e7f40c3984?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    distance: '3 km',
    duration: 20,
    name: 'SaladStop!',
    rating: 4.6,
    address: 'dummyAddress',
    tags: ['Salad Bag'],
    openingHours: '3:00 am - 5:00 pm',
    description: '',
  },
  {
    id: 'res-collect-2',
    image:
      'https://images.unsplash.com/photo-1603122876935-13e7f40c3984?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    distance: '2.5 km',
    duration: 20,
    name: 'The French Baker',
    rating: 4.7,
    address: 'dummyAddress',
    tags: ['Bakery Box'],
    openingHours: '6:00 am - 6:00 pm',
    description: '',
  },
  {
    id: 'res-collect-3',
    image:
      'https://images.unsplash.com/photo-1603122876935-13e7f40c3984?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    distance: '',
    duration: 20,
    name: 'Marks & Spencers',
    rating: 4.6,
    address: 'dummyAddress',
    tags: ['Groceris Bag'],
    openingHours: '9:45 am - 12:00 pm',
    description: '',
  },
];

const dummyProducts: IProduct[] = [
  {
    id: 'prod-1',
    name: 'Chicken Biryanai',
    price: 280,
    description: 'Qui elit non sit duis veniam duis consectetur sit.',
    rating: 3.5,
    restaurant_id: '1',
    image_url:
      'https://images.unsplash.com/photo-1603122876935-13e7f40c3984?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'cat 1',
    is_available: true,
    restaurant_name: 'Restaurant 1',
    category_id: '',
  },
  {
    id: 'prod-2',
    name: 'Chicken 65',
    price: 280,
    description:
      'Ex magna occaecat magna eiusmod ipsum cupidatat labore adipisicing aliquip reprehenderit quis anim anim veniam. Dolor duis enim deserunt amet aliquip dolore officia ipsum cillum nulla. Et eu tempor voluptate incididunt aute proident incididunt nostrud non sint. Anim labore cillum eiusmod ut labore.',
    rating: 4.3,
    restaurant_id: '1',
    image_url:
      'https://images.unsplash.com/photo-1603122876935-13e7f40c3984?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'cat 1',
    is_available: true,
    restaurant_name: 'Restaurant 1',
    category_id: '',
  },
];

const dummyMysteryBags: TMysteryBag[] = [
  {
    id: 'mys-1',
    name: 'Gourmet Lunch Mystery Bag',
    restaurant_id: 'Pocofino',
    image_url:
      'https://images.unsplash.com/photo-1603122876935-13e7f40c3984?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    restaurant_name: 'Pocofino',
  },
  {
    id: 'mys-2',
    name: 'Donuts Box of 6',
    restaurant_id: 'dunkin-donuts',
    image_url:
      'https://images.unsplash.com/photo-1603122876935-13e7f40c3984?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    restaurant_name: 'Dunkin Donuts',
  },
  {
    id: 'mys-3',
    name: 'Salad Bag',
    restaurant_id: 'salad-stop',
    image_url:
      'https://images.unsplash.com/photo-1603122876935-13e7f40c3984?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    restaurant_name: 'SaladStop!',
  },
  {
    id: 'mys-4',
    name: 'Fruit Bag',
    restaurant_id: 'salad-stop',
    image_url:
      'https://images.unsplash.com/photo-1603122876935-13e7f40c3984?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    restaurant_name: 'SaladStop!',
  },
];

const dummyTags = [
  'Salad Bags',
  'Healthy',
  'Pastries Bags',
  'Top Deals',
  'Afternoon Tea Pasty Box',
  'Bakery Box',
  'Meat Bag',
  'Salad Bag',
  'Groceris Bag',
];

export {
  dummyRestaurantsList,
  dummyOrders,
  dummyProducts,
  DUMMY_BILL_BREAKDOWN,
  banners,
  categories,
  dummyMerchants,
  dummyNewOnHeroMeals,
  dummyCollectNow,
  dummyMysteryBags,
  dummyImageUrl,
  dummyTags,
};
