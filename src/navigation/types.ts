import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigatorScreenParams} from '@react-navigation/native';

export type AppSelectorNavigationParameterList = {
  preHome: undefined;
  ecommerce: NavigatorScreenParams<PrivateNavStackParameterList>;
  property: NavigatorScreenParams<PropertyStacklistParams>;
};

export type AuthNavStackParameterList = {
  SplashScreen: undefined;
  preHome: undefined;
  PropWelcomeScreen: undefined;
  WelcomeScreen: undefined;
  LoginScreen: {route?: string};
  RegisterScreen: {route?: string};
  ForgotPassword: undefined;
  Recovery: undefined;
  WishList: undefined;
  Cart: undefined;
  OtpVerificationScreen: {email: string; route?: string};
};

export type OrderStackList = {
  Orders: undefined;
};

export type PrivateNavStackParameterList = OrderStackList & {
  HomeScreen: undefined;
  CategoryScreen: undefined | {category?: string};
  SettingsScreen: undefined;
  CartScreen: undefined;
  CheckoutScreen: undefined;
  AddressScreen: undefined;
  CardsScreen: undefined;
  OrderConfirmedScreen: undefined;
  AddressBook: undefined;
  ProductScreen: undefined | {id?: string};
};

export type PropertyStacklistParams = {
  HomeScreen: NavigatorScreenParams<PropertyHomeStackList>;
  AccountScreen: undefined;
  ApartmentScreen: undefined;
  AddProperty: undefined;
};

export type WishlistStackList = {
  Wishlist: undefined;
};

export type PropertyHomeStackList = {
  HomeScreen: undefined;
  Apartment: {apartment: object};
  FilterScreen: undefined;
};

export type AuthNavigationProps<
  Screen extends keyof AuthNavStackParameterList,
> = NativeStackScreenProps<AuthNavStackParameterList, Screen>;

export type PrivateNavigationProps<
  Screen extends keyof PrivateNavStackParameterList,
> = NativeStackScreenProps<PrivateNavStackParameterList, Screen>;

export type PropertyNavigationProps<
  Screen extends keyof PropertyStacklistParams,
> = NativeStackScreenProps<PropertyStacklistParams, Screen>;

export type OrderNavigationProps<Screen extends keyof OrderStackList> =
  NativeStackScreenProps<OrderStackList, Screen>;

export type WishListNavigationProps<Screen extends keyof WishlistStackList> =
  NativeStackScreenProps<WishlistStackList, Screen>;

export type AppSelectorNavigationProps<
  Screen extends keyof AppSelectorNavigationParameterList,
> = NativeStackScreenProps<AppSelectorNavigationParameterList, Screen>;

export type PropertyHomeNavigationProps<
  Screen extends keyof PropertyHomeStackList,
> = NativeStackScreenProps<PropertyHomeStackList, Screen>;
