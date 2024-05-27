import {StyleSheet} from 'react-native';

// const {width} = Dimensions.get('window');

export const styles = StyleSheet.create({
  cardView: {
    marginHorizontal: 5,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  flatContainer: {
    marginVertical: 8,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  body: {
    alignSelf: 'center',
    width: '100%',
    height: '100%',
  },
  orderCard: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    height: 122,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    width: '95%',
  },
});
