import {
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import HeaderBody from '../../Components/HeaderBody';
import {COLORS, FONTS, genericStyles, Images} from '../../constants';
import ButtonComponent from '../../Components/ButtonComponent';
import InputComponent from '../../Components/InputComponent';
import axios from 'axios';
const RegisterScreen = ({navigation, route}) => {
  const {role_id} = route.params;
  const [mobileNo, setMobile] = useState('');
  const [visible, setVisible] = useState(true);
  const [visible2, setVisible2] = useState(true);
  const [spinner, setSpinner] = useState(false);
  const [pass, setPass] = useState('');
  const [CPASS, setCPASS] = useState('');
  const register = async () => {
    if (mobileNo.length < 10 || mobileNo.length > 10) {
      ToastAndroid.show('Please enter 10 digit number', ToastAndroid.SHORT);
    } else if (pass !== CPASS) {
      ToastAndroid.show('Password does not match', ToastAndroid.SHORT);
    } else if (pass.length < 8 || CPASS.length < 8) {
      ToastAndroid.show(
        'Please enter 8 or more characters',
        ToastAndroid.SHORT,
      );
    } else {
      try {
        setSpinner(true);
        const URL = 'https://colonyguide.garimaartgallery.com/api/register';
        const response = await axios.post(URL, {
          mobile_no: mobileNo,
          password: pass,
          c_password: CPASS,
          role_id: role_id,
        });
        setSpinner(false);
        ToastAndroid.show('Otp sent successfully', ToastAndroid.SHORT);
        navigation.navigate('Otp', {DATA: response.data});
      } catch (error) {
        setSpinner(false);
        console.log(error);
      }
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView>
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
            keyboardType="number-pad"
            value={mobileNo}
            onChangeText={num => setMobile(num)}
            errorStyle={genericStyles.fontSize(5)}
          />
          <InputComponent
            placeholder="Password"
            iconName={visible2 ? 'eye' : 'eye-off'}
            iconOnpress={() => setVisible2(!visible2)}
            iconSize={25}
            value={pass}
            onChangeText={text => setPass(text)}
            errorStyle={genericStyles.fontSize(5)}
            secureTextEntry={visible2}
          />
          <InputComponent
            placeholder="Confirm Password"
            iconName={visible ? 'eye' : 'eye-off'}
            iconOnpress={() => setVisible(!visible)}
            iconSize={25}
            value={CPASS}
            onChangeText={text => setCPASS(text)}
            errorStyle={genericStyles.fontSize(5)}
            secureTextEntry={visible}
          />
        </View>
        <ButtonComponent
          title="Sign Up"
          onPress={() => register()}
          loading={spinner ? true : false}
        />
        <View style={styles.signUpBtn}>
          <Text style={styles.signUp}>Don’t have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Sign in')}>
            <Text style={styles.signUpBtn2}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
