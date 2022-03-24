import React from 'react';
import {StyleSheet} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {Icon} from 'react-native-elements';
import {COLORS, FONTS} from '../constants';

const DropDownComponent = ({
  data,
  placeholder,
  value,
  onChange,
  labelField,
  valueField,
  maxHeight,
}) => {
  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={data}
      search={false}
      maxHeight={maxHeight}
      labelField={labelField}
      valueField={valueField}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      renderRightIcon={() => (
        <Icon
          color={COLORS.primary}
          name="chevron-down"
          size={25}
          type="ionicon"
        />
      )}
      dropdownPosition="bottom"
    />
  );
};

export default DropDownComponent;

const styles = StyleSheet.create({
  dropdown: {
    marginHorizontal: 20,
    height: 50,
    borderBottomColor: COLORS.secondary,
    borderBottomWidth: 1,
    marginBottom: 5,
  },
  placeholderStyle: {
    fontFamily: FONTS.InterRegular,
    color: COLORS.third,
    fontSize: 14,
  },
  selectedTextStyle: {
    fontFamily: FONTS.InterRegular,
    color: COLORS.third,
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
