import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import HeaderBody from '../../Components/HeaderBody';
import {COLORS, FONTS, genericStyles, Images} from '../../constants';
import {Input} from 'react-native-elements';
import ButtonComponent from '../../Components/ButtonComponent';
import InputComponent from '../../Components/InputComponent';

const RegisterScreen = ({navigation, route}) => {
  const {Name} = route.params;
  //   console.log(Name);
  return (
    <View style={styles.container}>
      <HeaderBody
        title="Create Account"
        subTitle="Sign Up to continue"
        Skip="Skip to home"
        source={Images.Register}
        touchableOpacityStyle={genericStyles.mb(0)}
      />
      <View style={genericStyles.mb(10)}>
        <InputComponent
          placeholder="Mobile Number"
          iconName="call"
          iconSize={25}
          errorStyle={genericStyles.fontSize(5)}
        />
        <InputComponent
          placeholder="Password"
          iconName="lock-closed"
          iconSize={25}
          errorStyle={genericStyles.fontSize(5)}
        />
        <InputComponent
          placeholder="Confirm Password"
          iconName="lock-closed"
          iconSize={25}
          errorStyle={genericStyles.fontSize(5)}
        />
      </View>
      <ButtonComponent
        title="Sign Up"
        onPress={() => navigation.navigate('Otp', {User: Name})}
      />
      <View style={styles.signUpBtn}>
        <Text style={styles.signUp}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Sign in')}>
          <Text style={styles.signUpBtn2}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  inputContainer: {
    borderColor: COLORS.secondary,
    width: '96%',
    marginHorizontal: 10,
  },
  signUp: {
    fontSize: 16,
    color: '#666666',
    fontFamily: FONTS.InterRegular,
  },
  signUpBtn: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 40,
  },
  signUpBtn2: {
    fontSize: 16,
    color: COLORS.primary,
    fontFamily: FONTS.InterSemiBold,
  },
  inputStyle: {
    fontFamily: FONTS.InterRegular,
    fontSize: 14,
  },
});
