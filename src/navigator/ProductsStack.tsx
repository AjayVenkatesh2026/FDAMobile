import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ProductsScreen from 'src/components/screens/ProductsScreen/ProductsScreen';
import type {ProductStackParamList} from 'src/types/navigator';
import screenNames from 'src/constants/screenNames';
import RestaurantScreen from 'src/components/screens/RestaurantScreen/RestaurantScreen';
import SearchScreen from 'src/components/screens/SearchScreen/SearchScreen';
import MenuItemsByCategoryScreen from 'src/components/screens/MenuItemsByCategoryScreen/MenuItemsByCategoryScreen';

const {productStackScreenNames} = screenNames;

const Stack = createNativeStackNavigator<ProductStackParamList>();

const ProductsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={productStackScreenNames.ProductsScreen}>
      <Stack.Screen
        name={productStackScreenNames.ProductsScreen}
        component={ProductsScreen}
      />
      <Stack.Screen
        name={productStackScreenNames.RestaurantScreen}
        component={RestaurantScreen}
      />
      <Stack.Screen
        name={productStackScreenNames.SearchScreen}
        component={SearchScreen}
      />
      <Stack.Screen
        name={productStackScreenNames.MenuItemsByCategoryScreen}
        component={MenuItemsByCategoryScreen}
      />
    </Stack.Navigator>
  );
};

export default ProductsStack;
