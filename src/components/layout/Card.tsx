import { View, Text, TouchableOpacity, StyleSheet, TextProps } from 'react-native';
import React from 'react';
import CustomText from '@/components/typography/CustomText';
import Spacer from './Spacer';

interface CardProps {
    title: string;
    icon?: JSX.Element;
    bgColor?: string;
    height?: string | number;
    width?: string | number;
    onPress?: () => void;
    type?: string;
    fontStyle?: TextProps["style"]
}

const Card = ({
    title,
    icon,
    bgColor,
    height,
    width,
    type = 'login',
    onPress,
    fontStyle,
}: CardProps) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.card, { backgroundColor: bgColor, height, width }]}>
            {icon && <View>{icon}</View>}
            <Spacer size={11} />
            <CustomText style={fontStyle}>{title}</CustomText>
        </TouchableOpacity>
    );
};

export default Card;

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'transparent',
        borderRadius: 12,
        padding: 5,
        paddingHorizontal: 16,
        paddingVertical: 14,
        width: 160,
    },
    cardTitle: {
        fontFamily: 'Nunito-Regular',
        lineHeight: 16,
        fontWeight: '700',
        marginTop: 10,
        fontSize: 12,
    }
});