import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    paddingHorizontal: 15,
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
  ModalTitleText: {
    fontFamily: 'Inter-Bold',
    color: '#000',
    lineHeight: 33,
    fontWeight: '700',
    // marginTop: 10,
    fontSize: 26,
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
  //////////

  headerText: {
    fontWeight: '700',
    color: 'black',
    fontSize: 24,
    lineHeight: 39,
  },
  subHeader: {
    fontFamily: 'Inter-Regular',
    fontWeight: '400',
    color: '#949494',
    fontSize: 14,
    lineHeight: 24,
  },
  rules: {
    borderRadius: 10,
  },
  justify: {
    justifyContent: 'center',
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
  modalBody: {
    alignSelf: 'center',
    backgroundColor: 'white',
    width: width,
    height: height,
    borderRadius: 30,
    // padding: 20,
  },
  modalTitle: {
    marginTop: height / 4,
    marginVertical: 20,
    alignItems: 'center',
  },
});
