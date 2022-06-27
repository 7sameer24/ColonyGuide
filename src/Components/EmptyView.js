import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, FONTS} from '../constants';

const EmptyView = ({heading, container, title2}) => {
  return (
    <View style={[styles.container, {...container}]}>
      <Text style={[styles.title2, {...title2}]}>{heading}</Text>
    </View>
  );
};

export default EmptyView;

const styles = StyleSheet.create({
  title2: {
    fontFamily: FONTS.InterRegular,
    fontSize: 16,
    color: COLORS.black,
    alignSelf: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
