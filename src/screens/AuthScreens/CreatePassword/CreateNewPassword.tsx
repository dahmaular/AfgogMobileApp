import React, {useState} from 'react';
import {ImageBackground, Modal, ScrollView, View} from 'react-native';
import CustomText from '../../../components/typography/CustomText';
import Spacer from '../../../components/layout/Spacer';
import CustomInput from '../../../components/layout/CustomInput';
import {Icon} from '../../../assets/svg/Icon';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import Bg from '@/assets/image/otpBg.png';
// import SuccessIcon from '@/assets/svg/Successmark.svg';
import {styles} from './styles';
import Button from '@/components/Button/button';
import {primary} from '@/theme/colorPatte';
import {AuthNavigationProps} from '@/navigation/types';

const CreateNewPassword = ({
  navigation,
}: AuthNavigationProps<'CreatePasswordScreen'>) => {
  const [secureTextEntry, setSecureTextEntry] = React.useState({
    password: true,
    confirm: true,
  });
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  const handleOnProceed = () => {
    setShowSuccess(true);
  };

  const handleOnClick = () => {
    setShowSuccess(false);
    navigation.navigate('LoginScreen');
  };
  return (
    <ImageBackground source={Bg} style={styles.container}>
      <Spacer size={30} />
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.goBack();
        }}>
        <Icon name="backArrowCircle" color="white" />
      </TouchableWithoutFeedback>
      <Spacer size={40} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <CustomText style={styles.headerText}>Create new password</CustomText>
        </View>
        <Spacer size={20} />
        <View>
          <CustomText style={styles.subHeader}>
            Your new password must be unique from those previously used.
          </CustomText>
        </View>
        <Spacer size={30} />
        <CustomInput
          secureTextEntry={secureTextEntry.password}
          placeholder="Enter your password"
          placeholderTextColor="#9CA2AA"
          icon={{
            right: {
              name: secureTextEntry.confirm ? 'eye-closed' : 'eye-opened',
              action: () => {
                setSecureTextEntry({
                  ...secureTextEntry,
                  confirm: !secureTextEntry.password,
                });
              },
            },
          }}
        />
        <Spacer size={30} />

        <Spacer size={8} />
        <CustomInput
          secureTextEntry={secureTextEntry.password}
          placeholder="Confirm Password"
          placeholderTextColor="#9CA2AA"
          icon={{
            right: {
              name: secureTextEntry.password ? 'eye-closed' : 'eye-opened',
              action: () => {
                setSecureTextEntry({
                  ...secureTextEntry,
                  password: !secureTextEntry.password,
                });
              },
            },
          }}
        />
        <Spacer size={50} />
        <View style={{alignItems: 'center'}}>
          <View style={{width: '100%', justifyContent: 'center'}}>
            <Button
              onPress={handleOnProceed}
              text="Reset Password"
              bgColor={primary}
              containerStyle={{backgroundColor: primary, borderRadius: 5}}
              // loading={isLoading}
            />
          </View>
        </View>
        {/* <Spacer size={228} /> */}
        <Modal animationType="slide" transparent={true} visible={showSuccess}>
          <View style={styles.modal}>
            <View>
              <View style={styles.modalBody}>
                <View style={styles.modalTitle}>
                  <Icon name="successIcon" color="transparent" />
                  {/* <SuccessIcon /> */}
                  <Spacer size={40} />
                  <View>
                    <CustomText style={styles.ModalTitleText}>
                      Password Changed!
                    </CustomText>
                  </View>
                  <Spacer size={30} />
                  <View style={{width: '60%'}}>
                    <CustomText
                      style={{
                        textAlign: 'center',
                        fontFamily: 'Inter-Regular',
                        fontSize: 15,
                        color: '#8F959E',
                        lineHeight: 22.5,
                      }}>
                      Your password has been changed successfully.
                    </CustomText>
                  </View>
                </View>
                {/* <Spacer size={30} /> */}
                <Spacer size={50} />
                <View style={{alignItems: 'center'}}>
                  <View style={{width: '90%', justifyContent: 'center'}}>
                    <Button
                      onPress={handleOnClick}
                      text="Ok, got it"
                      bgColor={primary}
                      containerStyle={{
                        backgroundColor: primary,
                        borderRadius: 5,
                      }}
                      // loading={isLoading}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </ImageBackground>
  );
};

export default CreateNewPassword;
