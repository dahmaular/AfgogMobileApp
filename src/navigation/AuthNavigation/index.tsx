import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import WelcomeScreen from '@/screens/AuthScreens/Welcome';
import Login from '@/screens/AuthScreens/Login';

// import TabNavigator from '../TabNavigation';
import Recovery from '@/screens/AuthScreens/ForgotPassword/ForgotPassword';
import CreateNewPassword from '@/screens/AuthScreens/CreatePassword/CreateNewPassword';

import Register from '@/screens/AuthScreens/Register/Register';
import ForgotPasswordScreen from '@/screens/AuthScreens/ForgotPassword/ForgotPassword';
import {AuthNavStackParameterList} from '../types';
import PreAuthScreen from '@/screens/Pre-Auth/preAuth';
import PropWelcomeScreen from '@/screens/AuthScreens/Welcome/PropWelcome';
import OtpVerificationScreen from '@/screens/AuthScreens/OtpVerification/otpVerification';

const Stack = createStackNavigator<AuthNavStackParameterList>();

const screens = [
  {name: 'Recovery', component: Recovery, options: {headerShown: false}},
  {name: 'Update', component: CreateNewPassword, options: {headerShown: false}},
  {name: 'preHome', component: PreAuthScreen, options: {headerShown: false}},
];

export default function AuthNavigation() {
  return (
    <Stack.Navigator initialRouteName="preHome">
      <Stack.Screen
        name="WelcomeScreen"
        component={WelcomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PropWelcomeScreen"
        component={PropWelcomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LoginScreen"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={Register}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="OtpVerificationScreen"
        component={OtpVerificationScreen}
        options={{headerShown: false}}
      />

      {/* <Stack.Screen
        name="HomeScreen"
        component={TabNavigator}
        options={{headerShown: false}}
      /> */}

      {screens.map(({name, component, options}, index) => (
        <Stack.Screen
          key={index}
          name={name as keyof AuthNavStackParameterList}
          component={component}
          options={options}
        />
      ))}
    </Stack.Navigator>
  );
}
