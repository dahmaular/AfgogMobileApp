/* eslint-disable react-native/no-inline-styles */
import {
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Modal,
  FlatList,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';

import {PrivateNavigationProps} from '@/navigation/types';
import {Icon} from '@/assets/svg/Icon';
import Spacer from '@/components/layout/Spacer';
import Carousel from 'react-native-reanimated-carousel';
import CustomInput from '@/components/layout/CustomInput';
import CustomText from '@/components/typography/CustomText';
import {
  adsImage,
  adsImage2,
  adsImage3,
  bottomAds,
  fullCategories,
} from './slides';
import ProductCard from '@/components/Card/Product';
import classicProduct from '@/assets/image/classicSpring.png';
import classicHeadphone from '@/assets/image/headfone.png';
// import {useSelector} from 'react-redux';
// import {RootState} from '@/store';
import {
  useGetProductCategoryQuery,
  useGetProductsQuery,
} from '@/services/product/service';
import {IconPackType} from '@/assets/svg/iconPack';
import {primary} from '@/theme/colorPatte';
// import {useSelector} from 'react-redux';
// import {RootState} from '@/store';

export const products = [
  {
    id: 1,
    image: classicProduct,
    name: 'Classic Spring',
    price: '12000',
    rating: '4.6',
    sold: '8 sold',
  },
  {
    id: 2,
    image: classicHeadphone,
    name: 'Classic Spring',
    price: '12000',
    rating: '4.6',
    sold: '8 sold',
  },
  {
    id: 3,
    image: classicProduct,
    name: 'Classic Spring',
    price: '12000',
    rating: '4.6',
    sold: '8 sold',
  },
  {
    id: 4,
    image: classicProduct,
    name: 'Classic Spring',
    price: '12000',
    rating: '4.6',
    sold: '8 sold',
  },
];

const HomeScreen = ({navigation}: PrivateNavigationProps<'HomeScreen'>) => {
  // const user = useSelector((state: RootState) => state.user.authData);
  const {data: prodCategory, isLoading: cateLoading} =
    useGetProductCategoryQuery();
  const {data: allProducts} = useGetProductsQuery();

  const [showCategory, setShowCategory] = useState<boolean>(false);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{backgroundColor: '#fff'}}>
      <View style={styles.name}>
        <View>
          <Icon name="logoTransparent" width={81} height={42} color="white" />
        </View>
        <View style={styles.header}>
          <Icon name="notyIcon" color="white" />
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('CartScreen')}>
            <Icon name="cartIcon" color="white" />
          </TouchableWithoutFeedback>
        </View>
      </View>
      <Spacer size={10} />

      <View style={{width: Dimensions.get('window').width}}>
        <Carousel
          loop
          style={{alignItems: 'center'}}
          width={Dimensions.get('window').width}
          height={206}
          autoPlay={true}
          data={adsImage}
          scrollAnimationDuration={4000}
          // onSnapToItem={index => console.log('current index:', index)}
          renderItem={({item}) => (
            <View
              key={item.id}
              style={{
                justifyContent: 'center',
              }}>
              <Icon name={item.image} color="white" />
            </View>
          )}
        />
      </View>

      <Spacer size={20} />
      <View style={{padding: 10}}>
        <View style={styles.searchView}>
          <CustomInput
            placeholder={'Search Product Name'}
            icon={{
              right: {name: 'search', color: 'white'},
            }}
          />
        </View>
      </View>

      <Spacer size={10} />
      <View style={styles.categoryView}>
        <CustomText style={styles.catText}>Categories</CustomText>
        <TouchableOpacity onPress={() => setShowCategory(true)}>
          <CustomText style={styles.seeAll}>See All</CustomText>
        </TouchableOpacity>
      </View>
      <Spacer size={10} />
      <View style={styles.category}>
        {cateLoading && (
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator animating color={primary} size="small" />
          </View>
        )}
        {prodCategory?.data.map((category, index) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('CategoryScreen', {
                category: category.name,
              })
            }>
            <View
              style={[
                styles.categoryNameView,
                {backgroundColor: index % 2 === 0 ? '#000' : '#C98848'},
              ]}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('CategoryScreen', {
                    category: category.name,
                  })
                }>
                <Icon
                  name={
                    category.icon
                      ? (category.icon as IconPackType)
                      : (category.name.toLocaleLowerCase() as IconPackType)
                  }
                  color="white"
                />
              </TouchableOpacity>
            </View>
            <View>
              <Spacer size={5} />
              <CustomText
                style={{
                  fontFamily: 'Inter-Regular',
                  fontWeight: '400',
                  fontSize: 12,
                  textAlign: 'center',
                }}>
                {category.name}
              </CustomText>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <Spacer size={10} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 10,
        }}>
        <CustomText
          style={{
            fontFamily: 'Inter-Regular',
            fontSize: 14,
            fontWeight: '500',
            color: '#0C1A30',
            lineHeight: 25,
          }}>
          Explore Product
        </CustomText>
        <TouchableOpacity>
          <CustomText
            style={{
              fontFamily: 'Inter-Regular',
              fontSize: 12,
              fontWeight: '500',
              color: '#6A947E',
              lineHeight: 22,
            }}>
            See All
          </CustomText>
        </TouchableOpacity>
      </View>
      <Spacer size={10} />
      <View style={{height: 2, backgroundColor: '#E5E7EB'}} />
      <Spacer size={20} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {allProducts?.data.map(product => (
          <View key={product._id} style={{paddingHorizontal: 10}}>
            <ProductCard
              name={product.name}
              image={product.image[0] as string}
              rating={product.rating}
              price={product.price}
              sold={product.noOfItems}
              onPress={() =>
                navigation.navigate('ProductScreen', {id: product._id})
              }
            />
          </View>
        ))}
      </ScrollView>
      <Spacer size={20} />

      <View style={{width: Dimensions.get('window').width}}>
        <Carousel
          loop
          style={{alignItems: 'center'}}
          width={Dimensions.get('window').width}
          height={206}
          autoPlay={true}
          data={adsImage2}
          scrollAnimationDuration={4000}
          // onSnapToItem={index => console.log('current index:', index)}
          renderItem={({item}) => (
            <View
              key={item.id}
              style={{
                justifyContent: 'center',
                // marginHorizontal: 10,
              }}>
              <Icon name={item.image} color="white" />
            </View>
          )}
        />
      </View>

      {/* <Spacer size={20} /> */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 10,
        }}>
        <CustomText
          style={{
            fontFamily: 'Inter-Regular',
            fontSize: 14,
            fontWeight: '500',
            color: '#0C1A30',
            lineHeight: 25,
          }}>
          Best Seller
        </CustomText>
        <TouchableOpacity>
          <CustomText
            style={{
              fontFamily: 'Inter-Regular',
              fontSize: 12,
              fontWeight: '500',
              color: '#6A947E',
              lineHeight: 22,
            }}>
            See All
          </CustomText>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {allProducts?.data.map(product => (
          <View key={product._id} style={{paddingHorizontal: 10}}>
            <ProductCard
              name={product.name}
              image={product.image[0] as string}
              rating={product.rating}
              price={product.price}
              sold={product.noOfItems}
            />
          </View>
        ))}
      </ScrollView>
      <Spacer size={10} />
      <View style={{width: Dimensions.get('window').width}}>
        <Carousel
          loop
          style={{alignItems: 'center'}}
          width={Dimensions.get('window').width}
          height={206}
          autoPlay={true}
          data={adsImage3}
          scrollAnimationDuration={5000}
          // onSnapToItem={index => console.log('current index:', index)}
          renderItem={({item}) => (
            <View
              key={item.id}
              style={{
                justifyContent: 'center',
              }}>
              <Icon name={item.image} color="white" />
            </View>
          )}
        />
      </View>
      <Spacer size={10} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 10,
        }}>
        <CustomText
          style={{
            fontFamily: 'Inter-Regular',
            fontSize: 14,
            fontWeight: '500',
            color: '#0C1A30',
            lineHeight: 25,
          }}>
          New Arrivals
        </CustomText>
        <TouchableOpacity>
          <CustomText
            style={{
              fontFamily: 'Inter-Regular',
              fontSize: 12,
              fontWeight: '500',
              color: '#6A947E',
              lineHeight: 22,
            }}>
            See All
          </CustomText>
        </TouchableOpacity>
      </View>
      <View style={{height: 2, backgroundColor: '#E5E7EB'}} />
      <Spacer size={20} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {allProducts?.data.map(product => (
          <View key={product._id} style={{paddingHorizontal: 10}}>
            <ProductCard
              name={product.name}
              image={product.image[0] as string}
              rating={product.rating}
              price={product.price}
              sold={product.noOfItems}
            />
          </View>
        ))}
      </ScrollView>
      <Spacer size={10} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 10,
        }}>
        <CustomText
          style={{
            fontFamily: 'Inter-Regular',
            fontSize: 14,
            fontWeight: '500',
            color: '#0C1A30',
            lineHeight: 25,
          }}>
          Top Rated
        </CustomText>
        <TouchableOpacity>
          <CustomText
            style={{
              fontFamily: 'Inter-Regular',
              fontSize: 12,
              fontWeight: '500',
              color: '#6A947E',
              lineHeight: 22,
            }}>
            See All
          </CustomText>
        </TouchableOpacity>
      </View>
      <View style={{height: 2, backgroundColor: '#E5E7EB'}} />
      <Spacer size={20} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {allProducts?.data.map(product => (
          <View key={product._id} style={{paddingHorizontal: 10}}>
            <ProductCard
              name={product.name}
              image={product.image[0] as string}
              rating={product.rating}
              price={product.price}
              sold={product.noOfItems}
            />
          </View>
        ))}
      </ScrollView>
      <Spacer size={10} />
      <View style={{width: Dimensions.get('window').width}}>
        <Carousel
          loop
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            alignContent: 'center',
            alignSelf: 'center',
          }}
          width={Dimensions.get('window').width}
          height={325}
          autoPlay={true}
          data={bottomAds}
          scrollAnimationDuration={5000}
          // onSnapToItem={index => console.log('current index:', index)}
          renderItem={({item}) => (
            <View
              key={item.id}
              style={{
                justifyContent: 'center',
              }}>
              <Icon name={item.image} color="white" />
            </View>
          )}
        />
      </View>
      <Spacer size={40} />
      <Modal
        onRequestClose={() => setShowCategory(false)}
        animationType="slide"
        transparent={true}
        visible={showCategory}>
        <View style={styles.modal}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 30, marginBottom: 20}}>
            <View style={styles.modalBody}>
              <View style={styles.arrow}>
                <CustomText
                  style={{
                    color: '#0C1A30',
                    fontFamily: 'Inter_regular',
                    fontWeight: '700',
                    fontSize: 14,
                  }}>
                  All Categories
                </CustomText>
                <TouchableOpacity onPress={() => setShowCategory(false)}>
                  <Icon name="xIcon" color="white" />
                </TouchableOpacity>
              </View>
              <Spacer size={20} />
              <View style={{height: 2, backgroundColor: '#E5E7EB'}} />
              <Spacer size={20} />
              <View
                style={{
                  // padding: 10,
                  paddingHorizontal: 18,
                  width: '100%',
                  justifyContent: 'center',
                }}>
                <FlatList
                  data={fullCategories}
                  numColumns={3}
                  keyExtractor={item => item.id}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      key={item.id}
                      onPress={() => {
                        setShowCategory(false),
                          navigation.navigate('CategoryScreen', {
                            category: item.name,
                          });
                      }}>
                      <View
                        style={{
                          paddingHorizontal: 10,
                          alignItems: 'center',
                          alignSelf: 'center',
                          justifyContent: 'center',
                        }}>
                        <View
                          style={{
                            height: 48,
                            width: 48,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 10,
                            backgroundColor: item.bg,
                          }}>
                          <Icon name={item.icon} color="white" />
                        </View>
                        <View>
                          <Spacer size={5} />
                          <CustomText
                            style={{
                              fontFamily: 'Inter-Regular',
                              fontWeight: '400',
                              fontSize: 12,
                              textAlign: 'center',
                              color: '#0C1A30',
                            }}>
                            {item.name}
                          </CustomText>
                        </View>
                      </View>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default HomeScreen;
