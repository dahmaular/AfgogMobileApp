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

import OnboardBg1 from '@/assets/image/propBg1.png';
import OnboardBg2 from '@/assets/image/propBg2.png';
import BottomCurve from '@/assets/image/EllipseCurve.png';
import {AuthNavigationProps} from '@/navigation/types';
import Spacer from '@/components/layout/Spacer';
import CustomText from '@/components/typography/CustomText';
import {Icon} from '@/assets/svg/Icon';
import {primary} from '@/theme/colorPatte';

const sliderImages = [
  {
    id: 1,
    title: '"Welcome to your future home hub!',
    subTitle: ' Lets find your dream space together."',
    sliderImage: OnboardBg1,
    cta: 'Next',
  },
  {
    id: 2,
    title: 'List your property!',
    subTitle:
      'Get verified buyers of your property with an easy to manage dashboard!',
    sliderImage: OnboardBg2,
    cta: 'Go',
  },
];

const PropWelcomeScreen = ({
  navigation,
}: AuthNavigationProps<'WelcomeScreen'>) => {
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
              <Spacer size={Dimensions.get('window').height / 1.8} />
              <View style={styles.propWelcome}>
                <Spacer size={20} />
                <View style={{width: '100%'}}>
                  <CustomText style={[styles.proTitle, styles.proTitleProp]}>
                    {slide.title}
                  </CustomText>
                </View>
                <View style={{width: '100%'}}>
                  <CustomText style={styles.proSubTitle}>
                    {slide.subTitle}
                  </CustomText>
                </View>
                <Spacer size={50} />
                <View>
                  <View style={{flexDirection: 'row'}}>
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
                    flexDirection: 'row',
                    alignItems: 'center',
                    position: 'absolute',
                    bottom: 40,
                  }}>
                  <CustomText
                    style={{
                      fontSize: 16,
                      color: '#DADADA',
                      fontFamily: 'Inter-Regular',
                    }}>
                    Already have an account?{' '}
                  </CustomText>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('LoginScreen', {route: 'property'})
                    }>
                    <Spacer size={1} />
                    <CustomText
                      style={{color: '#fff', fontFamily: 'Inter-Regular'}}>
                      Sign in
                    </CustomText>
                  </TouchableOpacity>
                </View>

                <ImageBackground
                  source={BottomCurve}
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    alignSelf: 'flex-end',
                    height: 106,
                    width: 103,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={() =>
                      slide.id === 2
                        ? navigation.navigate('RegisterScreen', {
                            route: 'property',
                          })
                        : null
                    }>
                    <CustomText
                      style={{
                        color: '#fff',
                        fontFamily: 'Inter-Regular',
                        fontWeight: '700',
                      }}>
                      {slide.cta}
                    </CustomText>
                  </TouchableOpacity>
                </ImageBackground>
              </View>
            </View>
          </ImageBackground>
        ))}
      </ScrollView>
    </ScrollView>
  );
};

export default PropWelcomeScreen;
