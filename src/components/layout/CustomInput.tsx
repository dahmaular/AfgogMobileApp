import * as React from 'react';
import {
  StyleSheet,
  TextInputProps,
  TextInput,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import {Icon} from '../../assets/svg/Icon';
import {IconPackType} from '../../assets/svg/iconPack';
import {CustomThemeType} from '../../store/settings/theme/modes';
import {ViewProps} from 'react-native';
import CustomText from '../typography/CustomText';

type IconType = {
  name: IconPackType;
  color?: string;
  size?: keyof CustomThemeType['iconSizes'];
  action?: () => void;
};

const CustomInput = (
  props: {
    icon?: {
      left?: IconType | string;
      right?: IconType | string;
      containerStyle?: ViewProps['style'];
    };
  } & TextInputProps,
) => {
  return (
    <View
      style={[
        styles.flex,
        // {backgroundColor: props?.style?.backgroundColor || '#FBFBFB'},
      ]}>
      {props?.icon?.left && (
        <View
          style={{
            justifyContent: 'center',
            padding: 10,
          }}>
          {typeof props.icon.left === 'string' ? (
            <CustomText>{props.icon.left}</CustomText>
          ) : (
            <TouchableWithoutFeedback
              onPress={() => {
                if (!props?.icon?.left?.action) {
                  return;
                }
                props?.icon?.left?.action();
              }}>
              <View>
                <Icon
                  name={props.icon.left.name}
                  color={props.icon.left.color}
                  size={props.icon.left.size}
                />
              </View>
            </TouchableWithoutFeedback>
          )}
        </View>
      )}
      <TextInput {...props} style={[styles.input, {...props.style}]} />
      {props.icon?.right && (
        <View style={{justifyContent: 'center', padding: 10}}>
          {typeof props.icon?.right === 'string' ? (
            <CustomText>{props.icon.right}</CustomText>
          ) : (
            <TouchableWithoutFeedback
              onPress={() => {
                if (!props?.icon?.right?.action) {
                  return;
                }
                props?.icon?.right?.action();
              }}>
              <View>
                <Icon
                  name={props.icon?.right?.name}
                  color={props.icon?.right?.color}
                  size={props.icon?.right?.size}
                />
              </View>
            </TouchableWithoutFeedback>
          )}
        </View>
      )}
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  input: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    minWidth: 200,
    width: '88%',
    flex: 1,
    fontFamily: 'Nunito',
    color: '#000',
  },
  flex: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E1E1E1',
    backgroundColor: '#FBFBFB',
    flexDirection: 'row',
  },
});
