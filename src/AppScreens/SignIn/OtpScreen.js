import {LogBox, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, FONTS, genericStyles} from '../../constants';
import ButtonComponent from '../../Components/ButtonComponent';
import FooterButton from '../../Components/FooterButton';
import {CommonActions} from '@react-navigation/native';
import ImgIcon from '../../../assets/svg/Frame 10.svg';
import axios from 'axios';
import {useApp} from '../../../Context/AppContext';
import BaseURL from '../../constants/BaseURL';
import ResendTimer from '../../Components/ResendTimer';
import Toast from '../../Components/Toast';
import {useToast} from 'react-native-toast-notifications';
import OtpInputs from 'react-native-otp-inputs';

const OtpScreen = ({route, navigation}) => {
  const {DATA, userMobile} = route.params;
  const [spinner, setSpinner] = useState(false);
  const {setNewData, setUserToken, setNavigationState} = useApp();
  const [resendingOTP, setResendingOTP] = useState(false);
  const [resendStatus, setResendStatus] = useState('Resend');
  const toast = useToast();
  const [otp, updateOtp] = useState('');

  // Resend Timer
  const [timeLeft, setTimeLeft] = useState(null);
  const [targetTime, setTargetTime] = useState(null);

  const [activeResend, setActiveResend] = useState(false);
  let resendTimerInterval;

  const calculatetimerLeft = finalTime => {
    const difference = finalTime - +new Date();
    if (difference >= 0) {
      setTimeLeft(Math.round(difference / 1000));
    } else {
      setTimeLeft(null);
      clearInterval(resendTimerInterval);
      setActiveResend(true);
    }
  };

  const triggerTimer = (targetTimeSeconds = 30) => {
    setTargetTime(targetTimeSeconds);
    setActiveResend(false);
    const finalTime = +new Date() + targetTimeSeconds * 1000;
    resendTimerInterval = setInterval(
      () => (calculatetimerLeft(finalTime), 1000),
    );
  };

  useEffect(() => {
    triggerTimer();
    return () => {
      clearInterval(resendTimerInterval);
    };
  }, []);

  const checkOtp = async () => {
    try {
      setSpinner(true);
      const response = await axios.post(BaseURL('verify-otp'), {
        user_id: DATA.user_id,
        otp: otp,
      });
      setSpinner(false);
      if (response.data.success == true) {
        if (
          DATA.message === 'We have sent an OTP on your registered mobile no.'
        ) {
          navigation.dispatch(
            CommonActions.reset({
              routes: [{name: 'ResetPassword', params: {data: DATA}}],
            }),
          );
        } else if (DATA.app_role_id == 4) {
          navigation.navigate('LocalId', {
            UserData: response.data,
            token: DATA.token,
          });
        } else {
          navigation.navigate('Registration', {
            UserData: DATA,
            number: userMobile,
          });
        }
        Toast(toast, 'OTP verified successfully');
      } else {
        Toast(toast, response.data.message);
      }
    } catch (error) {
      setSpinner(false);
      console.log(error);
    }
  };

  const resendOtp = async () => {
    triggerTimer();
    // try {
    //   const response = await axios.post(BaseURL('resend-otp'), {
    //     mobile_no: userMobile,
    //   });
    //   console.log(response.data);
    // } catch (error) {
    //   alert(error);
    // }
  };
  const start = userMobile.slice(0, 2);
  const end = userMobile.slice(8, 10);
  LogBox.ignoreLogs(['Warning: Cannot update a component (`OtpScreen`)']);

  return (
    <View style={styles.Container}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.ViewContainer}>
          <View style={genericStyles.selfCenter}>
            <ImgIcon height={160} />
          </View>
          <Text style={styles.text}>OTP Verification</Text>
          <Text style={styles.subText}>
            Enter the OTP sent to the mobile number
          </Text>
          <Text style={styles.subText}>+91-{`${start}x-xxxx-x${end}`}</Text>
          <Text style={styles.subText}>Your OTP : {DATA.otp}</Text>
        </View>
        <OtpInputs
          style={styles.otpMain}
          inputContainerStyles={styles.otpContainer}
          inputStyles={[genericStyles.textCenter, styles.otpTextStyle]}
          handleChange={code => updateOtp(code)}
          numberOfInputs={4}
        />
        <ButtonComponent
          title="Verify"
          disabledTitleStyle={{color: COLORS.third}}
          disabledStyle={{backgroundColor: COLORS.lightGray2}}
          disabled={otp.length >= 4 ? false : true}
          onPress={() => checkOtp()}
          loading={spinner ? true : false}
        />
        <ResendTimer
          activeResend={activeResend}
          resendingOTP={resendingOTP}
          resendStatus={resendStatus}
          targetTime={targetTime}
          timeLeft={timeLeft}
          resendOtp={resendOtp}
        />
      </ScrollView>
    </View>
  );
};

export default OtpScreen;

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
    alignSelf: 'center',
  },
  otpMain: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginVertical: 20,
  },
  otpContainer: {
    width: 20,
    marginHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: COLORS.secondary,
  },
  otpTextStyle: {
    fontSize: 16,
    textAlign: 'center',
    color: COLORS.black,
    fontFamily: FONTS.InterMedium,
  },
});
