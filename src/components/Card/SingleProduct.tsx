import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React from 'react';

const {width, height} = Dimensions.get('window');

interface CardProps {
  image?: string;
}

const SingleProductCard = (props: CardProps) => {
  return (
    <TouchableOpacity style={styles.card}>
      <View>
        <Image
          source={{uri: props.image}}
          style={{
            width: 356,
            height: 300,
            alignItems: 'center',
            borderRadius: 10,
          }}
        />
      </View>
    </TouchableOpacity>
  );
};

export default SingleProductCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    width,
    height: height / 2,
    alignItems: 'center',
  },
});
