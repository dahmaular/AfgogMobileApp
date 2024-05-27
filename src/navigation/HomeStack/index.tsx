import React from 'react';
import {
  StackNavigationOptions,
  createStackNavigator,
} from '@react-navigation/stack';
import {PrivateNavStackParameterList} from '../types';

import HomeScreen from '@/screens/TabScreen/Home/HomeScreen';
import CategoryScreen from '@/screens/TabScreen/Home/CategoryScreen';
import CartScreen from '@/screens/TabScreen/Home/CartScreen';
import CheckoutScreen from '@/screens/TabScreen/Home/CheckoutScreen';
import AddressScreen from '@/screens/TabScreen/Home/Address';
import Cards from '@/screens/TabScreen/Home/Cards/Cards';
import OrderConfirmedScreen from '@/screens/TabScreen/Home/OrderConfirmed';
import OrderScreen from '@/screens/TabScreen/Order/OrderScreen';
import AddressBook from '@/screens/TabScreen/Home/AddressBook/AddressBook';
import ProductScreen from '@/screens/TabScreen/Home/Product';

const Stack = createStackNavigator<PrivateNavStackParameterList>();

const navs: {
  name: keyof PrivateNavStackParameterList;
  component: React.FC;
  options: StackNavigationOptions;
}[] = [
  {name: 'HomeScreen', component: HomeScreen, options: {headerShown: false}},
  {
    name: 'CategoryScreen',
    component: CategoryScreen,
    options: {headerShown: false},
  },
  {
    name: 'ProductScreen',
    component: ProductScreen,
    options: {headerShown: false},
  },
  {
    name: 'CartScreen',
    component: CartScreen,
    options: {headerShown: false},
  },
  {
    name: 'CheckoutScreen',
    component: CheckoutScreen,
    options: {headerShown: false},
  },
  {
    name: 'AddressScreen',
    component: AddressScreen,
    options: {headerShown: false},
  },
  {
    name: 'CardsScreen',
    component: Cards,
    options: {headerShown: false},
  },
  {
    name: 'OrderConfirmedScreen',
    component: OrderConfirmedScreen,
    options: {headerShown: false},
  },
  {
    name: 'Orders',
    component: OrderScreen,
    options: {headerShown: false},
  },
  {
    name: 'AddressBook',
    component: AddressBook,
    options: {headerShown: false},
  },
];

export default function HomeNavigation() {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      {navs.map(nav => (
        <Stack.Screen {...nav} />
      ))}
    </Stack.Navigator>
  );
}
