import {Linking, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {FONTS} from '../constants';

const Poweredby = ({textStyle, container}) => {
  return (
    <View style={[styles.container, {...container}]}>
      <TouchableOpacity
        style={[styles.text, {...textStyle}]}
        onPress={() => Linking.openURL('https://www.phppoets.com/')}>
        <Text>Designed by PHP POETS</Text>
      </TouchableOpacity>
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
