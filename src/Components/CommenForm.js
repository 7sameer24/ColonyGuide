import {StyleSheet, Text} from 'react-native';
import React from 'react';
import InputComponent from './InputComponent';
import DropDownComponent from './DropDownComponent';
import {COLORS, FONTS} from '../constants';

const CommenForm = ({
  TitleOne,
  TitleTwo,
  FirstPlaceholder,
  FirstValue,
  FirstOnchangeText,
  NamePlaceholder,
  NameValue,
  NameOnchangeText,
  WhatsappNoPlaceholder,
  WhatsappValue,
  WhatsappOnchangeText,
  AboutPlaceholder,
  AboutValue,
  AbouteOnchangeText,
  BFPlaceholder,
  BFValue,
  BFOnchangeText,
  AddressPlaceholder,
  AddressValue,
  AddressOnchangeText,
  LandmarkPlaceholder,
  LandmarkValue,
  LandmarkOnchangeText,
  DropDownPlaceholder,
  DropDownData,
  DropDownValue,
  DropDownOnchange,
}) => {
  return (
    <>
      <Text style={styles.BusinessDetails}>{TitleOne}</Text>
      <InputComponent
        placeholder={FirstPlaceholder}
        value={FirstValue}
        autoCapitalize="words"
        onChangeText={FirstOnchangeText}
      />
      <InputComponent
        placeholder={NamePlaceholder}
        value={NameValue}
        autoCapitalize="words"
        onChangeText={NameOnchangeText}
      />
      <InputComponent
        placeholder={WhatsappNoPlaceholder}
        value={WhatsappValue}
        autoCapitalize="words"
        onChangeText={WhatsappOnchangeText}
      />

      <DropDownComponent
        placeholder={DropDownPlaceholder}
        data={DropDownData}
        labelField="name"
        valueField="id"
        value={DropDownValue}
        maxHeight={200}
        onChange={DropDownOnchange}
      />
      <InputComponent
        placeholder={AboutPlaceholder}
        autoCapitalize="words"
        value={AboutValue}
        onChangeText={AbouteOnchangeText}
      />
      <Text style={styles.BusinessDetails}>{TitleTwo}</Text>
      <InputComponent
        placeholder={BFPlaceholder}
        value={BFValue}
        autoCapitalize="words"
        onChangeText={BFOnchangeText}
      />
      <InputComponent
        placeholder={AddressPlaceholder}
        value={AddressValue}
        autoCapitalize="words"
        onChangeText={AddressOnchangeText}
      />
      <InputComponent
        placeholder={LandmarkPlaceholder}
        value={LandmarkValue}
        autoCapitalize="words"
        onChangeText={LandmarkOnchangeText}
      />
    </>
  );
};

export default CommenForm;

const styles = StyleSheet.create({
  BusinessDetails: {
    fontSize: 16,
    color: COLORS.textColor,
    fontFamily: FONTS.InterMedium,
    marginLeft: 23,
    marginTop: 20,
    marginBottom: 5,
  },
});
