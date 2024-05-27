import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AppSelectorNavigationParameterList} from '../types';
import TabNavigator from '../TabNavigation';
import PreAuthScreen from '@/screens/Pre-Auth/preAuth';
import PropertyTabNavigator from '../PropertyTabNav';
import {useSelector} from 'react-redux';
import {RootState} from '@/store';

const Stack = createStackNavigator<AppSelectorNavigationParameterList>();

const navigations = [
  // {name: 'preHome', component: PreAuthScreen, options: {}},
  {name: 'ecommerce', component: TabNavigator, options: {}},
  {name: 'property', component: PropertyTabNavigator, options: {}},
];

export default function AppselectorNavigation() {
  const routeType = useSelector((state: RootState) => state.user.isRealEstate);
  console.log('routeType', routeType);
  return (
    <Stack.Navigator initialRouteName={routeType ? 'property' : 'ecommerce'}>
      {navigations.map(({name, component, options}) => (
        <Stack.Screen
          name={name as keyof AppSelectorNavigationParameterList}
          component={component}
          options={{headerShown: false, ...options}}
        />
      ))}
    </Stack.Navigator>
  );
}
