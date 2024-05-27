import * as React from 'react';
import {
  StyleSheet,
  Dimensions,
  StatusBar,
  StatusBarProps,
  KeyboardAvoidingView,
} from 'react-native';
import {useCustomTheme} from '../../store/settings/theme/hook';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CustomThemeType} from '../../store/settings/theme/modes';
const {width, height} = Dimensions.get('window');

const Wrapper = ({
  children,
  type = 'quickActions',
}: {type?: keyof CustomThemeType['colors']} & React.PropsWithChildren) => {
  const {colors, sizes} = useCustomTheme();
  return (
    <SafeAreaView
      style={[
        styles.container,
        {backgroundColor: colors[type]?.backgroundColor},
      ]}>
      <StatusBar
        barStyle={
          (colors[type]?.statusbar as StatusBarProps['barStyle']) ??
          'dark-content'
        }
      />
      <KeyboardAvoidingView
        style={[
          styles.container,
          {backgroundColor: colors[type].backgroundColor, padding: sizes.md},
        ]}>
        {children}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Wrapper;

const styles = StyleSheet.create({
  container: {
    height,
    width: '100%',
    flex: 1,
  },
});
