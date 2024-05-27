import React, {useEffect, useState} from 'react';
import {Icon} from '@/assets/svg/Icon';
import {
  Image,
  Linking,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import Spacer from '@/components/layout/Spacer';
import {PrivateNavigationProps} from '@/navigation/types';
import CustomText from '@/components/typography/CustomText';
import {styles} from './styles';

import userImage from '@/assets/image/user.png';
import Button from '@/components/Button/button';
import {primary} from '@/theme/colorPatte';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@/store';
import {logout} from '@/services/auth/slice';
import {useProfileUpdateMutation} from '@/services/profile/service';

const Settings = ({navigation}: PrivateNavigationProps<'Settings'>) => {
  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');

  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user.authData);

  const [profileUpdate, {isLoading}] = useProfileUpdateMutation();

  const handleOnUpdate = async () => {
    try {
      if (
        fullName !== '' ||
        phone !== '' ||
        fullName !== user.fullName ||
        phone !== user.phone
      ) {
        const update = await profileUpdate({
          fullName,
          phone,
          userId: user._id,
        }).unwrap();

        console.log(update);
      } else {
        console.log('Same data or empty');
      }
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    setFullName(user?.fullName);
    setPhone(user?.phone);
  }, [user]);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerView}>
          <Spacer size={30} />
          <View
            style={{
              flexDirection: 'row',
              // justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={navigation.goBack} style={styles.icon}>
                <Icon name="backArrowWhite" color="white" />
              </TouchableOpacity>
            </View>
            <View style={styles.titleView}>
              <CustomText style={styles.title}>Account information</CustomText>
            </View>
          </View>
        </View>

        <Spacer size={20} />
        <View style={styles.userData}>
          <View style={{borderRadius: 50}}>
            <Image
              source={userImage}
              style={{
                width: 98,
                height: 98,
              }}
            />
          </View>
          <Spacer size={10} />
          <View style={{alignItems: 'center'}}>
            <CustomText style={[styles.userDataText, {color: '#000'}]}>
              {user?.fullName}
            </CustomText>
            <Spacer size={10} />
            <CustomText
              style={[
                styles.userDataText,
                {color: '#00000099', fontWeight: '300'},
              ]}>
              {user.phone}
            </CustomText>
            <Spacer size={10} />
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon name="email1" />
              <Spacer size={5} />
              <CustomText
                style={[
                  styles.userDataText,
                  {color: '#00000099', fontWeight: '300'},
                ]}>
                {user.email}
              </CustomText>
            </View>
          </View>
        </View>

        <Spacer size={40} />

        <View style={styles.form}>
          <Spacer size={20} />
          <View style={[styles.inputView]}>
            <TextInput
              style={styles.textInput}
              placeholder="Full Name"
              keyboardType="default"
              placeholderTextColor="#555555"
              value={fullName}
              onChangeText={e => setFullName(e)}
            />
          </View>
          <Spacer size={20} />
          {/* <View style={styles.inputView}>
            <TextInput
              style={styles.textInput}
              placeholder="Last Name"
              keyboardType="default"
              placeholderTextColor="#555555"
              value={lname}
              onChangeText={e => setLname(e)}
            />
          </View>
          <Spacer size={20} /> */}
          <View style={styles.inputView}>
            <TextInput
              style={styles.textInput}
              placeholder="Phone Number"
              keyboardType="default"
              placeholderTextColor="#555555"
              value={phone}
              onChangeText={e => setPhone(e)}
            />
          </View>
          <Spacer size={30} />

          <View style={{alignItems: 'center'}}>
            <View style={{width: '90%'}}>
              <Button
                onPress={handleOnUpdate}
                text="Update Profile"
                bgColor={primary}
                containerStyle={{backgroundColor: primary, height: 47}}
                loading={isLoading}
              />
            </View>
          </View>
        </View>
        <Spacer size={20} />
        <View style={{height: 5, width: '100%', backgroundColor: '#fff'}} />
        <Spacer size={20} />
        <View style={{paddingHorizontal: 10}}>
          <TouchableOpacity style={[styles.textInput, styles.switchView]}>
            <CustomText style={styles.helpText}>Change Password</CustomText>
            {/* <ChevronRight /> */}
            <Icon name="chevronArrow" color="white" />
          </TouchableOpacity>
          <Spacer size={20} />
          <TouchableOpacity
            style={[styles.textInput, styles.switchView]}
            onPress={() =>
              Linking.openURL('https://wa.me/message/BTOH26GKWY3UO1')
            }>
            <CustomText style={styles.helpText}>Talk to us</CustomText>
            {/* <ChevronRight /> */}
            <Icon name="chevronArrow" color="white" />
          </TouchableOpacity>
          <Spacer size={20} />
          <TouchableOpacity
            style={[styles.textInput, styles.switchView]}
            onPress={() => dispatch(logout())}>
            <CustomText style={[styles.helpText, {color: '#FF5757'}]}>
              Log Out
            </CustomText>
          </TouchableOpacity>
          <Spacer size={30} />
        </View>
      </ScrollView>
    </View>
  );
};

export default Settings;
