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
        <ActivityIndicator color={COLORS.lightGray} size="small" />
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
    width: 150,
    borderRadius: 5,
    marginVertical: 0,
    paddingVertical: 0,
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 5,
    backgroundColor: COLORS.primary,
  },
  title600: {
    fontSize: 18,
    color: COLORS.white,
    fontFamily: FONTS.InterSemiBold,
  },
});
