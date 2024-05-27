import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';

import Bg from '@/assets/image/otpBg.png';

import {AuthNavigationProps} from '@/navigation/types';
import Button from '@/components/Button/button';
import {primary} from '@/theme/colorPatte';
import Spacer from '@/components/layout/Spacer';
import CustomText from '@/components/typography/CustomText';
import CustomInput from '@/components/layout/CustomInput';

const ForgotPasswordScreen = ({
  navigation,
}: AuthNavigationProps<'ForgotPassword'>) => {
  const [email, setEmail] = useState<string>('');

  const handleOnProceed = () => {
    console.log('Here', email);
    navigation.navigate('OtpVerificationScreen', {route: 'ForgotPassword'});
  };
  return (
    <ImageBackground source={Bg} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Spacer size={90} />
          <View style={styles.title}>
            <Text style={styles.titleText}>Forgot Password?</Text>
            <Spacer size={20} />
            <View>
              <Spacer size={20} />
              <Text>
                Don't worry! It occurs. Please enter the email address linked
                with your account.
              </Text>
            </View>
          </View>
          <Spacer size={30} />
          <View
            style={{
              width: '90%',
              alignItems: 'center',
              alignContent: 'center',
              alignSelf: 'center',
            }}>
            <CustomInput
              placeholder="Enter your email"
              value={email}
              onChangeText={e => setEmail(e)}
            />
          </View>
          <Spacer size={30} />
          <View style={{alignItems: 'center'}}>
            <View style={{width: '90%', justifyContent: 'center'}}>
              <Button
                onPress={handleOnProceed}
                text="Send Code"
                bgColor={primary}
                containerStyle={{backgroundColor: primary}}
                // loading={isLoading}
              />
            </View>
          </View>
          <Spacer size={Dimensions.get('window').height / 3} />
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
              Remember Password?
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
                Login
              </CustomText>
            </TouchableOpacity>
          </View>
          {/* success modal */}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default ForgotPasswordScreen;
