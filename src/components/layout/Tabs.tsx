import React from 'react';
import {ReactNode, useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import CustomText from '../typography/CustomText';
import {useCustomTheme} from '@/store/settings/theme/hook';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import Spacer from './Spacer';

export type TabType = {
  title: string;
  content: ReactNode;
}[];

const Tabs = ({tabs}: {tabs: TabType}) => {
  const {
    fonts,
    colors: {
      bills: {
        tab: {
          main: {background: backgroundColor},
          background: {active: activebg, inactive},
          color: {active: activeColor, inactive: inactiveColor},
        },
      },
    },
  } = useCustomTheme();
  const [active, setActive] = useState(0);
  return (
    <View>
      <View style={[styles.tabContainer, {backgroundColor}]}>
        {tabs.map(({title, content}, index) => (
          <TouchableWithoutFeedback
            onPress={() => {
              setActive(index);
            }}>
            <View
              style={[
                styles.tab,
                {
                  width: (Dimensions.get('window').width - 50) / tabs?.length,
                  backgroundColor: active === index ? activebg : inactive,
                },
              ]}>
              <CustomText
                style={[
                  active === index
                    ? fonts.tabs.title.active
                    : fonts.tabs.title.inactive,
                  {color: active === index ? activeColor : inactiveColor},
                ]}>
                {title}
              </CustomText>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </View>
      <Spacer size={23} />
      <View>{tabs[active].content}</View>
    </View>
  );
};

export default Tabs;

const styles = StyleSheet.create({
  tab: {
    paddingVertical: 18,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    borderRadius: 12,
  },
  tabContainer: {
    flexDirection: 'row',
    flex: 1,
  },
});
