import {Image, ImageBackground, ScrollView, View} from 'react-native';
import React from 'react';
import Bg from '@/assets/image/otpBg.png';
import confirmed from '@/assets/image/order_confirmed.png';
import {styles} from './styles';
import Spacer from '@/components/layout/Spacer';
import CustomText from '@/components/typography/CustomText';
import Button from '@/components/Button/button';
import {primary} from '@/theme/colorPatte';
import {PrivateNavigationProps} from '@/navigation/types';

const OrderConfirmedScreen = ({
  navigation,
}: PrivateNavigationProps<'OrderConfirmedScreen'>) => {
  return (
    <ImageBackground source={Bg} style={styles.orderConfirmedContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Spacer size={50} />
        <View>
          <Image source={confirmed} style={styles.confirmImage} />
        </View>
        <Spacer size={20} />
        <View style={styles.bodyView}>
          <CustomText style={styles.bodyText}>Order Confirmed!</CustomText>
          <Spacer size={20} />
          <CustomText style={styles.bodySubText}>
            Your order has been confirmed, we will send you confirmation email
            shortly.
          </CustomText>
        </View>
        <Spacer size={50} />
        <View style={styles.confirmFooter}>
          <View style={styles.orderBtn}>
            <Button
              text="Go to Orders"
              containerStyle={{backgroundColor: '#000', height: 45}}
              onPress={() => navigation.navigate('Orders')}
            />
          </View>
          <Spacer size={20} />
          <View style={styles.shoppingBtn}>
            <Button
              text="Continue shopping"
              containerStyle={{backgroundColor: primary}}
              onPress={() => navigation.navigate('HomeScreen')}
            />
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default OrderConfirmedScreen;
