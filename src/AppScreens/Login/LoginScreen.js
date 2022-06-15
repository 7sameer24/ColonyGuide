import {
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS, FONTS, genericStyles} from '../../constants';
import {CheckBox} from 'react-native-elements';
import HeaderBody from '../../Components/HeaderBody';
import ButtonComponent from '../../Components/ButtonComponent';
import Poweredby from '../../Components/Poweredby';
import InputComponent from '../../Components/InputComponent';
import axios from 'axios';
import LoginLogo from '../../../assets/svg/pana.svg';
import {navigationStateType, useApp} from '../../../Context/AppContext';
import BaseURL from '../../constants/BaseURL';

const LoginScreen = ({navigation}) => {
  const {width, height} = Dimensions.get('window');

  const [check1, setCheck1] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [visible, setVisible] = useState(true);
  const [MN, setMobile] = useState('');
  const [password, setPass] = useState('');
  const {setNewData, setUserToken, setNavigationState} = useApp();

  const Login = async () => {
    if (MN.length < 10 || MN.length > 10) {
      ToastAndroid.show('Please enter 10 digit number', ToastAndroid.SHORT);
    } else {
      try {
        setSpinner(true);
        const response = await axios
          .post(BaseURL('login'), {
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

  const skipToHome = () => {
    setNavigationState(navigationStateType.GUEST);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} />
      <ScrollView keyboardShouldPersistTaps="handled">
        <HeaderBody
          title="Welcome"
          subTitle="Log in to continue"
          Icon={<LoginLogo height={200} />}
          Skip="Skip"
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
            secureTextEntry={visible}
            onChangeText={text => setPass(text)}
            errorStyle={genericStyles.fontSize(5)}
          />
        </View>
        <View style={styles.CheckBox}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgotText}>Forgot password?</Text>
          </TouchableOpacity>
        </View>
        <ButtonComponent
          title="SIGN IN"
          loading={spinner ? true : false}
          onPress={() => Login()}
          disabled={!MN || !password ? true : false}
          ButtonContainer={{elevation: !MN || !password ? 0 : 4}}
          disabledTitleStyle={{color: COLORS.white}}
          disabledStyle={{backgroundColor: '#a668d5'}}
        />
        <View style={styles.signUpBtn}>
          <Text style={styles.signUp}>Don’t have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Sign in')}>
            <Text style={styles.signUpBtn2}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Poweredby />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  forgotText: {
    marginRight: 20,
    color: '#337FF5',
    fontSize: 16,
    fontFamily: FONTS.InterRegular,
  },
  CheckBox: {
    alignSelf: 'flex-end',
    marginBottom: 15,
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
