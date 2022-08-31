import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS, FONTS} from '../../constants';

const CustomView = ({text, onPress}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.categoryTex}>{text}</Text>
      <TouchableOpacity style={styles.addbtn} onPress={onPress}>
        <Text style={[styles.categoryTex, {color: COLORS.white}]}>Add +</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomView;

const styles = StyleSheet.create({
  categoryTex: {
    fontFamily: FONTS.InterMedium,
    fontSize: 16,
    color: COLORS.black,
  },
  container: {
    marginHorizontal: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
    alignItems: 'center',
  },
  addbtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    paddingHorizontal: 11,
    paddingVertical: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
