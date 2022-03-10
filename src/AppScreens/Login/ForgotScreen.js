import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {genericStyles, Images} from '../../constants';
import HeaderBody from '../../Components/HeaderBody';
import InputComponent from '../../Components/InputComponent';
import ButtonComponent from '../../Components/ButtonComponent';
import FooterButton from '../../Components/FooterButton';

const ForgotScreen = ({navigation}) => {
  return (
    <View style={genericStyles.Container}>
      <HeaderBody
        Skip="Skip to home"
        title="Forgot Password"
        subTitle="Please enter your mobile number associated 
with your account"
        source={Images.ForgotPass}
      />
      <InputComponent
        placeholder="Mobile Number"
        iconName="call"
        iconSize={25}
        errorStyle={genericStyles.fontSize(5)}
      />
      <ButtonComponent
        title="Request OTP"
        ButtonContainer={genericStyles.mt(17)}
        onPress={() => navigation.navigate('OTPNEWPASS')}
      />
      <FooterButton
        title="Back"
        textStyle={genericStyles.fontSize(14)}
        onPress={() => navigation.goBack()}
      />
    </View>
  );
};

export default ForgotScreen;
