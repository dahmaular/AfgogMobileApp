import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import {primary} from '@/theme/colorPatte';
import Spacer from '@/components/layout/Spacer';
import Bg from '@/assets/image/preAuthBg.png';
import {AuthNavigationProps} from '@/navigation/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PreAuthScreen = ({navigation}: AuthNavigationProps<'preHome'>) => {
  const [returningUser, setReturningUser] = useState<string>('');

  const getModule = async () => {
    const fetchModule = await AsyncStorage.getItem('module');
    setReturningUser(fetchModule);
    console.log('fe', fetchModule);
  };

  useEffect(() => {
    getModule();
  }, []);

  const handleOnSubmit = async () => {
    if (returningUser) {
      navigation.navigate('LoginScreen', {route: 'property'});
      return;
    }
    await AsyncStorage.setItem('module', 'Property');
    navigation.navigate('PropWelcomeScreen');
  };
  return (
    <ImageBackground source={Bg} style={styles.container}>
      <View style={styles.title}>
        <Spacer size={Dimensions.get('window').height / 2.5} />

        <Spacer size={20} />
        <View style={styles.home}>
          <View style={styles.categoryEcom}>
            <TouchableWithoutFeedback
            // onPress={() => navigation.navigate('WelcomeScreen')}
            >
              <View style={{alignItems: 'center'}}>
                {/* <Icon name="computer" color="#fff" />
                <Spacer size={10} /> */}
                <Text style={styles.text}>E-commerces</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <Spacer size={30} />
          <View style={styles.categoryREstate}>
            <TouchableWithoutFeedback onPress={handleOnSubmit}>
              <View style={{alignItems: 'center'}}>
                {/* <Icon name="computer" color="#fff" />
                <Spacer size={10} /> */}
                <Text style={styles.text}>Property</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default PreAuthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  home: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryEcom: {
    backgroundColor: '#5B826D',
    padding: 15,
    borderRadius: 5,
    elevation: 5,
  },
  categoryREstate: {
    backgroundColor: primary,
    padding: 15,
    borderRadius: 5,
    elevation: 5,
  },
  text: {
    fontFamily: 'Inter-Bold',
    color: '#fff',
    lineHeight: 19,
    fontWeight: '400',
    marginTop: 10,
    fontSize: 14,
  },
});
