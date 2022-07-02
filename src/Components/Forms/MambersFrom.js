import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import InputComponent from '../InputComponent';
import DropDownComponent from '../DropDownComponent';
import {COLORS, FONTS, genericStyles} from '../../constants';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import {View} from 'react-native';

const MambersFrom = ({
  TitleOne,
  NameValue,
  NameOnchangeText,
  educationValue,
  educationOnchangeText,
  numberValue,
  numberOnchangeText,
  emailValue,
  emailOnchangeText,
  bloodgroupValue,
  bloodgroupOnchange,
  relationData,
  relationValue,
  relationOnchange,
  currentworkValue,
  currentworkOnchangeText,
  maritalStatusValue,
  maritalStatusOnchange,
  LookingForValue,
  LookingForOnchange,
  genderValue,
  genderOnchange,
  isDatePickerVisible,
  onChange,
  onTouchCancel,
  showDatePicker,
  startDate,
}) => {
  const genderDataArr = [
    {name: 'Female', id: 1},
    {name: 'Male', id: 2},
    {name: 'Trans', id: 3},
  ];

  const BloodArr = [
    {name: 'A-', id: 1},
    {name: 'A+', id: 2},
    {name: 'AB-', id: 3},
    {name: 'AB+', id: 4},
    {name: 'O+', id: 5},
    {name: 'O-', id: 6},
    {name: 'B-', id: 7},
    {name: 'B+', id: 8},
  ];
  const LookingForArr = [
    {name: 'Yes', id: 1},
    {name: 'No', id: 2},
  ];
  const MaritalStatusArr = [
    {name: 'Single', id: 1},
    {name: 'Married', id: 2},
  ];

  return (
    <>
      {/* <Text style={styles.BusinessDetails}>{TitleOne}</Text> */}
      <DropDownComponent
        placeholder="Relation"
        data={relationData}
        labelField="name"
        valueField="id"
        value={relationValue}
        maxHeight={100}
        onChange={relationOnchange}
      />
      <DropDownComponent
        placeholder="Gender"
        data={genderDataArr}
        labelField="name"
        valueField="id"
        value={genderValue}
        maxHeight={100}
        onChange={genderOnchange}
      />
      <InputComponent
        placeholder="Enter Name"
        value={NameValue}
        autoCapitalize="words"
        onChangeText={NameOnchangeText}
      />
      <InputComponent
        placeholder="Education"
        value={educationValue}
        autoCapitalize="words"
        onChangeText={educationOnchangeText}
      />
      <InputComponent
        placeholder="Number"
        maxLength={10}
        keyboardType="number-pad"
        value={numberValue}
        autoCapitalize="words"
        onChangeText={numberOnchangeText}
      />

      <InputComponent
        placeholder="Email"
        value={emailValue}
        autoCapitalize="words"
        onChangeText={emailOnchangeText}
      />

      <DropDownComponent
        placeholder="Blood Group"
        data={BloodArr}
        labelField="name"
        valueField="id"
        value={bloodgroupValue}
        maxHeight={100}
        onChange={bloodgroupOnchange}
      />
      {/* /DOB */}

      {isDatePickerVisible && (
        <RNDateTimePicker
          value={new Date()}
          isVisible={isDatePickerVisible}
          mode="date"
          // minimumDate={new Date(minDate())}
          onChange={onChange}
          onTouchCancel={onTouchCancel}
        />
      )}
      <View style={genericStyles.mh(20)}>
        <TouchableOpacity onPress={showDatePicker} style={styles.datePicker}>
          <View style={[genericStyles.row, {alignItems: 'center'}]}>
            {startDate.length > 0 ? (
              <Text style={styles.dateText}>DOB ({startDate})</Text>
            ) : (
              <Text style={styles.dateText}>DOB (dd/mm/yyyy)</Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
      {/* /DOB */}

      <InputComponent
        placeholder="Current Work"
        value={currentworkValue}
        autoCapitalize="words"
        onChangeText={currentworkOnchangeText}
      />

      <DropDownComponent
        placeholder="Marital Status"
        data={MaritalStatusArr}
        labelField="name"
        valueField="id"
        value={maritalStatusValue}
        maxHeight={100}
        onChange={maritalStatusOnchange}
      />
      <DropDownComponent
        placeholder="Looking For"
        data={LookingForArr}
        labelField="name"
        valueField="id"
        value={LookingForValue}
        maxHeight={100}
        onChange={LookingForOnchange}
      />
    </>
  );
};

export default MambersFrom;

const styles = StyleSheet.create({
  BusinessDetails: {
    fontSize: 16,
    color: COLORS.textColor,
    fontFamily: FONTS.InterMedium,
    marginLeft: 23,
    marginTop: 20,
    marginBottom: 5,
  },
  title2: {
    fontFamily: FONTS.InterRegular,
    fontSize: 16,
    color: COLORS.secondary,
    marginBottom: 10,
  },
  dateText: {
    fontFamily: FONTS.InterRegular,
    fontSize: 14,
    color: COLORS.third,
  },
  datePicker: {
    borderBottomWidth: 1,
    borderColor: COLORS.secondary,
    borderRadius: 5,
    height: 45,
    justifyContent: 'center',
  },
});
