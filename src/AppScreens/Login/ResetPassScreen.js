import {StyleSheet, View} from 'react-native';
import React from 'react';
import {genericStyles, Images} from '../../constants';
import HeaderBody from '../../Components/HeaderBody';
import InputComponent from '../../Components/InputComponent';
import ButtonComponent from '../../Components/ButtonComponent';

const ResetPassScreen = ({navigation}) => {
  return (
    <View style={genericStyles.Container}>
      <HeaderBody
        title="Reset Password"
        subTitle="Enter a strong password"
        source={Images.NewPass}
      />
      <InputComponent
        placeholder="Enter a strong password"
        errorStyle={genericStyles.fontSize(5)}
      />
      <InputComponent
        placeholder="Confirm password"
        errorStyle={genericStyles.fontSize(5)}
      />
      <ButtonComponent
        title="Continue"
        ButtonContainer={genericStyles.mt(25)}
      />
    </View>
  );
};

export default ResetPassScreen;

const styles = StyleSheet.create({});
