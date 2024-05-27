import * as React from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  GestureResponderEvent,
  ViewProps,
} from 'react-native';
import CustomText from '../typography/CustomText';
import {useCustomTheme} from '../../store/settings/theme/hook';
import {CustomThemeType} from '../../store/settings/theme/modes';

interface CustomButtonProps {
  onPress: (event: GestureResponderEvent) => void;
  text: string | React.ReactNode;
  borderless?: boolean;
  type: keyof CustomThemeType['colors'];
  font?: any;
  containerStyle?: ViewProps['style'];
}

const CustomButton = ({
  onPress,
  text,
  borderless,
  type = 'quickActions',
  font = {},
  containerStyle,
}: CustomButtonProps) => {
  const {colors, fonts} = useCustomTheme();
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={[
          styles.container,
          // eslint-disable-next-line react-native/no-inline-styles
          {
            borderWidth: borderless ? 0 : 1,
            backgroundColor: borderless
              ? 'transparent'
              : colors[type]?.button?.backgroundColor,
            borderColor: colors[type]?.button?.borderColor,
          },
          containerStyle,
        ]}>
        {typeof text !== 'string' && text}
        {typeof text === 'string' && (
          <CustomText
            style={{
              ...fonts?.button?.text,
              ...font,
              color: borderless
                ? colors[type]?.button?.alt
                : colors[type]?.button?.color,
            }}>
            {text}
          </CustomText>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderRadius: 10,
  },
});
