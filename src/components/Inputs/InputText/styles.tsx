import {primary} from '@/theme/colorPatte';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // marginTop: 10,
    // backgroundColor: '#FBFBFB',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    // borderRadius: 8,
    // background: '#FBFBFB',
    borderBottomWidth: 3,
    borderColor: primary,
    height: 55,
    alignContent: 'center',
  },
  input: {
    fontFamily: 'Inter-Bold',
    color: '#fff',
    lineHeight: 19,
    fontWeight: '400',
    marginTop: 10,
    fontSize: 14,
    width: '100%',
    height: 55,
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightIcon: {
    position: 'absolute',
    right: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 13,
    fontWeight: '600',
    fontFamily: 'Nunito',
    letterSpacing: 0.5,
    paddingLeft: 20,
  },
});
