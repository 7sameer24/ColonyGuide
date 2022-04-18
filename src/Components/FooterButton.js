import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {COLORS, FONTS} from '../constants';

const FooterButton = ({disabled, onPress, title, textStyle, resendTouch}) => {
  return (
    <TouchableOpacity style={resendTouch} onPress={onPress} disabled={disabled}>
      <Text style={[styles.ResendText, {...textStyle}]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default FooterButton;

const styles = StyleSheet.create({
  ResendText: {
    fontFamily: FONTS.InterRegular,
    fontSize: 14,
    color: COLORS.third,
    alignSelf: 'center',
  },
});
