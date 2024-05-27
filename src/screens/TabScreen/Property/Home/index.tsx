import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
// import Header from '@/components/Header';
import Spacer from '@/components/layout/Spacer';
import CustomInput from '@/components/layout/CustomInput';
import {primary, white} from '@/theme/colorPatte';

import apartmentImage from '@/assets/image/apartment.jpg';
import PropertyCard from '@/components/Card/PropertyCard';
import {PropertyHomeNavigationProps} from '@/navigation/types';
import headerBg from '@/assets/image/homeHeaderBg.png';
import {Icon} from '@/assets/svg/Icon';
import {
  useGetPropertyQuery,
  useLazyGetPropertyQuery,
} from '@/services/property/service';
import {PropertyObject} from '@/utils/api-types/authTypes';
import {useSelector} from 'react-redux';
import {RootState} from '@/store';

const {height} = Dimensions.get('window');

export const categories = [
  {
    id: 1,
    title: 'House',
  },
  {
    id: 2,
    title: 'Land',
  },
  {
    id: 3,
    title: 'Car',
  },
  {
    id: 4,
    title: 'Others',
  },
];

const HomeScreen = ({
  navigation,
}: PropertyHomeNavigationProps<'HomeScreen'>) => {
  const user = useSelector((state: RootState) => state.user.isAgent);
  const [showRental, setShowRental] = useState<boolean>(true);
  const [showSales, setShowSales] = useState<boolean>(false);
  const [propertyList, setPropertyList] = useState<PropertyObject[]>();
  const [pendingPropList, setPendingPropList] = useState<PropertyObject[]>();
  const [propTypeId, setPropTypeId] = useState<number>();
  const [propType, setPropType] = useState<string>('');

  // const [getProperty, { isLoading}] = useLazyGetPropertyQuery();

  const {data, isLoading} = useGetPropertyQuery();

  useEffect(() => {
    // if (!data?.data) {
    //   return () => {};
    // }

    const proList = data?.data.filter(a => a.approved === true);
    console.log('approved', proList);
    setPropertyList(proList);

    const pendingList = data?.data.filter(a => a.approved === false);
    console.log('pending', proList);
    setPendingPropList(pendingList);

    return () => {
      setPropertyList([]);
      setPendingPropList([]);
    };
  }, [data?.data]);

  // const fetchProperties = async () => {
  //   const prop = await getProperty().unwrap();
  // };

  // console.log('pro', data);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <ImageBackground
        source={headerBg}
        style={{width: '100%', height: height / 3.5}}>
        <Spacer size={height / 5} />
        <View style={styles.filterCard}>
          <Spacer size={10} />
          <View style={styles.toggleView}>
            <TouchableWithoutFeedback
              onPress={() => {
                setShowRental(!showRental), setShowSales(!showSales);
              }}>
              <View
                style={showRental ? styles.activeCard : styles.inactiveCard}>
                <Text style={{color: '#000'}}>Buy</Text>
              </View>
            </TouchableWithoutFeedback>
            <Spacer size={5} />
            <TouchableWithoutFeedback
              onPress={() => {
                setShowRental(!showRental), setShowSales(!showSales);
              }}>
              <View style={showSales ? styles.activeCard : styles.inactiveCard}>
                <Text style={{color: '#000'}}>Rent</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <Spacer size={30} />
          <View style={styles.searchFilter}>
            <View style={styles.searchView}>
              <CustomInput
                placeholder={'Search Product Name'}
                placeholderTextColor="#000"
                icon={{
                  right: {name: 'search', color: 'white'},
                }}
              />
            </View>
            {/* <Spacer size={10} />
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate('FilterScreen')}>
              <Icon name="filterButton" />
            </TouchableWithoutFeedback> */}
          </View>
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
                  backgroundColor: category.id === propTypeId ? primary : white,
                }}
                key={category.id}>
                <TouchableOpacity
                  onPress={() => {
                    setPropTypeId(category.id), setPropType(category.title);
                  }}>
                  <Text
                    style={[
                      styles.catText,
                      {
                        color: category.id === propTypeId ? white : '#000',
                      },
                    ]}>
                    {category.title}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </ImageBackground>

      <Spacer size={height / 5} />
      {isLoading && (
        <ActivityIndicator animating size="large" color={primary} />
      )}

      <View style={{paddingHorizontal: 20}}>
        <Spacer size={20} />
        <Text style={styles.subHeaderText}>Published list</Text>
        <Spacer size={20} />
      </View>

      {propertyList?.map(apartment => (
        <View
          key={apartment.id}
          style={{paddingHorizontal: 10, marginBottom: 10}}>
          <Spacer size={10} />
          <PropertyCard
            name={apartment.title}
            image={apartment.mainImage}
            price={apartment.price}
            location={apartment.address}
            onPress={() => navigation.navigate('Apartment', {apartment})}
          />
        </View>
      ))}
      {user && (
        <>
          <View style={{paddingHorizontal: 20}}>
            <Spacer size={20} />
            <Text style={styles.subHeaderText}>
              Pending list (Waiting for Admin approval)
            </Text>
            <Spacer size={20} />
          </View>

          {pendingPropList?.map(aprtment => (
            <View
              key={aprtment.id}
              style={{paddingHorizontal: 10, marginBottom: 10}}>
              <Spacer size={10} />
              <PropertyCard
                name={aprtment.title}
                image={aprtment.mainImage}
                price={aprtment.price}
                location={aprtment.address}
                onPress={() =>
                  navigation.navigate('Apartment', {apartment: aprtment})
                }
              />
            </View>
          ))}
        </>
      )}
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filterCard: {
    backgroundColor: white,
    borderRadius: 30,
    width: '95%',
    height: height / 4,
    alignItems: 'center',
    alignSelf: 'center',
  },
  searchFilter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 10,
  },
  searchView: {
    width: '90%',
    height: 54,
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: primary,
    borderWidth: 2,
    borderRadius: 10,
  },
  subHeading: {
    paddingHorizontal: 20,
  },
  toggleView: {
    height: 48,
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 49,
    alignSelf: 'center',
    paddingHorizontal: 5,
  },
  activeCard: {
    backgroundColor: white,
    width: '48%',
    height: 45,
    // borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: '#6A947E',
    borderBottomWidth: 5,
  },
  inactiveCard: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%',
    backgroundColor: white,
    height: 45,
    borderRadius: 10,
  },
  category: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
  },
  catText: {
    fontFamily: 'AirbnbCereal_W_Md',
    color: '#000000',
    fontSize: 13,
    fontWeight: '500',
  },
  subHeaderText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '400',
    fontStyle: 'normal',
    fontFamily: 'AirbnbCereal_W_Bk',
  },
});
