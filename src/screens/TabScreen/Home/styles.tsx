import {Dimensions, StyleSheet} from 'react-native';
// import {secondary, primary, white, carton, purple} from '@/theme/colorPatte';

const {height} = Dimensions.get('window');
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
    backgroundColor: '#F5F5F5',
  },
  name: {
    // marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: 5,
  },
  searchView: {
    width: '90%',
    height: 54,
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 10,
  },
  categoryView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  catText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    fontWeight: '500',
    color: '#0C1A30',
    lineHeight: 25,
  },
  seeAll: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    fontWeight: '500',
    color: '#6A947E',
    lineHeight: 22,
  },
  modal: {
    width: '100%',
    height,
    flex: 1,
    alignItems: 'center',
    alignSelf: 'center',
    // justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalBody: {
    alignSelf: 'center',
    backgroundColor: 'white',
    width: '85%',
    minWidth: '85%',
    height: height / 2,
    // borderRadius: 30,
    padding: 20,
    marginTop: height / 2.2,
  },
  catModalBody: {
    backgroundColor: '#000000B2',
    height: height / 1.7,
    marginTop: height / 4,
  },
  modalContent: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height / 4,
  },
  arrow: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  // category styles
  catTitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#0C1A30',
    lineHeight: 24,
    fontWeight: '600',
  },
  flatContainer: {
    marginVertical: 8,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  cardView: {
    marginHorizontal: 5,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  inputCat: {
    color: '#fff',
    fontFamily: 'Inter-Regular',
    fontWeight: '500',
    fontSize: 12,
    width: '90%',
    height: 56,
  },
  cartBody: {
    alignSelf: 'center',
    width: '100%',
    height: '100%',
  },
  categoryNameView: {
    height: 48,
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  category: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    padding: 10,
    paddingHorizontal: 18,
  },

  // orderconfirm styles
  orderConfirmedContainer: {
    flex: 1,
    // backgroundColor: '#fff',
    paddingHorizontal: 10,
    height,
  },
  bodyText: {
    color: '#1D1E20',
    fontFamily: 'Inter-Regular',
    fontWeight: '600',
    fontSize: 22,
  },
  bodyView: {
    alignItems: 'center',
  },
  bodySubText: {
    color: '#000000CC',
    fontFamily: 'Inter-Regular',
    fontWeight: '400',
    fontSize: 15,
    lineHeight: 21,
    textAlign: 'center',
    width: '80%',
  },
  confirmImage: {
    width: '100%',
    height: 208,
    marginTop: height / 18,
  },
  confirmFooter: {
    // alignItems: 'center',
    width: '100%',
  },
  orderBtn: {
    width: '80%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  shoppingBtn: {
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  // product screen
  productName: {
    color: '#000',
    fontFamily: 'Inter-Regular',
    fontWeight: '600',
    fontSize: 22,
  },
  productPrice: {
    color: '#000',
    fontFamily: 'Inter-Regular',
    fontWeight: '500',
    fontSize: 20,
  },
  moneyView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productAmount: {
    color: '#5C5858CC',
    fontFamily: 'Inter-Regular',
    fontWeight: '600',
    fontSize: 16,
    textDecorationLine: 'line-through',
  },
  availability: {
    color: '#5C5858CC',
    fontFamily: 'Inter-Regular',
    fontWeight: '400',
    fontSize: 14,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  description: {
    paddingHorizontal: 20,
  },
  descriptionTitle: {
    color: '#0C1A30',
    fontFamily: 'Inter-Regular',
    fontWeight: '700',
    fontSize: 16,
  },
  descriptionText: {
    color: '#0C1A30',
    fontFamily: 'Inter-Regular',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 22,
  },
  ratingTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  footerBtn: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
});
