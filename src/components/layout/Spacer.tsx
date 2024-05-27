import * as React from 'react';
import { View } from 'react-native';

interface SpacerProps {
  size: number;
}

const Spacer = ({ size }: SpacerProps) => {
  return <View style={{ height: size, width: size }} />;
};

export default Spacer;
