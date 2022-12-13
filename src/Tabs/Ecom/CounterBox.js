import React from 'react';
import {ActivityIndicator} from 'react-native';
import {COLORS, FONTS, genericStyles} from '../../constants';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const CounterBox = ({Qnty, plus, minus, styleContainer, textStyle, touch}) => {
  return (
    <View style={[styles.container, {...styleContainer}]}>
      <TouchableOpacity
        onPress={minus}
        style={[genericStyles.padding(8), {...touch}]}>
        <Text style={[styles.title600, {...textStyle}]}>-</Text>
      </TouchableOpacity>
      {Qnty ? (
        <Text style={[styles.title600, {...textStyle}]}>{Qnty}</Text>
      ) : (
        <ActivityIndicator color={COLORS.primary} size="small" />
      )}
      <TouchableOpacity
        onPress={plus}
        style={[genericStyles.padding(8), {...touch}]}>
        <Text style={[styles.title600, {...textStyle}]}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CounterBox;

const styles = StyleSheet.create({
  container: {
    width: '82%',
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: COLORS.primary,
  },
  title600: {
    fontSize: 18,
    color: COLORS.white,
    fontFamily: FONTS.InterSemiBold,
  },
});
