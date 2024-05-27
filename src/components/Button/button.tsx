import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ActivityIndicator,
  ViewProps,
} from 'react-native';
import React from 'react';
import {white} from '@/theme/colorPatte';

const {height} = Dimensions.get('window');
interface ButtonProps {
  text: string | JSX.Element;
  onPress?: () => void;
  bgColor?: string;
  radioButton?: boolean;
  icon?: JSX.Element;
  borderColor?: string;
  textColor?: string;
  rightIcon?: JSX.Element;
  loading?: boolean;
  containerStyle?: ViewProps['style'];
}

const Button = ({
  text,
  onPress,
  bgColor,
  radioButton = false,
  icon,
  borderColor,
  textColor,
  rightIcon,
  loading,
  containerStyle,
}: ButtonProps) => {
  return (
    <View style={styles.container}>
      {!radioButton && (
        <TouchableOpacity
          style={[styles.btn, containerStyle]}
          onPress={onPress}>
          {loading ? (
            <ActivityIndicator animating color={white} size={'small'} />
          ) : (
            <Text style={styles.btnText}>{text}</Text>
          )}
          {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
        </TouchableOpacity>
      )}
      {radioButton && (
        <TouchableOpacity
          style={
            bgColor
              ? [
                  styles.btn,
                  {
                    backgroundColor: bgColor,
                    justifyContent: 'flex-start',
                    paddingHorizontal: 10,
                    borderColor: borderColor,
                  },
                ]
              : styles.btn
          }
          onPress={onPress}>
          <TouchableOpacity style={styles.icon}>{icon}</TouchableOpacity>
          <Text style={[styles.btnText, {color: textColor}]}>{text}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    alignContent: 'center',
    height: height / 13,
    width: '100%',
    borderRadius: 15,
    justifyContent: 'center',
    // borderColor: BANCAWHITE,
    // borderWidth: 1,
  },
  btnText: {
    fontFamily: 'Nunito-Regular',
    fontSize: 18,
    color: '#fff',
    lineHeight: 20,
    fontWeight: '500',
  },
  icon: {
    marginRight: 10,
  },
  rightIcon: {
    marginLeft: 10,
  },
});
