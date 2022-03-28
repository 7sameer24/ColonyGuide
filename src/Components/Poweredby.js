import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {FONTS} from '../constants';

const Poweredby = ({textStyle, container}) => {
  return (
    <View style={[styles.container, {...container}]}>
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
  },
  container: {
    marginTop: 5,
    marginBottom: 10,
    position: 'absolute',
    bottom: 1,
    alignSelf: 'center',
  },
});
