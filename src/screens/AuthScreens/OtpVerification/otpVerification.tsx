import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Dimensions,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';

import Bg from '@/assets/image/otpBg.png';

import {AuthNavigationProps} from '@/navigation/types';
import Button from '@/components/Button/button';
import {primary} from '@/theme/colorPatte';
import {Icon} from '@/assets/svg/Icon';
import Spacer from '@/components/layout/Spacer';
import OtpInputs from 'react-native-otp-inputs';
import CustomText from '@/components/typography/CustomText';
import {useVerifyEmailMutation} from '@/services/auth/service';

const OtpVerificationScreen = ({
  navigation,
  route,
}: AuthNavigationProps<'OtpVerificationScreen'>) => {
  const [otp, setOtp] = useState<string>('');
  const {email, route: routeName} = route.params;
  const [showModal, setShowModal] = useState<boolean>(false);

  const [verifyEmail, {isLoading}] = useVerifyEmailMutation();

  const handleOnProceed = async () => {
    console.log('Here', otp);
    try {
      if (isLoading) {
        return;
      }

      const result = await verifyEmail({code: otp, email}).unwrap();
      console.log('res', result);
      if (result.isSuccess) {
        setShowModal(true);
      }
    } catch (error: any) {
      throw error;
    }
    // if (routeName) {
    //   navigation.navigate('Update');
    // }
  };
  console.log('rout', routeName);
  return (
    <ImageBackground source={Bg} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Spacer size={20} />
          <View style={styles.arrow}>
            <TouchableOpacity onPress={navigation.goBack}>
              <Icon name="backArrowCircle" color="white" />
            </TouchableOpacity>
          </View>
          <Spacer size={40} />
          <View style={styles.title}>
            <Text style={styles.titleText}>OTP Verification</Text>
            <Spacer size={20} />
            <View>
              <Spacer size={20} />
              <Text>Enter the verification code we just sent to {email}.</Text>
            </View>
          </View>
          <Spacer size={20} />
          <View>
            <OtpInputs
              handleChange={code => setOtp(code)}
              numberOfInputs={4}
              autofillFromClipboard={false}
              style={styles.otpStyles}
              inputContainerStyles={styles.containerStyle}
              // value={otp}
              inputStyles={styles.otpInputs}
              keyboardType="default"
            />
          </View>
          <Spacer size={20} />
          <View style={{alignItems: 'center'}}>
            <View style={{width: '90%', justifyContent: 'center'}}>
              <Button
                onPress={handleOnProceed}
                text="Verify"
                bgColor={primary}
                containerStyle={{backgroundColor: primary}}
                loading={isLoading}
              />
            </View>
          </View>
          <Spacer size={Dimensions.get('window').height / 4} />
          <View
            style={{
              paddingHorizontal: 15,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <CustomText
              style={{
                fontFamily: 'Inter-Regular',
                fontSize: 13,
                color: 'black',
                fontWeight: '400',
              }}>
              Didn’t received code?
            </CustomText>
            <TouchableOpacity>
              <CustomText
                style={{
                  fontFamily: 'Inter-Regular',
                  fontSize: 13,
                  color: '#FF830A',
                  fontWeight: '500',
                }}>
                {' '}
                Resend
              </CustomText>
            </TouchableOpacity>
          </View>
          {/* success modal */}
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
                  <CustomText>Email Verified Successfully</CustomText>
                  <Spacer size={20} />
                  <View style={{alignItems: 'center'}}>
                    <View style={{width: '90%', justifyContent: 'center'}}>
                      <Button
                        onPress={() => {
                          setShowModal(false),
                            navigation.navigate('LoginScreen', {
                              route: routeName,
                            });
                        }}
                        text="Proceed to Login"
                        bgColor={primary}
                        containerStyle={{backgroundColor: primary}}
                        loading={isLoading}
                      />
                    </View>
                  </View>
                </View>
                <Spacer size={14} />
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default OtpVerificationScreen;
