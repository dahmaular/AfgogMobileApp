import React from 'react';
import {
  StackNavigationOptions,
  createStackNavigator,
} from '@react-navigation/stack';
import {OrderStackList} from '../types';

import OrderScreen from '@/screens/TabScreen/Order/OrderScreen';

const Stack = createStackNavigator<OrderStackList>();

const navs: {
  name: keyof OrderStackList;
  component: React.FC;
  options: StackNavigationOptions;
}[] = [
  {
    name: 'Orders',
    component: OrderScreen,
    options: {headerShown: false},
  },
];

export default function OrderNavigation() {
  return (
    <Stack.Navigator initialRouteName="Orders">
      {navs.map(nav => (
        <Stack.Screen {...nav} />
      ))}
    </Stack.Navigator>
  );
}
