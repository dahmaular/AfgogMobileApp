import React from 'react';
import {View, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AuthNavStackParameterList} from '../types';
// import HomeScreen from '@/screens/TabScreen/Home/HomeScreen';

import HomeNavigation from '../HomeStack';
import SettingsNavigation from '../SettingsStack';
import {Icon} from '@/assets/svg/Icon';
import OrderNavigation from '../OrderNavigation';
// import WishListNavigation from '../ServiceStack';

const Tab = createBottomTabNavigator<AuthNavStackParameterList>();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,

        tabBarStyle: {
          elevation: 0,
          shadowOpacity: 0,
        },
      }}
      initialRouteName="HomeScreen">
      <Tab.Screen
        name="HomeScreen"
        component={HomeNavigation}
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({focused}) => (
            <View style={styles.tabItem}>
              {focused ? (
                <Icon name="homeFocused" width={24} height={22} color="white" />
              ) : (
                <Icon name="homeLight" width={24} height={22} color="white" />
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="WishList"
        component={OrderNavigation}
        options={{
          tabBarLabel: 'WishList',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({focused}) => (
            <View style={styles.tabItem}>
              {focused ? (
                <Icon name="heart" width={24} height={22} color="white" />
              ) : (
                <Icon name="heartGrey" width={24} height={22} color="white" />
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={OrderNavigation}
        options={{
          tabBarLabel: 'Cart',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({focused}) => (
            <View style={styles.tabItem}>
              {focused ? (
                <Icon name="cartFocused" width={24} height={22} color="white" />
              ) : (
                <Icon name="cartLight" width={24} height={22} color="white" />
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="SettingsScreen"
        component={SettingsNavigation}
        options={{
          tabBarLabel: 'Settings',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({focused}) => (
            <View style={styles.tabItem}>
              {focused ? (
                <Icon
                  name="accountFocused"
                  width={24}
                  height={22}
                  color="white"
                />
              ) : (
                <Icon
                  name="accountLight"
                  width={24}
                  height={22}
                  color="white"
                />
              )}
            </View>
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({
  tabBarStyle: {
    alignItems: 'center',
    display: 'flex',
    elevation: 12,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      height: 4,
      width: -2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  tabItem: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    width: 50,
  },
  tabText: {
    fontSize: 10,
    marginTop: 5,
  },
});
