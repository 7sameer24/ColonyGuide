import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS, FONTS, genericStyles} from '../constants';
import {Icon} from 'react-native-elements';

const ProfileComponents = ({
  title,
  titleStyle,
  IconSvg,
  onPress,
  iconName,
  ImageContainer,
}) => {
  return (
    <TouchableOpacity style={styles.iconView} onPress={onPress}>
      <View style={[styles.ImageContainer, {...ImageContainer}]}>
        {IconSvg}
      </View>
      <Text style={[styles.title, {...titleStyle}]}>{title}</Text>
      <View style={styles.IconContainer}>
        <Icon
          name={iconName}
          size={20}
          style={genericStyles.mr(10)}
          color="#737373"
          type="ionicon"
        />
      </View>
    </TouchableOpacity>
  );
};

export default ProfileComponents;

const styles = StyleSheet.create({
  iconView: {
    flexDirection: 'row',
    marginTop: 20,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontFamily: FONTS.InterRegular,
    color: COLORS.textColor,
  },
  IconContainer: {
    position: 'absolute',
    right: 1,
  },
  ImageContainer: {
    backgroundColor: '#FEF6EF',
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  imageStyle: {
    width: 20,
    height: 20,
  },
});
