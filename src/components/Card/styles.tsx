import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: 156,
    height: 230,
    // alignItems: 'center',
  },
  cardTitle: {
    fontFamily: 'Nunito-Regular',
    color: '#000000',
    lineHeight: 16,
    fontWeight: '700',
    marginTop: 10,
    fontSize: 12,
  },
  icon: {
    marginTop: 9,
  },
  price: {
    color: '#FA7D00',
    fontFamily: 'Inter-Regular',
    fontWeight: '600',
    lineHeight: 14.52,
    fontSize: 12,
  },
  sold: {
    alignItems: 'center',
  },
  ellipse: {
    position: 'absolute',
    right: 5,
  },
  name: {
    flexDirection: 'row',
    width: '95%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
});
