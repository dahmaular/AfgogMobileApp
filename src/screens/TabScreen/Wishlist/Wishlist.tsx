import {View, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from './styles';
import Header from '@/components/Header';

import {WishListNavigationProps} from '@/navigation/types';
import Spacer from '@/components/layout/Spacer';
import Wrapper from '@/components/layout/Wrapper';
import ProductCard from '@/components/Card/Product';
import {wishListData} from './wishlistMock';
import CustomText from '@/components/typography/CustomText';

const WishlistScreen = ({navigation}: WishListNavigationProps<'Wishlist'>) => {
  return (
    <Wrapper type="settings">
      <View>
        <Header title="Wishlist" hasBackIcon />
      </View>
      <Spacer size={40} />
      <View>
        <CustomText> ({wishListData.length}) items in Wishlist</CustomText>
      </View>
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
            <TouchableOpacity
              key={item.id}
              style={styles.cardView}
              onPress={() => navigation.navigate(null)}>
              <ProductCard
                name={item.name}
                image={item.image}
                rating={item.rating}
                price={item.price}
                sold={item.sold}
              />
            </TouchableOpacity>
          )}
        />
      </View>
      <Spacer size={30} />
    </Wrapper>
  );
};

export default WishlistScreen;
