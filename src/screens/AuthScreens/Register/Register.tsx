import {
  View,
  Text,
  Dimensions,
  ScrollView,
  // Alert,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';

import {styles} from './styles';
import loginBg from '../../../assets/image/loginBg.png';

import InputText from '@/components/Inputs/InputText';
import Button from '@/components/Button/button';
import {carton, primary, secondary} from '@/theme/colorPatte';

import {AuthNavigationProps} from '@/navigation/types';
// import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {Icon} from '@/assets/svg/Icon';
import {Formik, FormikHelpers} from 'formik';
import {loginValidationSchema} from '@/utils/auth-validations';
import Spacer from '@/components/layout/Spacer';
import CheckBox from '@react-native-community/checkbox';
import CustomText from '@/components/typography/CustomText';
import {IconPackType} from '@/assets/svg/iconPack';
import {useCreateAccountMutation} from '@/services/auth/service';
import ErrorText from '@/components/typography/ErrorText';

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

const Register = ({
  navigation,
  route,
}: AuthNavigationProps<'RegisterScreen'>) => {
  const [createAccount, {isLoading}] = useCreateAccountMutation();

  const {route: routeName} = route.params;

  // const [isLoading, setIsLoading] = useState<boolean>(false);
  const logInInitialValues = {fullName: '', email: '', phone: '', password: ''};
  const [toggleEye, setToggleEye] = useState<boolean>(false);
  const [isSelected, setSelection] = useState(false);
  const [isAgent, setIsAgent] = useState(false);
  const [checkerror, setCheckError] = useState<boolean>(false);

  console.log('route', routeName);
  const handleSubmit = async (
    values: typeof logInInitialValues,
    {setSubmitting}: FormikHelpers<typeof logInInitialValues>,
  ) => {
    try {
      if (isLoading) {
        return;
      }
      setSubmitting(true);
      console.log(values);

      const data = {
        ...values,
        isAgent: isAgent,
        isRealEstate: routeName === 'property' ? true : false,
      };
      // navigation.navigate('OtpVerificationScreen', {email: values.email});

      console.log('Agent', data);
      const result = await createAccount(data).unwrap();
      console.log('res', result);
      if (result.isSuccess) {
        navigation.navigate('OtpVerificationScreen', {
          email: values.email,
          route: routeName,
        });
      }
    } catch (error: any) {
      throw error;
    }
  };

  return (
    <ImageBackground source={loginBg} style={{height, width}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Spacer size={height / 9} />
        <View style={{alignItems: 'center'}}>
          <Text style={styles.titleText}>Create your account</Text>
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
                    placeholder="Enter Your Name"
                    placeholderColor="#9CA2AA"
                    value={formikProps.values.fullName}
                    onChangeText={formikProps.handleChange('fullName')}
                    returnKeyType="next"
                    errorText={
                      formikProps.touched.fullName &&
                      formikProps.errors.fullName
                    }
                  />
                  <ErrorText
                    error={formikProps.errors.fullName}
                    touched={formikProps.touched.fullName}
                  />
                </View>
                <Spacer size={10} />
                <View style={styles.password}>
                  <InputText
                    icon={<Icon name="envelop" color="white" />}
                    placeholder="Enter Your Email"
                    placeholderColor="#9CA2AA"
                    value={formikProps.values.email.trim()}
                    onChangeText={formikProps.handleChange('email')}
                    // secureEntry={!toggleEye ? true : false}
                    returnKeyType="next"
                    errorText={
                      formikProps.touched.email && formikProps.errors.email
                    }
                  />
                  <ErrorText
                    error={formikProps.errors.fullName}
                    touched={formikProps.touched.fullName}
                  />
                </View>
                <Spacer size={10} />
                <View style={styles.password}>
                  <InputText
                    icon={<Icon name="phone" color="white" />}
                    placeholder="Enter Phone Number"
                    placeholderColor="#9CA2AA"
                    value={formikProps.values.phone}
                    onChangeText={formikProps.handleChange('phone')}
                    returnKeyType="next"
                    errorText={
                      formikProps.touched.phone && formikProps.errors.phone
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
              </View>
              <Spacer size={20} />
              {routeName === 'property' && (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 10,
                  }}>
                  <CheckBox
                    disabled={false}
                    value={isAgent}
                    onValueChange={newValue => {
                      setIsAgent(newValue), setCheckError(!checkerror);
                    }}
                    tintColors={{true: 'white', false: carton}}
                    onCheckColor={secondary}
                    onTintColor={secondary}
                  />
                  <CustomText
                    style={{
                      color: '#fff',
                      fontWeight: '500',
                      fontFamily: 'Inter-Regular',
                      textAlign: 'center',
                    }}>
                    Are you a seller?
                  </CustomText>
                </View>
              )}
              <Spacer size={10} />
              <View style={styles.btnView}>
                <View style={{width: '90%'}}>
                  <Button
                    onPress={formikProps.submitForm}
                    text="Sign up"
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
        <View
          style={{
            flexDirection: 'row',
            // alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 20,
          }}>
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
              textAlign: 'center',
            }}>
            By signing up,you agree to terms of services and privacy policy
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
                navigation.navigate('LoginScreen', {route: routeName})
              }>
              <Spacer size={1} />
              <CustomText style={{color: '#FC820B'}}>SIGN IN NOW</CustomText>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Spacer size={50} />
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default Register;
