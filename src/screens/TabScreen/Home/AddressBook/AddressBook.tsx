import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Switch,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Spacer from '@/components/layout/Spacer';
import {Icon} from '@/assets/svg/Icon';
import CustomText from '@/components/typography/CustomText';
import {PrivateNavigationProps} from '@/navigation/types';
import Header from '@/components/Header';
import Button from '@/components/Button/button';
import {carton, primary, secondary} from '@/theme/colorPatte';
import {useLazyGetDeliveryAddressQuery} from '@/services/profile/service';
import {useSelector} from 'react-redux';
import {RootState} from '@/store';

type AddressProps = {
  _id: string;
  address: string;
  city: string;
  name: string;
  phoneNumber: string;
  userId: string;
};

const AddressBook = ({navigation}: PrivateNavigationProps<'AddressBook'>) => {
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [userAddress, setUserAddress] = useState<AddressProps[]>([]);
  const user = useSelector((state: RootState) => state.user.authData);

  const [getDeliveryAddress, {isLoading: addressLoading}] =
    useLazyGetDeliveryAddressQuery();

  const getUserDeliveryAdd = async () => {
    const getAdd = await getDeliveryAddress({userId: user._id}).unwrap();
    console.log(getAdd);
    setUserAddress(getAdd.data);
  };

  useEffect(() => {
    getUserDeliveryAdd();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <Spacer size={20} />
      <View>
        <Header title="Select Address" hasBackIcon />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Spacer size={20} />
        <View>
          <View style={styles.plus}>
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate('AddressScreen')}>
              <Icon name="plusGreen" color="#fff" />
            </TouchableWithoutFeedback>
          </View>
          <Spacer size={20} />
          {addressLoading && (
            <ActivityIndicator animating size="large" color={primary} />
          )}
          {userAddress?.map(addr => (
            <>
              <View style={styles.addressCard}>
                <Icon name="radioGreen" color="#fff" />
                <Spacer size={20} />
                <View style={styles.addressView}>
                  <CustomText style={styles.addressTitle}>Home</CustomText>
                  <Spacer size={20} />
                  <CustomText style={styles.address}>
                    {addr.address} {addr?.city}
                  </CustomText>
                </View>
              </View>
              <Spacer size={20} />
            </>
          ))}
          <Spacer size={20} />
          {/* <View style={styles.addressCard}>
            <Icon name="radioWhite" color="#fff" />
            <Spacer size={20} />
            <View style={styles.addressView}>
              <CustomText style={styles.addressTitle}>Work</CustomText>
              <Spacer size={20} />
              <CustomText style={styles.address}>
                43, Admiralty Way Lekki Phase 1, Ocean City
              </CustomText>
            </View>
          </View> */}

          <Spacer size={30} />
          <View style={styles.switchView}>
            <CustomText style={styles.saveAddress}>
              Save as primary address
            </CustomText>
            <Switch
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              thumbColor={isEnabled ? '#fff' : carton}
              trackColor={{false: secondary, true: '#4BC76D'}}
              value={isEnabled}
            />
          </View>
          <Spacer size={60} />
          <View>
            <View>
              <Button
                onPress={() => navigation.navigate('CheckoutScreen')}
                text="Select Address"
                bgColor={primary}
                containerStyle={{backgroundColor: primary}}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default AddressBook;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 10,
  },
  plus: {
    alignItems: 'flex-end',
  },
  addressCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '100%',
    height: 122,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressView: {
    width: '70%',
  },
  addressTitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 15,
    fontWeight: '800',
    color: '#1D1E20',
  },
  address: {
    fontFamily: 'Inter-Regular',
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 18.2,
    color: '#1D1E20',
  },
  switchView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  saveAddress: {
    fontFamily: 'Inter-Regular',
    color: '#1D1E20',
    fontSize: 15,
    fontWeight: '500',
  },
});
