import React, {ReactNode} from 'react';
import {Icon} from '@/assets/svg/Icon';
import {
  View,
  TouchableWithoutFeedback,
  TextProps,
  ViewProps,
} from 'react-native';

import {useCustomTheme} from '@/store/settings/theme/hook';
import CustomText from '../typography/CustomText';
import Spacer from './Spacer';

const Radio = ({
  list,
  fontStyle = {},
  style,
  radioColor = {active: 'white', inactive: 'white'},
  activeIndex,
}: {
  list: {
    text: ReactNode | string;
    action: () => void;
    extraInfo?: string;
  }[];
  fontStyle?: TextProps['style'];
  style?: ViewProps['style'];
  radioColor?: {active: string; inactive: string};
  activeIndex?: number;
}) => {
  const {
    fonts,
    colors: {
      bills: {
        input: {
          radio: {text: radioTextColor},
        },
      },
    },
  } = useCustomTheme();
  return (
    <View>
      {list.map(({text, action, extraInfo = ''}, index) => (
        <>
          <TouchableWithoutFeedback onPress={action}>
            <View style={[{flexDirection: 'row', alignItems: 'center'}, style]}>
              <Icon
                name="radio-circle-empty"
                color={
                  activeIndex === index
                    ? radioColor.active
                    : radioColor.inactive
                }
              />
              <Spacer size={5} />
              {typeof text === 'string' ? (
                <CustomText
                  style={[{color: radioTextColor}, fonts.normal, fontStyle]}>
                  {text}{' '}
                  <CustomText style={fonts.radio.extraInfo}>
                    {extraInfo}
                  </CustomText>
                </CustomText>
              ) : (
                text
              )}
            </View>
          </TouchableWithoutFeedback>
          <Spacer size={16} />
        </>
      ))}
    </View>
  );
};

export default Radio;
