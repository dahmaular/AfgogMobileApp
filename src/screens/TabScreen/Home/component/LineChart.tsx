import {Icon} from '@/assets/svg/Icon';
import {primary} from '@/theme/colorPatte';
import React from 'react';
import {Text, View} from 'react-native';
import {LineChart, XAxis, Grid} from 'react-native-svg-charts';

const data = [0, 50000, 15000, 60000, 63000, 23000, 65000];
const xData = [0, 60000, 50000, 63000, 23000, 15000, 65000];

const CustomLineChart = () => {
  return (
    <View
      style={{
        height: 200,
        padding: 20,
        borderRadius: 16,
        borderColor: '#CEDFFF',
        borderWidth: 1,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '60%',
          alignContent: 'center',
        }}>
        <Text
          style={{
            color: '#000',
            fontFamily: 'Nunito',
            fontSize: 12,
            fontWeight: '600',
          }}>
          This week
        </Text>
        <Icon name="thisweek" color="white" />
        <Text
          style={{
            color: '#000',
            fontFamily: 'Nunito',
            fontSize: 12,
            fontWeight: '600',
          }}>
          Last Week
        </Text>
        <Icon name="pastweek" color="white" />
      </View>
      <LineChart
        style={{flex: 1}}
        data={data}
        contentInset={{top: 5, bottom: 5}}
        svg={{stroke: primary, strokeWidth: 4}}>
        <Grid
          direction="HORIZONTAL"
          svg={{strokeOpacity: 0.3}}
          numberOfTicks={5}
        />
      </LineChart>
      <XAxis
        style={{marginTop: 10}}
        data={data}
        formatLabel={(value, index) =>
          ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]
        }
        contentInset={{left: 20, right: 20}}
        svg={{fontSize: 10, fill: primary}}
      />
    </View>
  );
};

export default CustomLineChart;
