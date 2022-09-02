import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Card} from 'react-native-elements';
import {COLORS, FONTS} from '../../constants';

const SelectTask = ({onPress, title, SvgCompoent}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      style={styles.containerStyle2}>
      <Card containerStyle={styles.cardContainer}>
        <SvgCompoent />
      </Card>
      <Text style={styles.text3} numberOfLines={1}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default SelectTask;

const styles = StyleSheet.create({
  containerStyle2: {
    width: 70,
    height: 100,
    padding: 5,
    marginHorizontal: 28,
    marginTop: 5,
  },
  text3: {
    textAlign: 'center',
    fontSize: 12,
    fontFamily: FONTS.InterRegular,
    color: COLORS.textColor,
    marginTop: 5,
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  cardContainer: {
    flex: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 0,
    padding: 0,
  },
});
