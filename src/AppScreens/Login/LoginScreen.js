import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, FONTS, genericStyles, Images} from '../../constants';
import {CheckBox} from 'react-native-elements';
import HeaderBody from '../../Components/HeaderBody';
import ButtonComponent from '../../Components/ButtonComponent';
import Poweredby from '../../Components/Poweredby';
import InputComponent from '../../Components/InputComponent';
import {CommonActions} from '@react-navigation/native';
import axios from 'axios';
import LoginLogo from '../../../assets/svg/pana.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {navigationStateType, useApp} from '../../../Context/AppContext';

const LoginScreen = ({navigation}) => {
  const [check1, setCheck1] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [visible, setVisible] = useState(false);
  const [MN, setMobile] = useState('9529102536');
  const [password, setPass] = useState('12345678');
  const {setNewData, setUserToken, setNavigationState} = useApp();

  const Login = async () => {
    if (MN.length < 10 || MN.length > 10) {
      ToastAndroid.show('Please enter 10 digit number', ToastAndroid.SHORT);
    } else {
      try {
        setSpinner(true);
        const URL = 'https://colonyguide.garimaartgallery.com/api/login';
        const response = await axios
          .post(URL, {
            mobile_no: MN,
            password: password,
          })
          .then(async response => {
            setSpinner(false);
            if (response.data.success === true) {
              setNewData(response.data);
              setUserToken(response.data.token);
              ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
            } else {
              if (response.data.otp_status === false) {
                ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
              } else {
                ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
              }
            }
          });
      } catch (error) {
        setSpinner(false);
        alert(error);
      }
    }
  };

  const toggleRememberMe = value => {
    setCheck1(value);
    if (value === true) {
      //user wants to be remembered.
      rememberUser();
    } else {
      forgetUser();
    }
  };

  const rememberUser = async () => {
    try {
      await AsyncStorage.setItem('Remember', JSON.stringify(MN));
    } catch (error) {
      alert(error);
    }
  };

  const getRememberedUser = async () => {
    try {
      const username = await AsyncStorage.getItem('Remember');
      if (username !== null) {
        // We have username!!
        return username;
      }
    } catch (error) {}
  };

  const forgetUser = async () => {
    try {
      await AsyncStorage.removeItem('Remember');
    } catch (error) {
      // Error removing
      alert(error);
    }
  };

  useEffect(() => {
    async () => {
      const username = await getRememberedUser();
      setMobile(username || '');
      setPass(username || '');
      setCheck1(username ? true : false);
    };
  }, []);

  const skipToHome = () => {
    setNavigationState(navigationStateType.GUEST);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} />
      <ScrollView>
        <HeaderBody
          title="Welcome back!"
          subTitle="Log In to continue"
          Icon={<LoginLogo />}
          Skip="Skip to home"
          onPress={() => skipToHome()}
        />
        <View style={genericStyles.mb(10)}>
          <InputComponent
            placeholder="Mobile Number"
            iconName="call"
            iconSize={25}
            errorStyle={genericStyles.fontSize(5)}
            value={MN}
            keyboardType="number-pad"
            onChangeText={text => setMobile(text)}
          />
          <InputComponent
            placeholder="Password"
            iconName={visible ? 'eye' : 'eye-off'}
            iconOnpress={() => setVisible(!visible)}
            iconSize={25}
            value={password}
            secureTextEntry={visible ? true : false}
            onChangeText={text => setPass(text)}
            errorStyle={genericStyles.fontSize(5)}
          />
        </View>
        <View style={styles.CheckBox}>
          <CheckBox
            title="Remember me"
            checked={check1}
            onPress={() => toggleRememberMe(!check1)}
            checkedColor={COLORS.primary}
            containerStyle={styles.checkBoxContanier}
            textStyle={styles.CheckText}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgotText}>Forgot password?</Text>
          </TouchableOpacity>
        </View>
        <ButtonComponent
          title="Sign In"
          loading={spinner ? true : false}
          onPress={() => Login()}
          disabled={!MN || !password ? true : false}
          ButtonContainer={{elevation: !MN || !password ? 0 : 4}}
        />
        <View style={styles.signUpBtn}>
          <Text style={styles.signUp}>Don’t have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Sign in')}>
            <Text style={styles.signUpBtn2}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <Poweredby container={genericStyles.mb(0)} />
      </ScrollView>
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
    marginTop: 20,
    marginBottom: 25,
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
