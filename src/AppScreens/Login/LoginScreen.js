import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {COLORS, FONTS, genericStyles, Images} from '../../constants';
import {CheckBox, Input} from 'react-native-elements';
import HeaderBody from '../../Components/HeaderBody';
import ButtonComponent from '../../Components/ButtonComponent';
import InputComponent from '../../Components/InputComponent';

const LoginScreen = ({navigation}) => {
  const [check1, setCheck1] = useState(false);

  return (
    <View style={styles.container}>
      <HeaderBody
        title="Welcome back!"
        subTitle="Log In to continue"
        source={Images.Png}
        Skip="Skip to home"
        onPress={() => navigation.navigate('Feed')}
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
      </View>
      <View style={styles.CheckBox}>
        <CheckBox
          title="Remember me"
          checked={check1}
          onPress={() => setCheck1(!check1)}
          checkedColor={COLORS.primary}
          containerStyle={styles.checkBoxContanier}
          textStyle={styles.CheckText}
        />
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.forgotText}>Forgot password?</Text>
        </TouchableOpacity>
      </View>
      <ButtonComponent
        title="Sign In"
        onPress={() => navigation.navigate('Feed')}
      />
      <View style={styles.signUpBtn}>
        <Text style={styles.signUp}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Sign in')}>
          <Text style={styles.signUpBtn2}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  checkBoxContanier: {
    backgroundColor: COLORS.transparent,
    borderWidth: 0,
    marginTop: -10,
    marginBottom: 0,
  },
  CheckText: {
    color: COLORS.third,
    fontSize: 15,
    marginLeft: 2,
    fontFamily: FONTS.InterRegular,
    fontWeight: 'normal',
  },
  forgotText: {
    marginRight: 20,
    color: '#337FF5',
    fontSize: 16,
    fontFamily: FONTS.InterRegular,
  },
  CheckBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
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
