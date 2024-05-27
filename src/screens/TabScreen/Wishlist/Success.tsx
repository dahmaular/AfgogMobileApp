import {View, Text} from 'react-native';
import React from 'react';
import {styles} from './styles';

import Button from '@/components/Button/button';
import {PrivateNavigationProps} from '@/navigation/types';
import {Icon} from '@/assets/svg/Icon';

const PosRequestSuccess = ({
  navigation,
}: PrivateNavigationProps<'TransferDone'>) => {
  return (
    <View style={styles.transferDone}>
      <View style={styles.content}>
        <Icon name="thickIcon" color="white" />
        <Text style={styles.contentTitle}>POS Request Submitted</Text>
        <View style={styles.subContent}>
          <Text style={styles.subContentText}>
            Your request for a PoS Terminal has been received. Kindly check your
            email for details.
          </Text>
        </View>

        <View style={styles.btn}>
          <Button
            onPress={() => navigation.navigate('HomeScreen')}
            text="Return to Dashboard"
            bgColor={'transparent'}
          />
        </View>
      </View>
    </View>
  );
};

export default PosRequestSuccess;
