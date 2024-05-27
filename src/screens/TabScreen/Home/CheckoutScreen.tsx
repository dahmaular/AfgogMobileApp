/* eslint-disable react-hooks/exhaustive-deps */
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '@/components/Header';
import Spacer from '@/components/layout/Spacer';
import Button from '@/components/Button/button';
import {PrivateNavigationProps} from '@/navigation/types';
import {carton, primary} from '@/theme/colorPatte';
import CustomText from '@/components/typography/CustomText';
import {Icon} from '@/assets/svg/Icon';
import {useSelector} from 'react-redux';
import {RootState} from '@/store';
import {
  useLazyGetDeliveryAddressQuery,
  useLazyGetPaymentCardsQuery,
} from '@/services/profile/service';

type AddressProps = {
  _id: string;
  address: string;
  city: string;
  name: string;
  phoneNumber: string;
  userId: string;
};

type CardProps = {
  _id: string;
  cardName: string;
  type: string;
  expiry: string;
  cardNumber: string;
};

const CheckoutScreen = ({
  navigation,
}: PrivateNavigationProps<'CheckoutScreen'>) => {
  const user = useSelector((state: RootState) => state.user.authData);
  const [userAddress, setUserAddress] = useState<AddressProps[]>([]);
  const [userCards, setUserCards] = useState<CardProps[]>([]);

  const [getPaymentCards] = useLazyGetPaymentCardsQuery();

  const [getDeliveryAddress, {isLoading: addressLoading}] =
    useLazyGetDeliveryAddressQuery();

  const getUserDeliveryAdd = async () => {
    const getAdd = await getDeliveryAddress({userId: user._id}).unwrap();
    console.log(getAdd);
    setUserAddress(getAdd.data);
  };

  useEffect(() => {
    getUserDeliveryAdd();
  }, []);

  const getUserCards = async () => {
    const getCards = await getPaymentCards({userId: user._id}).unwrap();
    console.log(getCards);
    setUserCards(getCards.data as []);
  };

  useEffect(() => {
    getUserCards();
  }, [navigation]);

  console.log(userAddress);

  return (
    <View style={styles.container}>
      <Spacer size={10} />
      <View style={styles.header}>
        <Header title="Checkout" hasBackIcon />
      </View>
      <View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Spacer size={50} />
          <View>
            <View style={styles.orderDeliveryView}>
              <CustomText style={styles.orderTitleText}>Order Info</CustomText>
              <Spacer size={20} />
              <View style={styles.subOrderView}>
                <CustomText style={styles.subOrderItems}>Subtotal</CustomText>
                <CustomText style={styles.subOrderPrice}>₦12000</CustomText>
              </View>
              <Spacer size={10} />
              <View style={styles.subOrderView}>
                <CustomText style={styles.subOrderItems}>
                  Delivery Charge
                </CustomText>
                <CustomText style={styles.subOrderPrice}>₦300</CustomText>
              </View>
              <Spacer size={10} />
              <View style={styles.subOrderView}>
                <CustomText style={styles.subOrderItems}>Total</CustomText>
                <CustomText style={styles.subOrderPrice}>₦12300</CustomText>
              </View>

              <Spacer size={30} />
              <View>
                <View style={styles.deliveryTitleView}>
                  <CustomText style={styles.orderTitleText}>
                    Delivery Address
                  </CustomText>
                  <TouchableWithoutFeedback
                    onPress={() => navigation.navigate('AddressScreen')}>
                    <Icon name="chevron-right" color="#fff" />
                  </TouchableWithoutFeedback>
                </View>
                <Spacer size={15} />
                <TouchableWithoutFeedback
                  onPress={() => navigation.navigate('AddressBook')}>
                  <View style={[styles.deliveryTitleView, styles.delivery]}>
                    <Icon name="mapLocation" color="#fff" />
                    {addressLoading ? (
                      <ActivityIndicator
                        size="small"
                        color={primary}
                        animating
                      />
                    ) : (
                      <CustomText
                        style={[styles.subOrderItems, {width: '95%'}]}>
                        {userAddress[0]?.address} {userAddress[0]?.city}
                      </CustomText>
                    )}
                    <Icon name="check-circle-green" color="#fff" />
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>

            <Spacer size={20} />

            <View style={styles.paymentView}>
              <Spacer size={20} />
              <View style={styles.deliveryTitleView}>
                <CustomText style={styles.orderTitleText}>
                  Payment Method
                </CustomText>
                <TouchableWithoutFeedback
                  onPress={() => navigation.navigate('CardsScreen')}>
                  <CustomText style={styles.edit}>Edit</CustomText>
                </TouchableWithoutFeedback>
              </View>
              <Spacer size={30} />
              {userCards.map(card => (
                <View style={[styles.deliveryTitleView, styles.cardView]}>
                  <Icon name="mastercard" color="#fff" />
                  <View>
                    <CustomText style={styles.cardDetails}>
                      **** **** {card.cardNumber.split(' ')[3]}
                    </CustomText>
                    <CustomText style={styles.cardDetails}>
                      Exp. date: {card.expiry}
                    </CustomText>
                  </View>
                  <Icon name="check-circle-green" color="#fff" />
                </View>
              ))}

              <Spacer size={30} />
            </View>
          </View>

          <Spacer size={40} />
          <View style={styles.btn}>
            <Button
              text="Place Order"
              containerStyle={{backgroundColor: primary}}
              onPress={() => navigation.navigate('OrderConfirmedScreen')}
            />
            <Spacer size={50} />
          </View>
          <Spacer size={50} />
        </ScrollView>
      </View>
    </View>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    // paddingHorizontal: 20,
  },
  header: {
    padding: 10,
  },
  orderDeliveryView: {
    paddingHorizontal: 20,
  },
  orderTitleText: {
    fontFamily: 'Inter-Regular',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 18.7,
    color: '#000000',
  },
  subOrderView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  subOrderItems: {
    fontFamily: 'Inter-Regular',
    fontWeight: '400',
    fontSize: 15,
    lineHeight: 16.5,
    color: '#8F959E',
  },
  subOrderPrice: {
    fontFamily: 'Inter-Regular',
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 14.5,
    color: '#1A202C',
  },
  deliveryTitleView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  delivery: {width: '80%'},
  edit: {
    color: '#4C6FFF',
    fontFamily: 'Inter-Regular',
    fontWeight: '700',
    fontSize: 12,
    lineHeight: 14.5,
  },
  paymentView: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '100%',
    borderWidth: 0.3,
    borderColor: carton,
    paddingHorizontal: 10,
  },
  cardDetails: {
    color: '#27272E',
    fontFamily: 'Inter-Regular',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 26,
  },
  cardView: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 0.3,
    borderColor: carton,
    padding: 13,
  },
  btn: {
    paddingHorizontal: 20,
  },
});
