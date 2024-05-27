import {Image, ImageSourcePropType, StyleSheet, View} from 'react-native';
import React from 'react';
import Spacer from '../layout/Spacer';
import CustomText from '../typography/CustomText';
import {Icon} from '@/assets/svg/Icon';

type OrderProps = {
  image: ImageSourcePropType;
  name: string;
  status?: string;
  date?: string;
  type?: string;
  amount?: string;
};

const OrderCard = ({
  image,
  status,
  date,
  name,
  type = 'order',
  amount,
}: OrderProps) => {
  return (
    <View>
      <View style={styles.orderCard}>
        <View style={styles.card}>
          <View>
            <Image
              source={image}
              style={{
                width: 94,
                height: 106,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
              }}
            />
          </View>
          <Spacer size={20} />

          <View style={{width: '50%', height: '100%'}}>
            {type !== 'order' && <Spacer size={20} />}
            <View>
              <CustomText style={{color: '#000'}}>{name}</CustomText>
            </View>
            <Spacer size={10} />
            {type !== 'order' && (
              <>
                <CustomText
                  style={{
                    color: '#949494',
                    fontFamily: 'Inter-Regular',
                    fontWeight: '600',
                    fontSize: 12,
                    lineHeight: 14.5,
                  }}>
                  {amount}
                </CustomText>
                <Spacer size={10} />
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '70%',
                    justifyContent: 'space-between',
                  }}>
                  <Icon name="chevronDown" color="#fff" />
                  <CustomText
                    style={{
                      color: '#949494',
                      fontFamily: 'Inter-Regular',
                      fontWeight: '600',
                      fontSize: 12,
                      lineHeight: 14.5,
                    }}>
                    1
                  </CustomText>
                  <Icon name="chevronUp" color="#fff" />
                </View>
              </>
            )}
            <CustomText style={{color: '#5B826D'}}>{status}</CustomText>
            <Spacer size={10} />
            <CustomText style={{color: '#000'}}>{date}</CustomText>
          </View>
        </View>
      </View>
    </View>
  );
};

export default OrderCard;

const styles = StyleSheet.create({
  orderCard: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    height: 122,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    width: '95%',
  },
});
