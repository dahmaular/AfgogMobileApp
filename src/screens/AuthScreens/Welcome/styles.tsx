import {Dimensions, StyleSheet} from 'react-native';
import {white} from '../../../theme/colorPatte';
const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    height,
    width,
  },
  welcome: {
    fontFamily: 'Nunito-Regular',
    fontSize: 26,
    color: white,
    lineHeight: 38,
    fontWeight: '500',
  },
  welcomeView: {
    marginTop: height / 1.7,
  },
  subText: {
    fontFamily: 'Nunito-Regular',
    color: white,
    lineHeight: 18,
    fontWeight: '500',
    marginTop: 10,
    fontSize: 16,
  },
  body: {padding: 20},
  btnView: {
    marginTop: 40,
  },
  signUpView: {
    marginTop: 70,
  },
  title: {
    fontSize: 26,
    color: 'black',
    lineHeight: 47,
  },
  proTitle: {
    fontSize: 26,
    color: '#fff',
    lineHeight: 47,
  },
  proTitleProp: {
    fontSize: 36,
    color: '#fff',
    lineHeight: 47,
    fontWeight: '500',
    fontFamily: 'AirbnbCereal_W_Md',
  },
  proSubTitle: {
    fontSize: 17,
    color: '#fff',
    lineHeight: 47,
    fontWeight: '400',
    fontFamily: 'AirbnbCereal_W_Bk',
  },
  propWelcome: {
    backgroundColor: '#00000066',
    width: '100%',
    height: height / 2.24,
    paddingHorizontal: 20,
  },
});
