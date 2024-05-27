import React, {useState} from 'react';
import Wrapper from '@/components/layout/Wrapper';
import {Icon} from '@/assets/svg/Icon';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Spacer from '@/components/layout/Spacer';
import {PrivateNavigationProps} from '@/navigation/types';
import CustomText from '@/components/typography/CustomText';
import Tabs from '@/components/layout/Tabs';
import CustomInput from '@/components/layout/CustomInput';
import CustomButton from '@/components/layout/CustomButton';
import {useCustomTheme} from '@/store/settings/theme/hook';
import {Formik, FormikHelpers} from 'formik';
import {changePasswordSchema} from '@/utils/settings/security.schema';
import ErrorText from '@/components/typography/ErrorText';
import {useChangePasswordMutation} from '@/services/changePassword/service';

const personalInfo = [
  {title: 'Bolanle', text: 'Bolanle'},
  {title: 'Last Name', text: 'Tyson'},
  {title: 'Email Address', text: 'bolanle.tyson@sample.com'},
  {title: 'Phone number', text: '+234 0834 4567 672'},
  {title: 'Gender', text: 'Female'},
  {title: 'BVN', text: '23456789045'},
];

const PersonalSettings = ({
  navigation,
}: PrivateNavigationProps<'PersonalSettings'>) => {
  const {
    fonts,
    colors: {
      settings: {
        header: {color: headerColor},
        group: {border, background},
        settingsTile: {title, text},
        icons: iconColor,
        input: {label},
        resetPassword,
        instructions,
      },
    },
  } = useCustomTheme();

  const [changePassword, {data, isLoading}] = useChangePasswordMutation();

  const initialValues = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  const [secureTextEntry, setSecureTextEntry] = useState({
    old: true,
    new: true,
    confirm: true,
  });

  // const showToast = (data: string) => {
  //   Toast.show({
  //     type: 'error',
  //     text1: 'Login Error',
  //     text2: `${data} 👋`,
  //   });
  // };

  const handleOnSubmit = async (
    values: typeof initialValues,
    {setSubmitting}: FormikHelpers<typeof initialValues>,
  ) => {
    try {
      if (isLoading) {
        return;
      }
      setSubmitting(true);
      console.log('Here', values);
      const result = await changePassword({
        currentPassword: values.oldPassword,
        newPassword: values.newPassword,
      }).unwrap();
      if (result.isSuccess === true) {
        console.log(result);
      } else {
        // showToast(data.error);
      }
    } catch (error) {
      console.log(error);
      // showToast('Error changing password');
      throw error;
    }
  };

  return (
    <Wrapper type="settings">
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.goBack();
        }}>
        <Icon name="arrow-back" color={iconColor} />
      </TouchableWithoutFeedback>
      <Spacer size={10} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Spacer size={11.99} />
        <CustomText
          style={[styles.headerText, fonts.header, {color: headerColor}]}>
          Personal settings
        </CustomText>
        <Spacer size={26} />
        <Tabs
          tabs={[
            {
              title: 'Biodata',
              content: (
                <>
                  <View>
                    {personalInfo.map(({title: titleText, text: subText}) => (
                      <>
                        <View
                          style={[
                            styles.group,
                            {borderColor: border, backgroundColor: background},
                          ]}>
                          <CustomText
                            style={[
                              fonts.personalSettingsTile.title,
                              {color: title},
                            ]}>
                            {titleText}
                          </CustomText>
                          <CustomText
                            style={[
                              fonts.personalSettingsTile.text,
                              {color: text},
                            ]}>
                            {subText}
                          </CustomText>
                        </View>
                        <Spacer size={9} />
                      </>
                    ))}
                    <Spacer size={100} />
                  </View>
                </>
              ),
            },
            {
              title: 'Password',
              content: (
                <>
                  <View>
                    <CustomText
                      style={[{color: instructions}, fonts.instructions]}>
                      Change your current password
                    </CustomText>
                    <Spacer size={20} />
                    <Formik
                      initialValues={initialValues}
                      validationSchema={changePasswordSchema}
                      onSubmit={handleOnSubmit}>
                      {({
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        values,
                        errors,
                        touched,
                        isSubmitting,
                      }) => (
                        <>
                          <CustomText
                            style={[{color: label}, fonts.input.label]}>
                            Old Password
                          </CustomText>
                          <Spacer size={6} />
                          <CustomInput
                            secureTextEntry={secureTextEntry.old}
                            placeholder="Enter old Password"
                            value={values.oldPassword}
                            onChangeText={handleChange('oldPassword')}
                            onBlur={handleBlur('oldPassword')}
                            icon={{
                              left: {name: 'padlock', color: 'transparent'},
                              right: {
                                name: secureTextEntry.old
                                  ? 'eye-closed'
                                  : 'eye-opened',
                                action: () => {
                                  setSecureTextEntry({
                                    ...secureTextEntry,
                                    old: !secureTextEntry.old,
                                  });
                                },
                              },
                            }}
                          />
                          <ErrorText
                            error={errors.oldPassword}
                            touched={touched.oldPassword}
                          />
                          <Spacer size={20} />
                          <CustomText
                            style={[{color: label}, fonts.input.label]}>
                            New Password
                          </CustomText>
                          <Spacer size={6} />
                          <CustomInput
                            secureTextEntry={secureTextEntry.new}
                            placeholder="Enter new password"
                            icon={{
                              left: {name: 'padlock', color: 'transparent'},
                              right: {
                                name: secureTextEntry.new
                                  ? 'eye-closed'
                                  : 'eye-opened',
                                action: () => {
                                  setSecureTextEntry({
                                    ...secureTextEntry,
                                    new: !secureTextEntry.new,
                                  });
                                },
                              },
                            }}
                            value={values.newPassword}
                            onChangeText={handleChange('newPassword')}
                            onBlur={handleBlur('newPassword')}
                          />
                          <ErrorText
                            error={errors.newPassword}
                            touched={touched.newPassword}
                          />
                          <Spacer size={20} />
                          <CustomText
                            style={[{color: label}, fonts.input.label]}>
                            Confirm New Password
                          </CustomText>
                          <Spacer size={6} />
                          <CustomInput
                            secureTextEntry={secureTextEntry.confirm}
                            placeholder="Confirm new password"
                            icon={{
                              left: {name: 'padlock', color: 'transparent'},
                              right: {
                                name: secureTextEntry.confirm
                                  ? 'eye-closed'
                                  : 'eye-opened',
                                action: () => {
                                  setSecureTextEntry({
                                    ...secureTextEntry,
                                    confirm: !secureTextEntry.confirm,
                                  });
                                },
                              },
                            }}
                            value={values.confirmPassword}
                            onChangeText={handleChange('confirmPassword')}
                            onBlur={handleBlur('confirmPassword')}
                          />
                          <ErrorText
                            error={errors.confirmPassword}
                            touched={touched.confirmPassword}
                          />
                          <Spacer size={8} />
                          {/* <TouchableWithoutFeedback
                            onPress={() => {
                              navigation.navigate('Question');
                            }}>
                            <CustomText
                              style={[
                                {color: resetPassword},
                                fonts.resetPassword,
                              ]}>
                              Reset Password
                            </CustomText>
                          </TouchableWithoutFeedback> */}
                          <Spacer size={39} />
                          <CustomButton
                            onPress={() => handleSubmit()}
                            text={
                              isLoading ? 'Please wait...' : 'Change Password'
                            }
                            type="settings"
                          />
                        </>
                      )}
                    </Formik>
                  </View>
                  <Spacer size={200} />
                </>
              ),
            },
          ]}
        />
      </ScrollView>
    </Wrapper>
  );
};

export default PersonalSettings;

const styles = StyleSheet.create({
  headerText: {
    fontWeight: '700',
    color: 'white',
    fontSize: 24,
    lineHeight: 32.74,
  },
  group: {
    borderWidth: 1,
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 0},
    padding: 10.31,
    paddingHorizontal: 14,
    justifyContent: 'center',
    borderRadius: 16,
  },
  modalView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: 'rgba(0,0,0,.5)',
  },
  currency: {
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
    // alignSelf: 'flex-start',
  },
  accountTile: {
    padding: 13,
    borderRadius: 10,
    marginBottom: 13,
  },
  flex: {
    flexDirection: 'row',
  },
  titleBox: {marginLeft: 9, justifyContent: 'center'},
  accountBox: {alignSelf: 'flex-end'},
});
