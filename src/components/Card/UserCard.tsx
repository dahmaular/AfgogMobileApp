import React from 'react';
import {Dimensions, ImageBackground, StyleSheet, View} from 'react-native';
import CustomText from '../typography/CustomText';
import Spacer from '../layout/Spacer';

type ItemType = {
  imageBackground?: number;
  accountName?: string;
  accountNumber?: string;
  currency?: string;
  availableBalance?: string;
  cardType: string;
  accountType?: string;
};

const {width} = Dimensions.get('screen');

const UserCard = ({
  accountName,
  accountNumber,
  availableBalance,
  imageBackground,
  currency,
  cardType,
  accountType,
}: ItemType) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="cover"
        source={imageBackground!}
        style={styles.imageBg}>
        <View style={styles.content}>
          <View>
            <View style={styles.nameRow}>
              <View style={{width: width / 2}}>
                <CustomText style={styles.accountName}>
                  {accountName}
                </CustomText>
              </View>
              {/* <View style={styles.typeView}>
                <CustomText style={styles.cardType}>{cardType}</CustomText>
              </View> */}
            </View>
            <Spacer size={40} />
            <View>
              <View style={styles.accountContent}>
                <CustomText style={styles.accountNumber}>
                  {accountType}
                </CustomText>
              </View>
            </View>
            <Spacer size={10} />
            <View>
              <View style={styles.accountContent}>
                <CustomText style={styles.accountNumber}>
                  {accountNumber}
                </CustomText>
              </View>
            </View>

            <View style={styles.amountView}>
              <View style={styles.amountContent}>
                <CustomText style={styles.currency}>
                  {currency}
                  <>
                    <CustomText style={styles.currency}>
                      {availableBalance}
                    </CustomText>
                  </>
                </CustomText>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default UserCard;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    // overflow: 'hidden',
  },
  imageBg: {
    width: 300,
    height: 185,
    marginRight: 20,
  },
  content: {
    marginTop: 15,
    padding: 10,
    paddingHorizontal: 10,
  },
  nameRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  accountName: {
    fontFamily: 'Inter-Regular',
    fontSize: 15,
    color: '#000000',
    fontWeight: '500',
    lineHeight: 16.5,
    // ellipsizeMode: 'tail',
    // numberOfLines: 1,
  },
  typeView: {alignItems: 'flex-end'},
  cardType: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: 'white',
    // numberOfLines: 1,
  },
  amountView: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 5,
  },
  amountContent: {
    flexDirection: 'row',
    minWidth: '41%',
    paddingHorizontal: 20,
  },
  currency: {
    color: '#FEFEFE',
    fontWeight: '600',
    fontFamily: 'Inter-Regular',
    fontSize: 15,
  },
  accountNumber: {
    color: 'white',
    fontWeight: '400',
    fontFamily: 'Inter-Regular',
    fontSize: 13,
    lineHeight: 14.3,
  },
  accountView: {
    // margin: 20,
    marginTop: 50,
  },
  accountContent: {
    width: '100%',
    paddingHorizontal: 20,
  },
});
