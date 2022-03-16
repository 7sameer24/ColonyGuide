import {StyleSheet} from 'react-native';
import React from 'react';
import {Button} from 'react-native-elements';
import {COLORS, FONTS} from '../constants';

const ButtonComponent = ({
  disabledTitleStyle,
  ButtonContainer,
  disabledStyle,
  buttonStyle,
  titleStyle,
  disabled,
  btnType,
  onPress,
  loading,
  title,
}) => {
  return (
    <Button
      title={title}
      buttonStyle={[styles.buttonStyle, {...buttonStyle}]}
      containerStyle={[styles.ButtonContainer, {...ButtonContainer}]}
      titleStyle={[styles.titleStyle, {...titleStyle}]}
      onPress={onPress}
      type={btnType}
      disabled={disabled}
      loading={loading}
      disabledStyle={disabledStyle}
      disabledTitleStyle={disabledTitleStyle}
    />
  );
};

export default ButtonComponent;

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
  },
  ButtonContainer: {
    marginHorizontal: 20,
    borderRadius: 10,
    elevation: 4,
  },
  titleStyle: {
    fontFamily: FONTS.InterSemiBold,
    fontSize: 14,
  },
});
