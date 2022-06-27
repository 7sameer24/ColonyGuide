import React from 'react';
import {StyleSheet} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {Icon} from 'react-native-elements';
import {COLORS, FONTS, genericStyles} from '../constants';

const DropDownComponent = ({
  data,
  placeholder,
  value,
  onChange,
  labelField,
  valueField,
  maxHeight,
  iconContainer,
  dropdownStyle,
  placeholderStyle,
}) => {
  return (
    <Dropdown
      style={[styles.dropdown, {...dropdownStyle}]}
      placeholderStyle={[styles.placeholderStyle, {...placeholderStyle}]}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      data={data}
      search={false}
      maxHeight={maxHeight}
      labelField={labelField}
      valueField={valueField}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      containerStyle={genericStyles.borderRadius(10)}
      renderRightIcon={() => (
        <Icon
          color={COLORS.primary}
          name="chevron-down"
          size={25}
          type="ionicon"
          containerStyle={iconContainer}
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
    color: COLORS.primary,
    fontSize: 14,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
