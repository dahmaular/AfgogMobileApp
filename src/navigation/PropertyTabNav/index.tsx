import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {PropertyStacklistParams} from '../types';
// import HomeScreen from '@/screens/TabScreen/Home/HomeScreen';

import SettingsNavigation from '../SettingsStack';
import {Icon} from '@/assets/svg/Icon';
import PropertyHomeNavigation from '../PropertyHomeStack';
import {useNavigation} from '@react-navigation/native';
import AddProperty from '@/screens/TabScreen/Property/Home/AddProperty';
import {useSelector} from 'react-redux';
import {RootState} from '@/store';
// import WishListNavigation from '../ServiceStack';

interface TabContainerProps {
  onPress: () => void;
  children?: React.ReactNode;
}

const Tab = createBottomTabNavigator<PropertyStacklistParams>();

const PropertyTabNavigator = () => {
  const agent = useSelector((state: RootState) => state.user.isAgent);
  const navigation = useNavigation();
  const FloatingButton = ({onPress}: TabContainerProps) => {
    return (
      <TouchableOpacity onPress={onPress} style={styles.floatBtnTouch}>
        {/* <View style={styles.floatingBtn}> */}
        <View>
          <Icon name="plusIcon" />
        </View>
        {/* </View> */}
        <View style={{width: 56, height: 58}} />
      </TouchableOpacity>
    );
  };
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
        component={PropertyHomeNavigation}
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
      {agent && (
        <Tab.Screen
          component={AddProperty}
          name="AddProperty"
          options={{
            title: 'Add Property',
            tabBarLabel: 'Add Property',
            tabBarIcon: () => <></>,
            tabBarButton: () => (
              <FloatingButton
                onPress={() => {
                  navigation.navigate('AddProperty');
                }}
              />
            ),
          }}
        />
      )}
      <Tab.Screen
        name="AccountScreen"
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

export default PropertyTabNavigator;

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
  floatBtnTouch: {
    top: -35,
    zIndex: 1,
    height: 61,
    alignItems: 'center',
  },
});
