import {SvgProps} from 'react-native-svg';

import {iconPack, IconPackType} from './iconPack';
import React from 'react';

export type IconProps = Omit<SvgProps, 'color'> & {
  name: IconPackType;
  size?: keyof {
    sm: 10;
    md: 18;
  };
  color?: string;
};

const Icon = (props: IconProps) => {
  //   const {colors} = useCustomTheme();
  const {name, size = 'sm', color = 'white', ...rest} = props;

  const IconName = iconPack[name];

  if (!IconName) {
    console.error(`Icon "${name}" not found in icon pack!`);
    return <></>; // Or return a fallback icon component here
  }

  return (
    <IconName style={{width: size, height: size}} fill={color} {...rest} />
  );
};

export {Icon};
