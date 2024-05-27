import * as React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {PrivateNavigationProps} from '@/navigation/types';
import Wrapper from './Wrapper';
import {Icon} from '@/assets/svg/Icon';
import Spacer from './Spacer';
import CustomText from '../typography/CustomText';
import CustomButton from './CustomButton';
import {useCustomTheme} from '@/store/settings/theme/hook';

const Success = ({navigation}: PrivateNavigationProps<'Success'>) => {
  const {fonts} = useCustomTheme();
  return (
    <Wrapper>
      <View
        style={{
          height: Dimensions.get('window').height,
          flex: 1,
          justifyContent: 'center',
        }}>
        <View style={{alignItems: 'center'}}>
          <Icon name="success" color="white" />
        </View>
        <Spacer size={20.75} />
        <CustomText
          style={[styles.headerText, fonts.header, {textAlign: 'center'}]}>
          Account opening request received, please check your email for details
        </CustomText>
        <Spacer size={15} />
        <View style={{paddingHorizontal: 15}}>
          <CustomText
            style={[styles.headerText, fonts.normal, {textAlign: 'center'}]}>
            Documents will be reviewed, and account should be active within
            72hours
          </CustomText>
        </View>
        <Spacer size={47} />
        <View style={{paddingHorizontal: 15}}>
          <CustomButton
            onPress={() => {
              navigation.replace('HomeScreen');
            }}
            text="Return to Dashboard"
            type={'quickActions'}
            font={fonts.button}
          />
        </View>
      </View>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  headerText: {
    fontWeight: '700',
    color: 'white',
    fontSize: 24,
    lineHeight: 32.74,
  },
  currency: {
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
    alignSelf: 'flex-start',
  },
  accountTile: {
    padding: 13,
    borderRadius: 10,
    marginBottom: 13,
  },
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Success;
