import {StyleSheet, View} from 'react-native';
import React from 'react';
import HeaderBody from '../../../Components/HeaderBody';
import {COLORS, FONTS, genericStyles, Images} from '../../../constants';
import ButtonComponent from '../../../Components/ButtonComponent';
import InputComponent from '../../../Components/InputComponent';

const AddressScreen = () => {
  return (
    <View style={genericStyles.Container}>
      <HeaderBody
        source={Images.Address}
        title="Your Address"
        subTitle="Enter the otp sent to the mobile number
+91-xxx-xxxx-xxx"
        touchableOpacityStyle={genericStyles.mb(0)}
      />
      <View style={genericStyles.mb('17%')}>
        <InputComponent placeholder="Flat / House No." />
        <InputComponent placeholder="Address Line" />
        <InputComponent placeholder="Landmark (optional)" />
      </View>
      <ButtonComponent title="Save" />
    </View>
  );
};

export default AddressScreen;
