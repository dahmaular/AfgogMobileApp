import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    paddingHorizontal: 10,
    height,
  },
  arrow: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    // width: '80%',
    // alignItems: 'center',
    paddingHorizontal: 20,
  },
  titleText: {
    fontFamily: 'Inter-Bold',
    color: '#000',
    lineHeight: 33,
    fontWeight: '500',
    // marginTop: 10,
    fontSize: 24,
  },
  btn: {
    marginTop: 55,
  },
  containerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#35C2C1',
    width: width / 5,
    height: height / 10,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  otpStyles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  otpInputs: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#000',
    // lineHeight: 45,
    fontWeight: '600',
    textAlign: 'center',
  },
  modalView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: 'rgba(0,0,0,.5)',
  },
});
