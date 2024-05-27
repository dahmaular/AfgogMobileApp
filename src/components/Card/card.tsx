import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from './styles';
import WhiteDot from '@/assets/svg/bgWhite.svg';

interface CardProps {
  title: string;
  icon?: JSX.Element;
  bgColor?: string;
  height?: string | number;
  width?: string | number;
  onPress?: () => void;
  type?: string;
}

const Card = ({
  title,
  icon,
  bgColor,
  height,
  width,
  type = 'login',
  onPress,
}: CardProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.card, {backgroundColor: bgColor, height, width}]}>
      {type === 'account' && (
        <View style={styles.dot}>
          <WhiteDot />
        </View>
      )}
      {icon && <View style={styles.icon}>{icon}</View>}
      <Text style={styles.cardTitle}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Card;
