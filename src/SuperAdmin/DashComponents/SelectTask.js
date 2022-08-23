import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Card} from 'react-native-elements';
import {COLORS, FONTS} from '../../constants';
import {SvgUri} from 'react-native-svg';

const SelectTask = ({onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      style={styles.containerStyle2}>
      <Card containerStyle={styles.cardContainer}>
        <SvgUri width={30} height={30} />
      </Card>
      <Text style={styles.text3}>Gallery</Text>
    </TouchableOpacity>
  );
};

export default SelectTask;

const styles = StyleSheet.create({
  containerStyle2: {
    width: '20%',
    height: '35%',
    padding: 5,
    marginHorizontal: 25,
    marginTop: 10,
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
    margin: 0,
    padding: 0,
  },
});
