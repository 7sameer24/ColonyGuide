import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, FONTS, genericStyles} from '../constants';
import {Input} from 'react-native-elements';

const InputComponent = ({
  placeholder,
  iconName,
  iconSize,
  errorStyle,
  inputContainerStyle,
  inputStyle,
  containerStyle,
}) => {
  return (
    <Input
      placeholder={placeholder}
      placeholderTextColor={COLORS.third}
      containerStyle={[styles.inputContainer, {...containerStyle}]}
      inputContainerStyle={[
        genericStyles.borderColor(COLORS.secondary),
        {...inputContainerStyle},
      ]}
      inputStyle={[styles.inputStyle, {...inputStyle}]}
      errorStyle={[genericStyles.fontSize(0), {...errorStyle, marginBottom: 0}]}
      rightIcon={{
        name: iconName,
        type: 'ionicon',
        color: COLORS.secondary,
        size: iconSize,
      }}
    />
  );
};

export default InputComponent;

const styles = StyleSheet.create({
  inputContainer: {
    width: '96%',
    marginHorizontal: 10,
  },
  inputStyle: {
    fontFamily: FONTS.InterRegular,
    fontSize: 14,
  },
});
