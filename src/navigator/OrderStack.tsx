import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import CartHomeScreen from 'src/components/screens/CartHomeScreen/CartHomeScreen';
import type {OrderStackParamList} from 'src/types/navigator';
import screenNames from 'src/constants/screenNames';
import OrderDetails from 'src/components/screens/OrderDetails/OrderDetails';
import OrderSuccessScreen from 'src/components/screens/OrderSuccessScreen/OrderSuccessScreen';
import OrderTrackingScreen from 'src/components/screens/OrderTrackingScreen/OrderTrackingScreen';
import OrderHistoryScreen from 'src/components/screens/OrderHistoryScreen/OrderHistoryScreen';

const {orderStackScreenNames} = screenNames;

const Stack = createNativeStackNavigator<OrderStackParamList>();

const OrderStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={orderStackScreenNames.CartHomeScreen}>
      <Stack.Screen
        name={orderStackScreenNames.CartHomeScreen}
        component={CartHomeScreen}
      />
      <Stack.Screen
        name={orderStackScreenNames.OrderDetails}
        component={OrderDetails}
      />
      <Stack.Screen
        name={orderStackScreenNames.OrderSuccess}
        component={OrderSuccessScreen}
      />
      <Stack.Screen
        name={orderStackScreenNames.OrderTrackingScreen}
        component={OrderTrackingScreen}
      />
      <Stack.Screen
        name={orderStackScreenNames.OrderHistory}
        component={OrderHistoryScreen}
      />
    </Stack.Navigator>
  );
};

export default OrderStack;
