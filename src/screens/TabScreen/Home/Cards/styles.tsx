import {white} from '@/theme/colorPatte';
import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 10,
  },
  header: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  headerText: {
    fontFamily: 'Lexend-Regular',
    fontSize: 20,
    color: '#000',
    lineHeight: 26,
    fontWeight: '600',
  },
  image: {
    // flex: 1,
    justifyContent: 'center',
  },
  cardView: {
    marginTop: 30,
    paddingHorizontal: 10,
  },
  btnView: {
    marginTop: 40,
  },
  inputView: {
    marginTop: 5,
    paddingHorizontal: 5,
  },
  labelText: {
    fontFamily: 'Inter-Regular',
    fontSize: 15,
    color: '#1D1E20',
    lineHeight: 18,
    fontWeight: '400',
    marginBottom: 10,
  },
  textInput: {
    fontFamily: 'Inter-Bold',
    fontSize: 13,
    color: '#666161',
    lineHeight: 18,
    fontWeight: '500',
    height: height / 16,
    backgroundColor: '#F5F6FA',
    paddingHorizontal: 27,
    borderRadius: 10,
  },
  textInput2: {
    fontFamily: 'Inter-Bold',
    fontSize: 15,
    color: '#666161',
    lineHeight: 18,
    fontWeight: '500',
    height: 50,
    width: width / 2.5,
    backgroundColor: '#F5F6FA',
    paddingHorizontal: 27,
    borderRadius: 10,
  },
  cardInfoView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 30,
    marginBottom: 30,
  },
  modalView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: 'rgba(0,0,0,.5)',
  },
});
