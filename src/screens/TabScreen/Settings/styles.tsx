import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  headerView: {
    paddingHorizontal: 3,
    backgroundColor: '#000',
    height: height / 5.5,
  },
  header: {marginTop: 20},
  body: {
    marginTop: 10,
    marginBottom: 30,
  },
  form: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor: '#E7E8EA66',
    paddingHorizontal: 10,
  },
  bodyHeaderText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.6)',
    lineHeight: 30,
    fontWeight: '500',
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
    fontFamily: 'Inter-Regular',
    fontSize: 13,
    color: '#000',
    lineHeight: 18,
    fontWeight: '400',
    height: height / 16,
    backgroundColor: '#fff',
    paddingHorizontal: 27,
    borderRadius: 10,
  },
  switchView: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 10,
    height: height / 18,
  },
  helpView: {
    marginVertical: 10,
  },
  helpText: {
    fontFamily: 'Inter-Regular',
    fontSize: 15,
    color: '#000',
    lineHeight: 30,
    fontWeight: '400',
  },
  iconContainer: {
    position: 'absolute',
    left: 0,
    width: 36,
    height: 36,
  },
  icon: {
    paddingHorizontal: 2,
  },
  title: {
    fontFamily: 'Nunito-Medium',
    color: '#fff',
    lineHeight: 33,
    fontWeight: '600',
    fontSize: 24,
  },
  titleView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: width / 4,
  },
  userData: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  userDataText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    fontWeight: '500',
  },
});
