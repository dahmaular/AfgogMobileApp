import {DefaultTheme, DarkTheme} from '@react-navigation/native';
import {light} from './light';
import {dark} from './dark';

export const fontStyles = {
  '200': 'Inter-ExtraLight',
  '300': 'Inter-Light',
  '400': 'Inter-Regular',
  '500': 'Inter-Medium',
  '600': 'Inter-SemiBold',
  '700': 'Inter-Bold',
  '800': 'Inter-ExtraBold',
  '900': 'Inter-Black',
};

const general = {
  sizes: {
    md: 25,
    sm: 10,
  },
  iconSizes: {
    sm: 10,
    md: 18,
  },
  fonts: {
    normal: {
      fontSize: 14,
      fontWeight: '400' as '400',
      lineHeight: 24,
    },
    input: {
      label: {fontSize: 14, fontWeight: '600' as '600', lineHeight: 19.1},
      text: {fontSize: 14, fontWeight: '400' as '400', lineHeight: 21},
    },
    button: {
      text: {fontSize: 18, fontWeight: '600' as '600', lineHeight: 24},
    },
    header: {fontSize: 24, fontWeight: '700' as '700', lineHeight: 37.25},
    accountTile: {
      type: {fontSize: 11, fontWeight: '500' as '500', lineHeight: 22},
      currency: {fontSize: 12, fontWeight: '700' as '700', lineHeight: 16.37},
      accountNo: {fontSize: 14, fontWeight: '700' as '700', lineHeight: 16.37},
      amount: {fontSize: 20, fontWeight: '800' as '800', lineHeight: 28},
      title: {fontSize: 16, fontWeight: '700' as '700', lineHeight: 21.82},
      beneficiary: {
        title: {
          fontSize: 16,
          fontWeight: '600' as '600',
          lineHeight: 21.82,
        },
        subtitle: {
          fontSize: 14,
          fontWeight: '500' as '500',
          lineHeight: 19.1,
        },
        accountNo: {
          fontSize: 14,
          fontWeight: '500' as '500',
          lineHeight: 19.1,
        },
      },
      details: {
        text: {
          fontSize: 14,
          fontWeight: '600' as '600',
          lineHeight: 19.1,
        },
      },
    },
    previousStep: {
      fontSize: 14,
      fontWeight: '800' as '800',
      lineHeight: 19.1,
    },
    password_rules: {
      fontSize: 10,
      lineHeight: 18,
      fontWeight: '400' as '400',
    },
    card: {
      text: {
        fontSize: 16,
        fontWeight: '600' as '600',
        lineHeight: 21.82,
      },
    },
    tabs: {
      title: {
        active: {
          fontSize: 16,
          fontWeight: '700' as '700',
          lineHeight: 16,
        },
        inactive: {
          fontSize: 16,
          fontWeight: '500' as '500',
          lineHeight: 16,
        },
      },
    },
    modal: {
      title: {
        fontSize: 14,
        fontWeight: '600' as '600',
        lineHeight: 19.2,
      },
      label: {
        fontSize: 13,
        fontWeight: '400' as '400',
        lineHeight: 17.73,
      },
      text: {
        fontSize: 13,
        fontWeight: '400' as '400',
        lineHeight: 17.73,
      },
      button: {
        fontSize: 14,
        fontWeight: '600' as '600',
        lineHeight: 24,
      },
    },
    avatar: {
      text: {
        fontSize: 14,
        fontWeight: '700' as '700',
        lineHeight: 19.1,
      },
    },
    settingsTile: {
      title: {
        fontSize: 14,
        fontWeight: '600' as '600',
        lineHeight: 19.1,
      },
      text: {
        fontSize: 12,
        fontWeight: '300' as '300',
        lineHeight: 16.37,
      },
    },
    resetPassword: {
      fontSize: 14,
      fontWeight: '600' as '600',
      lineHeight: 19.1,
    },
    personalSettingsTile: {
      title: {
        fontSize: 14,
        fontWeight: '700' as '700',
        lineHeight: 21,
      },
      text: {
        fontSize: 14,
        fontWeight: '500' as '500',
        lineHeight: 21,
      },
    },
    securityTile: {
      title: {
        fontSize: 14,
        fontWeight: '700' as '700',
        lineHeight: 21,
      },
      text: {
        fontSize: 14,
        fontWeight: '500' as '500',
        lineHeight: 21,
      },
    },
    instructions: {
      fontSize: 12,
      fontWeight: '400' as '400',
      lineHeight: 18,
    },
    bottomInfo: {
      fontSize: 12,
      fontWeight: '500' as '500',
      lineHeight: 17.28,
    },
    radio: {
      extraInfo: {
        fontSize: 11,
        fontWeight: '600' as '600',
        lineHeight: 16.5,
      },
      title: {
        fontSize: 14,
        fontWeight: '600 as 600',
        lineHeight: 21,
      },
    },
    doc: {
      title: {
        fontSize: 14,
        fontWeight: '700' as '700',
        lineHeight: 24,
      },
      status: {
        fontSize: 13,
        fontWeight: '600' as '600',
        lineHeight: 24,
      },
      italics: {
        fontSize: 12,
        fontWeight: '400' as '400',
        lineHeight: 18,
      },
    },
  },
};

export const LightModeTheme = {
  ...DefaultTheme,
  colors: {
    ...light,
  },
  ...general,
};

export const DarkModeTheme = {
  ...DarkTheme,
  colors: {
    ...dark,
  },
  ...general,
};

export type CustomThemeType = typeof LightModeTheme;
