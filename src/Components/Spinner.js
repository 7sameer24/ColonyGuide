import React from 'react';
import {StatusBar} from 'react-native';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {COLORS} from '../constants';

const Spinner = ({barStyle, loader}) => {
  return (
    <View style={[styles.loader, {...loader}]}>
      <StatusBar barStyle={barStyle} />
      <ActivityIndicator size="large" color={COLORS.primary} />
    </View>
  );
};
export default Spinner;
const styles = StyleSheet.create({
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
});
