import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React from 'react';
import {Icon} from '@/assets/svg/Icon';
import Spacer from '../layout/Spacer';
import CustomText from '../typography/CustomText';
import {FormatAmount} from '../layout/AmountFormat';

interface CardProps {
  name: string;
  image?: string;
  onPress?: () => void;
  location?: string;
  price?: string;
  sold?: string;
}

const PropertyCard = (props: CardProps) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.card}>
      <Spacer size={5} />
      <View style={{flexDirection: 'row', alignItems: 'center', width: '100%'}}>
        <Image source={{uri: props.image}} style={styles.image} />
        <Spacer size={10} />
        <View style={{width: '50%'}}>
          <View style={styles.name}>
            <Text style={styles.cardTitle}>{props.name}</Text>
          </View>
          <Spacer size={10} />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name="locationGreen" color="#fff" />
            <Spacer size={5} />
            <CustomText style={[styles.price, {color: '#5B826D'}]}>
              {props.location}
            </CustomText>
          </View>
          <Spacer size={10} />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <CustomText style={styles.price}>
              {FormatAmount(Number(props.price))} / Annually
            </CustomText>
          </View>
          <Spacer size={10} />
          {/* <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Icon name="bath" color="#fff" />
            <Spacer size={5} />
            <CustomText style={styles.price}>3 </CustomText>
            <Spacer size={5} />
            <Icon name="bed" />
            <Spacer size={5} />
            <CustomText style={styles.price}>3 </CustomText>
          </View> */}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PropertyCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 5,
    paddingHorizontal: 10,
    // width: '100%',
    height: 130,
    elevation: 5,
  },
  cardTitle: {
    fontFamily: 'AirbnbCereal_W_Bk',
    color: '#000000',
    lineHeight: 16,
    fontWeight: '700',
    fontSize: 12,
  },
  icon: {
    marginTop: 9,
  },
  price: {
    color: '#00000099',
    fontFamily: 'AirbnbCereal_W_Bk',
    fontWeight: '600',
    lineHeight: 14.52,
    fontSize: 12,
  },
  sold: {
    alignItems: 'center',
  },
  ellipse: {
    position: 'absolute',
    right: 5,
  },
  name: {
    width: '50%',
    // justifyContent: 'space-between',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
  image: {
    width: '50%',
    height: 110,
    alignItems: 'center',
    borderRadius: 10,
  },
});
