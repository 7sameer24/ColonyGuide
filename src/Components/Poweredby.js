import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {FONTS} from '../constants';

const Poweredby = ({textStyle}) => {
  return (
    <View>
      <Text style={[styles.text, {...textStyle}]}>powered by PHP POETS</Text>
    </View>
  );
};

export default Poweredby;

const styles = StyleSheet.create({
  text: {
    color: '#CBCBCB',
    fontFamily: FONTS.InterMedium,
    fontSize: 14,
    alignSelf: 'center',
    marginTop: 5,
    marginBottom: 10,
  },
});
