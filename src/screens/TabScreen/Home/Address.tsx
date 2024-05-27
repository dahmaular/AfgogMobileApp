import {
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  Switch,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Wrapper from '@/components/layout/Wrapper';
import Header from '@/components/Header';
import Spacer from '@/components/layout/Spacer';
import {Formik, FormikHelpers} from 'formik';
import {PrivateNavigationProps} from '@/navigation/types';
import {addressValidationSchema} from '@/utils/tab-validations';
import CustomText from '@/components/typography/CustomText';
import Button from '@/components/Button/button';
import {carton, primary, secondary} from '@/theme/colorPatte';
import CustomInput from '@/components/layout/CustomInput';
import ErrorText from '@/components/typography/ErrorText';
import {useAddDeliveryAddressMutation} from '@/services/profile/service';
import {useSelector} from 'react-redux';
import {RootState} from '@/store';
import {Icon} from '@/assets/svg/Icon';
import CustomButton from '@/components/layout/CustomButton';

let message: string = '';

const AddressScreen = ({
  navigation,
}: PrivateNavigationProps<'AddressScreen'>) => {
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [showModal, setShowModal] = useState<boolean>(false);

  const user = useSelector((state: RootState) => state.user.authData);

  const [addDeliveryAddress, {isLoading}] = useAddDeliveryAddressMutation();

  const initialValues = {
    name: '',
    phoneNumber: '',
    city: '',
    address: '',
  };

  const handleSubmit = async (
    values: typeof initialValues,
    {setSubmitting}: FormikHelpers<typeof initialValues>,
  ) => {
    console.log(values);
    try {
      setSubmitting(true);
      // console.log(values);
      const data = {
        ...values,
        userId: user._id,
        name: user.fullName,
        phoneNumber: user.phone,
      };
      console.log(data);
      const addDelivery = await addDeliveryAddress(data).unwrap();
      console.log(addDelivery);

      if (addDelivery.message === 'Successful') {
        message = addDelivery.message;
        setShowModal(true);
        // navigation.navigate('CheckoutScreen');
      }
      // navigation.navigate('CheckoutScreen');
    } catch (error: any) {
      throw error;
    }
  };
  return (
    <Wrapper type="settings">
      <View>
        <Header title="Address" hasBackIcon />
      </View>
      <Spacer size={50} />
      <View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <Formik
              validationSchema={addressValidationSchema}
              initialValues={initialValues}
              onSubmit={handleSubmit}>
              {formikProps => (
                <>
                  <View>
                    <View>
                      <Spacer size={20} />
                      <CustomText style={styles.label}>Name</CustomText>
                      <Spacer size={6} />
                      <CustomInput
                        placeholder={user.fullName}
                        placeholderTextColor="#9CA2AA"
                        value={user.fullName}
                        onChangeText={formikProps.handleChange('name')}
                        keyboardType="default"
                        returnKeyType="next"
                        style={styles.input}
                        editable={false}
                      />
                      <ErrorText
                        error={formikProps.errors.name}
                        touched={formikProps.touched.name}
                      />
                    </View>
                    <Spacer size={20} />
                    <View>
                      <View>
                        <CustomText style={styles.label}>
                          Phone Number
                        </CustomText>
                        <Spacer size={6} />
                        <CustomInput
                          placeholder={user.phone}
                          placeholderTextColor="#9CA2AA"
                          value={user.phone}
                          onChangeText={formikProps.handleChange('phoneNumber')}
                          keyboardType="default"
                          returnKeyType="next"
                          style={styles.input}
                          editable={false}
                        />
                        <ErrorText
                          error={formikProps.errors.phoneNumber}
                          touched={formikProps.touched.phoneNumber}
                        />
                      </View>
                      <Spacer size={20} />
                      <View>
                        <CustomText style={styles.label}>City</CustomText>
                        <Spacer size={6} />
                        <CustomInput
                          placeholder="Lagos"
                          placeholderTextColor="#9CA2AA"
                          value={formikProps.values.city}
                          onChangeText={formikProps.handleChange('city')}
                          keyboardType="default"
                          returnKeyType="next"
                          style={styles.input}
                        />
                        <Spacer size={5} />
                        <ErrorText
                          error={formikProps.errors.city}
                          touched={formikProps.touched.city}
                        />
                      </View>
                      <Spacer size={20} />
                      <View>
                        <CustomText style={styles.label}>Address</CustomText>
                        <Spacer size={6} />
                        <CustomInput
                          placeholder="address"
                          placeholderTextColor="#9CA2AA"
                          value={formikProps.values.address}
                          onChangeText={formikProps.handleChange('address')}
                          keyboardType="default"
                          returnKeyType="next"
                          style={styles.input}
                        />
                        <Spacer size={5} />
                        <ErrorText
                          error={formikProps.errors.address}
                          touched={formikProps.touched.address}
                        />
                      </View>
                    </View>
                  </View>
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
                        // onPress={() => navigation.navigate('CheckoutScreen')}
                        onPress={formikProps.submitForm}
                        text="Save Address"
                        bgColor={primary}
                        containerStyle={{backgroundColor: primary}}
                        loading={isLoading}
                      />
                    </View>
                  </View>
                </>
              )}
            </Formik>
          </View>
          <Spacer size={70} />
          <Modal transparent visible={showModal}>
            <View style={styles.modalView}>
              <View
                style={{
                  backgroundColor: 'white',
                  height: 300,
                  margin: 25,
                  width: '80%',
                  borderRadius: 15,
                  padding: 22,
                }}>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                  }}>
                  <TouchableWithoutFeedback>
                    <Icon name="close" />
                  </TouchableWithoutFeedback>
                </View>
                <Spacer size={30} />
                <View style={{alignItems: 'center'}}>
                  <View>
                    <Icon
                      name="statement-success"
                      color="white"
                      width={60}
                      height={60}
                    />
                  </View>
                  <Spacer size={30} />
                  <CustomText>{message}</CustomText>
                  <Spacer size={20} />

                  <CustomButton
                    text="Close"
                    type="settings"
                    borderless
                    onPress={() => {
                      setShowModal(false),
                        navigation.navigate('CheckoutScreen');
                    }}
                  />
                </View>
                <Spacer size={14} />
              </View>
            </View>
          </Modal>
        </ScrollView>
      </View>
      <Spacer size={50} />
    </Wrapper>
  );
};

export default AddressScreen;

const styles = StyleSheet.create({
  dualView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  input: {
    backgroundColor: '#EDEDED',
    height: 48,
    fontFamily: 'Inter-Regular',
    color: '#000',
    fontSize: 14,
    fontWeight: '400',
  },
  dualInput: {
    backgroundColor: '#EDEDED',
    height: 48,
    width: '40%',
  },
  btn: {
    position: 'absolute',
    bottom: 5,
  },
  label: {
    fontFamily: 'Inter-Regular',
    color: '#1D1E20',
    fontSize: 15,
    fontWeight: '500',
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
  modalView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: 'rgba(0,0,0,.5)',
  },
});
