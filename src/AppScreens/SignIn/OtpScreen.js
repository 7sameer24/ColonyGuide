import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {COLORS, FONTS, genericStyles, Images} from '../../constants';
import {Input} from 'react-native-elements';
import ButtonComponent from '../../Components/ButtonComponent';
import FooterButton from '../../Components/FooterButton';
import {CommonActions} from '@react-navigation/native';
import ImgIcon from '../../../assets/svg/Frame 10.svg';
import axios from 'axios';

const OtpScreen = ({route, navigation}) => {
  const {DATA} = route.params;
  const [first, setFirst] = useState('');
  const [second, setSecond] = useState('');
  const [third, setThird] = useState('');
  const [last, setLast] = useState('');
  const [spinner, setSpinner] = useState(false);
  const secondInput = useRef(null);
  const thirdInput = useRef(null);
  const LastInput = useRef(null);

  const checkOtp = async () => {
    let idx = `${first}${second}${third}${last}`;
    try {
      setSpinner(true);
      const URL = 'https://colonyguide.garimaartgallery.com/api/verify-otp';
      const response = await axios.post(URL, {
        user_id: DATA.user_id,
        otp: idx,
      });
      setSpinner(false);
      if (response.data.success === true) {
        if (
          DATA.message === 'We have sent an otp on your registered mobile no.'
        ) {
          navigation.dispatch(
            CommonActions.reset({
              routes: [{name: 'ResetPassword', params: {data: DATA}}],
            }),
          );
          ToastAndroid.show('OTP verified successfully', ToastAndroid.SHORT);
        } else {
          if (4 === DATA.app_role_id) {
            navigation.dispatch(
              CommonActions.reset({
                routes: [{name: 'Feed'}],
              }),
            );
          } else {
            navigation.navigate('Registration', {UserData: DATA});
          }
          ToastAndroid.show('OTP verified successfully', ToastAndroid.SHORT);
        }
      } else {
        ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
      }
    } catch (error) {
      setSpinner(false);
      alert(error);
    }
  };
  return (
    <View style={styles.Container}>
      <ScrollView>
        <View style={styles.ViewContainer}>
          <ImgIcon width={304.52} height={268.18} />
          <Text style={styles.text}>OTP Verification</Text>
          <Text style={styles.subText}>
            Enter the otp sent to the mobile number
          </Text>
          <Text style={styles.subText}>+91-xxx-xxxx-xxx</Text>
          <Text style={styles.subText}>Your Otp : {DATA.otp}</Text>
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
          />
        </View>
        <ButtonComponent
          title="Verify"
          onPress={() => checkOtp()}
          loading={spinner ? true : false}
        />
        <FooterButton title="Resend OTP" />
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
