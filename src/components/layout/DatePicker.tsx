import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import DatePicker from 'react-native-date-picker';

const DateTimePicker = () => {
  const [openDatePicker, setOpenDatePicker] = useState<boolean>(false);
  const [date, setDate] = useState(new Date());
  return (
    <View>
      <DatePicker
        modal
        mode="date"
        open={openDatePicker}
        date={date}
        onConfirm={date => {
          setOpenDatePicker(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpenDatePicker(false);
        }}
      />
    </View>
  );
};

export default DateTimePicker;

const styles = StyleSheet.create({});
