import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS, FONTS, genericStyles} from '../../constants';
import HeaderBody from '../../Components/HeaderBody';
import ButtonComponent from '../../Components/ButtonComponent';
import Poweredby from '../../Components/Poweredby';
import InputComponent from '../../Components/InputComponent';
import axios from 'axios';
import LoginLogo from '../../../assets/svg/pana.svg';
import {navigationStateType, useApp} from '../../../Context/AppContext';
import BaseURL from '../../constants/BaseURL';
import {useToast} from 'react-native-toast-notifications';
import Toast from '../../Components/Toast';

const LoginScreen = ({navigation}) => {
  const toast = useToast();
  const [spinner, setSpinner] = useState(false);
  const [visible, setVisible] = useState(true);
  const [MN, setMobile] = useState('');
  const [password, setPass] = useState('');
  const {
    setNewData,
    setUserToken,
    setNavigationState,
    updateResumeDtails,
    setAdminData,
    setAdminToken,
  } = useApp();

  const Login = async () => {
    if (MN.length < 10 || MN.length > 10) {
      Toast(toast, 'Please enter 10 digit number');
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
              if (
                response.data.userData.app_role_id === 6 ||
                response.data.userData.app_role_id === 5
              ) {
                // SuperAdmin login
                setAdminData(response.data);
                setAdminToken(response.data.token);
                Toast(toast, response.data.message);
              } else {
                // Normal user login
                setNewData(response.data);
                setUserToken(response.data.token);
                Toast(toast, response.data.message);
              }
            } else {
              if (response.data.otp_status === false) {
                Toast(toast, response.data.message);
              } else {
                if (response.data.message.includes('Service provider')) {
                  updateResumeDtails({
                    token: response.data.token,
                    app_role_id: response.data.userData.app_role_id,
                    user_id: response.data.userData.id,
                  });
                  setNavigationState(navigationStateType.SERVICE_FORM);
                } else if (response.data.message.includes('Resident')) {
                  updateResumeDtails({
                    token: response.data.token,
                    app_role_id: response.data.userData.app_role_id,
                    user_id: response.data.userData.id,
                  });
                  setNavigationState(navigationStateType.HOUSE_FORM);
                } else if (response.data.message.includes('student')) {
                  updateResumeDtails({
                    token: response.data.token,
                    app_role_id: response.data.userData.app_role_id,
                    user_id: response.data.userData.id,
                  });
                  setNavigationState(navigationStateType.HOSTEL_FORM);
                } else if (response.data.message.includes('Visitor')) {
                  updateResumeDtails({
                    token: response.data.token,
                    app_role_id: response.data.userData.app_role_id,
                    user_id: response.data.userData.id,
                  });
                  setNavigationState(navigationStateType.CHOOSELOCALID);
                }
              }
              Toast(toast, response.data.message);
            }
          });
      } catch (error) {
        setSpinner(false);
        Toast(toast, response.data.message);
      }
    }
  };

  const skipToHome = () => {
    setNavigationState(navigationStateType.CHOOSELOCALID);
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
            maxLength={10}
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
