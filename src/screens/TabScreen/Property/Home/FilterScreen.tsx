import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import React, {useState} from 'react';
import Header from '@/components/Header';
import {carton, primary, secondary, white} from '@/theme/colorPatte';
import Spacer from '@/components/layout/Spacer';
import {categories} from './index';
import {Divider} from 'react-native-paper';
import {Icon} from '@/assets/svg/Icon';
import CheckBox from '@react-native-community/checkbox';
import Button from '@/components/Button/button';
import {PropertyHomeNavigationProps} from '@/navigation/types';

const FilterScreen = ({
  navigation,
}: PropertyHomeNavigationProps<'FilterScreen'>) => {
  const [showRental, setShowRental] = useState<boolean>(true);
  const [showSales, setShowSales] = useState<boolean>(false);
  const [isGarage, setGarage] = useState(false);
  const [isParking, setParking] = useState(false);
  const [isWifi, setWifi] = useState(false);

  const handleOnSubmit = async () => {
    navigation.navigate('HomeScreen');
  };

  return (
    <View style={styles.container}>
      <Spacer size={20} />
      <Header hasBackIcon title="Filter Property" />
      {/* <Spacer size={30} /> */}
      {/* <View style={styles.toggle}>
        <TouchableWithoutFeedback
          onPress={() => {
            setShowRental(!showRental), setShowSales(!showSales);
          }}>
          <View style={showRental ? styles.activeCard : styles.inactiveCard}>
            <Text style={styles.toggleText}>For Rent</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            setShowRental(!showRental), setShowSales(!showSales);
          }}>
          <View style={showSales ? styles.activeCard : styles.inactiveCard}>
            <Text style={styles.toggleText}>For Sale</Text>
          </View>
        </TouchableWithoutFeedback>
      </View> */}
      <Spacer size={30} />
      <Divider />
      <Spacer size={10} />
      <View>
        <Text style={styles.label}>Property Type</Text>
        <Spacer size={20} />
        <View style={styles.category}>
          {categories.map(category => (
            <View
              style={{
                paddingHorizontal: 7,
                padding: 3,
                borderRadius: 60,
                borderWidth: 0.5,
                borderColor: primary,
                marginHorizontal: 5,
              }}
              key={category.id}>
              <Text style={styles.catText}>{category.title}</Text>
            </View>
          ))}
        </View>
      </View>
      <Spacer size={20} />
      <Divider />
      <Spacer size={20} />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View style={{alignItems: 'center', width: '35%'}}>
          <Text style={styles.label}>Rooms</Text>
          <Spacer size={10} />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableWithoutFeedback>
              <Icon name="chevronUp" />
            </TouchableWithoutFeedback>
            <Spacer size={5} />
            <Text style={styles.catText}>3</Text>
            <Spacer size={5} />
            <TouchableWithoutFeedback>
              <Icon name="chevronUp" />
            </TouchableWithoutFeedback>
          </View>
        </View>
        <Spacer size={5} />
        <View style={{alignItems: 'center', width: '35%'}}>
          <Text style={styles.label}>Bathrooms</Text>
          <Spacer size={10} />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableWithoutFeedback>
              <Icon name="chevronUp" />
            </TouchableWithoutFeedback>
            <Spacer size={5} />
            <Text style={styles.catText}>3</Text>
            <Spacer size={5} />
            <TouchableWithoutFeedback>
              <Icon name="chevronUp" />
            </TouchableWithoutFeedback>
          </View>
        </View>
        <Spacer size={5} />
        <View style={{alignItems: 'center', width: '35%'}}>
          <Text style={styles.label}>Sitting Rooms</Text>
          <Spacer size={10} />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableWithoutFeedback>
              <Icon name="chevronUp" />
            </TouchableWithoutFeedback>
            <Spacer size={5} />
            <Text style={styles.catText}>3</Text>
            <Spacer size={5} />
            <TouchableWithoutFeedback>
              <Icon name="chevronUp" />
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
      <Spacer size={15} />
      <Divider />
      <Spacer size={15} />
      <View>
        <>
          <Text style={styles.label}>Amenities</Text>
          <Spacer size={10} />
          <View style={styles.amenities}>
            <Text style={styles.catText}>Garage</Text>
            <CheckBox
              disabled={false}
              value={isGarage}
              onValueChange={newValue => {
                setGarage(newValue);
              }}
              tintColors={{true: primary, false: carton}}
              onCheckColor={secondary}
              onTintColor={secondary}
            />
          </View>
          <View style={styles.amenities}>
            <Text style={styles.catText}>Parking space</Text>
            <CheckBox
              disabled={false}
              value={isParking}
              onValueChange={newValue => {
                setParking(newValue);
              }}
              tintColors={{true: primary, false: carton}}
              onCheckColor={secondary}
              onTintColor={secondary}
            />
          </View>
          <View style={styles.amenities}>
            <Text style={styles.catText}>Wifi</Text>
            <CheckBox
              disabled={false}
              value={isWifi}
              onValueChange={newValue => {
                setWifi(newValue);
              }}
              tintColors={{true: primary, false: carton}}
              onCheckColor={secondary}
              onTintColor={secondary}
            />
          </View>
        </>
      </View>
      <Spacer size={30} />
      <Button
        onPress={handleOnSubmit}
        text="Save Filter"
        bgColor={primary}
        containerStyle={{backgroundColor: primary}}
        // loading={isLoading}
      />
    </View>
  );
};

export default FilterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    paddingHorizontal: 10,
  },
  toggle: {
    backgroundColor: primary,
    width: '100%',
    height: 41,
    borderRadius: 52,
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleCard: {
    width: '45%',
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleText: {
    color: '#00000099',
    fontFamily: 'AirbnbCereal_W_Bk',
    fontWeight: '700',
    lineHeight: 14.52,
    fontSize: 14,
  },
  activeCard: {
    backgroundColor: white,
    width: '50%',
    height: 39,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  inactiveCard: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    height: 41,
    borderRadius: 10,
  },
  category: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
  },
  label: {
    color: '#000000',
    fontFamily: 'AirbnbCereal_W_Bd',
    fontWeight: '700',
    lineHeight: 14.52,
    fontSize: 14,
  },
  amenities: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  catText: {
    fontFamily: 'AirbnbCereal_W_Md',
    color: '#000000',
    fontSize: 13,
    fontWeight: '500',
  },
});
