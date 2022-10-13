import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import InputComponent from '../InputComponent';
import DropDownComponent from '../DropDownComponent';
import {COLORS, FONTS, genericStyles} from '../../constants';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import {View} from 'react-native';

const MembersFrom = ({
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
    {name: 'Female', id: 'Female'},
    {name: 'Male', id: 'Male'},
    {name: 'Trans', id: 'Trans'},
  ];

  const BloodArr = [
    {name: 'A-', id: 'A-'},
    {name: 'A+', id: 'A+'},
    {name: 'AB-', id: 'AB-'},
    {name: 'AB+', id: 'AB+'},
    {name: 'O+', id: 'O+'},
    {name: 'O-', id: 'O-'},
    {name: 'B-', id: 'B-'},
    {name: 'B+', id: 'B+'},
  ];
  const LookingForArr = [
    {name: 'Yes', id: 'Yes'},
    {name: 'No', id: 'No'},
  ];
  const MaritalStatusArr = [
    {name: 'Single', id: 'Single'},
    {name: 'Married', id: 'Married'},
  ];

  return (
    <>
      {/* <Text style={styles.BusinessDetails}></Text> */}
      <DropDownComponent
        placeholder="Relation with you"
        data={relationData}
        labelField="name"
        valueField="ID"
        value={relationValue}
        maxHeight={200}
        onChange={relationOnchange}
      />
      <InputComponent
        placeholder="Enter Name"
        value={NameValue}
        autoCapitalize="words"
        onChangeText={NameOnchangeText}
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
        placeholder="Education"
        value={educationValue}
        autoCapitalize="words"
        onChangeText={educationOnchangeText}
      />
      <InputComponent
        placeholder="Mobile Number"
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
      {maritalStatusValue === 'Single' && (
        <DropDownComponent
          placeholder="Looking For"
          data={LookingForArr}
          labelField="name"
          valueField="id"
          value={LookingForValue}
          maxHeight={100}
          onChange={LookingForOnchange}
        />
      )}
    </>
  );
};

export default MembersFrom;

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
    marginLeft: 2,
  },
  datePicker: {
    borderBottomWidth: 1,
    borderColor: COLORS.secondary,
    borderRadius: 5,
    height: 45,
    justifyContent: 'center',
  },
});
