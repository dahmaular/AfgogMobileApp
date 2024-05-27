import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {styles} from './styles';
import {Icon} from '@/assets/svg/Icon';
import Spacer from '../layout/Spacer';
import CustomText from '../typography/CustomText';

interface CardProps {
  name: string;
  image?: string;
  onPress?: () => void;
  rating?: string;
  price?: string;
  sold?: string;
}

const ProductCard = ({
  name,
  image,
  rating,
  price,
  sold,
  onPress,
}: CardProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <View>
        <Image
          source={{uri: image}}
          style={{width: 130, height: 130, alignItems: 'center'}}
        />
      </View>
      <View style={styles.name}>
        <Text style={styles.cardTitle}>{name}</Text>
        <View style={styles.rating}>
          <Icon name="ratingStar" color="white" />
          <Text style={styles.cardTitle}>{rating}</Text>
        </View>
      </View>
      <Spacer size={10} />
      <View>
        <CustomText style={styles.price}>{price}</CustomText>
      </View>
      <Spacer size={10} />
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity>
          <Icon name="wishIcon" color="white" />
        </TouchableOpacity>
        <Spacer size={7} />
        <TouchableOpacity>
          <Icon name="cartWhite" color="white" />
        </TouchableOpacity>
        <Spacer size={10} />
        <View style={styles.sold}>
          <CustomText>{sold}</CustomText>
        </View>
        <View style={styles.ellipse}>
          <Icon name="verticalEllipse" color="white" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;
