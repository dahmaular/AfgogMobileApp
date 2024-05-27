/* eslint-disable react-hooks/exhaustive-deps */
import {
  ActivityIndicator,
  Modal,
  ScrollView,
  // Switch,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './styles';
import {LiteCreditCardInput} from 'react-native-credit-card-input';

import card1 from '@/assets/image/cardBG1.png';
import card2 from '@/assets/image/cardBG2.png';
import {PrivateNavigationProps} from '@/navigation/types';
import UserCard from '@/components/Card/UserCard';
import Button from '@/components/Button/button';
import {Icon} from '@/assets/svg/Icon';
import Header from '@/components/Header';
import {primary} from '@/theme/colorPatte';
import {useSelector} from 'react-redux';
import {RootState} from '@/store';
import {
  useAddPaymentCardMutation,
  useLazyGetPaymentCardsQuery,
} from '@/services/profile/service';
import Spacer from '@/components/layout/Spacer';
import CustomText from '@/components/typography/CustomText';
import CustomButton from '@/components/layout/CustomButton';

let message: string = '';

export const CardData = [
  {
    id: 1,
    accountName: 'Adedamola Gbenga',
    cardType: 'VISA',
    accountType: 'Visa Classic',
    accountNumber: '5254 **** **** 7690',
    currency: '₦',
    amount: '3,763.87',
    bg: card1,
  },
  {
    id: 2,
    accountName: 'Gbenga Adedamola',
    cardType: 'VERVE',
    accountType: 'Visa Classic',
    accountNumber: '5254 **** **** 7690',
    currency: '₦',
    amount: '763.87',
    bg: card2,
  },
];

type CardType = {
  values: {
    number: string;
    expiry: string;
    cvc: string;
    type: string;
  };
  valid: boolean;
  status: {
    number: string;
    expiry: string;
    cvc: string;
  };
};

type CardProps = {
  _id: string;
  cardName: string;
  type: string;
  expiry: string;
  cardNumber: string;
};

const Cards = ({navigation}: PrivateNavigationProps<'CardsScreen'>) => {
  const [name, setName] = useState<string>('');
  const [cardNumber, setCardNumber] = useState<string>('');
  const [cvv, setCvv] = useState<string>('');
  const [expiry, setExpiry] = useState<string>('');
  const [userCards, setUserCards] = useState<CardProps[]>([]);
  const [type, setType] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);

  const user = useSelector((state: RootState) => state.user.authData);
  const [getPaymentCards, {isLoading: cardLoading}] =
    useLazyGetPaymentCardsQuery();

  const [addPaymentCard, {isLoading}] = useAddPaymentCardMutation();

  const [showForm, setShowForm] = useState<boolean>(false);

  const _onChange = (formData: CardType) => {
    console.log(JSON.stringify(formData, null, ' '));
    setCvv(formData.values.cvc);
    setExpiry(formData.values.expiry);
    setCardNumber(formData.values.number);
    setType(formData.values.type);
    setName(formData.values.type);
  };

  const handleAddNew = async () => {
    setShowForm(!showForm);
  };

  const getUserCards = async () => {
    const getCards = await getPaymentCards({userId: user._id}).unwrap();
    console.log(getCards);
    setUserCards(getCards.data as []);
  };

  useEffect(() => {
    setShowForm(false);
    getUserCards();
  }, [navigation]);

  const handleOnSave = async () => {
    console.log(name, cardNumber, cvv, expiry);
    const saveCard = await addPaymentCard({
      cardName: type,
      cardNumber,
      cvv,
      expiry,
      type,
      userId: user._id,
    }).unwrap();

    console.log(saveCard);

    if (saveCard.isSuccess) {
      // setShowForm(!showForm);
      message = saveCard.message;
      setShowModal(true);
      getUserCards();
    }
  };

  return (
    // <ScrollView style={styles.container}>
    <View style={styles.container}>
      <View>
        <Header hasBackIcon title="Cards" />
        {cardLoading ? (
          <ActivityIndicator animating size="large" color={primary} />
        ) : (
          <View>
            {userCards.length > 0 ? (
              <ScrollView
                horizontal
                style={styles.cardView}
                showsHorizontalScrollIndicator={false}>
                {userCards.map(item => (
                  <UserCard
                    accountName={item.cardName}
                    accountNumber={item.cardNumber}
                    // availableBalance={item.amount}
                    // currency={item.currency}
                    imageBackground={card1}
                    cardType={item.type}
                    accountType={item.type}
                    key={item._id}
                  />
                ))}
              </ScrollView>
            ) : (
              <View style={{alignItems: 'center'}}>
                <Spacer size={30} />
                <Text style={{color: '#000'}}>No Available card</Text>
              </View>
            )}
          </View>
        )}
      </View>
      <View style={styles.btnView}>
        <Button
          onPress={handleAddNew}
          icon={<Icon name="check" color="#fff" />}
          text="Add new card"
          containerStyle={{backgroundColor: '#16233A'}}
        />
      </View>

      {showForm && (
        <ScrollView style={{marginTop: 70}}>
          <LiteCreditCardInput onChange={_onChange} />
          {/* <View style={[styles.inputView]}>
            <Text style={styles.labelText}>Card Owner</Text>
            <TextInput
              style={styles.textInput}
              placeholder="John Doe"
              keyboardType="default"
              placeholderTextColor="#8F959E"
              value={name}
              onChangeText={e => setName(e)}
            />
          </View>
          <View style={styles.inputView}>
            <Text style={styles.labelText}>Card Number</Text>
            <TextInput
              style={styles.textInput}
              placeholder="0000 0000 0000 0000"
              keyboardType="default"
              placeholderTextColor="#8F959E"
              value={cardNumber}
              onChangeText={e => setCardNumber(e)}
            />
          </View>

          <View
            style={[
              styles.inputView,
              {flexDirection: 'row', justifyContent: 'space-between'},
            ]}>
            <View>
              <Text style={styles.labelText}>EXP</Text>
              <TextInput
                style={styles.textInput2}
                placeholder="12/20"
                keyboardType="numeric"
                placeholderTextColor="#8F959E"
                value={expiry}
                onChangeText={e => setExpiry(e)}
              />
            </View>
            <View>
              <Text style={styles.labelText}>CVV</Text>
              <TextInput
                style={styles.textInput2}
                placeholder="123"
                keyboardType="number-pad"
                placeholderTextColor="#8F959E"
                secureTextEntry
                value={cvv}
                onChangeText={e => setCvv(e)}
              />
            </View>
          </View> */}
          <Spacer size={30} />
          {/* <View style={[styles.inputView, styles.cardInfoView]}>
            <Text style={styles.labelText}>Save card info</Text>
            <Switch
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              thumbColor={isEnabled ? '#fff' : '#f4f3f4'}
              trackColor={{false: '#767577', true: '#4BC76D'}}
              value={isEnabled}
            />
          </View> */}

          <View style={[styles.inputView, {marginBottom: 30}]}>
            <Button
              text="Save Card"
              containerStyle={{backgroundColor: primary}}
              loading={isLoading}
              onPress={() => handleOnSave()}
            />
          </View>
          <Modal transparent visible={showModal}>
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
                  <CustomText>{message}</CustomText>
                  <Spacer size={20} />

                  <CustomButton
                    text="Close"
                    type="settings"
                    borderless
                    onPress={() => {
                      setShowModal(false);
                    }}
                  />
                </View>
                <Spacer size={14} />
              </View>
            </View>
          </Modal>
        </ScrollView>
      )}
    </View>
    // </ScrollView>
  );
};

export default Cards;
