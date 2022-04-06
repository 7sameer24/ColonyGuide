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
  ThirdType,
  thirdOnpress,
}) => {
  return (
    <View style={[styles.iconView, {...iconView}]}>
      <View style={genericStyles.row}>
        <Icon
          color={COLORS.textColor}
          name={firstIcon}
          type="ionicon"
          size={25}
          onPress={firstOnpress}
        />
        <Text style={[styles.title, {...titleStyle}]}>{title}</Text>
      </View>
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
          type={ThirdType}
          size={25}
          onPress={thirdOnpress}
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
    marginTop: 10,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontFamily: FONTS.InterSemiBold,
    marginLeft: 30,
    color: COLORS.textColor,
  },
});
