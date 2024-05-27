import {
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';

import {PrivateNavigationProps} from '@/navigation/types';
import {Icon} from '@/assets/svg/Icon';
import CustomText from '@/components/typography/CustomText';
import Spacer from '@/components/layout/Spacer';
import ProductCard from '@/components/Card/Product';
import {wishListData} from '../Wishlist/wishlistMock';
import {products} from './HomeScreen';
import CheckBox from '@react-native-community/checkbox';
import {carton, primary, secondary} from '@/theme/colorPatte';
import Button from '@/components/Button/button';

const CategoryScreen = ({
  navigation,
  route,
}: PrivateNavigationProps<'CategoryScreen'>) => {
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const {category} = route.params;
  const [isSelected, setSelection] = useState(false);
  const [search, setSearch] = useState<string>('');

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
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <CustomText style={styles.catTitle}>Category</CustomText>
          </View>
          <View>
            <TouchableOpacity>
              <Icon name="cartIcon" color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={{height: 2, backgroundColor: '#E5E7EB', width: '100%'}} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Spacer size={20} />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
          }}>
          <CustomText style={styles.catTitle}>{category}</CustomText>
          <TouchableOpacity onPress={() => setShowFilter(true)}>
            <Icon name="filter" color="#fff" />
          </TouchableOpacity>
        </View>
        <Spacer size={40} />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#000',
            borderRadius: 10,
            height: 59,
            width: '90%',
            alignSelf: 'center',
            paddingHorizontal: 20,
            justifyContent: 'space-between',
          }}>
          {/* <CustomText style={{color: '#fff', fontSize: 14, fontWeight: '400'}}>
            Search Product Name
          </CustomText> */}
          <TextInput
            placeholder="Search Product Name"
            placeholderTextColor="#fff"
            value={search}
            onChangeText={e => setSearch(e)}
            style={styles.inputCat}
          />
          <Icon name="searchWhite" color="#fff" />
        </View>
        <Spacer size={30} />

        <View
          style={{
            alignSelf: 'center',
            width: '100%',
          }}>
          <FlatList
            data={wishListData}
            numColumns={2}
            columnWrapperStyle={styles.flatContainer}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <View key={item.id} style={styles.cardView}>
                <ProductCard
                  name={item.name}
                  image={item.image}
                  rating={item.rating}
                  price={item.price}
                  sold={item.sold}
                  onPress={() =>
                    navigation.navigate('ProductScreen', {
                      product: item,
                    })
                  }
                />
              </View>
            )}
          />
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
            Recently Searched
          </CustomText>
        </View>
        <View style={{height: 2, backgroundColor: '#E5E7EB'}} />
        <Spacer size={20} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {products.map(product => (
            <View key={product.id} style={{paddingHorizontal: 10}}>
              <ProductCard
                name={product.name}
                image={product.image}
                rating={product.rating}
                price={product.price}
                sold={product.sold}
              />
            </View>
          ))}
        </ScrollView>
      </ScrollView>
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

export default CategoryScreen;
