import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Icon} from 'react-native-elements';
import {COLORS, FONTS, genericStyles} from '../constants';

const HeaderBar = ({
  firstIcon,
  firstOnpress,
  title,
  bellIcon,
  searchIcon,
  titleStyle,
  searchTouchable,
  iconStyle,
  iconView,
}) => {
  return (
    <View style={[styles.iconView, {...iconView}]}>
      <Icon
        color={COLORS.textColor}
        name={firstIcon}
        type="ionicon"
        size={25}
        onPress={firstOnpress}
      />
      <Text style={[styles.title, {...titleStyle}]}>{title}</Text>
      <View style={genericStyles.row}>
        <Icon
          name={searchIcon}
          size={25}
          color={COLORS.textColor}
          type="ionicon"
          onPress={searchTouchable}
        />
        <Icon
          color={COLORS.textColor}
          name={bellIcon}
          type="material-community"
          size={25}
          style={[genericStyles.ml(22), {...iconStyle}]}
        />
      </View>
    </View>
  );
};

export default HeaderBar;

const styles = StyleSheet.create({
  iconView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontFamily: FONTS.InterSemiBold,
    marginRight: '40%',
    color: COLORS.textColor,
  },
});
