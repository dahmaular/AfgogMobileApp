import React from 'react';
import {
  View,
  TextInput,
  KeyboardTypeOptions,
  ReturnKeyTypeOptions,
  Text,
  TouchableOpacity,
} from 'react-native';
import {styles} from './styles';

interface InputProps {
  placeholder: string;
  icon?: JSX.Element;
  onChangeText?: ((text: string) => void) & Function;
  value?: string;
  rightIcon?: JSX.Element;
  editable?: boolean;
  pinInput?: boolean;
  placeholderColor?: string;
  bgColor?: string;
  secureEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  returnKeyType?: ReturnKeyTypeOptions;
  errorText?: string | boolean;
  isPassword?: JSX.Element;
  iconAction?: () => void;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}

const InputText = ({
  placeholder,
  icon,
  onChangeText,
  value,
  rightIcon,
  editable = true,
  // pinInput = false,
  placeholderColor,
  bgColor,
  keyboardType,
  returnKeyType,
  errorText,
  secureEntry,
  isPassword,
  iconAction,
  autoCapitalize,
}: InputProps) => {
  return (
    <View style={styles.container}>
      <View
        style={
          bgColor
            ? [styles.inputContainer, {backgroundColor: bgColor}]
            : styles.inputContainer
        }>
        {icon && (
          <View
            style={{
              marginTop: 7,
              marginRight: 10,
            }}>
            {icon}
          </View>
        )}
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          onChangeText={onChangeText}
          value={value}
          editable={editable}
          secureTextEntry={secureEntry}
          placeholderTextColor={placeholderColor}
          keyboardType={keyboardType}
          returnKeyType={returnKeyType}
          autoCapitalize={autoCapitalize}
        />
        {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
        {isPassword && (
          <TouchableOpacity onPress={iconAction} style={styles.rightIcon}>
            {isPassword}
          </TouchableOpacity>
        )}
      </View>
      {errorText && <Text style={styles.errorText}>{errorText}</Text>}
    </View>
  );
};

export default InputText;
