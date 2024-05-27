import {View, ScrollView} from 'react-native';
import React from 'react';
import Header from '@/components/Header';

import Spacer from '@/components/layout/Spacer';
import Wrapper from '@/components/layout/Wrapper';
import {orderListData} from '../Wishlist/wishlistMock';
import {styles} from './styles';
import OrderCard from '@/components/Card/OrderCard';

const OrderScreen = () => {
  return (
    <Wrapper type="settings">
      <View>
        <Header title="Order" hasBackIcon />
      </View>
      <Spacer size={50} />
      <View style={styles.body}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {orderListData.map(order => (
            <OrderCard
              date={order.date}
              image={order.image}
              name={order.name}
              status={order.status}
              key={order.id}
            />
          ))}
        </ScrollView>
        <Spacer size={50} />
      </View>
      <Spacer size={50} />
    </Wrapper>
  );
};

export default OrderScreen;
