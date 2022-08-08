import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {COLORS, FONTS, genericStyles} from '../../constants';
import {Input} from 'react-native-elements';
import ButtonComponent from '../../Components/ButtonComponent';
import FooterButton from '../../Components/FooterButton';
import {CommonActions} from '@react-navigation/native';
import ImgIcon from '../../../assets/svg/Frame 10.svg';
import axios from 'axios';
import {navigationStateType, useApp} from '../../../Context/AppContext';
import BaseURL from '../../constants/BaseURL';
import ResendTimer from '../../Components/ResendTimer';
import Toast from '../../Components/Toast';
import {useToast} from 'react-native-toast-notifications';

const OtpScreen = ({route, navigation}) => {
  const {DATA, userMobile} = route.params;
  const [first, setFirst] = useState('');
  const [second, setSecond] = useState('');
  const [third, setThird] = useState('');
  const [last, setLast] = useState('');
  const [spinner, setSpinner] = useState(false);
  const FirstInput = useRef(null);
  const secondInput = useRef(null);
  const thirdInput = useRef(null);
  const LastInput = useRef(null);
  const {setNewData, setUserToken, setNavigationState} = useApp();
  const [resendingOTP, setResendingOTP] = useState(false);
  const [resendStatus, setResendStatus] = useState('Resend');
  const toast = useToast();

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
    let idx = `${first}${second}${third}${last}`;
    try {
      setSpinner(true);
      const response = await axios.post(BaseURL('verify-otp'), {
        user_id: DATA.user_id,
        otp: idx,
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
          navigation.navigate('Registration', {UserData: DATA});
        }
        Toast(toast, 'OTP verified successfully');
      } else {
        Toast(toast, response.data.message);
      }
    } catch (error) {
      setSpinner(false);
      Toast(toast, error);
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

        <View style={styles.InputView}>
          <Input
            containerStyle={genericStyles.width(40)}
            keyboardType="number-pad"
            inputContainerStyle={genericStyles.borderColor(COLORS.secondary)}
            maxLength={1}
            value={first}
            onChangeText={num => {
              setFirst(num);
              if (num != '') {
                secondInput.current.focus();
              }
            }}
            ref={FirstInput}
            autoFocus={true}
            onSubmitEditing={() => (first ? secondInput.current.focus() : null)}
          />
          <Input
            containerStyle={genericStyles.width(40)}
            keyboardType="number-pad"
            inputContainerStyle={genericStyles.borderColor(COLORS.secondary)}
            maxLength={1}
            value={second}
            onChangeText={num => {
              setSecond(num);
              if (num != '') {
                thirdInput.current.focus();
              }
            }}
            ref={secondInput}
            onKeyPress={({nativeEvent}) => {
              nativeEvent.key === 'Backspace'
                ? FirstInput.current.focus()
                : null;
            }}
            onSubmitEditing={() => (second ? thirdInput.current.focus() : null)}
          />
          <Input
            containerStyle={genericStyles.width(40)}
            keyboardType="number-pad"
            inputContainerStyle={genericStyles.borderColor(COLORS.secondary)}
            maxLength={1}
            value={third}
            onChangeText={num => {
              setThird(num);
              if (num != '') {
                LastInput.current.focus();
              }
            }}
            ref={thirdInput}
            onKeyPress={({nativeEvent}) => {
              nativeEvent.key === 'Backspace'
                ? secondInput.current.focus()
                : null;
            }}
            onSubmitEditing={() => (third ? LastInput.current.focus() : null)}
          />
          <Input
            containerStyle={genericStyles.width(40)}
            inputContainerStyle={genericStyles.borderColor(COLORS.secondary)}
            keyboardType="number-pad"
            maxLength={1}
            value={last}
            onChangeText={num => setLast(num)}
            ref={LastInput}
            clearButtonMode="always"
            onKeyPress={({nativeEvent}) => {
              nativeEvent.key === 'Backspace'
                ? thirdInput.current.focus()
                : null;
            }}
          />
        </View>
        <ButtonComponent
          title="Verify"
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
  InputView: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
});
