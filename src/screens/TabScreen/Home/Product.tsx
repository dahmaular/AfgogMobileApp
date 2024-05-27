/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './styles';
import Toast from 'react-native-toast-message';

import {PrivateNavigationProps} from '@/navigation/types';
import {Icon} from '@/assets/svg/Icon';
import CustomText from '@/components/typography/CustomText';
import Spacer from '@/components/layout/Spacer';
import ProductCard from '@/components/Card/Product';
import CheckBox from '@react-native-community/checkbox';
import {carton, primary, secondary} from '@/theme/colorPatte';
import Button from '@/components/Button/button';
import {
  useAddToCartMutation,
  useGetProductsQuery,
  useGetUserCartQuery,
  useLazyGetProductQuery,
} from '@/services/product/service';
import SingleProductCard from '@/components/Card/SingleProduct';
import {useSelector} from 'react-redux';
import {RootState} from '@/store';

interface ProductProps {
  id: string;
  name: string;
  categoryId: string;
  brandId: string;
  type: string;
  availability: string;
  description: string;
  specification: string;
  image: {}[];
  amount: string;
  price: string;
  rating: string;
  color: string;
  size: [];
  noOfItems: string;
}

const ProductScreen = ({
  navigation,
  route,
}: PrivateNavigationProps<'ProductScreen'>) => {
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const {id: prodId} = route.params;
  const [isSelected, setSelection] = useState(false);
  const [product, setProduct] = useState<ProductProps>();

  const user = useSelector((state: RootState) => state.user.authData);
  const {data: allProducts} = useGetProductsQuery();
  const [getProduct, {isLoading}] = useLazyGetProductQuery();
  const [addToCart, {isLoading: cartLoading}] = useAddToCartMutation();
  const {data: cartData} = useGetUserCartQuery();

  const getProd = async (id: string) => {
    const fetchProduct = await getProduct({id}).unwrap();
    setProduct(fetchProduct.data);
  };

  const showToast = (data: string) => {
    Toast.show({
      type: 'success',
      text1: 'Cart',
      text2: `${data} 👋`,
    });
  };

  const handleAddToCart = async () => {
    const cartRequestData = {
      amount: product.price,
      count: 1,
      product: prodId,
      userId: user._id,
    };
    console.log(cartData);
    const addCart = await addToCart(cartRequestData).unwrap();
    console.log('Cart res', addCart);
    if (addCart.message) {
      showToast(addCart.message);
    }
  };

  useEffect(() => {
    getProd(prodId);
  }, [prodId]);

  return (
    <View style={styles.container}>
      <Spacer size={20} />
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            paddingHorizontal: 5,
            backgroundColor: '#fff',
          }}>
          <View>
            <TouchableOpacity onPress={navigation.goBack}>
              <Icon
                name="backArrowCircle"
                color="#F5F6FA"
                width={40}
                height={40}
              />
            </TouchableOpacity>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity>
              <Icon name="search" color="white" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon name="cartIcon" color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={{height: 2, backgroundColor: '#E5E7EB', width: '100%'}} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Spacer size={20} />
        {isLoading && (
          <View>
            <Spacer size={30} />
            <ActivityIndicator animating color={primary} size="large" />
          </View>
        )}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {product?.image?.map(image => (
            <SingleProductCard image={image as string} />
          ))}
        </ScrollView>
        <Spacer size={20} />
        <View
          style={{
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            width: '80%',
          }}>
          <CustomText style={styles.productName}>{product?.name}</CustomText>

          <Spacer size={10} />
          <View style={styles.moneyView}>
            <CustomText style={styles.productPrice}>
              ₦{product?.price}
            </CustomText>
            <Spacer size={15} />
            <CustomText style={styles.productAmount}>
              ₦{product?.amount}
            </CustomText>
            {/* <CustomText style={styles.productAmount}>
              -{Math.round(Number(product.price / product.amount) / 100) * 100}
            </CustomText> */}
          </View>
          <CustomText style={styles.availability}>
            {product?.availability}
          </CustomText>
          <Spacer size={20} />
          <View style={styles.rating}>
            <Icon name="ratingStar" color="#fff" />
            <CustomText style={styles.availability}>
              {product?.rating}
            </CustomText>
          </View>
        </View>
        <Spacer size={10} />
        <View style={{height: 2, backgroundColor: '#E5E7EB'}} />
        <Spacer size={10} />

        <View style={styles.description}>
          <CustomText style={styles.descriptionTitle}>
            Product Description
          </CustomText>
          <Spacer size={10} />
          <CustomText style={styles.descriptionText}>
            {product?.description}
          </CustomText>
        </View>

        <Spacer size={20} />
        <View style={{height: 2, backgroundColor: '#E5E7EB'}} />
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
            More to love
          </CustomText>
        </View>

        <Spacer size={10} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {allProducts?.data.map(product => (
            <View key={product._id} style={{paddingHorizontal: 10}}>
              <ProductCard
                name={product.name}
                image={product.image[0] as string}
                rating={product.rating}
                price={product.price}
                // sold={product.sold}
              />
            </View>
          ))}
        </ScrollView>
        <Spacer size={20} />
        <View>
          <View style={styles.ratingTop}>
            <CustomText style={styles.descriptionTitle}>Review (0)</CustomText>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon name="ratingStar" />
              <CustomText style={styles.descriptionTitle}>
                {product?.rating}
              </CustomText>
            </View>
          </View>
        </View>
        <Spacer size={20} />
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
            Recently viewed
          </CustomText>
        </View>

        <Spacer size={10} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {allProducts?.data.map(product => (
            <View key={product._id} style={{paddingHorizontal: 10}}>
              <ProductCard
                name={product.name}
                image={product.image[0] as string}
                rating={product.rating}
                price={product.price}
                // sold={product.sold}
              />
            </View>
          ))}
        </ScrollView>
        <Spacer size={20} />
      </ScrollView>
      <Spacer size={50} />
      <View style={styles.footerBtn}>
        <Button
          text="Add to cart"
          bgColor="#C98848"
          containerStyle={{
            width: '90%',
            height: 50,
            backgroundColor: '#C98848',
          }}
          onPress={handleAddToCart}
          loading={cartLoading}
        />
      </View>
      {/* <Spacer size={30} /> */}
      <Modal
        onRequestClose={() => setShowFilter(false)}
        animationType="slide"
        transparent={true}
        visible={showFilter}>
        <View style={styles.modal}>
          <View>
            <View style={[styles.modalBody, styles.catModalBody]}>
              <View style={styles.arrow}>
                <CustomText
                  style={{
                    color: '#fff',
                    fontFamily: 'Inter_regular',
                    fontWeight: '700',
                    fontSize: 14,
                  }}>
                  Filter & Sorting
                </CustomText>
                <TouchableOpacity onPress={() => setShowFilter(false)}>
                  <Icon name="closeWhite" color="white" />
                </TouchableOpacity>
              </View>
              <Spacer size={20} />
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View>
                  <CustomText
                    style={{
                      color: '#fff',
                      fontFamily: 'Inter_regular',
                      fontWeight: '700',
                      fontSize: 14,
                    }}>
                    Filter
                  </CustomText>
                  <View
                    style={{backgroundColor: '#C98848', width: 20, height: 1.5}}
                  />
                </View>
                <Spacer size={20} />
                <View>
                  <CustomText
                    style={{
                      color: '#fff',
                      fontFamily: 'Inter_regular',
                      fontWeight: '700',
                      fontSize: 14,
                    }}>
                    Sorting
                  </CustomText>
                  <View
                    style={{backgroundColor: '#C98848', width: 20, height: 1.5}}
                  />
                </View>
              </View>
              <Spacer size={10} />
              <View style={{height: 2, backgroundColor: '#EDEDED'}} />
              <Spacer size={20} />
              <ScrollView showsVerticalScrollIndicator={false}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <CustomText
                    style={{
                      color: '#8f8f8f',
                      fontWeight: '500',
                      fontFamily: 'Inter-Regular',
                    }}>
                    Name (A-Z)
                  </CustomText>
                  <CheckBox
                    disabled={false}
                    value={isSelected}
                    onValueChange={newValue => {
                      setSelection(newValue);
                    }}
                    tintColors={{true: 'white', false: carton}}
                    onCheckColor={secondary}
                    onTintColor={secondary}
                  />
                </View>
                <Spacer size={20} />
                <View style={{height: 2, backgroundColor: '#EDEDED'}} />
                <Spacer size={20} />
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <CustomText
                    style={{
                      color: '#8f8f8f',
                      fontWeight: '500',
                      fontFamily: 'Inter-Regular',
                    }}>
                    Name (Z-A)
                  </CustomText>
                  <CheckBox
                    disabled={false}
                    value={isSelected}
                    onValueChange={newValue => {
                      setSelection(newValue);
                    }}
                    tintColors={{true: 'white', false: carton}}
                    onCheckColor={secondary}
                    onTintColor={secondary}
                  />
                </View>
                <Spacer size={20} />
                <View style={{height: 2, backgroundColor: '#EDEDED'}} />
                <Spacer size={20} />
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <CustomText
                    style={{
                      color: '#8f8f8f',
                      fontWeight: '500',
                      fontFamily: 'Inter-Regular',
                    }}>
                    Price (High - Low)
                  </CustomText>
                  <CheckBox
                    disabled={false}
                    value={isSelected}
                    onValueChange={newValue => {
                      setSelection(newValue);
                    }}
                    tintColors={{true: 'white', false: carton}}
                    onCheckColor={secondary}
                    onTintColor={secondary}
                  />
                </View>
                <Spacer size={20} />
                <View style={{height: 2, backgroundColor: '#EDEDED'}} />
                <Spacer size={20} />
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <CustomText
                    style={{
                      color: '#8f8f8f',
                      fontWeight: '500',
                      fontFamily: 'Inter-Regular',
                    }}>
                    Price (Low - High)
                  </CustomText>
                  <CheckBox
                    disabled={false}
                    value={isSelected}
                    onValueChange={newValue => {
                      setSelection(newValue);
                    }}
                    tintColors={{true: 'white', false: carton}}
                    onCheckColor={secondary}
                    onTintColor={secondary}
                  />
                </View>
                <Spacer size={20} />
                <View style={{height: 2, backgroundColor: '#EDEDED'}} />
                <Spacer size={20} />
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <CustomText
                    style={{
                      color: '#8f8f8f',
                      fontWeight: '500',
                      fontFamily: 'Inter-Regular',
                    }}>
                    Type (Fairly used?)
                  </CustomText>
                  <CheckBox
                    disabled={false}
                    value={isSelected}
                    onValueChange={newValue => {
                      setSelection(newValue);
                    }}
                    tintColors={{true: 'white', false: carton}}
                    onCheckColor={secondary}
                    onTintColor={secondary}
                  />
                </View>
                <Spacer size={20} />
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Button
                    text="Reset"
                    containerStyle={{
                      borderRadius: 10,
                      borderWidth: 1,
                      borderColor: '#fff',
                      width: '95%',
                    }}
                    onPress={() => setShowFilter(false)}
                  />
                  <Button
                    text="Apply"
                    containerStyle={{
                      borderRadius: 10,
                      backgroundColor: primary,
                      width: '95%',
                    }}
                    onPress={() => setShowFilter(false)}
                  />
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ProductScreen;
