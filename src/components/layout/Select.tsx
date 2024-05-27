import React from 'react';
import {
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import CustomText from '../typography/CustomText';
import {Icon} from '@/assets/svg/Icon';
import {useCustomTheme} from '@/store/settings/theme/hook';
import {useState} from 'react';

const Select = ({
  placeholder,
  list = [],
  onChange,
  hold = false,
  value: selected = 'unselectable',
}: {
  placeholder: string;
  list: {label: string; value: string}[];
  onChange?: (value: string) => void;
  value: string;
  hold?: boolean;
}) => {
  const {
    fonts,
    colors: {
      bills: {
        input: {
          label,
          select: {
            arrow,
            background: backgroundColor,
            border: borderColor,
            active,
            inactive,
          },
        },
      },
    },
  } = useCustomTheme();
  const [show, setShow] = useState(false);
  return (
    <View>
      <TouchableWithoutFeedback onPress={() => setShow(true)}>
        <View
          style={[
            styles.input,
            {backgroundColor, borderWidth: 1, borderColor},
          ]}>
          <CustomText style={[{color: label}, fonts.input.text]}>
            {selected && selected !== 'unselectable'
              ? list.find(l => l.value === selected).label
              : placeholder}
          </CustomText>
          <Icon name="input-down" color={arrow} />
        </View>
      </TouchableWithoutFeedback>
      <Modal
        transparent
        visible={show}
        onRequestClose={() => {
          setShow(false);
        }}>
        <TouchableWithoutFeedback
          onPressOut={() => {
            setShow(false);
          }}>
          <View style={styles.modalView}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.modalViewInner}>
                <ScrollView showsVerticalScrollIndicator={false}>
                  {[
                    {
                      value: 'unselectable',
                      label: placeholder ?? 'Select an Item',
                    },
                    ...list,
                  ].map(({label: itemLabel, value}) => (
                    <TouchableWithoutFeedback
                      key={value}
                      onPress={() => {
                        if (value === 'unselectable') {
                          return;
                        }

                        onChange(value);
                        if (!hold) {
                          setShow(false);
                        }
                      }}>
                      <View
                        style={{
                          paddingHorizontal: 5,
                          borderRadius: 4,
                          paddingVertical: 10,
                          backgroundColor:
                            value === 'unselectable'
                              ? '#f0f0f0'
                              : selected === value
                              ? active
                              : inactive,
                        }}>
                        <CustomText
                          style={[
                            {
                              color:
                                selected === value && value !== 'unselectable'
                                  ? 'white'
                                  : label,
                            },
                            fonts.input.text,
                          ]}>
                          {itemLabel}
                        </CustomText>
                      </View>
                    </TouchableWithoutFeedback>
                  ))}
                </ScrollView>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default Select;

const styles = StyleSheet.create({
  input: {
    paddingVertical: 15,
    paddingHorizontal: 17,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 8,
  },
  modalView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: 'rgba(0,0,0,.5)',
  },
  modalViewInner: {
    backgroundColor: 'white',
    minHeight: 60,
    maxHeight: 300,
    margin: 25,
    width: '80%',
    borderRadius: 8,
    padding: 22,
  },
});
