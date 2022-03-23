import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {COLORS, FONTS} from '../constants';

const FooterButton = ({onPress, title, textStyle}) => {
  return (
    <TouchableOpacity style={styles.resendTouch} onPress={onPress}>
      <Text style={[styles.ResendText, {...textStyle}]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default FooterButton;

const styles = StyleSheet.create({
  ResendText: {
    fontFamily: FONTS.InterRegular,
    fontSize: 12,
    color: COLORS.third,
    alignSelf: 'center',
    marginTop: 20,
  },
});
