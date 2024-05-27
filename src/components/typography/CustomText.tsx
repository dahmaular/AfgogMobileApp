import {fontStyles} from '@/store/settings/theme/modes';
import * as React from 'react';
import {Text, StyleSheet, TextProps} from 'react-native';

const result = (data: any) => {
  if (Array.isArray(data)) {
    const nobj = data.reduce((acc, curr) => {
      if (curr.fontWeight) {
        acc.fontWeight = curr.fontWeight;
        acc.fontStyle = curr.fontStyle;
      }
      return acc;
    }, {});
    if (nobj.fontStyle === 'italic') {
      return `${nobj.fontWeight}-italics`;
    }
    return nobj?.fontWeight;
  }
  if (typeof data === 'object') {
    if (data?.fontStyle === 'italic') {
      return `${data.fontWeight}-italics`;
    }
    return data?.fontWeight;
  }
  return '400';
};

const CustomText = ({
  children,
  style,
  ...rest
}: TextProps & React.PropsWithChildren) => {
  return (
    <Text
      {...rest}
      style={[
        styles.text,
        style,
        {fontFamily: fontStyles[result(style)], fontWeight: undefined},
      ]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Inter-Regular',
    fontWeight: '400',
  },
});

export default CustomText;
