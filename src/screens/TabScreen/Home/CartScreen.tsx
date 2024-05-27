import {View, ScrollView} from 'react-native';
import React from 'react';
import Header from '@/components/Header';

import Spacer from '@/components/layout/Spacer';
import Wrapper from '@/components/layout/Wrapper';
import {cartListData} from '../Wishlist/wishlistMock';
import {styles} from './styles';
import OrderCard from '@/components/Card/OrderCard';
import Button from '@/components/Button/button';
import {primary} from '@/theme/colorPatte';
import {PrivateNavigationProps} from '@/navigation/types';

const CartScreen = ({navigation}: PrivateNavigationProps<'CartScreen'>) => {
  return (
    <Wrapper type="settings">
      <View>
        <Header title="Cart" hasBackIcon />
      </View>
      <Spacer size={50} />
      <View style={styles.cartBody}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {cartListData.map(order => (
            <OrderCard
              image={order.image}
              name={order.name}
              amount={order.amount}
              key={order.id}
              type="cart"
            />
          ))}
          <Spacer size={20} />
          <Button
            text="Checkout"
            containerStyle={{backgroundColor: primary}}
            onPress={() => navigation.navigate('CheckoutScreen')}
          />
        </ScrollView>
        <Spacer size={50} />
      </View>
      <Spacer size={50} />
    </Wrapper>
  );
};

export default CartScreen;
