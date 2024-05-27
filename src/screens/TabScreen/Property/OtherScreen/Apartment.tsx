/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useState} from 'react';

import {PropertyHomeNavigationProps} from '@/navigation/types';
import Spacer from '@/components/layout/Spacer';

// import {useSelector} from 'react-redux';
// import {RootState} from '@/store';
import Header from '@/components/Header';
import {Icon} from '@/assets/svg/Icon';
import CustomText from '@/components/typography/CustomText';
import Button from '@/components/Button/button';
import {primary} from '@/theme/colorPatte';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import {useRequestInspectionMutation} from '@/services/inspection/service';
import {RootState} from '@/store';
import {useSelector} from 'react-redux';

const {height, width} = Dimensions.get('window');

const ApartmentScreen = ({route}: PropertyHomeNavigationProps<'Apartment'>) => {
  const agent = useSelector((state: RootState) => state.user.isAgent);
  const {apartment} = route?.params;
  const [showDateModal, setShowDateModal] = useState<boolean>(false);
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [openDatePicker, setOpenDatePicker] = useState<boolean>(false);
  const [openTimePicker, setOpenTimePicker] = useState<boolean>(false);
  const [successModal, setShowSuccessModal] = useState<boolean>(false);
  const [failureModal, setShowFailureModal] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const [requestInspection, {isLoading}] = useRequestInspectionMutation();

  console.log('Data', apartment);

  const user = useSelector((state: RootState) => state.user.authData);

  const handleRequestInspection = async () => {
    setShowDateModal(false);
    const data = {
      inpectionDate: moment(startDate).format('l'),
      inspectionTime: moment(startTime).format('LT'),
      inspectorId: user._id,
      propertyId: apartment._id,
    };
    console.log('data', data);
    try {
      const reqInspec = await requestInspection(data).unwrap();

      console.log('req', reqInspec);
      if (reqInspec.responseCode === '00') {
        setMessage('Request saved successfully');
        // setShowDateModal(false);
        setShowSuccessModal(true);
      } else {
        console.log('here');
      }
    } catch (error) {
      console.log('err', error);
      setMessage(error.data.message);
      setShowFailureModal(true);
      throw error;
    }
  };

  return (
    <View style={styles.container}>
      <Spacer size={20} />
      <Header title="Apartment Details" hasBackIcon />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}>
        <Spacer size={20} />
        <ImageBackground
          source={{uri: apartment.mainImage}}
          imageStyle={{borderRadius: 10}}
          style={styles.backgroundImage}>
          <Spacer size={120} />
          <View style={styles.thumbnail}>{/* <Text>Send</Text> */}</View>
          <Spacer size={10} />
          <View style={styles.thumbnail}>{/* <Text>Send</Text> */}</View>
          <Spacer size={10} />
          <View style={styles.thumbnail}>{/* <Text>Send</Text> */}</View>
          <Spacer size={10} />
          {/* <View style={styles.details}>
            <Text style={styles.detailsText}>{apartment?.name}</Text>
            <Spacer size={10} />
            <View style={styles.innerDetailsLocation}>
              <Icon name="locationGreyIcon" />
              <Spacer size={5} />
              <Text style={styles.detailsText}>{apartment?.location}</Text>
              <Spacer size={10} />
            </View>
            <Spacer size={7} />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Icon name="bath" color="#000" />
              <Spacer size={5} />
              <CustomText style={styles.price}>3 Bathrooms </CustomText>
              <Spacer size={5} />
              <Icon name="bed" color="#000" />
              <Spacer size={5} />
              <CustomText style={styles.price}>3 Bedrooms</CustomText>
            </View>
          </View> */}
        </ImageBackground>
        <Spacer size={10} />
        <View style={[styles.details, {width: '100%'}]}>
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View>
                <Text style={styles.detailsText}>
                  {apartment.bedroom} Bedroom
                </Text>
                <Spacer size={5} />
                <Text style={styles.detailsText}>{apartment.title}</Text>
              </View>
              <View>
                <Text>
                  <Text style={styles.detailsText}>
                    {apartment.price} / Per annum
                  </Text>
                </Text>
              </View>
            </View>
            <Spacer size={10} />
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name="locationGreen" />
            <Spacer size={5} />
            <Text style={styles.location}>{apartment.address}</Text>
          </View>
          <Spacer size={10} />
          <View style={styles.innerDetailsLocation}>
            <Text style={styles.description}>{apartment.description}</Text>
          </View>
          <Spacer size={7} />
          <Spacer size={20} />
          {!agent && (
            <Button
              onPress={() => setShowDateModal(true)}
              text="Request Inspection"
              bgColor={primary}
              containerStyle={{backgroundColor: primary}}
              loading={isLoading}
            />
          )}
        </View>
        <Modal
          onRequestClose={() => setShowDateModal(false)}
          animationType="slide"
          transparent={true}
          visible={showDateModal}>
          <View style={styles.modal}>
            <View style={styles.modalBody}>
              <View style={styles.modalTitle}>
                <View style={styles.from}>
                  <Text style={styles.modalText}>Inspection Date:</Text>
                  <Spacer size={10} />
                  <TouchableOpacity
                    style={styles.calendar}
                    onPress={() => setOpenDatePicker(true)}>
                    <Text style={[styles.accountIndexText, {color: '#696969'}]}>
                      {moment(startDate).format('L')}
                    </Text>
                    <Icon name="calendar" />
                  </TouchableOpacity>
                  <Spacer size={20} />
                  <View>
                    <Text style={styles.modalText}>Time:</Text>
                    <Spacer size={10} />
                    <TouchableOpacity
                      style={styles.calendar}
                      onPress={() => setOpenTimePicker(true)}>
                      <Text
                        style={[styles.accountIndexText, {color: '#696969'}]}>
                        {moment().format('LT')}
                      </Text>
                      <Icon name="clock" />
                    </TouchableOpacity>
                  </View>
                  <Spacer size={20} />
                  <Button
                    onPress={() => handleRequestInspection()}
                    text="Save"
                    bgColor={primary}
                    containerStyle={{
                      backgroundColor: primary,
                      width: '50%',
                      height: 40,
                      alignSelf: 'center',
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
        </Modal>
        <DatePicker
          modal
          mode="date"
          open={openDatePicker}
          date={startDate}
          minimumDate={new Date()}
          onConfirm={date => {
            setOpenDatePicker(false);
            setStartDate(date);
          }}
          onCancel={() => {
            setOpenDatePicker(false);
          }}
        />
        <DatePicker
          modal
          mode="time"
          open={openTimePicker}
          date={startTime}
          // maximumDate={new Date()}
          onConfirm={date => {
            setOpenTimePicker(false);
            setStartTime(date);
          }}
          onCancel={() => {
            setOpenTimePicker(false);
          }}
        />

        {/* success */}

        <Modal transparent visible={successModal}>
          <View style={styles.modalView}>
            <View
              style={{
                backgroundColor: 'white',
                height: 300,
                margin: 25,
                width: '80%',
                borderRadius: 15,
                padding: 22,
              }}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                }}>
                <TouchableWithoutFeedback>
                  <Icon name="close" />
                </TouchableWithoutFeedback>
              </View>
              <Spacer size={30} />
              <View style={{alignItems: 'center'}}>
                <View>
                  <Icon
                    name="statement-success"
                    color="white"
                    width={60}
                    height={60}
                  />
                </View>
                <Spacer size={30} />
                <CustomText style={{color: 'black'}}>{message}</CustomText>
                <Spacer size={20} />
                <View style={{alignItems: 'center'}}>
                  <View style={{width: '90%', justifyContent: 'center'}}>
                    <Button
                      onPress={() => {
                        setShowSuccessModal(false);
                        // navigation.navigate('HomeScreen');
                      }}
                      text="Ok, got it"
                      bgColor={primary}
                      containerStyle={{backgroundColor: primary}}
                      //   loading={isLoading}
                    />
                  </View>
                </View>
              </View>
              <Spacer size={14} />
            </View>
          </View>
        </Modal>

        {/* failure modal */}
        <Modal transparent visible={failureModal}>
          <View style={styles.modalView}>
            <View
              style={{
                backgroundColor: 'white',
                height: 300,
                margin: 25,
                width: '80%',
                borderRadius: 15,
                padding: 22,
              }}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                }}>
                <TouchableWithoutFeedback>
                  <Icon name="close" />
                </TouchableWithoutFeedback>
              </View>
              <Spacer size={30} />
              <View style={{alignItems: 'center'}}>
                <View>
                  <Icon
                    name="statement-failed"
                    color="white"
                    width={60}
                    height={60}
                  />
                </View>
                <Spacer size={30} />
                <CustomText style={{color: 'black'}}>{message}</CustomText>
                <Spacer size={20} />
                <View style={{alignItems: 'center'}}>
                  <View style={{width: '90%', justifyContent: 'center'}}>
                    <Button
                      onPress={() => {
                        setShowFailureModal(false);
                        // navigation.navigate('HomeScreen');
                      }}
                      text="Ok, got it"
                      bgColor={primary}
                      containerStyle={{backgroundColor: primary}}
                      //   loading={isLoading}
                    />
                  </View>
                </View>
              </View>
              <Spacer size={14} />
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

export default ApartmentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backgroundImage: {
    width: '100%',
    height: height / 1.9,
    borderRadius: 10,
  },
  contentContainer: {
    paddingHorizontal: 10,
  },
  thumbnail: {
    width: 72,
    height: 72,
    alignSelf: 'flex-end',
    marginHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#fff',
  },
  details: {
    width: '95%',
    // height: 94,
    borderRadius: 10,
    alignSelf: 'center',
    backgroundColor: '#fff',
    padding: 10,
  },
  detailsText: {
    fontFamily: 'AirbnbCereal_W_Md',
    color: '#1D1E20',
    fontSize: 15,
    fontWeight: '500',
  },
  location: {
    fontFamily: 'AirbnbCereal_W_Md',
    color: '#5B826D',
    fontSize: 14,
    fontWeight: '600',
  },
  innerDetailsLocation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    color: '#748082',
    fontFamily: 'Inter-Regular',
    fontWeight: '600',
    lineHeight: 14.52,
    fontSize: 12,
  },
  description: {
    fontFamily: 'AirbnbCereal_W_Bk',
    color: '#000000',
    fontSize: 16,
    fontWeight: '400',
  },
  modal: {
    width: '100%',
    // height: 50,
    flex: 1,
    alignItems: 'center',
    alignSelf: 'center',
    // justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: 'rgba(0,0,0,.5)',
  },
  modalBodyText: {
    fontFamily: 'Nunito-Medium',
    fontSize: 16,
    color: '#666161',
    lineHeight: 22,
    fontWeight: '600',
    marginTop: 20,
    textAlign: 'center',
  },
  modalBody: {
    backgroundColor: 'white',
    width: width / 1.17,
    height: height / 2.5,
    borderRadius: 30,
    paddingVertical: 20,
    marginTop: height / 4,
    alignItems: 'center',
  },
  modalTitle: {
    marginTop: 20,
    // marginVertical: 20,
    alignItems: 'center',
    width: '100%',
    alignSelf: 'center',
    // flexDirection: 'row',
  },
  from: {width: '100%', paddingHorizontal: 20},
  calendar: {
    borderRadius: 3,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#D9D9D9',
    alignItems: 'center',
    flexDirection: 'row',
    height: 35,
    // width: 114,
    paddingHorizontal: 5,
    justifyContent: 'space-between',
  },
  accountIndexText: {
    fontFamily: 'Nunito-Regular',
    color: '#fff',
    lineHeight: 13.64,
    fontWeight: '500',
    fontSize: 10,
  },
  modalText: {
    color: 'black',
    fontFamily: 'Nunito-Regular',
    lineHeight: 13.64,
    fontWeight: '400',
  },
});
