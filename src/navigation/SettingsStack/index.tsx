import React from 'react';
import {
  StackNavigationOptions,
  createStackNavigator,
} from '@react-navigation/stack';
import {PrivateNavStackParameterList, SettingsStackList} from '../types';
import Settings from '@/screens/TabScreen/Settings/Settings';
import PersonalSettings from '@/screens/TabScreen/Settings/PersonalSettings';
import Success from '@/components/layout/Success';

const Stack = createStackNavigator<PrivateNavStackParameterList>();

const navs: {
  name: keyof SettingsStackList;
  component: React.FC;
  options: StackNavigationOptions;
}[] = [
  {name: 'Settings', component: Settings, options: {headerShown: false}},
  {
    name: 'PersonalSettings',
    component: PersonalSettings,
    options: {headerShown: false},
  },

  //status
  {
    name: 'Success',
    component: Success,
    options: {headerShown: false},
  },
];

export default function SettingsNavigation() {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      {navs.map(nav => (
        <Stack.Screen {...nav} />
      ))}
    </Stack.Navigator>
  );
}
