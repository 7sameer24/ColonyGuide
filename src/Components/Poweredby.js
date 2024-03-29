import {Linking, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS, FONTS} from '../constants';

const Poweredby = ({textStyle, container}) => {
  return (
    <SafeAreaView style={[styles.container, {...container}]}>
      <TouchableOpacity
        onPress={() => Linking.openURL('https://www.phppoets.com/')}>
        <Text style={[styles.text, {...textStyle}]}>Designed by PHP POETS</Text>
      </TouchableOpacity>
    </SafeAreaView>
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
    justifyContent: 'flex-end',
    marginBottom:10,
  },
});
