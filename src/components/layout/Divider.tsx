import {useCustomTheme} from '@/store/settings/theme/hook';
import React from 'react';
import {StyleSheet, View} from 'react-native';

const Divider = () => {
  const {
    colors: {
      settings: {
        group: {divider},
      },
    },
  } = useCustomTheme();
  return <View style={[styles.divider, {backgroundColor: divider.color}]} />;
};

export default Divider;

const styles = StyleSheet.create({
  divider: {
    height: 1,
  },
});
