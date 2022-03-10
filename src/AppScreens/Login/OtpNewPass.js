import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS, FONTS, genericStyles, Images} from '../../constants';
import {Input} from 'react-native-elements';
import ButtonComponent from '../../Components/ButtonComponent';
import FooterButton from '../../Components/FooterButton';

const OtpNewPass = ({navigation}) => {
  return (
    <View style={styles.Container}>
      <View style={styles.ViewContainer}>
        <Image source={Images.otp} style={styles.imageStyle} />
        <Text style={styles.text}>OTP Verification</Text>
        <Text style={styles.subText}>
          Enter the otp sent to the mobile number
        </Text>
        <Text style={styles.subText}>+91-xxx-xxxx-xxx</Text>
      </View>
      <View style={styles.InputView}>
        <Input
          containerStyle={genericStyles.width(40)}
          keyboardType="number-pad"
          inputContainerStyle={genericStyles.borderColor(COLORS.secondary)}
        />
        <Input
          containerStyle={genericStyles.width(40)}
          keyboardType="number-pad"
          inputContainerStyle={genericStyles.borderColor(COLORS.secondary)}
        />
        <Input
          containerStyle={genericStyles.width(40)}
          keyboardType="number-pad"
          inputContainerStyle={genericStyles.borderColor(COLORS.secondary)}
        />
        <Input
          containerStyle={genericStyles.width(40)}
          inputContainerStyle={genericStyles.borderColor(COLORS.secondary)}
          keyboardType="number-pad"
        />
      </View>
      <ButtonComponent
        title="Verify"
        onPress={() => navigation.navigate('ResetPassword')}
      />
      <FooterButton title="Back" textStyle={genericStyles.fontSize(14)} />
    </View>
  );
};

export default OtpNewPass;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  imageStyle: {
    alignSelf: 'center',
    width: 316,
    height: 283,
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
    color: COLORS.black,
    marginTop: 20,
    fontFamily: FONTS.InterSemiBold,
    marginBottom: 5,
  },
  subText: {
    textAlign: 'center',
    fontSize: 14,
    color: COLORS.third,
    fontFamily: FONTS.InterRegular,
  },
  ViewContainer: {
    marginTop: '15%',
  },
  InputView: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
});
