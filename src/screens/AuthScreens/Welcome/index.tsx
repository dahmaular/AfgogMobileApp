import {
  View,
  ImageBackground,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';

import OnboardBg1 from '@/assets/image/Onboarding1.png';
import OnboardBg2 from '@/assets/image/Onboarding2.png';
import OnboardBg3 from '@/assets/image/Onboarding3.png';
import {AuthNavigationProps} from '@/navigation/types';
import Spacer from '@/components/layout/Spacer';
import CustomText from '@/components/typography/CustomText';
import {Icon} from '@/assets/svg/Icon';

const sliderImages = [
  {
    id: 1,
    title: 'Welcome to our vibrant e-commerce wonderland!',
    sliderImage: OnboardBg1,
    cta: 'Next',
  },
  {
    id: 2,
    title: 'Discover a world of convenience and style',
    sliderImage: OnboardBg2,
    cta: 'Next',
  },
  {
    id: 3,
    title: 'Enter the gateway to great deals and fantastic finds',
    sliderImage: OnboardBg3,
    cta: 'Get Started',
  },
];

const WelcomeScreen = ({navigation}: AuthNavigationProps<'WelcomeScreen'>) => {
  const [sliderIndex, setSliderIndex] = useState(0);
  const handleSetSliderIndex = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    //get viewSize width
    const viewSize = event.nativeEvent.layoutMeasurement.width;

    //get current position, using horizontal off set x
    const contentOffSet = event.nativeEvent.contentOffset.x;

    //divide current position by viewSize with to get current scroll page.
    const selectedIndex = Math.floor(contentOffSet / viewSize);
    setSliderIndex(selectedIndex);
  };

  return (
    <ScrollView>
      <ScrollView
        horizontal
        pagingEnabled
        // contentContainerStyle={styles.scrollContainer}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleSetSliderIndex}>
        {sliderImages.map(slide => (
          <ImageBackground
            style={styles.container}
            key={slide.id}
            source={slide.sliderImage}>
            <View>
              <Spacer size={80} />
              <View style={{flexDirection: 'row', padding: 15}}>
                <View style={{width: 330}}>
                  <CustomText style={styles.title}>{slide.title}</CustomText>
                </View>
                <TouchableOpacity
                  style={{position: 'absolute', right: 15}}
                  onPress={() =>
                    navigation.navigate('RegisterScreen', {route: 'ecommerce'})
                  }>
                  <CustomText style={{color: 'black'}}>Skip</CustomText>
                </TouchableOpacity>
              </View>
              <Spacer size={Dimensions.get('window').height / 1.8} />
              <View>
                <View style={{flexDirection: 'row', paddingHorizontal: 30}}>
                  {sliderImages.map((slider, index) => (
                    <View key={slider.id} style={{padding: 3}}>
                      {Boolean(index === sliderIndex) ? (
                        <Icon name="ellipseCurrent" color="white" />
                      ) : (
                        <Icon name="ellipse" color="white" />
                      )}
                    </View>
                  ))}
                </View>
              </View>
              <Spacer size={50} />
              <View
                style={{
                  paddingHorizontal: 15,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <CustomText
                  style={{
                    fontSize: 16,
                    color: slide.id !== 3 ? 'black' : 'white',
                  }}>
                  Already have an account?{' '}
                </CustomText>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('LoginScreen', {route: 'ecommerce'})
                  }>
                  <Spacer size={1} />
                  <CustomText style={{color: '#FC820B'}}>Sign in</CustomText>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={{position: 'absolute', right: 20, bottom: 0}}
                onPress={() =>
                  slide.id === 3
                    ? navigation.navigate('RegisterScreen', {
                        route: 'ecommerce',
                      })
                    : null
                }>
                <CustomText
                  style={{
                    fontSize: 14,
                    fontFamily: 'Inter-SemiBold',
                    fontWeight: '700',
                    color: '#fff',
                  }}>
                  {slide.cta}
                </CustomText>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        ))}
      </ScrollView>
    </ScrollView>
  );
};

export default WelcomeScreen;
