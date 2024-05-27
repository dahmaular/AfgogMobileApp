import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';

import {useNavigation} from '@react-navigation/native';
import {Icon} from '@/assets/svg/Icon';

const {width} = Dimensions.get('window');
interface HeaderProps {
  title?: string;
  hasBackIcon?: boolean;
  titleColor?: string;
  onPress?: () => void;
  rightSVG?: boolean;
}
const Header = ({
  title,
  hasBackIcon,
  onPress,
  titleColor,
  rightSVG,
}: HeaderProps) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        {hasBackIcon ? (
          <>
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={navigation.goBack} style={styles.icon}>
                {/* <ArrowLeft /> */}
                <Icon name="backIcon" />
              </TouchableOpacity>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: width / 3.2,
              }}>
              <Text
                style={
                  titleColor
                    ? [styles.title, {color: titleColor}]
                    : styles.title
                }>
                {title}
              </Text>
            </View>
          </>
        ) : (
          <View style={styles.titleView}>
            <Text
              style={
                titleColor ? [styles.title, {color: titleColor}] : styles.title
              }>
              {title}
            </Text>
          </View>
        )}
        {rightSVG && (
          <View style={styles.header}>
            <Icon name="notyIcon" color="white" />
            <TouchableWithoutFeedback onPress={onPress}>
              <Icon name="cartIcon" color="white" />
            </TouchableWithoutFeedback>
          </View>
        )}
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // flexDirection: 'row',
    width,
    // justifyContent: 'center',
    // alignItems: 'center',
    paddingHorizontal: 10,
  },
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    position: 'absolute',
    left: 0,
    width: 36,
    height: 36,
    justifyContent: 'center',
  },
  icon: {
    paddingHorizontal: 2,
  },
  title: {
    fontFamily: 'Nunito-Medium',
    color: '#1E1E1E',
    lineHeight: 33,
    fontWeight: '600',
    fontSize: 19,
  },
  titleView: {
    // marginTop: 30,
    // alignContent: 'center',
    // width,
    // marginLeft: width / 6.5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: 5,
  },
});
