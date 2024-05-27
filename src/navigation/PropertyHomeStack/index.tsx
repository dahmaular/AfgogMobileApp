import React from 'react';
import {
  StackNavigationOptions,
  createStackNavigator,
} from '@react-navigation/stack';
import {PropertyHomeStackList} from '../types';

import HomeScreen from '@/screens/TabScreen/Property/Home';
import ApartmentScreen from '@/screens/TabScreen/Property/OtherScreen/Apartment';
import FilterScreen from '@/screens/TabScreen/Property/Home/FilterScreen';

const Stack = createStackNavigator<PropertyHomeStackList>();

const navs: {
  name: keyof PropertyHomeStackList;
  component: React.FC;
  options: StackNavigationOptions;
}[] = [
  {
    name: 'HomeScreen',
    component: HomeScreen,
    options: {headerShown: false},
  },
  {
    name: 'Apartment',
    component: ApartmentScreen,
    options: {headerShown: false},
  },
  {
    name: 'FilterScreen',
    component: FilterScreen,
    options: {headerShown: false},
  },
];

export default function PropertyHomeNavigation() {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      {navs.map(nav => (
        <Stack.Screen {...nav} />
      ))}
    </Stack.Navigator>
  );
}
