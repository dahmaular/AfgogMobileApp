import {
  View,
  Text,
  Dimensions,
  ScrollView,
  // Alert,
  ImageBackground,
  TouchableOpacity,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
// import base64 from 'react-native-base64';

import {styles} from './styles';
import loginBg from '../../../assets/image/loginBg.png';

import InputText from '@/components/Inputs/InputText';
import Button from '@/components/Button/button';
import {carton, primary, secondary} from '@/theme/colorPatte';

import {AuthNavigationProps} from '@/navigation/types';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {Icon} from '@/assets/svg/Icon';
import {Formik, FormikHelpers} from 'formik';
import {loginValidationSchema} from '@/utils/auth-validations';
import Spacer from '@/components/layout/Spacer';
import CheckBox from '@react-native-community/checkbox';
import CustomText from '@/components/typography/CustomText';
import {IconPackType} from '@/assets/svg/iconPack';
import {useLoginMutation} from '@/services/auth/service';
import CustomButton from '@/components/layout/CustomButton';

const {width, height} = Dimensions.get('window');

const socialMedia = [
  {
    id: 1,
    icon: 'fbIcon' as IconPackType,
  },
  {
    id: 2,
    icon: 'googleIcon' as IconPackType,
  },
  {
    id: 3,
    icon: 'appleIcon' as IconPackType,
  },
];

let message: string = '';

const Login = ({navigation, route}: AuthNavigationProps<'LoginScreen'>) => {
  const [login, {isLoading}] = useLoginMutation();
  const {route: routeType} = route?.params;
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showOtpModal, setShowOtpModal] = useState<boolean>(false);
  const logInInitialValues = {email: '', password: ''};
  const [toggleEye, setToggleEye] = useState<boolean>(false);
  const [isSelected, setSelection] = useState(false);
  const [checkerror, setCheckError] = useState<boolean>(false);
  const [otpEmail, setOtpEmail] = useState<string>('');

  // console.log('route', isSuccess, status, error);
  const handleSubmit = async (
    values: typeof logInInitialValues,
    {setSubmitting}: FormikHelpers<typeof logInInitialValues>,
  ) => {
    try {
      if (isLoading) {
        return;
      }
      setSubmitting(true);
      console.log('res', values);
      const result = await login({
        ...values,
      }).unwrap();
      console.log('resul', result);
      if (!result.isSuccess) {
        message = result.message;
        setShowModal(true);
      }
      // eslint-disable-next-line no-catch-shadow
    } catch (error: any) {
      console.log('err', error.data.message);
      message = error.data.message;
      if (error.data.message.includes('Pending Account')) {
        setOtpEmail(values.email);
        setShowOtpModal(true);
      }
      setShowModal(true);

      // throw error;
    }
  };

  const handleVerify = async () => {
    setShowOtpModal(false);
    setShowModal(false);
    console.log('da', otpEmail);
    navigation.navigate('OtpVerificationScreen', {
      email: otpEmail,
      route: 'property',
    });
  };

  return (
    <ImageBackground source={loginBg} style={{height, width}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Spacer size={height / 9} />
        <View style={{alignItems: 'center'}}>
          <Text style={styles.titleText}>Welcome Back</Text>
        </View>
        <Formik
          validationSchema={loginValidationSchema}
          initialValues={logInInitialValues}
          onSubmit={handleSubmit}>
          {formikProps => (
            <>
              <View
                style={{
                  paddingHorizontal: 10,
                }}>
                <View>
                  <Spacer size={height / 8} />
                  {/* <CustomInput /> */}
                  {/* <Text style={styles.label}>Email</Text> */}
                  <InputText
                    icon={<Icon name="username" color="white" />}
                    placeholder="Enter your email or username"
                    placeholderColor="#9CA2AA"
                    autoCapitalize="none"
                    value={formikProps.values.email.trim()}
                    onChangeText={formikProps.handleChange('email')}
                    keyboardType="email-address"
                    returnKeyType="next"
                    errorText={
                      formikProps.touched.email && formikProps.errors.email
                    }
                  />
                </View>
                <Spacer size={10} />
                <View style={styles.password}>
                  <InputText
                    icon={<Icon name="lock" color="white" />}
                    placeholder="Enter Password"
                    placeholderColor="#9CA2AA"
                    value={formikProps.values.password}
                    onChangeText={formikProps.handleChange('password')}
                    secureEntry={!toggleEye ? true : false}
                    returnKeyType="next"
                    errorText={
                      formikProps.touched.password &&
                      formikProps.errors.password
                    }
                    isPassword={
                      <Icon
                        name={toggleEye ? 'eye-opened' : 'eye-closed'}
                        color="#989EA5"
                      />
                    }
                    iconAction={() => setToggleEye(!toggleEye)}
                  />
                </View>
                <TouchableWithoutFeedback
                  onPress={() => {
                    navigation.navigate('Recovery');
                  }}>
                  <View style={styles.forgotPassword}>
                    <Text style={styles.forgotPwordText}>Forgot Password?</Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
              <Spacer size={20} />
              <View style={styles.btnView}>
                <View style={{width: '90%'}}>
                  <Button
                    onPress={formikProps.submitForm}
                    text="Sign in"
                    bgColor={primary}
                    containerStyle={{backgroundColor: primary}}
                    loading={isLoading}
                  />
                </View>
              </View>
            </>
          )}
        </Formik>
        <Spacer size={40} />
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <CheckBox
            disabled={false}
            value={isSelected}
            onValueChange={newValue => {
              setSelection(newValue), setCheckError(!checkerror);
            }}
            tintColors={{true: 'white', false: carton}}
            onCheckColor={secondary}
            onTintColor={secondary}
          />
          <CustomText
            style={{
              color: '#8f8f8f',
              fontWeight: '500',
              fontFamily: 'Inter-Regular',
            }}>
            Keep me sign in
          </CustomText>
        </View>

        <View>
          <Spacer size={40} />
          <View style={{alignItems: 'center'}}>
            <Icon name="altSignIn" color="white" />
          </View>
          <Spacer size={20} />
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            {socialMedia.map(sm => (
              <TouchableOpacity
                style={{
                  width: 105,
                  height: 56,
                  marginHorizontal: 5,
                  borderWidth: 1,
                  borderColor: '#fff',
                  alignItems: 'center',
                  borderRadius: 8,
                  justifyContent: 'center',
                }}>
                <Icon name={sm.icon} color="white" />
              </TouchableOpacity>
            ))}
          </View>
          <Spacer size={40} />
          <View
            style={{
              paddingHorizontal: 15,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <CustomText
              style={{
                fontSize: 16,
                color: 'white',
              }}>
              Don’t have an account?{' '}
            </CustomText>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('RegisterScreen', {route: routeType})
              }>
              <Spacer size={1} />
              <CustomText style={{color: '#FC820B'}}>SIGN UP NOW</CustomText>
            </TouchableOpacity>
            <Spacer size={20} />
          </View>
        </View>
        <View>
          <Spacer size={50} />
        </View>
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
                <TouchableWithoutFeedback
                  onPress={() => (setShowModal(false), setShowOtpModal(false))}>
                  <Icon name="close" />
                </TouchableWithoutFeedback>
              </View>
              <Spacer size={30} />
              <View style={{alignItems: 'center'}}>
                <View>
                  <Icon
                    name="statement-failed"
                    color="white"
                    width={60}
                    height={60}
                  />
                </View>
                <Spacer size={30} />
                <CustomText>{message}</CustomText>
                <Spacer size={20} />

                {showOtpModal ? (
                  <View style={{width: '90%'}}>
                    <Button
                      onPress={handleVerify}
                      text="Verify Email"
                      bgColor={primary}
                      containerStyle={{backgroundColor: primary}}
                      loading={isLoading}
                    />
                  </View>
                ) : (
                  <CustomButton
                    text="Close"
                    type="settings"
                    borderless
                    onPress={() => setShowModal(false)}
                  />
                )}
              </View>
              <Spacer size={14} />
            </View>
          </View>
        </Modal>
      </ScrollView>
    </ImageBackground>
  );
};

export default Login;
