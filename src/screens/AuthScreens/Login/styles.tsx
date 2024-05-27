import {carton, white} from '@/theme/colorPatte';
import {Dimensions, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: 15,
    // backgroundColor: '#fff',
    // height,
    // width,
  },
  logo: {
    alignItems: 'flex-end',
    padding: 10,
  },
  title: {
    marginTop: 20,
  },
  titleText: {
    fontFamily: 'Inter-Bold',
    color: white,
    lineHeight: 33,
    fontWeight: '700',
    marginTop: 10,
    fontSize: 28,
  },
  formView: {
    marginTop: 62,
  },
  label: {
    fontFamily: 'Nunito-Bold',
    color: carton,
    lineHeight: 19,
    fontWeight: '400',
    marginTop: 10,
    fontSize: 14,
  },
  password: {
    marginTop: 20,
  },
  forgotPassword: {
    // position: 'absolute',
    // right: 10,
    alignItems: 'flex-end',
  },
  forgotPwordText: {
    fontFamily: 'Inter-Bold',
    color: '#8f8f8f',
    lineHeight: 19,
    fontWeight: '400',
    marginTop: 10,
    fontSize: 14,
  },
  btnView: {
    alignItems: 'center',
    marginTop: 30,
    justifyContent: 'space-between',
  },
  modalView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: 'rgba(0,0,0,.5)',
  },
});
