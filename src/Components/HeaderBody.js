import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS, FONTS, genericStyles} from '../constants';

const HeaderBody = ({
  title,
  source,
  subTitle,
  imageStyle,
  titleStyle,
  subTitleStyle,
  touchableOpacityStyle,
  Skip,
  onPress,
  Icon,
}) => {
  return (
    <View>
      <TouchableOpacity
        style={[styles.TouchableOpacity, {...touchableOpacityStyle}]}
        activeOpacity={0.5}
        onPress={onPress}>
        <Text style={styles.TouchableText}>{Skip}</Text>
      </TouchableOpacity>
      <View style={genericStyles.mb(0)}>
        <View style={genericStyles.selfCenter}>{Icon}</View>
        <Text style={[styles.text, {...titleStyle}]}>{title}</Text>
        <Text style={[styles.subText, {...subTitleStyle}]}>{subTitle}</Text>
      </View>
    </View>
  );
};

export default HeaderBody;

const styles = StyleSheet.create({
  TouchableOpacity: {
    flexDirection: 'row-reverse',
    marginTop: 15,
    marginLeft: 20,
    marginBottom: 20,
  },
  TouchableText: {
    color: COLORS.primary,
    fontSize: 16,
    fontFamily: FONTS.InterRegular,
    lineHeight: 19.36,
  },
  imageStyle: {
    alignSelf: 'center',
    width: 304.52,
    height: 268.18,
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
    color: COLORS.black,
    marginTop: 20,
    fontFamily: FONTS.InterSemiBold,
  },
  subText: {
    textAlign: 'center',
    fontSize: 14,
    color: COLORS.third,
    marginBottom: 20,
    fontFamily: FONTS.InterRegular,
  },
});
